import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const slides = [
  {
    url: 'https://images.pexels.com/photos/7600944/pexels-photo-7600944.jpeg?auto=compress&cs=tinysrgb&w=1200',
    titulo: 'Mecánica automotriz',
    subtitulo: 'Mujeres expertas en el taller',
    acento: '#e8b86d',
  },
  {
    url: 'https://images.pexels.com/photos/4099263/pexels-photo-4099263.jpeg?auto=compress&cs=tinysrgb&w=1200',
    titulo: 'Hogar y limpieza',
    subtitulo: 'Confianza y calidad garantizada',
    acento: '#d4537e',
  },
  {
    url: 'https://images.pexels.com/photos/7496747/pexels-photo-7496747.jpeg?auto=compress&cs=tinysrgb&w=1200',
    titulo: 'Diseño y tecnología',
    subtitulo: 'Creatividad y talento femenino',
    acento: '#e8b86d',
  },
  {
    url: 'https://images.pexels.com/photos/5641761/pexels-photo-5641761.jpeg?auto=compress&cs=tinysrgb&w=1200',
    titulo: 'Construcción y pintura',
    subtitulo: 'Mujeres construyendo el futuro',
    acento: '#d4537e',
  },
  {
    url: 'https://images.pexels.com/photos/6195291/pexels-photo-6195291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    titulo: 'Oficios técnicos',
    subtitulo: 'Rompiendo barreras, resolviendo problemas',
    acento: '#e8b86d',
  },
]

const categoriasTrad = [
  { icono: '💇', nombre: 'Estética y belleza' },
  { icono: '🧹', nombre: 'Hogar y limpieza' },
  { icono: '📚', nombre: 'Clases y tutorías' },
  { icono: '🍽️', nombre: 'Cocina y catering' },
  { icono: '🧘', nombre: 'Bienestar y salud' },
  { icono: '🐾', nombre: 'Cuidado de mascotas' },
  { icono: '👶', nombre: 'Cuidado infantil' },
  { icono: '💻', nombre: 'Tecnología y diseño' },
]

const categoriasEmpod = [
  { icono: '🔧', nombre: 'Gasfitería' },
  { icono: '⚡', nombre: 'Electricidad' },
  { icono: '🚗', nombre: 'Mecánica' },
  { icono: '🪚', nombre: 'Carpintería' },
  { icono: '🏠', nombre: 'Plomería' },
  { icono: '🎨', nombre: 'Pintura de interiores' },
  { icono: '📦', nombre: 'Mudanzas y fletes' },
  { icono: '🌿', nombre: 'Jardinería' },
  { icono: '🚐', nombre: 'Transporte y traslados' },
]

const stats = [
  { num: '2.400+', label: 'Profesionales activas' },
  { num: '17', label: 'Categorías de servicio' },
  { num: '4.9★', label: 'Valoración promedio' },
]

const pasos = [
  { n: '01', titulo: 'Elige una categoría', desc: 'Explora los rubros disponibles y encuentra el servicio que necesitas.' },
  { n: '02', titulo: 'Revisa perfiles', desc: 'Lee reseñas, verifica credenciales y elige con confianza.' },
  { n: '03', titulo: 'Reserva en línea', desc: 'Agenda con la profesional según su disponibilidad.' },
  { n: '04', titulo: 'Evalúa el servicio', desc: 'Tu opinión ayuda a fortalecer y proteger la comunidad Hana.' },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return isMobile
}

function useCarrusel(total, intervalo = 4500) {
  const [actual, setActual] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActual(prev => (prev + 1) % total), intervalo)
    return () => clearInterval(timer)
  }, [total, intervalo])

  return [actual, setActual]
}

const coloresAvatar = ['#d4537e', '#c4892a', '#7a3aa8', '#5DCAA5', '#b83060', '#9b6fd4']

