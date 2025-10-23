import React from 'react';

// This offset should be slightly more than the sticky header's height to provide some padding.
// Header height is h-16 (4rem = 64px). 80px (5rem) is a good offset.
const HEADER_OFFSET = 80;

export const useSmoothScroll = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href || href === '#') return;

    // Special case for scrolling to the top
    if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return { handleLinkClick };
};
