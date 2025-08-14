// src/sections/ContactSection.jsx
import React, { useState } from 'react';
// ELIMINADO: Ya no se importa Button ni se define localmente.
import './ContactSection.css';

// Ya no hay definición de Button aquí.

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
      alert(t('formSubmissionSuccess'));
      setFormData({
        name: '', email: '', phone: '', reason: '',
      });
      setErrors({
        name: '', email: '', phone: '', reason: '',
      });
    } else {
      console.log('Errores en el formulario:', errors);
      alert(t('formSubmissionError'));
    }
  };

  return (
    <section id={id} className="contact-section">
      <div className="section-content">
        <h2>Contacto</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label required-field">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              required
              placeholder="Tu nombre"
              maxLength="50"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label required-field">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              required
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Celular
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-input ${errors.phone ? 'input-error' : ''}`}
              placeholder="Tu número de contacto"
              maxLength="17"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reason" className="form-label">
              Motivo de su consulta
            </label>
            <textarea
              id="reason"
              name="reason"
              rows="5"
              placeholder="Escribe aquí tu mensaje..."
              maxLength={MAX_CHAR_REASON}
              value={formData.reason}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.reason ? 'input-error' : ''}`}
            ></textarea>
            {errors.reason && <span className="error-message">{errors.reason}</span>}
            <span className="char-counter">{reasonCharCount}/{MAX_CHAR_REASON}</span>
          </div>

          <button type="submit" className="submit-button">
            Enviar
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="send-icon">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;