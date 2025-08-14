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
          <br className="small-gap" />
          Nuestro objetivo es contribuir a la construcción de un futuro sostenible, mediante el uso racional y eficiente de la energía, a través de la construcción sustentable y ejecutando proyectos de generación distribuida de energía eléctrica.
        </p>

      </div>
    </section>
  );
};

export default AboutSection;