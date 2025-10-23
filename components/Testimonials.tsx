import React, { useRef } from 'react';
import { TESTIMONIALS } from '../constants';
import { useLanguage } from '../hooks/useLanguage';

// Define the shape of a translated testimonial item
interface TranslatedTestimonial {
  quote: string;
  name: string;
  title: string;
}

// Create the TestimonialCard component with a 3D hover effect
const TestimonialCard: React.FC<{
  testimonial: { avatar: string };
  content: TranslatedTestimonial;
}> = ({ testimonial, content }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = -((y - height / 2) / (height / 2)) * 10;
    const rotateY = ((x - width / 2) / (width / 2)) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.boxShadow = `0px 10px 30px -5px rgba(108, 99, 255, 0.2)`;
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
      className="h-full flex flex-col p-8 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="transform-gpu flex-grow flex flex-col">
          <p className="flex-grow text-light-text dark:text-dark-text-secondary before:content-['“'] before:mr-1 before:text-2xl before:text-primary-violet after:content-['”'] after:ml-1 after:text-2xl after:text-primary-violet">
            {content?.quote}
          </p>
          <div className="mt-6 flex items-center">
            <img className="h-12 w-12 rounded-full object-cover" src={testimonial.avatar} alt={content?.name} />
            <div className="ml-4">
              <p className="font-semibold text-light-text dark:text-dark-text">{content?.name}</p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{content?.title}</p>
            </div>
          </div>
      </div>
    </div>
  );
};


const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const testimonialItems = t('testimonials.items') as TranslatedTestimonial[];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-geist text-light-text dark:text-dark-text">{t('testimonials.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            {t('testimonials.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => {
            const content = testimonialItems[index];
            if (!content) return null;
            return (
                <TestimonialCard key={index} testimonial={testimonial} content={content} />
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;