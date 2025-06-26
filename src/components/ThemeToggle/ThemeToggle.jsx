import React from 'react';
import { motion } from 'framer-motion';
import { BsSun, BsMoon } from 'react-icons/bs';
import useTheme from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const containerVariants = {
    light: {
      backgroundColor: '#ffffff',
      borderColor: '#dee2e6',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    dark: {
      backgroundColor: '#2d2d2d',
      borderColor: '#404040',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10
      }
    },
    exit: { scale: 0, rotate: 180 }
  };

  const switchVariants = {
    light: { x: 2 },
    dark: { x: 22 }
  };

  return (
    <div className={`${styles.toggleContainer} ${className}`}>
      <motion.button
        className={styles.toggleButton}
        onClick={toggleTheme}
        variants={containerVariants}
        animate={theme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`${isDark ? 'Light' : 'Dark'} rejimə keç`}
        title={`${isDark ? 'Light' : 'Dark'} rejimə keç`}
      >
        <motion.div
          className={styles.toggleSwitch}
          variants={switchVariants}
          animate={theme}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div
            key={theme}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.icon}
          >
            {isDark ? (
              <BsMoon className={styles.moonIcon} />
            ) : (
              <BsSun className={styles.sunIcon} />
            )}
          </motion.div>
        </motion.div>
      </motion.button>
      
      <span className={styles.themeLabel}>
        {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </span>
    </div>
  );
};

export default ThemeToggle;