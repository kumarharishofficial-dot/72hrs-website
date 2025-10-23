import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-20 sm:py-28 bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-geist text-light-text dark:text-dark-text">{t('contact.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {t('contact.subtitle')}
          </p>
          <div className="mt-8">
            <a 
              href="mailto:hello@72hrs.live" 
              className="inline-block px-8 py-3 text-base font-semibold text-primary-violet border-2 border-primary-violet rounded-lg hover:bg-primary-violet hover:text-white transform hover:-translate-y-1 transition-all duration-300"
            >
              {t('contact.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
