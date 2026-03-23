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
- [x] Rutas configuradas en App.jsx (/, /login, /register-client, /register-worker, /worker/:id, /impacto, /compromiso)
- [x] Home.jsx — carrusel hero con fotos de mujeres en distintos oficios (Pexels)
- [x] Home.jsx — 17 categorías (8 tradicionales + 8 de empoderamiento con badge dorado + Transporte y traslados pendiente de agregar)
- [x] Home.jsx — banner degradado rosa/dorado
- [x] Home.jsx — cards de trabajadoras destacadas con link al perfil real desde MongoDB
- [x] Home.jsx — navbar sticky con Compromiso Hana banner
- [x] Home.jsx — botón "Buscar servicios" con scroll suave a sección categorías
- [x] Navbar.jsx — rediseñado con sticky, corona 👑, tagline "Hecho por mujeres, para mujeres", botones "Contratar servicios", "Ofrecer servicios" e "Ingresar"
- [x] Navbar.jsx — detecta sesión activa y muestra "Hola, nombre 👑 + subtítulo verificada + botón Salir"
- [x] Navbar.jsx — borde degradado rosa/dorado
- [x] Login.jsx — formulario conectado al backend con JWT
- [x] RegisterClient.jsx — registro conectado al backend, protegido con verificación de Compromiso Hana
- [x] RegisterWorker.jsx — registro conectado al backend con 16 categorías (pendiente protección compromiso)
- [x] WorkerProfile.jsx — perfil completo con datos reales desde MongoDB, índice de confianza, métricas, certificados y reseñas
- [x] Impacto.jsx — página completa con gráficos y cifras reales de Chile (INE, CASEN, Humanas, ChileMujeres)
- [x] Compromiso.jsx — página con políticas de seguridad, logo Hana, 5 secciones y botones que guardan aceptación
- [x] Diseño responsivo para móvil en todas las páginas
- [x] Paleta de colores: fondo #1a0a10, rosa #d4537e, dorado #e8b86d
- [x] Logo Hana (logoHana2.png sin fondo) en footer de Home, Impacto y Compromiso
- [x] axios instalado para peticiones al backend

### BACKEND

- [x] Servidor Node.js + Express corriendo en puerto 5000
- [x] Conexión a MongoDB Atlas funcionando
- [x] Variables de entorno configuradas (.env con MONGO_URI, JWT_SECRET, PORT)
- [x] Modelo User (nombre, apellido, email, password, tipo, foto, carnet, rut, verificada, region, comuna, aceptoCompromiso, fechaAceptacion)
- [x] Modelo WorkerProfile (usuario, categoria, descripcion, metricas, indiceConfianza, certificados)
- [x] Modelo Booking (clienta, trabajadora, servicio, fecha, estado)
- [x] Modelo Review (autor, destinataria, tipo, estrellas, metricas)
- [x] Modelo Alert (trabajadora, clientaReportada, motivo)
- [x] Middleware auth.js — protege rutas con JWT
- [x] Ruta POST /api/auth/register — registro con bcrypt + guarda aceptoCompromiso y fechaAceptacion
- [x] Ruta POST /api/auth/login — login con JWT
- [x] Ruta GET /api/workers — listar trabajadoras con filtros por categoría y región
- [x] Ruta GET /api/workers/:id — perfil individual
- [x] Ruta POST /api/workers — crear perfil (requiere login)
- [x] Ruta PUT /api/workers/:id — editar perfil (solo la dueña)
- [x] Ruta POST /api/bookings — crear reserva
- [x] Ruta GET /api/bookings/mis-reservas — ver reservas de la usuaria
- [x] Ruta PUT /api/bookings/:id/aceptar — trabajadora acepta
- [x] Ruta PUT /api/bookings/:id/rechazar — trabajadora rechaza
- [x] Ruta POST /api/reviews — crear evaluación
- [x] Ruta GET /api/reviews/:usuarioId — ver evaluaciones con promedio
- [x] nodemon instalado para desarrollo

