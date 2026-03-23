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
  { n: '01', titulo: 'Elige una categoría', desc: 'Explora los 17 rubros disponibles y encuentra el servicio que necesitas.' },
  { n: '02', titulo: 'Revisa perfiles', desc: 'Lee reseñas reales, verifica credenciales y escoge con confianza.' },
  { n: '03', titulo: 'Reserva en línea', desc: 'Agenda directamente con la profesional en su calendario disponible.' },
  { n: '04', titulo: 'Evalúa el servicio', desc: 'Tu opinión fortalece la comunidad Hana y protege a otras usuarias.' },
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

  useEffect(() => {
    axios.get('http://localhost:5000/api/workers')
      .then(res => setTrabajadoras(res.data))
      .catch(err => console.error(err))
  }, [])

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    * { box-sizing: border-box; }

    .hana-root {
      background-color: #0f0508;
      min-height: 100vh;
      color: white;
      font-family: 'DM Sans', sans-serif;
    }

    /* ── BANNER COMPROMISO ── */
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
      background: repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(212,83,126,0.04) 120px, rgba(212,83,126,0.04) 121px);
    }
    .banner-texto {
      font-size: 12px;
      color: rgba(255,255,255,0.65);
      letter-spacing: 0.2px;
    }
    .banner-link {
      font-size: 12px;
      font-weight: 600;
      color: #d4537e;
      text-decoration: none;
      border-bottom: 1px solid rgba(212,83,126,0.4);
      padding-bottom: 1px;
      transition: color 0.2s;
    }
    .banner-link:hover { color: #ff8fb3; }

    /* ── HERO ── */
    .hero {
      position: relative;
      overflow: hidden;
    }
    .hero-slide {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transition: opacity 1.2s ease-in-out;
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
      margin: 0 0 14px;
    }
    .hero-subtitulo {
      color: rgba(255,255,255,0.75);
      margin: 0 0 8px;
      font-weight: 300;
    }
    .hero-desc {
      color: rgba(255,255,255,0.5);
      max-width: 440px;
      margin: 0 auto 32px;
      line-height: 1.8;
      font-size: 14px;
    }
    .hero-btns {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn-primary {
      background: linear-gradient(135deg, #d4537e, #b83060);
      color: white;
      border: none;
      border-radius: 50px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      text-decoration: none;
      display: inline-block;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,83,126,0.4); }
    .btn-outline-gold {
      background: transparent;
      color: #e8b86d;
      border: 1.5px solid #e8b86d;
      border-radius: 50px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      text-decoration: none;
      display: inline-block;
    }
    .btn-outline-gold:hover { background: rgba(232,184,109,0.12); }
    .hero-dots {
      display: flex;
      gap: 8px;
      margin-top: 32px;
      justify-content: center;
    }
    .hero-dot {
      height: 6px;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.4s ease;
    }
    .hero-stats {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 0;
      background: rgba(15,5,8,0.75);
      backdrop-filter: blur(8px);
      border-top: 1px solid rgba(212,83,126,0.2);
      flex-wrap: wrap;
      z-index: 3;
    }
    .hero-stat {
      padding: 14px 32px;
      text-align: center;
      border-right: 1px solid rgba(212,83,126,0.15);
    }
    .hero-stat:last-child { border-right: none; }
    .hero-stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 700;
      color: #e8b86d;
    }
    .hero-stat-label {
      font-size: 10px;
      color: rgba(255,255,255,0.45);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 2px;
    }

    /* ── SECCIÓN CÓMO FUNCIONA ── */
    .seccion-pasos {
      background: #0f0508;
      border-top: 1px solid rgba(212,83,126,0.1);
      border-bottom: 1px solid rgba(212,83,126,0.1);
    }
    .paso-card {
      flex: 1;
      min-width: 200px;
      position: relative;
      padding-top: 32px;
    }
    .paso-numero {
      font-family: 'Cormorant Garamond', serif;
      font-size: 56px;
      font-weight: 700;
      color: rgba(232,184,109,0.12);
      line-height: 1;
      margin-bottom: -8px;
    }
    .paso-titulo {
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 8px;
    }
    .paso-desc {
      font-size: 13px;
      color: rgba(255,255,255,0.5);
      line-height: 1.7;
    }
    .paso-linea {
      position: absolute;
      top: 44px;
      right: 0;
      width: 1px;
      height: 80px;
      background: linear-gradient(to bottom, rgba(212,83,126,0.4), transparent);
    }

    /* ── BANNER CTA ── */
    .banner-cta {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #b83060 0%, #8b1d45 40%, #c4892a 100%);
      text-align: center;
    }
    .banner-cta::before {
      content: '';
      position: absolute;
      top: -60%;
      left: -10%;
      width: 60%;
      height: 200%;
      background: rgba(255,255,255,0.04);
      border-radius: 50%;
      transform: rotate(-15deg);
    }
    .banner-cta-label {
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.65);
      margin-bottom: 12px;
    }
    .banner-cta-titulo {
      font-family: 'Cormorant Garamond', serif;
      color: #ffffff;
      margin: 0 0 12px;
      font-weight: 700;
      line-height: 1.2;
    }
    .banner-cta-desc {
      color: rgba(255,255,255,0.85);
      font-size: 14px;
      max-width: 480px;
      margin: 0 auto 28px;
      line-height: 1.7;
    }
    .btn-blanco {
      background: white;
      color: #b83060;
      border: none;
      border-radius: 50px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-blanco:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.25); }

    /* ── CATEGORÍAS ── */
    .seccion-cats { background: #0f0508; }
    .cats-tabs {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .cat-tab {
      padding: 8px 20px;
      border-radius: 50px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid rgba(212,83,126,0.3);
      background: transparent;
      color: rgba(255,255,255,0.5);
      font-family: 'DM Sans', sans-serif;
    }
    .cat-tab.activo {
      background: rgba(212,83,126,0.2);
      border-color: #d4537e;
      color: #ffffff;
    }
    .cat-tab:hover { border-color: #d4537e; color: rgba(255,255,255,0.8); }
    .cats-grid {
      display: grid;
      gap: 12px;
      max-width: 900px;
      margin: 0 auto;
    }
    .cat-card {
      background: #1a0a10;
      border: 1px solid rgba(212,83,126,0.2);
      border-radius: 14px;
      padding: 22px 14px 18px;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }
    .cat-card::before {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.25s;
      background: radial-gradient(ellipse at 50% 0%, rgba(212,83,126,0.15), transparent 70%);
    }
    .cat-card:hover { border-color: #d4537e; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(212,83,126,0.15); }
    .cat-card:hover::before { opacity: 1; }
    .cat-card.empod { border-color: rgba(232,184,109,0.3); }
    .cat-card.empod:hover { border-color: #e8b86d; box-shadow: 0 12px 32px rgba(232,184,109,0.15); }
    .cat-card.empod::before { background: radial-gradient(ellipse at 50% 0%, rgba(232,184,109,0.12), transparent 70%); }
    .cat-icono { font-size: 28px; margin-bottom: 10px; display: block; }
    .cat-nombre { font-size: 12px; color: #ffffff; font-weight: 500; line-height: 1.4; }
    .cat-badge {
      display: inline-block;
      font-size: 9px;
      color: #e8b86d;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 6px;
      border: 1px solid rgba(232,184,109,0.4);
      padding: 2px 8px;
      border-radius: 50px;
    }

    /* ── TRABAJADORAS ── */
    .seccion-trabajadoras { background: #130710; }
    .worker-card {
      background: #1a0a10;
      border: 1px solid rgba(212,83,126,0.2);
      border-radius: 16px;
      padding: 22px;
      cursor: pointer;
      transition: all 0.25s ease;
      text-decoration: none;
      display: block;
    }
    .worker-card:hover { border-color: #d4537e; transform: translateY(-3px); box-shadow: 0 16px 40px rgba(212,83,126,0.12); }
    .worker-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 15px;
      color: white;
      flex-shrink: 0;
      position: relative;
    }
    .worker-avatar::after {
      content: '✓';
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 16px;
      height: 16px;
      background: #e8b86d;
      border-radius: 50%;
      font-size: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1a0a10;
      font-weight: 800;
    }
    .worker-nombre { font-size: 14px; font-weight: 600; color: #ffffff; }
    .worker-cat { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 2px; }
    .worker-stars { color: #e8b86d; font-size: 12px; letter-spacing: 1px; margin: 12px 0 8px; }
    .worker-desc { font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.7; }
    .worker-dispo {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(212,83,126,0.12);
      border: 1px solid rgba(212,83,126,0.3);
      color: #ffb8d1;
      font-size: 10px;
      padding: 3px 10px;
      border-radius: 50px;
      margin-top: 12px;
    }
    .worker-dispo-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    /* ── SECCIÓN TITULO COMPARTIDA ── */
    .seccion-titulo {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      margin: 0 0 8px;
    }
    .seccion-subtitulo {
      text-align: center;
      color: rgba(255,255,255,0.4);
      font-size: 13px;
      margin: 0 auto 40px;
    }
    .seccion-linea {
      width: 48px;
      height: 2px;
      background: linear-gradient(90deg, #d4537e, #e8b86d);
      margin: 12px auto 20px;
      border-radius: 2px;
    }
  `

  return (
    <>
      <style>{styles}</style>
      <div className="hana-root">
        <Navbar />

        {/* BANNER COMPROMISO */}
        <div className="banner-compromiso">
          <span style={{ fontSize: '13px' }}>⚠️</span>
          <span className="banner-texto">
            Hana requiere verificación de identidad. Sin verificación no puedes contratar ni ofrecer servicios.
          </span>
          <Link to="/compromiso" className="banner-link">Leer Compromiso Hana →</Link>
        </div>

        {/* HERO */}
        <section className="hero" style={{ height: isMobile ? '520px' : '620px' }}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.url})`, opacity: i === slideActual ? 1 : 0 }}
            />
          ))}
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-badge">
              ✦ La plataforma hecha por mujeres, para mujeres
            </div>
            <h1 className="hero-titulo" style={{ fontSize: isMobile ? '36px' : '62px' }}>
              {slides[slideActual].titulo}
            </h1>
            <p className="hero-subtitulo" style={{ fontSize: isMobile ? '15px' : '19px' }}>
              {slides[slideActual].subtitulo}
            </p>
            <p className="hero-desc">
              Conectamos mujeres que buscan servicios de confianza con profesionales verificadas.
            </p>
            <div className="hero-btns">
              <button
                onClick={() => document.getElementById('categorias').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                style={{ padding: isMobile ? '12px 26px' : '14px 34px', fontSize: '15px' }}
              >
                Buscar servicios
              </button>
              <Link
                to="/compromiso?destino=trabajadora"
                className="btn-outline-gold"
                style={{ padding: isMobile ? '12px 26px' : '14px 34px', fontSize: '15px' }}
              >
                Ofrecer mis servicios
              </Link>
            </div>
            <div className="hero-dots">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className="hero-dot"
                  onClick={() => setSlideActual(i)}
                  style={{
                    width: i === slideActual ? '28px' : '7px',
                    backgroundColor: i === slideActual ? slides[slideActual].acento : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="hero-stats" style={{ paddingBottom: '2px' }}>
            {stats.map(s => (
              <div key={s.label} className="hero-stat">
                <div className="hero-stat-num" style={{ fontSize: isMobile ? '22px' : '28px' }}>{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="seccion-pasos" style={{ padding: isMobile ? '52px 24px' : '72px 64px' }}>
          <p style={{ textAlign: 'center', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#d4537e', marginBottom: '12px' }}>
            ¿Cómo funciona?
          </p>
          <h2 className="seccion-titulo" style={{ fontSize: isMobile ? '28px' : '38px' }}>Simple, seguro y rápido</h2>
          <div className="seccion-linea" />
          <div style={{ display: 'flex', gap: isMobile ? '32px' : '0', flexDirection: isMobile ? 'column' : 'row', maxWidth: '900px', margin: '0 auto', flexWrap: 'wrap' }}>
            {pasos.map((paso, i) => (
              <div key={paso.n} className="paso-card" style={{ paddingLeft: i > 0 && !isMobile ? '40px' : '0', marginRight: isMobile ? '0' : '40px' }}>
                {!isMobile && i < pasos.length - 1 && <div className="paso-linea" />}
                <div className="paso-numero">{paso.n}</div>
                <h3 className="paso-titulo" style={{ fontSize: '15px' }}>{paso.titulo}</h3>
                <p className="paso-desc">{paso.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BANNER CTA */}
        <section className="banner-cta" style={{ padding: isMobile ? '48px 24px' : '64px 48px' }}>
          <p className="banner-cta-label">¿Eres profesional?</p>
          <h2 className="banner-cta-titulo" style={{ fontSize: isMobile ? '28px' : '40px' }}>
            Únete a Hana y haz<br />crecer tu negocio
          </h2>
          <p className="banner-cta-desc">
            Miles de clientas te están buscando. Crea tu perfil gratis, verifica tu identidad y empieza hoy.
          </p>
          <Link
            to="/compromiso?destino=trabajadora"
            className="btn-blanco"
            style={{ padding: '14px 36px', fontSize: '15px' }}
          >
            Crear mi perfil gratis →
          </Link>
        </section>

        {/* CATEGORÍAS */}
        <section id="categorias" className="seccion-cats" style={{ padding: isMobile ? '52px 20px' : '72px 48px' }}>
          <p style={{ textAlign: 'center', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#d4537e', marginBottom: '12px' }}>
            Categorías
          </p>
          <h2 className="seccion-titulo" style={{ fontSize: isMobile ? '28px' : '38px' }}>¿Qué servicio necesitas?</h2>
          <div className="seccion-linea" />
          <p className="seccion-subtitulo">8 categorías tradicionales · 9 de empoderamiento</p>

          <div className="cats-tabs">
            {['todas', 'tradicionales', 'empoderamiento'].map(tab => (
              <button
                key={tab}
                className={`cat-tab ${catActiva === tab ? 'activo' : ''}`}
                onClick={() => setCatActiva(tab)}
              >
                {tab === 'todas' ? 'Todas' : tab === 'tradicionales' ? 'Tradicionales' : '★ Empoderamiento'}
              </button>
            ))}
          </div>

          {(catActiva === 'todas' || catActiva === 'tradicionales') && (
            <>
              {catActiva === 'todas' && (
                <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Tradicionales
                </p>
              )}
              <div
                className="cats-grid"
                style={{ gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', marginBottom: catActiva === 'todas' ? '32px' : '0' }}
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
                <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(232,184,109,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
                  ★ Empoderamiento
                </p>
              )}
              <div
                className="cats-grid"
                style={{ gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)' }}
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

        {/* TRABAJADORAS */}
        <section className="seccion-trabajadoras" style={{ padding: isMobile ? '52px 20px' : '72px 48px' }}>
          <p style={{ textAlign: 'center', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#d4537e', marginBottom: '12px' }}>
            Comunidad
          </p>
          <h2 className="seccion-titulo" style={{ fontSize: isMobile ? '28px' : '38px' }}>Profesionales destacadas</h2>
          <div className="seccion-linea" />
          <p className="seccion-subtitulo">Verificadas y valoradas por la comunidad Hana</p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px', maxWidth: '960px', margin: '0 auto' }}>
            {trabajadoras.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', gridColumn: '1/-1', fontSize: '14px' }}>
                Aún no hay profesionales registradas.
              </p>
            ) : (
              trabajadoras.map((w, idx) => {
                const nombre = `${w.usuario?.nombre || ''} ${w.usuario?.apellido || ''}`
                const iniciales = `${w.usuario?.nombre?.charAt(0) || ''}${w.usuario?.apellido?.charAt(0) || ''}`
                const region = w.usuario?.region || ''
                const color = coloresAvatar[idx % coloresAvatar.length]
                return (
                  <Link key={w._id} to={`/worker/${w._id}`} className="worker-card">
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div className="worker-avatar" style={{ backgroundColor: color }}>
                        {iniciales}
                      </div>
                      <div>
                        <div className="worker-nombre">{nombre}</div>
                        <div className="worker-cat">{w.categoria}{region ? ` · ${region}` : ''}</div>
                      </div>
                    </div>
                    <div className="worker-stars">★★★★★</div>
                    <div className="worker-desc">
                      {w.descripcion || 'Profesional verificada en Hana.'}
                    </div>
                    <div className="worker-dispo">
                      <span className="worker-dispo-dot" style={{ backgroundColor: w.disponible ? '#5DCAA5' : '#d4537e' }} />
                      {w.disponible ? 'Disponible' : 'No disponible'}
                    </div>
                  </Link>
                )
              })
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link
              to="/compromiso?destino=trabajadora"
              className="btn-outline-gold"
              style={{ padding: '12px 32px', fontSize: '14px' }}
            >
              Ver todas las profesionales →
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
