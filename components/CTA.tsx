import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface CTAProps {
  onOrderNowClick: () => void;
}

const CTA: React.FC<CTAProps> = ({ onOrderNowClick }) => {
  const { t } = useLanguage();
  
  const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onOrderNowClick();
  };
  
  return (
    <section id="cta" className="bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="relative overflow-hidden text-center bg-primary-violet text-white p-12 sm:p-16 rounded-2xl shadow-2xl shadow-primary-violet/30">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/10"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-white/10"></div>
           <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-geist">{t('cta.title')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
                    {t('cta.subtitle')}
                </p>
                <div className="mt-10">
                    <a
                        href="#"
                        onClick={handleOrderClick}
                        className="inline-block px-10 py-4 text-lg font-semibold bg-white text-primary-violet rounded-lg shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
                    >
                        {t('cta.button')}
                    </a>
                </div>
                <p className="mt-6 text-sm text-gray-300">{t('cta.referral')}</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;