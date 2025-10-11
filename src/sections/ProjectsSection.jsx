// src/sections/ProjectsSection.jsx

import React, { useState } from 'react';
import Slider from 'react-slick';

// Importamos los CSS necesarios para react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import './ProjectsSection.css';

// Importamos las imágenes de los proyectos
import barbottoImg from '../assets/images/Barbotto_A.png';
import colomboImg from '../assets/images/Colombo.png';
import gutierrezImg from '../assets/images/Gutierrez.png';
import trafoImg from '../assets/images/Trafo_MT.png';

const projectsData = [
  {
    image: barbottoImg,
    location: 'Edificio Barbotto, Buenos Aires, Argentina.',
    description: 'Cálculo de la estructura de hormigón armado y sus fundaciones.',
    details: '10 niveles.',
    title: 'Edificio Barbotto'
  },
  {
    image: colomboImg,
    location: 'Edificio Colombo, Buenos Aires, Argentina.',
    description: 'Cálculo de la estructura de hormigón armado y sus fundaciones.',
    details: '3 niveles.',
    title: 'Edificio Colombo'
  },
  {
    image: gutierrezImg,
    location: 'Edificio Gutierrez, Buenos Aires, Argentina.',
    description: 'Cálculo de la estructura de hormigón armado y sus fundaciones.',
    details: '4 niveles.',
    title: 'Edificio Gutierrez'
  },
  {
    image: trafoImg,
    location: 'Base para transformador de media tensión, Buenos Aires, Argentina.',
    description: 'Cálculo estructural, cómputo métrico, planos de encofrados y armaduras, planillas de doblado de hierros.',
    details: '',
    title: 'Base Transformador'
  }
];

const ProjectsSection = ({ id }) => {
  const [modalImage, setModalImage] = useState(null);

  // Configuración para el carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    className: 'projects-carousel',
    adaptiveHeight: true
  };

  const openModal = (image) => {
    setModalImage(image);
    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalImage(null);
    // Restaurar scroll del body
    document.body.style.overflow = 'unset';
  };

  // Cerrar modal al presionar ESC
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && modalImage) {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      // Asegurar restaurar scroll si el componente se desmonta
      document.body.style.overflow = 'unset';
    };
  }, [modalImage]);

  return (
    <section id={id} className="projects-section">
      <div className="section-content">
        <h2>Proyectos Realizados</h2>
        
        <div className="carousel-container">
          <Slider {...settings}>
            {projectsData.map((project, index) => (
              <div key={index} className="project-slide">
                <div className="project-card-carousel">
                  <div 
                    className="project-image-wrapper"
                    onClick={() => openModal(project.image)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        openModal(project.image);
                      }
                    }}
                    aria-label={`Ampliar imagen del proyecto ${project.title}`}
                  >
                    <img 
                      src={project.image} 
                      alt={`Proyecto ${project.location}`} 
                      className="project-image" 
                    />
                    <div className="image-overlay">
                      <span className="zoom-icon">🔍</span>
                      <span className="zoom-text">Click para ampliar</span>
                    </div>
                  </div>
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

        {/* Modal para imagen ampliada */}
        {modalImage && (
          <div 
            className="image-modal" 
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada"
          >
            <button 
              className="modal-close" 
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
            <div 
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={modalImage} 
                alt="Proyecto ampliado"
                className="modal-image"
              />
            </div>
            <p className="modal-hint">Presiona ESC o haz click fuera de la imagen para cerrar.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;