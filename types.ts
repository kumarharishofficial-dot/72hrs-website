import React from 'react';

export interface NavLink {
  name: string;
  href: string;
}

export interface Feature {
  icon: React.ReactNode;
}

export interface PricingPlan {
  price: string;
  priceUSD: string;
}

export interface Testimonial {
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface PortfolioItem {
  image: string;
  liveUrl: string;
}

export interface HowItWorksStep {
  step: string;
}