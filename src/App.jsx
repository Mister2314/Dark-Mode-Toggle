import React from 'react';
import { motion } from 'framer-motion';
import Layout from './components/Layout/Layout';
import useTheme from './hooks/useTheme';
import styles from './App.module.css';

function App() {
  const { theme, isDark } = useTheme();

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  const featureVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <Layout>
      <div className={styles.app}>
        <motion.section 
          className={styles.hero}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className={styles.heroIcon}
            animate={{ 
              rotate: isDark ? 360 : 0,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 0.5 },
              scale: { duration: 0.3, times: [0, 0.5, 1] }
            }}
          >
            {isDark ? '🌙' : '☀️'}
          </motion.div>
          <h2 className={styles.heroTitle}>
            Dark/Light Mode Toggle
          </h2>
          <p className={styles.heroDescription}>
            Bu tətbiq istifadəçi təcrübəsini yaxşılaşdırmaq üçün dark və light mode arasında keçid imkanı təqdim edir. 
            Sizin seçiminiz localStorage-da saxlanılır və növbəti dəfə saytı açdığınızda yadda qalır.
          </p>
        </motion.section>

        <motion.section 
          className={styles.features}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className={styles.sectionTitle}>Xüsusiyyətlər</h3>
          <div className={styles.featuresGrid} style={{ justifyItems: 'center' }}>
            {[
              {
                icon: '🎨',
                title: 'Modern Dizayn',
                description: 'Müasir və minimal dizayn elementləri'
              },
              {
                icon: '⚡',
                title: 'Sürətli Keçid',
                description: 'Smooth animasiyalar ilə sürətli tema dəyişimi'
              },
              {
                icon: '💾',
                title: 'Yaddaş Saxlama',
                description: 'localStorage ilə seçimin saxlanılması'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: isDark 
                    ? '0 8px 25px rgba(0, 0, 0, 0.4)' 
                    : '0 8px 25px rgba(0, 0, 0, 0.15)'
                }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

  
      </div>
    </Layout>
  );
}

export default App;