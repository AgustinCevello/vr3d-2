// src/sections/ProjectsSection.jsx

import React from 'react';
import Slider from 'react-slick'; // Importamos el componente Slider

// Importamos los CSS necesarios para react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import './ProjectsSection.css'; // Tu archivo de estilos (lo modificaremos después)

// Importamos las imágenes de los proyectos
import barbottoImg from '../assets/images/Barbotto_A.png';
import colomboImg from '../assets/images/Colombo.png';
import gutierrezImg from '../assets/images/Gutierrez.png';
import trafoImg from '../assets/images/Trafo_MT.png';

// Creamos un array con la información de los proyectos para mantener el código limpio
const projectsData = [
  {
    image: barbottoImg,
    location: 'Edificio Barbotto, Buenos Aires, Argentina.',
    description: 'Cálculo de la estructura de hormigón armado y sus fundaciones.',
    details: '10 niveles.'
  },
  {
    image: colomboImg,
    location: 'Edificio Colombo, Buenos Aires, Argentina.',
    description: 'Cálculo de la estructura de hormigón armado y sus fundaciones.',
    details: '3 niveles.'
  },
  {
    image: gutierrezImg,
    location: 'Edificio Gutierrez, Buenos Aires, Argentina.',
    description: 'Cálculo de la estructura de hormigón armado y sus fundaciones.',
    details: '4 niveles.'
  },
  {
    image: trafoImg,
    location: 'Base para transformador de media tensión, Buenos Aires, Argentina.',
    description: 'Cálculo estructural, cómputo métrico, planos de encofrados y armaduras, planillas de doblado de hierros.',
    details: '' // Este no tiene "niveles", así que lo dejamos vacío
  }
];

const ProjectsSection = ({ id }) => {
  // Configuración para el carrusel
  const settings = {
    dots: true,           // Muestra los puntos de navegación
    infinite: true,       // El carrusel es infinito (vuelve al principio)
    speed: 500,           // Velocidad de la transición en ms
    slidesToShow: 1,      // Muestra un slide a la vez
    slidesToScroll: 1,    // Pasa un slide a la vez
    autoplay: true,         // Se reproduce automáticamente
    autoplaySpeed: 3000,    // Cambia de slide cada 3 segundos
    arrows: true,         // Muestra las flechas de navegación
    className: 'projects-carousel' // Clase CSS para personalizar el slider
  };

  return (
    <section id={id} className="projects-section">
      <div className="section-content">
        <h2>Proyectos Realizados</h2>
        
        {/* En lugar del grid, usamos el componente Slider */}
        <div className="carousel-container">
          <Slider {...settings}>
            {/* Hacemos un map del array de proyectos para crear cada slide */}
            {projectsData.map((project, index) => (
              <div key={index} className="project-slide">
                <div className="project-card-carousel">
                  <img src={project.image} alt={`Proyecto ${project.title}`} className="project-image" />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p className="project-location"><strong>{project.location}</strong></p>
                    <p>{project.description}</p>
                    {project.details && <p>{project.details}</p>}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;