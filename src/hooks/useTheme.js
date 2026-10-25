import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
const VALID = ['light', 'dark', 'system'];

const systemDark = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const getStoredChoice = () => {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return VALID.includes(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
};

const resolvedTheme = (choice) =>
  choice === 'system' ? (systemDark() ? 'dark' : 'light') : choice;

const applyTheme = (next) => document.documentElement.setAttribute('data-theme', next);

const useTheme = () => {
  const [choice, setChoice] = useState(getStoredChoice);
  const [resolved, setResolved] = useState(() => resolvedTheme(getStoredChoice()));

  // Single source of truth: choice -> resolved + DOM + storage.
  useEffect(() => {
    const next = resolvedTheme(choice);
    setResolved(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage unavailable — theme still works for this session */
    }
  }, [choice]);

  // Cross-tab sync: `storage` fires in every OTHER tab when localStorage
  // changes, so all open windows stay in lockstep without polling.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      const next = VALID.includes(e.newValue) ? e.newValue : 'system';
      setChoice(next);
      const resolvedNext = resolvedTheme(next);
      setResolved(resolvedNext);
      applyTheme(resolvedNext);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Follow OS preference changes live while in "system" mode.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (choice !== 'system') return;
      const next = systemDark() ? 'dark' : 'light';
      setResolved(next);
      applyTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [choice]);

  const cycleTheme = useCallback(() => {
    setChoice((prev) => (resolvedTheme(prev) === 'dark' ? 'light' : 'dark'));
  }, []);

  const setSpecificTheme = useCallback((next) => {
    if (VALID.includes(next)) setChoice(next);
  }, []);

  return {
    theme: resolved,
    choice,
    toggleTheme: cycleTheme,
    setTheme: setSpecificTheme,
    isDark: resolved === 'dark',
    isLight: resolved === 'light',
    isSystem: choice === 'system',
  };
};

export default useTheme;
