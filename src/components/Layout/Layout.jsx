import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import useTheme from '../../hooks/useTheme';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={styles.layout}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header className={styles.header} variants={itemVariants}>
        <div className={styles.headerContent}>
          <motion.h1 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Theme Toggle App
          </motion.h1>
          <ThemeToggle />
        </div>
      </motion.header>

      <motion.main className={styles.main} variants={itemVariants}>
        <div className={styles.container}>
          {children}
        </div>
      </motion.main>

      <motion.footer className={styles.footer} variants={itemVariants}>
        <div className={styles.footerContent}>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Layout;