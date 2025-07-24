// src/sections/ServicesSection.jsx
import React from 'react';
import './ServicesSection.css'; // Estilos específicos para esta sección

const ServicesSection = ({ id }) => {
  const servicesList = [
    "Proyectos",
    "Planos",
    "Cálculos estructurales",
    "Dirección de obras",
    "Elaboración de ingeniería básica e ingeniería de detalle",
    "Proyecto y ejecución de instalaciones solares fotovoltaicas industriales"
  ];

  return (
    <section id={id} className="services-section">
      <div className="section-content">
        <h2>Nuestros Servicios</h2>
        <ul className="services-list"> {/* Usamos una clase para estilizar la lista */}
          {servicesList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServicesSection;