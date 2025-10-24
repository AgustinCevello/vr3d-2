"use client"

// src/sections/ProjectsSection.jsx

import { useState, useEffect, useRef } from "react"
import "./ProjectsSection.css"

// Importamos las imágenes MINI (para el carrusel)
import barbottoMini from "../assets/images/Barbotto_mini.png"
import colomboMini from "../assets/images/Colombo_mini.png"
import gutierrezMini from "../assets/images/Gutierrez_mini.png"
import trafoMini from "../assets/images/Trafo_mini.png"

// Importamos las imágenes FULL (para el modal ampliado)
import barbottoFull from "../assets/images/Barbotto_Full.png"
import colomboFull from "../assets/images/Colombo_Full.png"
import gutierrezFull from "../assets/images/Gutierrez_Full.png"
import trafoFull from "../assets/images/Trafo_Full.png"

// Importamos la lupa
import lupaImg from "../assets/images/Lupa.png"

const projectsData = [
  {
    imageMini: barbottoMini,
    imageFull: barbottoFull,
    location: "Edificio Barbotto, Buenos Aires, Argentina.",
    description: "Cálculo de la estructura de hormigón armado y sus fundaciones.",
    details: "10 niveles.",
    title: "Edificio Barbotto",
  },
  {
    imageMini: colomboMini,
    imageFull: colomboFull,
    location: "Edificio Colombo, Buenos Aires, Argentina.",
    description: "Cálculo de la estructura de hormigón armado y sus fundaciones.",
    details: "3 niveles.",
    title: "Edificio Colombo",
  },
  {
    imageMini: gutierrezMini,
    imageFull: gutierrezFull,
    location: "Edificio Gutierrez, Buenos Aires, Argentina.",
    description: "Cálculo de la estructura de hormigón armado y sus fundaciones.",
    details: "4 niveles.",
    title: "Edificio Gutierrez",
  },
  {
    imageMini: trafoMini,
    imageFull: trafoFull,
    location: "Base para transformador de media tensión, Buenos Aires, Argentina.",
    locationMobile: {
      line1: "Base para transformador de media tensión,",
      line2: "Buenos Aires, Argentina.",
    },
    description: "Cálculo estructural, planos de encofrados y armaduras.",
    descriptionMobile: {
      line1: "Cálculo estructural, planos",
      line2: "de encofrados y armaduras.",
    },
    details: "",
    title: "Base Transformador",
  },
]

