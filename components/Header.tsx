import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import GlobeIcon from './icons/GlobeIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import { NAV_LINKS, LANGUAGES } from '../constants';
import { useLanguage } from '../hooks/useLanguage';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language: selectedLanguage, setLanguage, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { handleLinkClick } = useSmoothScroll();

  const handleLanguageSelect = (lang: typeof LANGUAGES[0]) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };
  
  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      handleLinkClick(e);
      setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    // Cleanup function to ensure scroll is restored if component unmounts while menu is open
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);


  return (
    <header className="sticky top-0 z-50 w-full bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#home" onClick={handleMobileLinkClick} className="group text-2xl font-bold font-geist text-light-text dark:text-dark-text">
              72hrs
              <span className="text-primary-violet inline-block transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-[15deg]">.</span>
              live
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={handleLinkClick} 
                className="relative group text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-violet dark:hover:text-primary-violet transition-colors py-2"
              >
                {t(`nav.${link.name.toLowerCase().replace(/\s/g, '')}`)}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-violet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center justify-center p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card"
              >
                <GlobeIcon className="h-5 w-5" />
                <span className="hidden lg:inline ml-2 text-sm font-medium">{selectedLanguage.code.toUpperCase()}</span>
                <ChevronDownIcon className={`hidden lg:inline ml-1 h-4 w-4 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-light-bg dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1">
                  {LANGUAGES.map(lang => (
                    <a
                      key={lang.code}
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleLanguageSelect(lang); }}
                      className="block px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {lang.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button onClick={toggleTheme} className="hidden md:flex items-center justify-center w-9 h-9 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card">
              {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>
            <a href="#pricing" onClick={handleLinkClick} className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-white bg-primary-violet rounded-md hover:bg-opacity-90 transition-colors">
              {t('header.getStarted')}
            </a>
            
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary z-50 relative">
                  {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-screen bg-light-bg dark:bg-dark-bg p-6 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col items-center space-y-8">
            {NAV_LINKS.map(link => (
            <a key={link.name} href={link.href} onClick={handleMobileLinkClick} className="text-2xl font-medium text-light-text dark:text-dark-text hover:text-primary-violet transition-colors">
                {t(`nav.${link.name.toLowerCase().replace(/\s/g, '')}`)}
            </a>
            ))}
        </nav>
        <div className="absolute bottom-8 w-full max-w-xs flex flex-col items-center space-y-4 px-6">
            <div className="flex items-center justify-between w-full p-2 bg-light-card dark:bg-dark-card rounded-md">
                <span className="text-light-text-secondary dark:text-dark-text-secondary font-medium">Theme</span>
                <button onClick={toggleTheme} className="flex items-center justify-center w-9 h-9 rounded-md text-light-text-secondary dark:text-dark-text-secondary bg-gray-200 dark:bg-gray-700">
                    {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                </button>
            </div>
             <div className="flex items-center justify-between w-full p-2 bg-light-card dark:bg-dark-card rounded-md">
                <span className="text-light-text-secondary dark:text-dark-text-secondary font-medium">Language</span>
                <span className="font-medium text-light-text dark:text-dark-text">{selectedLanguage.name}</span>
            </div>
             <a href="#pricing" onClick={handleMobileLinkClick} className="w-full mt-4 text-center px-6 py-3 text-base font-medium text-white bg-primary-violet rounded-md hover:bg-opacity-90 transition-colors">
              {t('header.getStarted')}
            </a>
        </div>
      </div>
    </header>
  );
};

export default Header;