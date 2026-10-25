import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Layout from './components/Layout/Layout';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import useTheme from './hooks/useTheme';
import styles from './App.module.css';

const Stars = () => {
  const reduceMotion = useReducedMotion();
  const stars = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${(i * 37.7) % 100}%`,
        top: `${(i * 13.3) % 46}%`,
        size: 1 + ((i * 7) % 3) * 0.6,
        delay: `${(i % 9) * 0.06}s`,
      })),
    []
  );
  return (
    <div className={styles.stars} aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className={styles.star}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: 'var(--star-opacity)',
            transitionDelay: reduceMotion ? '0s' : s.delay,
          }}
        />
      ))}
    </div>
  );
};

const Features = () => (
  <section className={styles.section} aria-labelledby="features-title">
    <h2 id="features-title" className={styles.sectionTitle} data-anim>
      What makes this switch different
    </h2>
    <div className={styles.featuresGrid}>
      {[
        {
          title: 'Scene morph, not class swap',
          body: 'Toggling runs a radial wipe (View Transitions API) and morphs a full sky scene — sun to moon, daylight to starfield — with per-element staggered choreography.',
        },
        {
          title: 'System-preference sync',
          body: 'New visitors inherit prefers-color-scheme and keep following it live; the "system" chip hands control back to the OS at any time.',
        },
        {
          title: 'Persisted, FOUC-free, cross-tab',
          body: 'Your choice survives reloads via localStorage, applied by an inline pre-hydration script so there is no flash of the wrong theme — and a storage event keeps every open tab in lockstep.',
        },
        {
          title: 'Contrast-verified both ways',
          body: 'Every palette pair below passes WCAG AA in both modes, and reduced-motion users get an instant swap with no scene animation.',
        },
      ].map((f) => (
        <article key={f.title} className={styles.featureCard} data-anim="late">
          <h3>{f.title}</h3>
          <p>{f.body}</p>
        </article>
      ))}
    </div>
  </section>
);

const contrastPairs = [
  { mode: 'Light', fg: '#23293a', bg: '#faf5ec', ratio: '13.3:1', role: 'Body text' },
  { mode: 'Light', fg: '#565d70', bg: '#faf5ec', ratio: '6.0:1', role: 'Secondary text' },
  { mode: 'Light', fg: '#8a4b0f', bg: '#faf5ec', ratio: '6.3:1', role: 'Accent / links' },
  { mode: 'Dark', fg: '#f1ecdf', bg: '#0d1424', ratio: '15.6:1', role: 'Body text' },
  { mode: 'Dark', fg: '#a9b3c9', bg: '#0d1424', ratio: '8.7:1', role: 'Secondary text' },
  { mode: 'Dark', fg: '#f2b04a', bg: '#0d1424', ratio: '9.7:1', role: 'Accent / links' },
];

const TokenSheet = () => (
  <section className={styles.section} aria-labelledby="tokens-title">
    <h2 id="tokens-title" className={styles.sectionTitle} data-anim>
      Palettes, verified
    </h2>
    <div className={styles.tokenGrid}>
      {contrastPairs.map((p, i) => (
        <div key={i} className={styles.tokenRow} data-anim="later">
          <span className={styles.swatch} style={{ background: p.bg }}>
            <span style={{ background: p.fg }} />
          </span>
          <span className={styles.tokenMeta}>
            <strong>{p.role}</strong> · {p.mode}
            <em>{p.ratio} — AA pass</em>
          </span>
        </div>
      ))}
    </div>
  </section>
);

const snippets = [
  {
    id: 'bootstrap',
    title: 'No-flash first paint',
    note: 'Inline in <head>, before any stylesheet paint — resolves storage + system preference before the first frame.',
    code: `<script>
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      var dark =
        stored === 'dark' ||
        ((stored === null || stored === 'system') &&
          matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.setAttribute(
        'data-theme', dark ? 'dark' : 'light');
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
</script>`,
  },
  {
    id: 'wipe',
    title: 'View Transitions radial wipe',
    note: 'Call document.startViewTransition(update) with a fallback — unsupported browsers just apply the update instantly.',
    code: `// JS: snapshot old frame, apply, animate new frame in
const apply = () => document.documentElement
  .setAttribute('data-theme', next);
if (document.startViewTransition) {
  document.startViewTransition(apply);
} else {
  apply(); // graceful fallback
}

/* CSS: wipe in from the toggle's position (--tx/--ty) */
::view-transition-old(root) { animation: none; }
::view-transition-new(root) {
  animation: wipe 0.7s cubic-bezier(0.65, 0, 0.35, 1);
}
@keyframes wipe {
  from { clip-path: circle(0% at var(--tx, 100%) var(--ty, 0%)); }
  to   { clip-path: circle(150% at var(--tx, 100%) var(--ty, 0%)); }
}`,
  },
  {
    id: 'lightdark',
    title: 'light-dark() + color-scheme',
    note: 'One declaration per mode pair. The element’s color-scheme picks the branch — no prefers-color-scheme media query.',
    code: `:root {
  color-scheme: light dark; /* native form controls + scrollbars follow too */
}
[data-theme='dark'] { color-scheme: dark; }

:root {
  --surface: light-dark(#fffdf8, #141d33);
  --ink:     light-dark(#23293a, #f1ecdf);
}
.card { background: var(--surface); color: var(--ink); }`,
  },
  {
    id: 'tabs',
    title: 'Cross-tab sync',
    note: 'The storage event fires in every other tab — listen, apply, done. No polling, no BroadcastChannel needed.',
    code: `window.addEventListener('storage', (e) => {
  if (e.key !== 'theme') return;
  const next = ['light', 'dark', 'system'].includes(e.newValue)
    ? e.newValue : 'system';
  document.documentElement.setAttribute(
    'data-theme', resolve(next));
});`,
  },
];

const Snippets = () => (
  <section className={styles.section} aria-labelledby="snippets-title">
    <h2 id="snippets-title" className={styles.sectionTitle} data-anim>
      Take the techniques with you
    </h2>
    <p className={styles.sectionSub} data-anim>
      Every trick this page uses, condensed to copy-paste form.
    </p>
    <div className={styles.snippetGrid}>
      {snippets.map((s, i) => (
        <SnippetCard key={s.id} snippet={s} index={i} />
      ))}
    </div>
  </section>
);

const SnippetCard = ({ snippet, index }) => {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the code block is still selectable */
    }
  };

  return (
    <article className={styles.snippetCard} data-anim={index % 2 ? 'later' : 'late'}>
      <div className={styles.snippetHead}>
        <h3>{snippet.title}</h3>
        <button type="button" className={styles.copyBtn} onClick={copy} aria-label={`Copy ${snippet.title} snippet`}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className={styles.snippetNote}>{snippet.note}</p>
      <pre className={styles.snippetCode} tabIndex={0}>
        <code>{snippet.code}</code>
      </pre>
    </article>
  );
};

const App = () => {
  const { isDark, isSystem, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  const entrance = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <Layout>
      {/* HERO — the scene IS the theme */}
      <section className={styles.scene} aria-label="Day/night scene">
        <Stars />
        <motion.span
          className={styles.orb}
          aria-hidden="true"
          animate={{
            x: isDark ? '12vw' : '-12vw',
            y: isDark ? '-4vh' : '2vh',
            scale: isDark ? 0.72 : 1,
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 16 }}
        />
        <svg
          className={styles.mountains}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className={styles.farRange}
            d="M0 224 L180 120 L320 210 L520 96 L700 220 L900 130 L1080 214 L1260 110 L1440 200 L1440 320 L0 320 Z"
          />
          <path
            className={styles.nearRange}
            d="M0 288 L220 190 L420 280 L640 176 L860 272 L1060 196 L1280 276 L1440 210 L1440 320 L0 320 Z"
          />
        </svg>

        <div className={styles.hero}>
          <motion.p className={styles.eyebrow} variants={entrance} initial="hidden" animate="visible" custom={0}>
            {isDark ? 'Night shift — 23:41' : 'Daylight — 14:06'}
          </motion.p>
          <motion.h1 className={styles.headline} variants={entrance} initial="hidden" animate="visible" custom={1}>
            One switch.
            <br />
            Two skies.
          </motion.h1>
          <motion.div className={styles.heroToggle} variants={entrance} initial="hidden" animate="visible" custom={2}>
            <ThemeToggle className={styles.bigToggle} />
          </motion.div>
          <motion.p className={styles.sub} variants={entrance} initial="hidden" animate="visible" custom={3}>
            Press it — the whole page becomes the other time of day.
          </motion.p>
          <motion.div className={styles.chips} variants={entrance} initial="hidden" animate="visible" custom={4}>
            <button
              type="button"
              className={styles.chip}
              aria-pressed={!isSystem && !isDark}
              onClick={() => setTheme('light')}
            >
              Light
            </button>
            <button
              type="button"
              className={styles.chip}
              aria-pressed={!isSystem && isDark}
              onClick={() => setTheme('dark')}
            >
              Dark
            </button>
            <button
              type="button"
              className={styles.chip}
              aria-pressed={isSystem}
              onClick={() => setTheme('system')}
            >
              Follow system
            </button>
          </motion.div>
        </div>
      </section>

      {/* Dual-mode preview */}
      <section className={styles.section} aria-labelledby="preview-title">
        <h2 id="preview-title" className={styles.sectionTitle} data-anim>
          Preview both modes
        </h2>
        <div className={styles.previewGrid}>
          <button
            type="button"
            className={styles.previewCard}
            style={{ background: '#faf5ec', color: '#23293a', borderColor: '#e2d8c4' }}
            onClick={() => setTheme('light')}
            data-anim="late"
          >
            <span className={styles.previewDot} style={{ background: '#f6b93b' }} />
            <strong>Daylight</strong>
            <span>Warm paper, ink text — apply this mode</span>
          </button>
          <button
            type="button"
            className={styles.previewCard}
            style={{ background: '#0d1424', color: '#f1ecdf', borderColor: '#26314e' }}
            onClick={() => setTheme('dark')}
            data-anim="later"
          >
            <span className={styles.previewDot} style={{ background: '#e9e4d4' }} />
            <strong>Night</strong>
            <span>Deep indigo, cream text — apply this mode</span>
          </button>
        </div>
      </section>

      <Features />
      <TokenSheet />
      <Snippets />
    </Layout>
  );
};

export default App;
