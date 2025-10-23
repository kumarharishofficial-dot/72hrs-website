import React, { useRef } from 'react';
import { HOW_IT_WORKS_STEPS } from '../constants';
import { useLanguage } from '../hooks/useLanguage';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const StepCard: React.FC<{
  step: { step: string };
  content: { title: string; description: string };
  delay: string;
}> = ({ step, content, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={cardRef}
      className={`text-center z-10 p-6 bg-light-bg dark:bg-dark-bg rounded-lg transform transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${delay}`}
    >
      <div className="flex items-center justify-center mx-auto w-20 h-20 mb-6 bg-light-card dark:bg-dark-card border-2 border-primary-violet/50 rounded-full shadow-lg">
        <span className="text-3xl font-bold font-geist text-primary-violet">{step.step}</span>
      </div>
      <h3 className="text-xl font-bold font-geist text-light-text dark:text-dark-text mb-2">{content?.title}</h3>
      <p className="text-light-text-secondary dark:text-dark-text-secondary">{content?.description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();
  const stepContent = t('howitworks.steps') as { title: string; description: string }[];
  const delays = ['md:delay-100', 'md:delay-200', 'md:delay-300'];
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-gray-50 dark:bg-dark-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-geist text-light-text dark:text-dark-text">{t('howitworks.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {t('howitworks.subtitle')}
          </p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-10 left-0 w-full h-px bg-transparent">
             <div className="absolute top-0 left-0 w-full h-full" style={{
                background: 'repeating-linear-gradient(to right, #6c63ff, #6c63ff 2px, transparent 2px, transparent 10px)',
                opacity: 0.3,
             }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
                if(!stepContent[index]) return null;
                return (
                    <StepCard 
                        key={index}
                        step={step}
                        content={stepContent[index]}
                        delay={delays[index]}
                    />
                )
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
