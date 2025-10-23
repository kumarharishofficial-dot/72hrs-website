import React, { useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useRouter } from '../hooks/useRouter';

const TwitterIcon = () => (<svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>);
const GithubIcon = () => (<svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>);
const LinkedInIcon = () => (<svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>);


const Footer: React.FC = () => {
    const { t } = useLanguage();
    const { handleLinkClick: handleSmoothScroll } = useSmoothScroll();
    const { navigate } = useRouter();
    const footerRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(footerRef, { threshold: 0.1, triggerOnce: true });
    
    const linkClasses = "inline-block text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-violet transition-transform duration-200 hover:-translate-y-1";

    const handleLegalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: string) => {
        e.preventDefault();
        navigate(route);
    };

    return (
        <footer ref={footerRef} className="bg-gray-50 dark:bg-dark-card/30 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/');}} className="text-xl font-bold font-geist text-light-text dark:text-dark-text">
                            72hrs<span className="text-primary-violet">.</span>live
                        </a>
                        <p className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            {t('footer.subtitle')}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-light-text dark:text-dark-text">{t('footer.navigate')}</h4>
                        <ul className="mt-4 space-y-2">
                           <li><a href="#about" onClick={handleSmoothScroll} className={linkClasses}>{t('footer.nav.about')}</a></li>
                           <li><a href="#features" onClick={handleSmoothScroll} className={linkClasses}>{t('footer.nav.features')}</a></li>
                           <li><a href="#how-it-works" onClick={handleSmoothScroll} className={linkClasses}>{t('footer.nav.howItWorks')}</a></li>
                           <li><a href="#pricing" onClick={handleSmoothScroll} className={linkClasses}>{t('footer.nav.pricing')}</a></li>
                           <li><a href="#portfolio" onClick={handleSmoothScroll} className={linkClasses}>{t('footer.nav.portfolio')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-light-text dark:text-dark-text">{t('footer.resources')}</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#testimonials" onClick={handleSmoothScroll} className={linkClasses}>{t('footer.nav.testimonials')}</a></li>
                            <li><a href="#cta" onClick={handleSmoothScroll} className={linkClasses}>{t('footer.nav.referral')}</a></li>
                            <li><a href="#faq" onClick={handleSmoothScroll} className={linkClasses}>{t('footer.nav.faq')}</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-light-text dark:text-dark-text">{t('footer.support')}</h4>
                        <ul className="mt-4 space-y-2">
                           <li><a href="#contact" onClick={handleSmoothScroll} className={linkClasses}>{t('footer.nav.contact')}</a></li>
                           <li><a href="/terms" onClick={(e) => handleLegalLinkClick(e, '/terms')} className={linkClasses}>{t('footer.nav.terms')}</a></li>
                           <li><a href="/privacy" onClick={(e) => handleLegalLinkClick(e, '/privacy')} className={linkClasses}>{t('footer.nav.privacy')}</a></li>
                           <li><a href="/refund" onClick={(e) => handleLegalLinkClick(e, '/refund')} className={linkClasses}>{t('footer.nav.refund')}</a></li>
                           <li><a href="/disclaimer" onClick={(e) => handleLegalLinkClick(e, '/disclaimer')} className={linkClasses}>{t('footer.nav.disclaimer')}</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
                    </p>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="inline-block text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-violet transition-transform duration-200 hover:-translate-y-1"><TwitterIcon /></a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-block text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-violet transition-transform duration-200 hover:-translate-y-1"><GithubIcon /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-block text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-violet transition-transform duration-200 hover:-translate-y-1"><LinkedInIcon /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;