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
        <h1>VR3D</h1>
        <h1>Ingeniería</h1>
      </div>
    </section>
  );
};

export default HeroSection;