### BASE DE DATOS

- [x] MongoDB Atlas cluster activo (Clúster0)
- [x] Usuario hana_admin creado
- [x] IP 0.0.0.0/0 agregada (acceso universal para desarrollo)
- [x] Colección usuarios con registros reales funcionando
- [x] Contraseñas encriptadas con bcrypt verificadas en Atlas
- [x] Trabajadoras de prueba creadas: Carla (Estética), María (Hogar), Valentina (Tutorías)

---

## LO QUE SIGUE AHORA 👇

### PENDIENTE INMEDIATO

- [ ] Agregar categoría "Transporte y traslados" en Home.jsx, RegisterWorker.jsx y WorkerProfile.js (backend)
- [ ] Proteger RegisterWorker.jsx con verificación de Compromiso Hana (igual que RegisterClient)
- [ ] Subida de foto de perfil con Cloudinary
- [ ] Verificación de carnet (subida de imagen + aprobación manual admin)

### SEMANA 3 — Reservas y perfiles

- [ ] Perfil de clienta con foto y badge de confiabilidad
- [ ] Calendario de disponibilidad de la trabajadora
- [ ] Sistema de reservas con aceptar/rechazar (frontend)
- [ ] Notificaciones por email (Nodemailer)

### SEMANA 4 — Evaluaciones, búsqueda e impacto

- [ ] Evaluación bidireccional (clienta → trabajadora y trabajadora → clienta)
- [ ] Métricas automáticas calculadas desde reseñas reales
- [ ] Sistema de alertas comunitarias sobre clientas
- [ ] Buscador por categoría y comuna
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
5. Subir este archivo PROGRESO.md al proyecto en Claude y decir:
   "Estoy construyendo el proyecto Hana, continuamos desde donde quedamos."

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
│       │   ├── RegisterWorker.jsx ✅ (pendiente protección compromiso)
│       │   ├── WorkerProfile.jsx ✅
│       │   ├── Impacto.jsx ✅
│       │   └── Compromiso.jsx ✅
│       ├── components/
│       │   ├── Navbar.jsx ✅
│       │   └── Footer.jsx
│       ├── App.jsx ✅
│       └── main.jsx ✅
└── backend/
    └── src/
        ├── models/
        │   ├── User.js ✅ (con aceptoCompromiso y fechaAceptacion)
        │   ├── WorkerProfile.js ✅
        │   ├── Booking.js ✅
        │   ├── Review.js ✅
        │   └── Alert.js ✅
        ├── routes/
        │   ├── auth.js ✅ (register + login + aceptoCompromiso)
        │   ├── workers.js ✅ (4 rutas completas)
        │   ├── bookings.js ✅ (4 rutas completas)
        │   └── reviews.js ✅ (2 rutas completas)
        ├── middleware/
        │   └── auth.js ✅
        ├── config/
        │   └── db.js ✅
        └── server.js ✅
```

---

## ARCHIVOS ESTÁTICOS

- frontend/public/logoHana2.png ✅ (sin fondo, 1.38MB)
- frontend/public/favicon.svg ✅
- frontend/public/icons.svg ✅

---

## MEJORAS PLANIFICADAS

- [ ] Índice de confianza Hana calculado desde datos reales
- [ ] Indicador disponible ahora (verde/rojo en perfil)
- [ ] Certificados de capacitación en perfil
- [ ] Verificación de identidad con Soyio API (RUT vs Registro Civil)
- [ ] Sistema de match inteligente
- [ ] Botón de emergencia con ubicación para trabajadoras
- [ ] Check-in / check-out del servicio con geolocalización
- [ ] Categoría "Transporte y traslados" ← pendiente agregar

---

## DOCUMENTOS GENERADOS

- informe_hana_parcial1_v2.docx
- documentacion_tecnica_hana.docx
