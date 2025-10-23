import React, { useRef } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { useLanguage } from '../hooks/useLanguage';
import type { PortfolioItem } from '../types';

interface TranslatedPortfolioItem {
  title: string;
  category: string;
  tags: string[];
}

const PortfolioCard: React.FC<{ item: PortfolioItem, content: TranslatedPortfolioItem }> = ({ item, content }) => {
  // FIX: Added useLanguage hook to get the translation function 't'.
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = -((y - height / 2) / (height / 2)) * 8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0px 15px 40px -5px rgba(108, 99, 255, 0.2)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.boxShadow = '';
  };

  return (
    <div
      ref={cardRef}
      className="group bg-light-bg dark:bg-dark-card rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-all duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      <div className="relative overflow-hidden">
        <img src={item.image} alt={content.title} className="w-full h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-1/2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <p className="text-sm font-medium text-primary-cyan mb-1">{content.category}</p>
          <h3 className="text-xl font-bold font-geist text-white mb-3">{content.title}</h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
             <div className="flex flex-wrap gap-2 mb-4">
              {content.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-white hover:underline">
              {t('portfolio.viewSite')}
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


const Portfolio: React.FC = () => {
  const { t } = useLanguage();
  const portfolioContent = t('portfolio.items') as TranslatedPortfolioItem[];
  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-gray-50 dark:bg-dark-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-geist text-light-text dark:text-dark-text">{t('portfolio.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {t('portfolio.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_ITEMS.map((item, index) => {
            const content = portfolioContent[index];
            if (!content) return null;
            return (
              <PortfolioCard key={index} item={item} content={content} />
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;