export default function Home() {
  const isMobile = useIsMobile()
  const [slideActual, setSlideActual] = useCarrusel(slides.length)
  const [trabajadoras, setTrabajadoras] = useState([])
  const [catActiva, setCatActiva] = useState('todas')
  const [mostrarTodas, setMostrarTodas] = useState(false)

  useEffect(() => {
    cargarTrabajadoras()
  }, [])

  async function cargarTrabajadoras() {
    try {
      const res = await axios.get('http://localhost:5000/api/workers')
      setTrabajadoras(res.data || [])
    } catch (err) {
      console.error('Error cargando trabajadoras:', err)
      setTrabajadoras([])
    }
  }

  const scrollToId = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const trabajadorasVisibles = mostrarTodas
    ? trabajadoras
    : trabajadoras.slice(0, 3)

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    * { box-sizing: border-box; }

    .hana-root {
      background-color: #0f0508;
      min-height: 100vh;
      color: white;
      font-family: 'DM Sans', sans-serif;
    }

    .banner-compromiso {
      background: linear-gradient(90deg, #1a0a10 0%, #2d0a1e 50%, #1a0a10 100%);
      border-bottom: 1px solid rgba(212,83,126,0.3);
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      position: relative;
      overflow: hidden;
    }

    .banner-compromiso::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        90deg,
        transparent,
        transparent 120px,
        rgba(212,83,126,0.04) 120px,
        rgba(212,83,126,0.04) 121px
      );
    }

    .banner-texto {
      font-size: 12px;
      color: rgba(255,255,255,0.65);
      letter-spacing: 0.2px;
      position: relative;
      z-index: 1;
    }

    .banner-link {
      font-size: 12px;
      font-weight: 600;
      color: #d4537e;
      text-decoration: none;
      border-bottom: 1px solid rgba(212,83,126,0.4);
      padding-bottom: 1px;
      transition: color 0.2s;
      position: relative;
      z-index: 1;
    }

    .banner-link:hover { color: #ff8fb3; }

    .hero {
      position: relative;
      overflow: hidden;
      height: ${isMobile ? '500px' : '700px'};
    }

    .hero-slide {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transition: opacity 1.2s ease-in-out;
      opacity: 0;
    }

    .hero-slide.activo {
      opacity: 1;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(160deg, rgba(15,5,8,0.5) 0%, rgba(15,5,8,0.82) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0 24px;
      height: 100%;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(232,184,109,0.15);
      border: 1px solid rgba(232,184,109,0.5);
      color: #e8b86d;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 6px 18px;
      border-radius: 50px;
      margin-bottom: 22px;
    }

    .hero-titulo {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 700;
      line-height: 1.1;
      color: #ffffff;
      font-size: ${isMobile ? '36px' : '56px'};
      margin: 0 0 12px;
      max-width: ${isMobile ? '320px' : '600px'};
    }

    .hero-subtitulo {
      font-size: ${isMobile ? '16px' : '18px'};
      color: rgba(255,255,255,0.8);
      margin-bottom: 32px;
      max-width: ${isMobile ? '280px' : '500px'};
      line-height: 1.4;
    }

    .hero-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 40px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #d4537e, #b83060);
      color: white;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      font-family: 'DM Sans', sans-serif;
      transition: transform 0.2s, box-shadow 0.2s;
      font-size: 15px;
      padding: ${isMobile ? '12px 26px' : '14px 34px'};
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(212,83,126,0.35);
    }

    .btn-outline-gold {
      background: transparent;
      color: #e8b86d;
      border: 1.5px solid rgba(232,184,109,0.4);
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.2s;
      font-size: 15px;
      padding: ${isMobile ? '12px 26px' : '14px 34px'};
    }

    .btn-outline-gold:hover {
      border-color: #e8b86d;
      background: rgba(232,184,109,0.1);
    }

    .hero-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
    }

    .hero-dot {
      height: 7px;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .hero-stats {
      display: flex;
      justify-content: center;
      gap: ${isMobile ? '20px' : '60px'};
      padding-top: 24px;
      flex-wrap: wrap;
      position: relative;
      z-index: 2;
      margin-top: -60px;
      padding-bottom: 24px;
    }

    .hero-stat {
      text-align: center;
    }

    .hero-stat-num {
      color: #e8b86d;
      font-weight: 700;
      margin-bottom: 4px;
      font-size: ${isMobile ? '22px' : '28px'};
    }

    .hero-stat-label {
      font-size: 12px;
      color: rgba(255,255,255,0.5);
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .seccion-pasos {
      background: linear-gradient(180deg, transparent, rgba(212,83,126,0.05));
    }

    .seccion-titulo {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 700;
      color: white;
      margin: 0 0 16px;
      text-align: center;
    }

    .seccion-subtitulo {
      font-size: 14px;
      color: rgba(255,255,255,0.5);
      text-align: center;
      margin-bottom: 36px;
    }

    .seccion-linea {
      width: 48px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #d4537e, transparent);
      margin: 0 auto 28px;
    }

    .pasos-grid {
      display: grid;
      grid-template-columns: ${isMobile ? '1fr' : 'repeat(2, 1fr)'};
      gap: 20px;
      max-width: 900px;
      margin: 0 auto;
    }

    .paso-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(212,83,126,0.18);
      border-radius: 18px;
      padding: 24px;
      min-height: 170px;
    }

    .paso-numero {
      font-family: 'Cormorant Garamond', serif;
      font-size: 30px;
      font-weight: 700;
      color: rgba(232,184,109,0.8);
      margin-bottom: 10px;
    }

    .paso-titulo {
      color: white;
      margin: 0 0 10px;
      font-weight: 600;
      font-size: 16px;
    }

    .paso-desc {
      font-size: 14px;
      color: rgba(255,255,255,0.6);
      line-height: 1.6;
      margin: 0;
    }

    .banner-cta {
      background: linear-gradient(135deg, rgba(212,83,126,0.08), rgba(232,184,109,0.06));
      border: 1px solid rgba(212,83,126,0.15);
      border-radius: 20px;
      text-align: center;
      margin: 0 auto;
      max-width: 700px;
      padding: ${isMobile ? '48px 24px' : '64px 48px'};
    }

    .banner-cta-label {
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #d4537e;
      margin-bottom: 12px;
    }

    .banner-cta-titulo {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 700;
      color: white;
      margin: 0 0 16px;
      font-size: ${isMobile ? '28px' : '40px'};
    }

    .banner-cta-desc {
      font-size: 14px;
      color: rgba(255,255,255,0.6);
      margin-bottom: 28px;
      line-height: 1.5;
    }

    .btn-blanco {
      background: white;
      color: #1a0a10;
      border: none;
      border-radius: 50px;
      padding: 14px 36px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.2s;
    }

    .btn-blanco:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255,255,255,0.15);
    }

    .seccion-cats {
      padding-top: 52px;
    }

    .cats-tabs {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 36px;
      flex-wrap: wrap;
    }

    .cat-tab {
      background: transparent;
      border: 1px solid rgba(212,83,126,0.2);
      color: rgba(255,255,255,0.5);
      padding: 9px 20px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.2s;
    }

    .cat-tab:hover {
      border-color: rgba(212,83,126,0.5);
      color: rgba(255,255,255,0.8);
    }

    .cat-tab.activo {
      background: rgba(212,83,126,0.15);
      border-color: #d4537e;
      color: #d4537e;
    }

    .cats-grid {
      display: grid;
      gap: 12px;
      margin-bottom: 32px;
    }

    .cat-card {
      background: rgba(212,83,126,0.08);
      border: 1px solid rgba(212,83,126,0.2);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }

    .cat-card:hover {
      border-color: rgba(212,83,126,0.4);
      background: rgba(212,83,126,0.12);
    }

    .cat-card.empod {
      background: rgba(232,184,109,0.08);
      border-color: rgba(232,184,109,0.2);
    }

    .cat-card.empod:hover {
      border-color: rgba(232,184,109,0.4);
      background: rgba(232,184,109,0.12);
    }

    .cat-icono {
      font-size: 28px;
      display: block;
      margin-bottom: 8px;
    }

    .cat-nombre {
      font-size: 13px;
      font-weight: 600;
      color: white;
      margin-bottom: 4px;
    }

    .cat-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: #e8b86d;
      color: #1a0a10;
      font-size: 9px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }

    .seccion-trabajadoras {
      padding-bottom: 72px;
    }

    .worker-card {
      background: #1a0a10;
      border: 1px solid rgba(212,83,126,0.2);
      border-radius: 14px;
      padding: 20px;
      display: block;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s;
    }

    .worker-card:hover {
      border-color: rgba(212,83,126,0.5);
      background: rgba(212,83,126,0.04);
    }

    .worker-avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 18px;
    }

    .worker-nombre {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 2px;
    }

    .worker-cat {
      font-size: 12px;
      color: rgba(255,255,255,0.5);
      margin-bottom: 12px;
    }

    .worker-stars {
      color: #e8b86d;
      font-size: 14px;
      margin-bottom: 10px;
      letter-spacing: 2px;
    }

    .worker-desc {
      font-size: 13px;
      color: rgba(255,255,255,0.6);
      line-height: 1.4;
      margin-bottom: 12px;
      min-height: 36px;
    }

    .worker-dispo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 600;
      color: rgba(255,255,255,0.7);
    }

    .worker-dispo-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: block;
    }
  `

  return (
    <>
      <style>{styles}</style>

      <div className="hana-root">
        <Navbar />

        <div className="banner-compromiso">
          <p className="banner-texto">🛡️ Hana es el lugar seguro para mujeres que buscan y ofrecen servicios</p>
          <Link to="/compromiso" className="banner-link">
            Ver nuestro compromiso →
          </Link>
        </div>

        <section className="hero">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`hero-slide ${i === slideActual ? 'activo' : ''}`}
              style={{ backgroundImage: `url(${slide.url})` }}
            />
          ))}

          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="hero-badge">⭐ Confianza y calidad</div>

            <h1 className="hero-titulo">Hecho por mujeres, para mujeres</h1>

            <p className="hero-subtitulo">
              Conecta con profesionales verificadas en tu área
            </p>

            <div className="hero-btns">
              <button
                onClick={() => scrollToId('categorias')}
                className="btn-primary"
              >
                Buscar servicios
              </button>

              <button
                onClick={() => scrollToId('como-funciona')}
                className="btn-outline-gold"
              >
                Cómo funciona
              </button>
            </div>

            <div className="hero-dots">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className="hero-dot"
                  onClick={() => setSlideActual(i)}
                  style={{
                    width: i === slideActual ? '28px' : '7px',
                    backgroundColor: i === slideActual
                      ? slides[slideActual].acento
                      : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="hero-stats">
          {stats.map(s => (
            <div key={s.label} className="hero-stat">
              <div className="hero-stat-num">{s.num}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <section
          id="como-funciona"
          className="seccion-pasos"
          style={{ padding: isMobile ? '52px 24px' : '72px 64px' }}
        >
          <p
            style={{
              textAlign: 'center',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#d4537e',
              marginBottom: '12px',
            }}
          >
            ¿Cómo funciona?
          </p>

          <h2 className="seccion-titulo" style={{ fontSize: isMobile ? '28px' : '38px' }}>
            Simple, seguro y rápido
          </h2>

          <div className="seccion-linea" />

          <div className="pasos-grid">
            {pasos.map((paso) => (
              <div key={paso.n} className="paso-card">
                <div className="paso-numero">{paso.n}</div>
                <h3 className="paso-titulo">{paso.titulo}</h3>
                <p className="paso-desc">{paso.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: isMobile ? '0 20px 40px' : '0 48px 52px' }}>
          <div className="banner-cta">
            <p className="banner-cta-label">¿Eres profesional?</p>

            <h2 className="banner-cta-titulo">
              Únete a Hana y haz
              <br />
              crecer tu negocio
            </h2>

            <p className="banner-cta-desc">
              Crea tu perfil, revisa los requisitos y comienza tu proceso de verificación.
            </p>

            <Link to="/register-worker" className="btn-blanco">
              Crear mi perfil gratis →
            </Link>
          </div>
        </section>

        <section
          id="categorias"
          className="seccion-cats"
          style={{ padding: isMobile ? '52px 20px' : '72px 48px' }}
        >
          <p
            style={{
              textAlign: 'center',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#d4537e',
              marginBottom: '12px',
            }}
          >
            Categorías
          </p>

          <h2 className="seccion-titulo" style={{ fontSize: isMobile ? '28px' : '38px' }}>
            ¿Qué servicio necesitas?
          </h2>

          <div className="seccion-linea" />
          <p className="seccion-subtitulo">8 categorías tradicionales · 9 de empoderamiento</p>

          <div className="cats-tabs">
            {['todas', 'tradicionales', 'empoderamiento'].map(tab => (
              <button
                key={tab}
                className={`cat-tab ${catActiva === tab ? 'activo' : ''}`}
                onClick={() => setCatActiva(tab)}
              >
                {tab === 'todas'
                  ? 'Todas'
                  : tab === 'tradicionales'
                  ? 'Tradicionales'
                  : '★ Empoderamiento'}
              </button>
            ))}
          </div>

          {(catActiva === 'todas' || catActiva === 'tradicionales') && (
            <>
              {catActiva === 'todas' && (
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  Tradicionales
                </p>
              )}

              <div
                className="cats-grid"
                style={{
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                  marginBottom: catActiva === 'todas' ? '32px' : '0',
                }}
              >
                {categoriasTrad.map(cat => (
                  <div key={cat.nombre} className="cat-card">
                    <span className="cat-icono">{cat.icono}</span>
                    <div className="cat-nombre">{cat.nombre}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {(catActiva === 'todas' || catActiva === 'empoderamiento') && (
            <>
              {catActiva === 'todas' && (
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    color: 'rgba(232,184,109,0.6)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  ★ Empoderamiento
                </p>
              )}

              <div
                className="cats-grid"
                style={{
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                }}
              >
                {categoriasEmpod.map(cat => (
                  <div key={cat.nombre} className="cat-card empod">
                    <span className="cat-icono">{cat.icono}</span>
                    <div className="cat-nombre">{cat.nombre}</div>
                    <div className="cat-badge">Nuevo</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <section
          id="profesionales"
          className="seccion-trabajadoras"
          style={{ padding: isMobile ? '52px 20px' : '72px 48px' }}
        >
          <p
            style={{
              textAlign: 'center',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#d4537e',
              marginBottom: '12px',
            }}
          >
            Comunidad
          </p>

          <h2 className="seccion-titulo" style={{ fontSize: isMobile ? '28px' : '38px' }}>
            Profesionales destacadas
          </h2>

          <div className="seccion-linea" />
          <p className="seccion-subtitulo">Verificadas y valoradas por la comunidad Hana</p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '16px',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            {trabajadoras.length === 0 ? (
              <p
                style={{
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.3)',
                  gridColumn: '1/-1',
                  fontSize: '14px',
                }}
              >
                Aún no hay profesionales registradas. Sé la primera en ofrecer tus servicios.
              </p>
            ) : (
              trabajadorasVisibles.map((w, idx) => {
                const nombre = `${w.usuario?.nombre || ''} ${w.usuario?.apellido || ''}`.trim()
                const iniciales = `${w.usuario?.nombre?.charAt(0) || ''}${w.usuario?.apellido?.charAt(0) || ''}` || 'H'
                const region = w.usuario?.region || ''
                const color = coloresAvatar[idx % coloresAvatar.length]

                return (
                  <Link key={w._id} to={`/worker/${w._id}`} className="worker-card">
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '12px' }}>
                      <div className="worker-avatar" style={{ backgroundColor: color }}>
                        {iniciales}
                      </div>

                      <div>
                        <div className="worker-nombre">{nombre || 'Profesional Hana'}</div>
                        <div className="worker-cat">
                          {w.categoria}
                          {region ? ` · ${region}` : ''}
                        </div>
                      </div>
                    </div>

                    <div className="worker-stars">★★★★★</div>

                    <div className="worker-desc">
                      {w.descripcion || 'Profesional verificada en Hana.'}
                    </div>

                    <div className="worker-dispo">
                      <span
                        className="worker-dispo-dot"
                        style={{ backgroundColor: w.disponible ? '#5DCAA5' : '#d4537e' }}
                      />
                      {w.disponible ? 'Disponible' : 'No disponible'}
                    </div>
                  </Link>
                )
              })
            )}
          </div>

          {trabajadoras.length > 3 && !mostrarTodas && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button
                onClick={() => setMostrarTodas(true)}
                className="btn-outline-gold"
              >
                Ver todas las profesionales disponibles →
              </button>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </>
  )
}