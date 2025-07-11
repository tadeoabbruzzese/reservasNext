# 🧾 Simulador de Reservas - Next.js

Este es un pequeño proyecto de práctica creado con **Next.js**, **Tailwind CSS**, **React Hook Form** y **Framer Motion**, que simula un sistema de reservas para un restaurante.

## 💡 Funcionalidad

- Formulario interactivo para agendar reservas.
- Validación de campos (nombre, email, número de personas, fecha y hora).
- Validación de horarios permitidos (solo entre 11:00 y 13:00, y entre 14:00 y 21:00).
- Listado de reservas confirmadas con animaciones suaves.
- Estilo visual moderno y elegante (fondo con blur y Tailwind).

## 🚀 Tecnologías usadas

- [Next.js](https://nextjs.org/) — Framework para React.
- [Tailwind CSS](https://tailwindcss.com/) — Utilidades para estilos rápidos y modernos.
- [React Hook Form](https://react-hook-form.com/) — Manejo de formularios con validaciones.
- [Framer Motion](https://www.framer.com/motion/) — Animaciones suaves en React.

## ⚠️ Notas

⚡ En producción (por ejemplo en Vercel), el guardado de reservas locales usando archivos (`fs`) **no funciona** porque Vercel no permite archivos persistentes en serverless.  
Si querés hacer que se guarden realmente, deberías conectar con una base de datos externa.

## 📸 Demo local

```bash
npm install
npm run dev
