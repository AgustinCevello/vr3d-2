import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importa los assets (imágenes)
import logoImage from './assets/images/LogoVR3D.png';
import mailIcon from './assets/images/mailvr3d.png'; 
// ELIMINADO: Ya no se importa phoneIcon, ya que nume

// Importa los hooks
import useScrollToSection from './hooks/useScrollToSection.js';
import useMediaQuery from './hooks/useMediaQuery.js'; 

// Importa los componentes de página (secciones)
import HeroSection from './sections/HeroSection.jsx';
import AboutSection from './sections/AboutSection.jsx';
import ServicesSection from './sections/ServicesSection.jsx';
import ContactSection from './sections/ContactSection.jsx'; // Solo las secciones que se quedan
import ProjectsSection from './sections/ProjectsSection.jsx';

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
              <a href="#about" onClick={() => { scrollToSection('about'); setMenuOpen(false); }}>Quienes Somos</a>
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
// --- Componente AppFooter (Agrupado Footer) ---
// --- Componente AppFooter (Agrupado Footer) ---
const AppFooter = () => {
  return (
    <footer id="site-footer" className="footer">
      {/* Se eliminó el bloque completo de contacto de correo */}
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
          <ProjectsSection id="projects" /> 
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