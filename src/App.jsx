import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importa los assets (imágenes)
import logoImage from './assets/images/vr3dlogo.png'; // ¡LOGO CORREGIDO: vr3dlogo.png!
import mailIcon from './assets/images/mailvr3d.png'; // Asegúrate de tener esta imagen
// ELIMINADO: Ya no se importa phoneIcon, ya que numerovr3d.png es eliminado del footer.

// Importa los hooks
import useScrollToSection from './hooks/useScrollToSection.js';
import useMediaQuery from './hooks/useMediaQuery.js'; 

// Importa los componentes de página (secciones)
import HeroSection from './sections/HeroSection.jsx';
import AboutSection from './sections/AboutSection.jsx';
import ServicesSection from './sections/ServicesSection.jsx';
import ContactSection from './sections/ContactSection.jsx'; // Solo las secciones que se quedan

// --- Nuevo Componente Button (INTEGRADO EN App.jsx) ---
const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variant} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Componente AppHeader (Agrupado Header/Nav) ---
const AppHeader = () => {
  const scrollToSection = useScrollToSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuContainer = document.querySelector('.main-nav');
      const hamburgerToggle = document.querySelector('.hamburger-menu-toggle');
      
      if (menuOpen && menuContainer && hamburgerToggle && 
          !menuContainer.contains(event.target) && 
          !hamburgerToggle.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Ajustar scroll-padding-top basado en la altura del header
  useEffect(() => {
    const updateScrollPadding = () => {
      if (headerRef.current) {
        document.documentElement.style.scrollPaddingTop = `${headerRef.current.offsetHeight + 20}px`;
      }
    };
    updateScrollPadding();
    window.addEventListener('resize', updateScrollPadding);
    return () => window.removeEventListener('resize', updateScrollPadding);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="header-content">
        <div className="logo-container">
          <img src={logoImage} alt="VR3D Landing Logo" className="logo" />
        </div>

        <nav className={`main-nav ${menuOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#hero" onClick={() => { scrollToSection('hero'); setMenuOpen(false); }}>Inicio</a>
            </li>
            <li className="nav-item">
              <a href="#about" onClick={() => { scrollToSection('about'); setMenuOpen(false); }}>Quiénes Somos</a>
            </li>
            <li className="nav-item">
              <a href="#services" onClick={() => { scrollToSection('services'); setMenuOpen(false); }}>Servicios</a>
            </li>
            <li className="nav-item">
              <a href="#contact" onClick={() => { scrollToSection('contact'); setMenuOpen(false); }}>Contacto</a>
            </li>
          </ul>
        </nav>

        <div className="header-right-controls">
          {/* LanguageSwitcher eliminado */}
          <button className={`hamburger-menu-toggle ${menuOpen ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleMenu(); }} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

// --- Componente AppFooter (Agrupado Footer) ---
const AppFooter = () => {
  const emailAddress = "info.VR3D@gmail.com";
  // ELIMINADO: whatsappNumber y su uso

  return (
    <footer id="site-footer" className="footer">
      <div className="footer-contact-group">
        <p className="footer-contact"> {/* NO HAY <a> para que no haya link, es solo texto */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 193">
            <path fill="#4285f4" d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"/>
            <path fill="#34a853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"/>
            <path fill="#ea4335" d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"/>
            <path fill="#fbbc04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"/>
            <path fill="#c5221f" d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"/>
          </svg>
          <img src={mailIcon} width="200" height="20" alt="Correo" className="footer-icon-image" />
        </p>
      </div>

      <div className="footer-contact-group">
        {/* ELIMINADO: Bloque completo de WhatsApp (SVG, imagen, CopyButton) */}
        {/* Asegúrate que solo quede un footer-contact-group para que el texto copyright quede centrado */}
      </div>

      <p className="copy-right">&copy; {new Date().getFullYear()} VR3D. Todos los derechos reservados.</p>
    </footer>
  );
};

// --- Componente Principal App (Define AppContent y lo envuelve en Router) ---
const AppContent = () => {
  const scrollToSection = useScrollToSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuContainer = document.querySelector('.main-nav');
      const hamburgerToggle = document.querySelector('.hamburger-menu-toggle');
      
      if (menuOpen && menuContainer && hamburgerToggle && 
          !menuContainer.contains(event.target) && 
          !hamburgerToggle.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Ajustar scroll-padding-top basado en la altura del header
  useEffect(() => {
    const updateScrollPadding = () => {
      if (headerRef.current) {
        document.documentElement.style.scrollPaddingTop = `${headerRef.current.offsetHeight + 20}px`;
      }
    };
    updateScrollPadding();
    window.addEventListener('resize', updateScrollPadding);
    return () => window.removeEventListener('resize', updateScrollPadding);
  }, []);

  return (
    <Router>
      <div className="landing-page-container">
        <AppHeader />
        <main>
          <HeroSection id="hero" />
          <AboutSection id="about" />
          <ServicesSection id="services" />
          {/* ProductsSection y TrainingsSection eliminados */}
          <ContactSection id="contact" />
        </main>
        <AppFooter />
        {/* AppFloatingButtons eliminado */}
      </div>
    </Router>
  );
};

// --- Componente Principal App (Exportado) ---
function App() {
  return <AppContent />;
}

export default App;