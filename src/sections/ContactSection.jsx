// src/sections/ContactSection.jsx

import React, { useState } from 'react';
import './ContactSection.css';

// Importar las imágenes de los logos
import logoAyr from '../assets/images/logoayr.jpg';
import logoLeses from '../assets/images/logoleses.png';
import logoUtn from '../assets/images/logoutn.jpg';
import logoAutomacer from '../assets/images/LogoAutomacer.png';
import mailIcon from '../assets/images/mailvr3d.png';

const ContactSection = ({ id }) => {
  const MAX_CHAR_REASON = 500; // Límite de caracteres para el motivo

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
  });

  const [reasonCharCount, setReasonCharCount] = useState(0); // Estado para el contador de caracteres

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    if (name === 'name') {
      filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'email') {
      filteredValue = value.replace(/[^a-zA-Z0-9@._%+-]/g, '');
    } else if (name === 'phone') {
      filteredValue = value.replace(/[^0-9+]/g, '');
    }

    if (name === 'reason') {
      setReasonCharCount(filteredValue.length);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: filteredValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateField = (name, value) => {
    let error = '';
    const translations = { // Hardcode translations for validation messages as no LanguageContext
      es: {
        formErrorName: "Por favor ingresa tu nombre",
        formNameCharLimit: "El nombre no puede superar los 50 caracteres.",
        formNameInvalidChars: "El nombre solo puede contener letras y espacios.",
        formErrorEmail: "Por favor ingresa un email válido",
        formErrorPhone: "El número no puede superar los 17 caracteres.",
        formPhoneInvalidChars: "El celular solo puede contener números y el signo '+'.",
        formErrorReason: "El motivo no puede superar los 500 caracteres.",
        formSubmissionSuccess: "¡Formulario enviado con éxito!",
        formSubmissionError: "Por favor corrige los errores en el formulario."
      }
    };
    const t = (key) => translations.es[key] || key;

    if (name === 'name') {
      if (!value.trim()) {
        error = t('formErrorName');
      } else if (value.length > 50) {
        error = t('formNameCharLimit');
      } else if (!/^[a-zA-Z\s]*$/.test(value)) {
        error = t('formNameInvalidChars');
      }
    } else if (name === 'email') {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value.trim()) {
        error = t('formErrorEmail');
      } else if (!regex.test(value)) {
        error = t('formErrorEmail');
      }
    } else if (name === 'phone') {
      if (value.length > 0 && value.length > 17) {
        error = t('formErrorPhone');
      } else if (value.length > 0 && !/^[0-9+]*$/.test(value)) {
        error = t('formPhoneInvalidChars');
      }
    } else if (name === 'reason') {
      if (value.length > MAX_CHAR_REASON) {
        error = t('formErrorReason');
      }
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    const translations = {
      es: {
        formErrorName: "Por favor ingresa tu nombre",
        formErrorEmail: "Por favor ingresa un email válido",
        formErrorPhone: "El número no puede superar los 17 caracteres.",
        formErrorReason: "El motivo no puede superar los 500 caracteres.",
        formSubmissionSuccess: "¡Formulario enviado con éxito!",
        formSubmissionError: "Por favor corrige los errores en el formulario."
      }
    };
    const t = (key) => translations.es[key] || key;

    if (!formData.name.trim()) {
      newErrors.name = t('formErrorName');
      isValid = false;
    } else if (formData.name.length > 50) {
      newErrors.name = t('formNameCharLimit');
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
      newErrors.name = t('formNameInvalidChars');
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = t('formErrorEmail');
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('formErrorEmail');
      isValid = false;
    }

    if (formData.phone.length > 0) {
        if (formData.phone.length > 17) {
            newErrors.phone = t('formErrorPhone');
            isValid = false;
        } else if (!/^[0-9+]*$/.test(formData.phone)) {
            newErrors.phone = t('formPhoneInvalidChars');
            isValid = false;
        }
    }

    if (formData.reason.length > MAX_CHAR_REASON) {
      newErrors.reason = t('formErrorReason');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulario enviado:', formData);
      alert('¡Formulario enviado con éxito!');
      setFormData({
        name: '', email: '', phone: '', reason: '',
      });
      setErrors({
        name: '', email: '', phone: '', reason: '',
      });
    } else {
      console.log('Errores en el formulario:', errors);
      alert('Por favor corrige los errores en el formulario.');
    }
  };

  return (
    <section id={id} className="contact-section">
      <div className="section-content">
        <h2>Contacto</h2>
        
        {/* Inicio del bloque de correo agregado */}
        <div className="contact-info">
          <a href="mailto:info.VR3D@gmail.com" className="email-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 193">
              <path fill="#4285f4" d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"/>
              <path fill="#34a853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"/>
              <path fill="#ea4335" d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"/>
              <path fill="#fbbc04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"/>
              <path fill="#c5221f" d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"/>
            </svg>
            <img src={mailIcon} alt="Correo" className="footer-icon-image" />
          </a>
        </div>
        {/* Fin del bloque de correo agregado */}

        {/* Sección de logos */}
        <div className="trusted-section">
          <h2>Confían en nosotros</h2>
          <div className="logos-container">
            <div className="logo-item">
              <img src={logoAyr} alt="Logo AYR" className="trust-logo" />
            </div>
            <div className="logo-item">
              <img src={logoLeses} alt="Logo LESES" className="trust-logo" />
            </div>
            <div className="logo-item">
              <img src={logoUtn} alt="Logo UTN" className="trust-logo" />
            </div>
            <div className="logo-item">
              <img src={logoAutomacer} alt="Logo AUTOMACER" className="trust-logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;