import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { BsSun, BsMoon } from 'react-icons/bs';
import useTheme from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const reduceMotion = useReducedMotion();

  const handleClick = useCallback(() => {
    // Where is the toggle? The wipe radiates from here.
    const el = document.querySelector(`.${styles.toggleButton}`);
    if (el) {
      const r = el.getBoundingClientRect();
      const root = document.documentElement;
      root.style.setProperty('--tx', `${((r.left + r.width / 2) / window.innerWidth) * 100}%`);
      root.style.setProperty('--ty', `${((r.top + r.height / 2) / window.innerHeight) * 100}%`);
    }

    const apply = () =>
      flushSync(() => {
        toggleTheme();
      });

    if (!reduceMotion && typeof document.startViewTransition === 'function') {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }, [toggleTheme, reduceMotion]);

  return (
    <motion.button
      type="button"
      className={`${styles.toggleButton} ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      data-anim
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.span
        className={styles.knob}
        animate={{ x: isDark ? 26 : 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      >
        <motion.span
          className={styles.icon}
          initial={false}
          animate={{ rotate: isDark ? 0 : 180, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        >
          {isDark ? (
            <BsMoon className={styles.moonIcon} aria-hidden="true" />
          ) : (
            <BsSun className={styles.sunIcon} aria-hidden="true" />
          )}
        </motion.span>
      </motion.span>
      <span className={styles.trackLabel} aria-hidden="true">
        {theme} mode
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
