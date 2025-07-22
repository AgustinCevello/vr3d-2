// src/sections/HeroSection.jsx
import React from 'react';
// ELIMINADO: Ya no se importa Button ni se define localmente.
import useScrollToSection from '../hooks/useScrollToSection.js';
import './HeroSection.css';

// Ya no hay definición de Button aquí, ya que se asume que App.jsx lo renderiza y es accesible.

const HeroSection = ({ id }) => {
  const scrollToSection = useScrollToSection();

  return (
    <section id={id} className="hero-section">
      <div className="hero-content">
        <h1>Soluciones de Energía Renovables para un Futuro Sostenible</h1>
        <p>Diseñamos e implementamos sistemas innovadores para el hogar y la industria</p>
      </div>
    </section>
  );
};

export default HeroSection;