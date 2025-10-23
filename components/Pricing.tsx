import React from 'react';
import { PRICING_PLAN } from '../constants';
import { useLanguage } from '../hooks/useLanguage';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-violet" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

interface PricingProps {
  onOrderNowClick: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onOrderNowClick }) => {
  const { t } = useLanguage();
  const planFeatures = t('pricing.plan.features') as string[];
  
  const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onOrderNowClick();
  };
  
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-gray-50 dark:bg-dark-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-geist text-light-text dark:text-dark-text">{t('pricing.title')}</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
                {t('pricing.subtitle')}
            </p>
        </div>
        <div className="max-w-md mx-auto">
            <div className="bg-light-bg dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-primary-violet/10 p-8 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold font-geist text-light-text dark:text-dark-text">{t('pricing.plan.name')}</h3>
                <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">{t('pricing.plan.description')}</p>
                <div className="mt-6">
                    <span className="text-5xl font-bold font-geist text-light-text dark:text-dark-text">{PRICING_PLAN.price}</span>
                    <span className="ml-2 text-lg text-light-text-secondary dark:text-dark-text-secondary">{PRICING_PLAN.priceUSD}</span>
                </div>
                <ul className="mt-8 space-y-4">
                    {planFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <CheckIcon />
                            <span className="ml-3 text-light-text dark:text-dark-text">{feature}</span>
                        </li>
                    ))}
                </ul>
                <a 
                    href="#" 
                    onClick={handleOrderClick}
                    className="mt-10 block w-full text-center px-6 py-3 text-lg font-semibold text-white bg-primary-violet rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300"
                >
                    {t('pricing.plan.cta')}
                </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;