// src/sections/AboutSection.jsx
import React from 'react';
import './AboutSection.css';

const AboutSection = ({ id }) => {
  return (
    <section id={id} className="about-section">
      <div className="section-content">
        <h2>Quiénes Somos</h2>
        <p className="about-text">
          VR3D es un estudio de ingeniería de Argentina, abocado a la elaboración de proyectos edilicios de arquitectura y obras civiles en general.
        </p>
        <p className="about-text">
          Nuestro objetivo es contribuir a las mejoras individuales y colectivas en el uso racional y eficiente de la energía, ya sea a través de la construcción sustentable, de la generación distribuida de energía eléctrica o del aprovechamiento de la energía solar para calefacción y/o producción de agua caliente sanitaria.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;