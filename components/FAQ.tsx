import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import type { FAQItem } from '../types';

const FAQItemComponent: React.FC<{ item: FAQItem; isOpen: boolean; onClick: () => void; }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 py-6">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-medium text-light-text dark:text-dark-text"
      >
        <span>{item.question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-primary-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const faqItems = t('faq.items') as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-gray-50 dark:bg-dark-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-geist text-light-text dark:text-dark-text">{t('faq.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {t('faq.subtitle')}
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItemComponent
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;