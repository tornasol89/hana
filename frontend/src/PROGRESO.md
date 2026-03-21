# Proyecto Hana — Registro de Progreso

## ¿Qué es este proyecto?

Plataforma web que conecta mujeres que necesitan contratar servicios con mujeres que los ofrecen.
Stack: React + Vite + Tailwind CSS (frontend) / Node.js + Express + MongoDB (backend)
Nombre del stack completo: MERN (MongoDB, Express, React, Node.js)

## Repositorio GitHub

https://github.com/tornasol89/hana

## Ubicación en el computador

C:\Users\LENOVO\Desktop\hana

---

## LO QUE YA ESTÁ HECHO ✅

- [x] Carpeta del proyecto creada en el Escritorio
- [x] Proyecto React creado con Vite dentro de /frontend
- [x] Tailwind CSS instalado y configurado
- [x] Repositorio GitHub creado y código subido
- [x] Node.js v22 y npm v10 funcionando
- [x] React Router instalado y configurado
- [x] Estructura de carpetas creada (/pages y /components)
- [x] Rutas configuradas en App.jsx (/, /login, /register-client, /register-worker)
- [x] Home.jsx — hero, banner, categorías, trabajadoras destacadas, footer
- [x] Navbar con logo HANA (círculo degradado rosa/dorado)
- [x] Login.jsx — formulario de ingreso con diseño rosa/dorado
- [x] RegisterClient.jsx — registro con selector tipo de cuenta
- [x] RegisterWorker.jsx — registro profesional con selector de categoría
- [x] Diseño responsivo para móvil en todas las páginas
- [x] Paleta de colores: fondo #1a0a10, rosa #d4537e, dorado #e8b86d
- [x] Estructura del backend creada (carpetas models, routes, middleware, config)
- [x] Dependencias del backend instaladas (express, mongoose, jwt, bcrypt, cloudinary, nodemailer)

---

## LO QUE SIGUE AHORA 👇

### SEMANA 1 — ✅ COMPLETADA

### SEMANA 2 — Backend

- Conectar MongoDB Atlas (.env con MONGO_URI)
- Modelos: User (foto + RUT + carnet), WorkerProfile, Booking, Review, Alert
- Registro e inicio de sesión con JWT
- Subida de foto de perfil y carnet con Cloudinary
- Verificación de identidad por carnet (aprobación manual desde panel admin)

### SEMANA 3 — Reservas y perfiles

- Perfil de trabajadora con foto, métricas de desempeño y reseñas
- Perfil de clienta con foto y badge de confiabilidad
- Calendario de disponibilidad de la trabajadora
- Sistema de reservas con aceptar/rechazar
- Notificaciones por email (Nodemailer)

### SEMANA 4 — Evaluaciones, búsqueda e impacto

- Evaluación bidireccional (clienta → trabajadora y trabajadora → clienta)
- Métricas automáticas: puntualidad, confiabilidad, calidad, comunicación, precio
- Sistema de alertas comunitarias sobre clientas
- Buscador por categoría y comuna
- Página "Nuestro impacto" con dashboard de cifras de Chile
- Sección de capacitaciones (SENCE, ChileValora, MINVU)
- 16 categorías: 8 tradicionales + 8 de empoderamiento (gasfitería, electricidad, mecánica, etc.)

### SEMANA 5 — Deploy y pulido

- Deploy frontend en Vercel
- Deploy backend en Render
- Panel de administración para verificar carnets
- README con instrucciones

---

## CÓMO ARRANCAR UNA SESIÓN NUEVA

1. Abrir VSCode
2. Archivo → Abrir carpeta → Escritorio → hana
3. Abrir terminal (Ctrl + Ñ)
4. Abrir terminal nueva con + y escribir: `cd frontend` → `npm run dev`
5. Abrir navegador en: http://localhost:5173/
6. Subir este archivo PROGRESO.md a Claude y decir: "Estoy construyendo el proyecto Hana, necesito continuar desde donde lo dejé"

---

## COMANDOS QUE MÁS USARÁS

| Qué hace                  | Comando                                                  |
| ------------------------- | -------------------------------------------------------- |
| Iniciar el frontend       | `npm run dev` (dentro de /frontend)                      |
| Iniciar el backend        | `npm run dev` (dentro de /backend)                       |
| Detener el servidor       | Ctrl + C                                                 |
| Guardar cambios en GitHub | `git add .` → `git commit -m "descripción"` → `git push` |
| Instalar un paquete nuevo | `npm install nombre-paquete`                             |
| Ver en qué carpeta estás  | `pwd`                                                    |
| Entrar a una carpeta      | `cd nombre-carpeta`                                      |
| Volver atrás              | `cd ..`                                                  |

---

## TECNOLOGÍAS Y POR QUÉ

| Tecnología        | Para qué sirve                               |
| ----------------- | -------------------------------------------- |
| React             | Construir las pantallas (frontend)           |
| Vite              | Herramienta que hace correr React rápido     |
| Tailwind CSS      | Estilos modernos sin escribir CSS desde cero |
| React Router      | Navegar entre páginas sin recargar           |
| Node.js + Express | El servidor backend                          |
| MongoDB Atlas     | Base de datos en la nube (gratis)            |
| Mongoose          | Conectar Node.js con MongoDB                 |
| JWT               | Sistema de login seguro                      |
| Cloudinary        | Guardar fotos e imágenes y carnets           |
| Nodemailer        | Enviar emails de notificación                |
| Vercel            | Deploy del frontend (gratis)                 |
| Render            | Deploy del backend (gratis)                  |

---

## ESTRUCTURA DE CARPETAS (objetivo final)

```
hana/
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── RegisterClient.jsx
│       │   ├── RegisterWorker.jsx
│       │   ├── WorkerList.jsx
│       │   ├── WorkerProfile.jsx
│       │   ├── WorkerDashboard.jsx
│       │   ├── ImpactPage.jsx
│       │   └── AdminPanel.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── WorkerCard.jsx
│       │   └── StarRating.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       └── services/
│           └── api.js
└── backend/
    └── src/
        ├── models/
        │   ├── User.js
        │   ├── WorkerProfile.js
        │   ├── Booking.js
        │   ├── Review.js
        │   └── Alert.js
        ├── routes/
        │   ├── auth.js
        │   ├── workers.js
        │   ├── bookings.js
        │   └── reviews.js
        ├── middleware/
        │   └── auth.js
        ├── config/
        │   └── db.js
        └── server.js
```