const ProjectsSection = ({ id }) => {
  const [modalImage, setModalImage] = useState(null)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)

  const carouselRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft
      const itemWidth = carouselRef.current.querySelector(".project-slide")?.offsetWidth || 0
      if (itemWidth > 0) {
        const newIndex = Math.round(scrollLeft / itemWidth)
        setActiveIndex(newIndex)
      }
    }
  }

  const scrollToSlide = (index) => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.querySelector(".project-slide")?.offsetWidth || 0
      if (itemWidth > 0) {
        carouselRef.current.scrollTo({
          left: index * itemWidth,
          behavior: "smooth",
        })
      }
    }
  }

  const goToPrevious = () => {
    const newIndex = Math.max(0, activeIndex - 1)
    scrollToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = Math.min(projectsData.length - 1, activeIndex + 1)
    scrollToSlide(newIndex)
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll)
      handleScroll()
      return () => carousel.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const openModal = (image) => {
    setModalImage(image)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalImage(null)
    setIsZooming(false)
    document.body.style.overflow = "unset"
  }

  const handleMouseMove = (e) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setZoomPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsZooming(true)
  }

  const handleMouseLeave = () => {
    setIsZooming(false)
  }

  const formatDescription = (project) => {
    if (project.descriptionMobile) {
      return {
        firstLine: project.descriptionMobile.line1,
        secondLine: project.descriptionMobile.line2,
      }
    }

    const words = project.description.split(" ")
    const midPoint = Math.ceil(words.length / 2)
    const firstLine = words.slice(0, midPoint).join(" ")
    const secondLine = words.slice(midPoint).join(" ")

    return { firstLine, secondLine }
  }

  const formatLocation = (project) => {
    if (project.locationMobile) {
      return {
        firstLine: project.locationMobile.line1,
        secondLine: project.locationMobile.line2,
      }
    }

    return {
      firstLine: project.location,
      secondLine: null,
    }
  }

  useEffect(() => {
    if (!modalImage) return

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }

    const handleHeaderClick = (e) => {
      const header = document.querySelector(".header")
      const mainNav = document.querySelector(".main-nav")
      const navItems = document.querySelectorAll(".nav-item a")

      if (
        (header && header.contains(e.target)) ||
        (mainNav && mainNav.contains(e.target)) ||
        Array.from(navItems).some((link) => link.contains(e.target))
      ) {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleEsc)
    document.addEventListener("click", handleHeaderClick, true)

    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.removeEventListener("click", handleHeaderClick, true)
      document.body.style.overflow = "unset"
    }
  }, [modalImage])

  return (
    <section id={id} className="projects-section">
      <div className="section-content">
        <h2>Proyectos Realizados</h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-nav-button prev"
            onClick={goToPrevious}
            disabled={activeIndex === 0}
            aria-label="Proyecto anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="carousel-container" ref={carouselRef}>
            {projectsData.map((project, index) => {
              const { firstLine, secondLine } = formatDescription(project)
              const locationFormatted = formatLocation(project)

              return (
                <div key={index} className="project-slide">
                  <div className="project-card-carousel">
                    <div
                      className="project-image-wrapper"
                      onClick={() => openModal(project.imageFull)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          openModal(project.imageFull)
                        }
                      }}
                      aria-label={`Ampliar imagen del proyecto ${project.title}`}
                    >
                      <img
                        src={project.imageMini || "/placeholder.svg"}
                        alt={`Proyecto ${project.location}`}
                        className="project-image"
                      />
                      <div className="image-overlay">
                        <img src={lupaImg || "/placeholder.svg"} alt="Ampliar" className="zoom-icon" />
                        <span className="zoom-text">Click para ampliar</span>
                      </div>
                    </div>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p className="project-location">
                        <strong className="location-full">{project.location}</strong>
                        <strong className="location-mobile">
                          {locationFormatted.firstLine}
                          {locationFormatted.secondLine && (
                            <>
                              <br />
                              {locationFormatted.secondLine}
                            </>
                          )}
                        </strong>
                      </p>
                      <p className="project-description">
                        <span className="description-full">{project.description}</span>
                        <span className="description-mobile">
                          {firstLine}
                          <br />
                          {secondLine}
                        </span>
                      </p>
                      {project.details && <p>{project.details}</p>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            className="carousel-nav-button next"
            onClick={goToNext}
            disabled={activeIndex === projectsData.length - 1}
            aria-label="Proyecto siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="slick-dots-container">
          <ul>
            {projectsData.map((_, index) => (
              <li key={index} className={index === activeIndex ? "slick-active" : ""}>
                <button type="button" onClick={() => scrollToSlide(index)} aria-label={`Ir al proyecto ${index + 1}`}>
                  <span className="sr-only">Proyecto {index + 1}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

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
              onClick={(e) => {
                e.stopPropagation()
                closeModal()
              }}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
            <div
              className={`modal-content ${isZooming ? "zooming" : ""}`}
              onClick={(e) => e.stopPropagation()}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imageRef}
                src={modalImage || "/placeholder.svg"}
                alt="Proyecto ampliado"
                className="modal-image"
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transform: isZooming ? "scale(2)" : "scale(1)",
                  transition: isZooming ? "none" : "transform 0.3s ease",
                }}
              />
            </div>
            <p className="modal-hint">
              {isZooming
                ? "Mueve el cursor para explorar la imagen"
                : "Pasa el cursor sobre la imagen para hacer zoom | Presiona ESC para cerrar"}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
