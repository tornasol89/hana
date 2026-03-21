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

### FRONTEND

- [x] Proyecto React creado con Vite dentro de /frontend
- [x] Tailwind CSS instalado y configurado
- [x] React Router instalado y configurado
- [x] Estructura de carpetas creada (/pages y /components)
- [x] Rutas configuradas en App.jsx (/, /login, /register-client, /register-worker, /worker/:id)
- [x] Home.jsx — carrusel hero con fotos de mujeres en distintos oficios (Pexels)
- [x] Home.jsx — 16 categorías (8 tradicionales + 8 de empoderamiento con badge dorado)
- [x] Home.jsx — banner degradado rosa/dorado
- [x] Home.jsx — cards de trabajadoras destacadas con link al perfil
- [x] Home.jsx — navbar detecta sesión activa y muestra "Hola, nombre + botón Salir"
- [x] Navbar con logo HANA (círculo degradado rosa/dorado)
- [x] Login.jsx — formulario conectado al backend con JWT
- [x] RegisterClient.jsx — registro conectado al backend con todas las regiones de Chile
- [x] RegisterWorker.jsx — registro conectado al backend con 16 categorías
- [x] WorkerProfile.jsx — perfil completo con foto hero, índice de confianza, métricas, certificados y reseñas
- [x] Diseño responsivo para móvil en todas las páginas
- [x] Paleta de colores: fondo #1a0a10, rosa #d4537e, dorado #e8b86d
- [x] axios instalado para peticiones al backend

### BACKEND

- [x] Servidor Node.js + Express corriendo en puerto 5000
- [x] Conexión a MongoDB Atlas funcionando
- [x] Variables de entorno configuradas (.env con MONGO_URI, JWT_SECRET, PORT)
- [x] Modelo User (nombre, apellido, email, password, tipo, foto, carnet, rut, verificada, region, comuna)
- [x] Modelo WorkerProfile (usuario, categoria, descripcion, metricas, indiceConfianza, certificados)
- [x] Modelo Booking (clienta, trabajadora, servicio, fecha, estado)
- [x] Modelo Review (autor, destinataria, tipo, estrellas, metricas)
- [x] Modelo Alert (trabajadora, clientaReportada, motivo)
- [x] Ruta POST /api/auth/register — registro con bcrypt funcionando
- [x] Ruta POST /api/auth/login — login con JWT funcionando
- [x] Rutas base: /api/workers, /api/bookings, /api/reviews (pendientes de completar)
- [x] nodemon instalado para desarrollo

### BASE DE DATOS

- [x] MongoDB Atlas cluster activo (Clúster0)
- [x] Usuario hana_admin creado con contraseña Hana2026Admin
- [x] IP 0.0.0.0/0 agregada (acceso universal para desarrollo)
- [x] Colección usuarios con registros reales funcionando
- [x] Contraseñas encriptadas con bcrypt verificadas en Atlas

---

## LO QUE SIGUE AHORA 👇

### SEMANA 2 — Lo que falta

- [ ] Completar rutas /api/workers (listar, filtrar por categoría y región)
- [ ] Completar rutas /api/bookings (crear, aceptar, rechazar)
- [ ] Completar rutas /api/reviews (crear evaluación)
- [ ] Subida de foto de perfil con Cloudinary
- [ ] Verificación de carnet (subida de imagen + aprobación manual admin)
- [ ] Integración preparada para Soyio API (verificación RUT)
- [ ] Índice de confianza calculado desde datos reales del backend

### SEMANA 3 — Reservas y perfiles

- [ ] Perfil de trabajadora con datos reales desde MongoDB
- [ ] Perfil de clienta con foto y badge de confiabilidad
- [ ] Calendario de disponibilidad de la trabajadora
- [ ] Sistema de reservas con aceptar/rechazar
- [ ] Notificaciones por email (Nodemailer)

### SEMANA 4 — Evaluaciones, búsqueda e impacto

- [ ] Evaluación bidireccional (clienta → trabajadora y trabajadora → clienta)
- [ ] Métricas automáticas calculadas desde reseñas reales
- [ ] Sistema de alertas comunitarias sobre clientas
- [ ] Buscador por categoría y comuna
- [ ] Página "Nuestro impacto" con dashboard de cifras de Chile
- [ ] Sección de capacitaciones (SENCE, ChileValora, MINVU)

### SEMANA 5 — Deploy y pulido

- [ ] Deploy frontend en Vercel
- [ ] Deploy backend en Render
- [ ] Panel de administración para verificar carnets
- [ ] README con instrucciones

---

