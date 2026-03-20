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

---

## LO QUE SIGUE AHORA 👇

### SEMANA 1 — ✅ COMPLETADA

### SEMANA 2 — Backend

- Crear el backend con Node.js + Express
- Conectar MongoDB Atlas
- Modelo de datos: User, WorkerProfile
- Registro e inicio de sesión con JWT
- Formulario de perfil de trabajadora
- Subida de fotos con Cloudinary

### SEMANA 3 — Búsqueda y valoraciones

- Buscador por región y tipo de servicio
- Lista de trabajadoras con cards
- Sistema de estrellas (1 a 5)
- Dejar comentario y reseña
- Botón de contacto (email/WhatsApp)

### SEMANA 4 — Pulido y deploy

- Panel de administración
- Diseño responsivo móvil
- Deploy frontend en Vercel
- Deploy backend en Render
- README con instrucciones

---

## CÓMO ARRANCAR UNA SESIÓN NUEVA

1. Abrir VSCode
2. Archivo → Abrir carpeta → Escritorio → hana
3. Abrir terminal (Ctrl + Ñ)
4. Escribir: `cd frontend`
5. Escribir: `npm run dev`
6. Abrir navegador en: http://localhost:5173/
7. Decirle a Claude: "Estoy construyendo el proyecto Hana, llegué hasta [indicar el último paso completado] y necesito continuar"

---

## COMANDOS QUE MÁS USARÁS

| Qué hace                  | Comando                                                  |
| ------------------------- | -------------------------------------------------------- |
| Iniciar el frontend       | `npm run dev` (dentro de /frontend)                      |
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
| Cloudinary        | Guardar fotos e imágenes                     |
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
        │   └── Review.js
        ├── routes/
        │   ├── auth.js
        │   ├── workers.js
        │   └── reviews.js
        └── server.js
```
