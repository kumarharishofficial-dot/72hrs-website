import React, { useRef } from 'react';
import { FEATURES } from '../constants';
import { useLanguage } from '../hooks/useLanguage';

// A self-contained component for the feature card with a 3D hover effect.
const FeatureCard: React.FC<{
  feature: { icon: React.ReactNode };
  item: { title: string; description: string };
}> = ({ feature, item }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate rotation values for the 3D effect.
    const rotateX = -((y - height / 2) / (height / 2)) * 15;
    const rotateY = ((x - width / 2) / (width / 2)) * 15;

    // Apply the 3D transform and a matching glow effect.
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.boxShadow = `0px 10px 30px -5px rgba(108, 99, 255, 0.3)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    // Reset transform and shadow smoothly back to their initial state defined by CSS classes.
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.boxShadow = ''; // Reverts to the 'shadow-sm' from the className.
  };

  return (
    <div
      ref={cardRef}
      className="group p-8 bg-light-card dark:bg-dark-card rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-primary-violet/50 dark:hover:border-primary-violet/50 transition-all duration-200 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {/* Elevate the content within the card for a better 3D depth effect */}
      <div style={{ transform: 'translateZ(40px)' }} className="transform-gpu">
        <div className="mb-4">{feature.icon}</div>
        <h3 className="text-xl font-bold font-geist text-light-text dark:text-dark-text mb-2">{item?.title}</h3>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">{item?.description}</p>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const { t } = useLanguage();
  const featureItems = t('features.items') as { title: string; description: string }[];

  return (
    <section id="features" className="py-20 sm:py-28 bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-geist text-light-text dark:text-dark-text">{t('features.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {t('features.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const item = featureItems[index];
            if (!item) return null;
            return <FeatureCard key={index} feature={feature} item={item} />
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;