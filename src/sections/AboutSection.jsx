// src/sections/AboutSection.jsx
import React from 'react';
import './AboutSection.css';
import heroImage from '../assets/images/imginicio.png';

const AboutSection = ({ id }) => {
  return (
    <section id={id} className="about-section">
      <div className="hero-section">
        <div className="hero-background">
          <img src={heroImage} alt="VR3D Ingeniería - Energía Solar" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              VR3D<br />
              <span className="hero-subtitle">INGENIERÍA</span>
            </h1>
          </div>
        </div>
      </div>
      
      {/* Sección de información debajo de la imagen */}
      <div className="about-info">
        <div className="container">
          <h2>Quienes Somos</h2>
          <p className="about-text">
            VR3D es un estudio de ingeniería de Argentina, abocado a la elaboración de proyectos edilicios de arquitectura y obras civiles en general.
            <br className="small-gap" />
            Nuestro objetivo es contribuir a la construcción de un futuro sostenible, mediante el uso racional y eficiente de la energía, a través de la construcción sustentable y desarrollando proyectos de generación distribuida de energía eléctrica.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;