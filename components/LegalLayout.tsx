import React, { ReactNode } from 'react';
import Footer from './Footer';
import { useLanguage } from '../hooks/useLanguage';
import { useRouter } from '../hooks/useRouter';

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ children, title }) => {
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
  };

  const LegalHeader: React.FC = () => {
    return (
      <header className="sticky top-0 z-50 w-full bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/" onClick={handleNav} className="group text-2xl font-bold font-geist text-light-text dark:text-dark-text">
                72hrs
                <span className="text-primary-violet inline-block transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-[15deg]">.</span>
                live
              </a>
            </div>
            <a href="/" onClick={handleNav} className="px-4 py-2 text-sm font-medium text-white bg-primary-violet rounded-md hover:bg-opacity-90 transition-colors">
              {t('header.backToHome')}
            </a>
          </div>
        </div>
      </header>
    );
  };
  
  return (
    <div className="bg-light-bg dark:bg-dark-bg font-sans text-light-text dark:text-dark-text transition-colors duration-300 min-h-screen flex flex-col">
      <LegalHeader />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold font-geist text-light-text dark:text-dark-text mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">{title}</h1>
            <div className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed space-y-6">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalLayout;
