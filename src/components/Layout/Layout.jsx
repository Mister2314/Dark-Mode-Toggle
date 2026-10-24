import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import useTheme from '../../hooks/useTheme';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const { isSystem } = useTheme();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span className={styles.logo} data-anim="late">
          Solstice
          {isSystem && <span className={styles.systemBadge}>system</span>}
        </span>
        <ThemeToggle />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer} data-anim="later">
        <p>Solstice — a day/night theme switch study. React 19 · Motion · View Transitions.</p>
      </footer>
    </div>
  );
};

export default Layout;
