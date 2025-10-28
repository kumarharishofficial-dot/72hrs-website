import React from 'react';
import type { NavLink, Feature, PricingPlan, Language, PortfolioItem, HowItWorksStep, Testimonial } from './types';

// Using HeroIcons for demonstration (inline SVG)
// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const LightningBoltIcon = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-primary-violet", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" })
    )
);
// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const GlobeAltIcon = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-primary-violet", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" })
    )
);
// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const SparklesIcon = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-primary-violet", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" })
    )
);
// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const SearchCircleIcon = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-primary-violet", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
    )
);
// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const ChatAlt2Icon = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-primary-violet", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m6-1a1 1 0 00-1-1H5a2 2 0 00-2 2v10a2 2 0 002 2h10l3 3V11a2 2 0 00-2-2z" })
    )
);
// FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
const ShieldCheckIcon = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-primary-violet", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" })
    )
);

export const NAV_LINKS: NavLink[] = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
];

export const FEATURES: Feature[] = [
    { icon: LightningBoltIcon() },
    { icon: SparklesIcon() },
    { icon: SearchCircleIcon() },
    { icon: GlobeAltIcon() },
    { icon: ChatAlt2Icon() },
    { icon: ShieldCheckIcon() }
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
    { step: '01' },
    { step: '02' },
    { step: '03' },
];

export const PRICING_PLAN: PricingPlan = {
    price: '₹ 1,999',
    priceUSD: '~ $24 USD',
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
    liveUrl: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=1470&auto=format&fit=crop',
    liveUrl: '#',
  },
  {
    image: 'https://5.imimg.com/data5/MH/FQ/OV/SELLER-52007146/personal-portfolio-website.jpg',
    liveUrl: '#',
  }
];

export const TESTIMONIALS: Testimonial[] = [
    { avatar: 'https://picsum.photos/id/1005/100/100' },
    { avatar: 'https://picsum.photos/id/1011/100/100' },
    { avatar: 'https://picsum.photos/id/1025/100/100' },
];

export const LANGUAGES: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'te', name: 'తెలుగు' },
];

export const TRUSTED_BY_LOGOS = ['DELL', 'Zendesk', 'Rippling', 'JR. Havas', 'Lattice', 'TED'];
