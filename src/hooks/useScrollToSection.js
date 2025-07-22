// src/hooks/useScrollToSection.js
import { useCallback } from 'react';

const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      // Ajustar el scroll para que el header fijo no tape el inicio de la sección
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      if (headerHeight > 0) {
        window.scrollBy(0, -headerHeight - 20); // -20px de margen extra
      }
    }
  }, []);

  return scrollToSection;
};

export default useScrollToSection;