## CÓMO ARRANCAR UNA SESIÓN NUEVA

1. Abrir VSCode
2. Abrir carpeta hana
3. Terminal 1: `cd frontend` → `npm run dev` → http://localhost:5173
4. Terminal 2: `cd backend` → `npm run dev` → http://localhost:5000
5. Subir este archivo PROGRESO.md a Claude y decir:
   "Estoy construyendo el proyecto Hana, mi repositorio es github.com/tornasol89/hana.
   Tengo el stack MERN completo funcionando. El registro y login con JWT están listos.
   La navbar muestra el nombre de la usuaria logueada. Necesito continuar desde donde lo dejé."

---

## CREDENCIALES IMPORTANTES (guardar en lugar seguro)

- MongoDB Atlas usuario: hana_admin
- MongoDB Atlas contraseña: Hana2026Admin
- Cluster: cluster0.bbrcmlj.mongodb.net
- Base de datos: hana

---

## COMANDOS QUE MÁS USARÁS

| Qué hace                 | Comando                                                  |
| ------------------------ | -------------------------------------------------------- |
| Iniciar el frontend      | `npm run dev` (dentro de /frontend)                      |
| Iniciar el backend       | `npm run dev` (dentro de /backend)                       |
| Detener el servidor      | Ctrl + C                                                 |
| Reiniciar nodemon        | escribir `rs` + Enter en la terminal del backend         |
| Guardar en GitHub        | `git add .` → `git commit -m "descripción"` → `git push` |
| Ver en qué carpeta estás | `pwd`                                                    |

---

## TECNOLOGÍAS Y POR QUÉ

| Tecnología        | Para qué sirve                                |
| ----------------- | --------------------------------------------- |
| React             | Construir las pantallas (frontend)            |
| Vite              | Herramienta que hace correr React rápido      |
| React Router      | Navegar entre páginas sin recargar            |
| axios             | Hacer peticiones HTTP del frontend al backend |
| Node.js + Express | El servidor backend                           |
| MongoDB Atlas     | Base de datos en la nube (gratis)             |
| Mongoose          | Conectar Node.js con MongoDB                  |
| JWT               | Sistema de login seguro sin sesiones          |
| bcryptjs          | Encriptar contraseñas antes de guardarlas     |
| Cloudinary        | Guardar fotos e imágenes (pendiente)          |
| Nodemailer        | Enviar emails de notificación (pendiente)     |
| Vercel            | Deploy del frontend (gratis)                  |
| Render            | Deploy del backend (gratis)                   |

---

## ESTRUCTURA DE CARPETAS ACTUAL

```
hana/
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx ✅
│       │   ├── Login.jsx ✅
│       │   ├── RegisterClient.jsx ✅
│       │   ├── RegisterWorker.jsx ✅
│       │   └── WorkerProfile.jsx ✅
│       ├── components/
│       │   ├── Navbar.jsx ✅
│       │   └── Footer.jsx
│       ├── App.jsx ✅
│       └── main.jsx ✅
└── backend/
    └── src/
        ├── models/
        │   ├── User.js ✅
        │   ├── WorkerProfile.js ✅
        │   ├── Booking.js ✅
        │   ├── Review.js ✅
        │   └── Alert.js ✅
        ├── routes/
        │   ├── auth.js ✅ (register + login funcionando)
        │   ├── workers.js (base creada)
        │   ├── bookings.js (base creada)
        │   └── reviews.js (base creada)
        ├── middleware/
        │   └── auth.js (pendiente)
        ├── config/
        │   └── db.js ✅
        └── server.js ✅
```

---

## MEJORAS PLANIFICADAS PARA IMPLEMENTAR

- [ ] Índice de confianza Hana (fórmula con 5 factores) — diseño listo, falta conectar al backend
- [ ] Indicador disponible ahora (verde/rojo en perfil)
- [ ] Cobertura nacional con todas las regiones — formulario listo ✅
- [ ] Certificados de capacitación en perfil — diseño listo, falta subida real
- [ ] Verificación de identidad con Soyio API (chilena, verifica RUT vs Registro Civil)
- [ ] Como mejora futura: Jumio (verificación más robusta a nivel internacional)
- [ ] Sistema de match inteligente (recomendaciones personalizadas)
- [ ] Botón de emergencia con ubicación para trabajadoras
- [ ] Check-in / check-out del servicio

---

## DOCUMENTOS GENERADOS

- informe_hana_parcial1_v2.docx — Informe completo para Parcial 1 con diagramas
- documentacion_tecnica_hana.docx — Documentación técnica del código
