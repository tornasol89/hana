import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const slides = [
  {
    url: 'https://images.pexels.com/photos/7600944/pexels-photo-7600944.jpeg?auto=compress&cs=tinysrgb&w=1200',
    titulo: 'Mecánica automotriz',
    subtitulo: 'Mujeres expertas en el taller',
  },
  {
    url: 'https://images.pexels.com/photos/4099263/pexels-photo-4099263.jpeg?auto=compress&cs=tinysrgb&w=1200',
    titulo: 'Hogar y limpieza',
    subtitulo: 'Confianza y calidad garantizada',
  },
  {
    url: 'https://images.pexels.com/photos/7496747/pexels-photo-7496747.jpeg?auto=compress&cs=tinysrgb&w=1200',
    titulo: 'Diseño y tecnología',
    subtitulo: 'Creatividad y talento femenino',
  },
  {
    url: 'https://images.pexels.com/photos/5641761/pexels-photo-5641761.jpeg?auto=compress&cs=tinysrgb&w=1200',
    titulo: 'Construcción y pintura',
    subtitulo: 'Mujeres construyendo el futuro',
  },
  {
    url: 'https://images.pexels.com/photos/6195291/pexels-photo-6195291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    titulo: 'Oficios técnicos',
    subtitulo: 'Rompiendo barreras, resolviendo problemas',
  },
]

const categorias = [
  { icono: '💇', nombre: 'Estética y belleza' },
  { icono: '🧹', nombre: 'Hogar y limpieza' },
  { icono: '📚', nombre: 'Clases y tutorías' },
  { icono: '🍽️', nombre: 'Cocina y catering' },
  { icono: '🧘', nombre: 'Bienestar y salud' },
  { icono: '🐾', nombre: 'Cuidado de mascotas' },
  { icono: '👶', nombre: 'Cuidado infantil' },
  { icono: '💻', nombre: 'Tecnología y diseño' },
  { icono: '🔧', nombre: 'Gasfitería' },
  { icono: '⚡', nombre: 'Electricidad' },
  { icono: '🚗', nombre: 'Mecánica' },
  { icono: '🪚', nombre: 'Carpintería' },
  { icono: '🏠', nombre: 'Plomería' },
  { icono: '🎨', nombre: 'Pintura de interiores' },
  { icono: '📦', nombre: 'Mudanzas y fletes' },
  { icono: '🌿', nombre: 'Jardinería' },
]

const trabajadoras = [
  { iniciales: 'CP', nombre: 'Carla Pérez', trabajo: 'Estilista · Santiago', estrellas: 5, desc: 'Especialista en colorimetría y corte. 8 años de experiencia en salones premium.', tag: 'Disponible hoy', color: '#d4537e' },
  { iniciales: 'MR', nombre: 'María Rojas', trabajo: 'Profesora · Las Condes', estrellas: 5, desc: 'Clases de matemáticas y física para enseñanza media y universitaria.', tag: '5 reseñas este mes', color: '#c4892a' },
  { iniciales: 'VL', nombre: 'Valentina Lagos', trabajo: 'Chef · Providencia', estrellas: 4, desc: 'Cocina chilena fusión para eventos, cumpleaños y cenas privadas.', tag: 'Top del mes', color: '#7a3aa8' },
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

function useCarrusel(total, intervalo = 4000) {
  const [actual, setActual] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setActual(prev => (prev + 1) % total)
    }, intervalo)
    return () => clearInterval(timer)
  }, [total, intervalo])
  return [actual, setActual]
}

function Estrellas({ cantidad }) {
  return (
    <div style={{ color: '#e8b86d', fontSize: '13px', marginBottom: '8px' }}>
      {'★'.repeat(cantidad)}{'☆'.repeat(5 - cantidad)}
    </div>
  )
}

