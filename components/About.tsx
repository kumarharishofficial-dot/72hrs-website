import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28 bg-gray-50 dark:bg-dark-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-geist text-light-text dark:text-dark-text">{t('about.title')}</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {t('about.subtitle')}
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold font-geist text-primary-violet">72</h3>
            <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">{t('about.stat1')}</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold font-geist text-primary-violet">100+</h3>
            <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">{t('about.stat2')}</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold font-geist text-primary-violet">99%</h3>
            <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">{t('about.stat3')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
