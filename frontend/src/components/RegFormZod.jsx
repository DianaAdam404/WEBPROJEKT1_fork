import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import './RegisterForm.css';

// 1. Zod validációs séma definiálása
const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'A felhasználónév megadása kötelező.')
    .min(3, 'Legalább 3 karakter hosszúnak kell lennie.'),
  email: z
    .string()
    .min(1, 'Az email cím megadása kötelező.')
    .email('Érvénytelen email formátum.'),
  password: z
    .string()
    .min(1, 'A jelszó megadása kötelező.')
    .min(6, 'A jelszónak legalább 6 karakternek kell lennie.'),
  confirmPassword: z
    .string()
    .min(1, 'A jelszó megerősítése kötelező.')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'A jelszavak nem egyeznek.',
  path: ['confirmPassword'], // Hova kössük a hibát
});

const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');

  // 2. React Hook Form inicializálása a Zod resolverrel
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  // 3. Form beküldése
  const onSubmit = async (data) => {
    setSuccessMessage('');
    setServerError('');

    try {
      // Axios kérés indítása (a confirmPassword-öt nem küldjük el a backendnek)
      const response = await axios.post('https://api.pelda.hu/api/register', {
        username: data.username,
        email: data.email,
        password: data.password
      });

      setSuccessMessage('Sikeres regisztráció! Kérjük, jelentkezz be.');
      reset(); // Mezők ürítése
    } catch (error) {
      if (error.response && error.response.data) {
        setServerError(error.response.data.message || 'Hiba történt a regisztráció során.');
      } else {
        setServerError('Nem sikerült kapcsolódni a szerverhez.');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Regisztráció (React Hook Form + Zod)</h2>

      {successMessage && <div className="alert success">{successMessage}</div>}
      {serverError && <div className="alert error">{serverError}</div>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Felhasználónév mező */}
        <div className="form-group">
          <label>Felhasználónév</label>
          <input
            type="text"
            {...register('username')}
            className={errors.username ? 'error-input' : ''}
          />
          {errors.username && <span className="error-text">{errors.username.message}</span>}
        </div>

        {/* Email mező */}
        <div className="form-group">
          <label>Email cím</label>
          <input
            type="email"
            {...register('email')}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </div>

        {/* Jelszó mező */}
        <div className="form-group">
          <label>Jelszó</label>
          <input
            type="password"
            {...register('password')}
            className={errors.password ? 'error-input' : ''}
          />
          {errors.password && <span className="error-text">{errors.password.message}</span>}
        </div>

        {/* Jelszó megerősítése mező */}
        <div className="form-group">
          <label>Jelszó megerősítése</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'error-input' : ''}
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
        </div>

        {/* Submit gomb */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Regisztráció folyamatban...' : 'Regisztráció'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;