function Home() {
  const isMobile = useIsMobile()
  const [slideActual, setSlideActual] = useCarrusel(slides.length)

  return (
    <div style={{ backgroundColor: '#1a0a10', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isMobile ? '14px 20px' : '16px 48px',
        backgroundColor: '#000000', borderBottom: '3px solid #d4537e',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4537e, #e8b86d)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '900', fontSize: '16px', color: 'white',
          }}>H</div>
          <span style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '800', color: '#e8b86d', letterSpacing: '4px' }}>HANA</span>
        </div>
        {!isMobile && (
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Servicios</span>
            <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Profesionales</span>
            <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Cómo funciona</span>
            <Link to="/login" style={{ backgroundColor: '#d4537e', color: 'white', padding: '9px 22px', borderRadius: '50px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Ingresar</Link>
          </div>
        )}
        {isMobile && (
          <Link to="/login" style={{ backgroundColor: '#d4537e', color: 'white', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>Ingresar</Link>
        )}
      </nav>

      {/* HERO CON CARRUSEL */}
      <section style={{ position: 'relative', height: isMobile ? '420px' : '560px', overflow: 'hidden' }}>

        {slides.map((slide, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${slide.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === slideActual ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }} />
        ))}

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,10,16,0.55) 0%, rgba(26,10,16,0.75) 100%)',
        }} />

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: isMobile ? '20px' : '48px',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-block', background: 'rgba(212,83,126,0.25)',
            border: '1px solid #d4537e', color: '#ffb8d1', fontSize: '12px',
            padding: '6px 16px', borderRadius: '50px', marginBottom: '20px', letterSpacing: '1px',
          }}>
            ★ La plataforma hecha por y para mujeres
          </div>

          <h1 style={{ fontSize: isMobile ? '30px' : '52px', fontWeight: '800', lineHeight: '1.2', margin: '0 0 12px', color: '#ffffff' }}>
            {slides[slideActual].titulo}
          </h1>
          <p style={{ fontSize: isMobile ? '15px' : '18px', color: 'rgba(255,255,255,0.85)', margin: '0 0 8px' }}>
            {slides[slideActual].subtitulo}
          </p>
          <p style={{ fontSize: isMobile ? '13px' : '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '480px', margin: '0 auto 28px', lineHeight: '1.7' }}>
            Conectamos mujeres que buscan servicios de confianza con profesionales que los ofrecen.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{
              backgroundColor: '#d4537e', color: '#ffffff',
              padding: isMobile ? '12px 24px' : '14px 32px',
              borderRadius: '50px', textDecoration: 'none', fontSize: '15px', fontWeight: '600',
            }}>Buscar servicios</Link>
            <Link to="/register-worker" style={{
              backgroundColor: 'transparent', color: '#e8b86d',
              border: '2px solid #e8b86d',
              padding: isMobile ? '12px 24px' : '14px 32px',
              borderRadius: '50px', textDecoration: 'none', fontSize: '15px', fontWeight: '600',
            }}>Ofrecer mis servicios</Link>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '28px' }}>
            {slides.map((_, i) => (
              <div key={i} onClick={() => setSlideActual(i)} style={{
                width: i === slideActual ? '24px' : '8px',
                height: '8px', borderRadius: '50px',
                backgroundColor: i === slideActual ? '#d4537e' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          display: 'flex', gap: isMobile ? '24px' : '48px', justifyContent: 'center',
          padding: '16px 48px',
          background: 'rgba(26,10,16,0.7)',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '2.400+', label: 'Profesionales activas' },
            { num: '18', label: 'Categorías de servicio' },
            { num: '4.9★', label: 'Valoración promedio' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: '800', color: '#e8b86d' }}>{s.num}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #d4537e 0%, #b83060 40%, #e8b86d 100%)',
        padding: isMobile ? '32px 20px' : '40px 48px', textAlign: 'center',
      }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', marginBottom: '10px', textTransform: 'uppercase' }}>
          ¿Eres profesional?
        </p>
        <h2 style={{ fontSize: isMobile ? '22px' : '32px', fontWeight: '800', color: '#ffffff', margin: '0 0 14px' }}>
          Únete a Hana y haz crecer tu negocio
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.95)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: '1.6' }}>
          Miles de clientas te están buscando. Crea tu perfil gratis y empieza hoy.
        </p>
        <Link to="/register-worker" style={{ backgroundColor: 'white', color: '#b83060', padding: '13px 32px', borderRadius: '50px', textDecoration: 'none', fontSize: '15px', fontWeight: '700' }}>
          Crear mi perfil gratis →
        </Link>
      </section>

      {/* CATEGORÍAS */}
      <section style={{ padding: isMobile ? '40px 20px' : '56px 48px', backgroundColor: '#1a0a10' }}>
        <h2 style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: '800', textAlign: 'center', marginBottom: '8px', color: '#ffffff' }}>
          ¿Qué servicio necesitas?
        </h2>
        <p style={{ textAlign: 'center', color: '#cccccc', fontSize: '14px', marginBottom: '16px' }}>
          8 categorías tradicionales + 8 de empoderamiento
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '14px', maxWidth: '860px', margin: '0 auto' }}>
          {categorias.map((cat, i) => (
            <div key={cat.nombre} style={{
              background: i >= 8 ? 'rgba(212,83,126,0.1)' : '#2d0a1e',
              border: i >= 8 ? '1px solid #d4537e' : '1px solid rgba(212,83,126,0.3)',
              borderRadius: '12px', padding: '20px 14px', textAlign: 'center', cursor: 'pointer',
            }}>
              <div style={{ fontSize: '26px', marginBottom: '8px' }}>{cat.icono}</div>
              <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: '500' }}>{cat.nombre}</div>
              {i >= 8 && <div style={{ fontSize: '10px', color: '#e8b86d', marginTop: '4px' }}>★ Nuevo</div>}
            </div>
          ))}
        </div>
      </section>

      {/* TRABAJADORAS */}
      <section style={{ backgroundColor: '#2d0a1e', padding: isMobile ? '40px 20px' : '56px 48px' }}>
        <h2 style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: '800', textAlign: 'center', marginBottom: '8px', color: '#ffffff' }}>
          Profesionales destacadas
        </h2>
        <p style={{ textAlign: 'center', color: '#cccccc', fontSize: '14px', marginBottom: '36px' }}>
          Valoradas por la comunidad Hana
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
          {trabajadoras.map((w) => (
            <div key={w.nombre} style={{ background: '#1a0a10', border: '1px solid #d4537e', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: w.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', color: 'white', flexShrink: 0 }}>{w.iniciales}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>{w.nombre}</div>
                  <div style={{ fontSize: '11px', color: '#cccccc', marginTop: '2px' }}>{w.trabajo}</div>
                </div>
              </div>
              <Estrellas cantidad={w.estrellas} />
              <div style={{ fontSize: '12px', color: '#dddddd', lineHeight: '1.6' }}>{w.desc}</div>
              <span style={{ display: 'inline-block', background: 'rgba(212,83,126,0.25)', color: '#ffb8d1', fontSize: '11px', padding: '3px 10px', borderRadius: '50px', marginTop: '10px', border: '1px solid #d4537e' }}>{w.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        display: 'flex', justifyContent: isMobile ? 'center' : 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center', textAlign: isMobile ? 'center' : 'left',
        padding: isMobile ? '24px 20px' : '28px 48px',
        backgroundColor: '#000000', borderTop: '2px solid #d4537e', gap: '12px',
      }}>
        <span style={{ fontSize: '20px', fontWeight: '800', color: '#e8b86d' }}>HANA</span>
        <span style={{ fontSize: '12px', color: '#cccccc' }}>Conectando mujeres, construyendo confianza</span>
        <span style={{ fontSize: '12px', color: '#cccccc' }}>© 2025 Hana</span>
      </footer>

    </div>
  )
}

export default Home