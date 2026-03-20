import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const categorias = [
  { icono: '💇', nombre: 'Estética y belleza' },
  { icono: '🧹', nombre: 'Hogar y limpieza' },
  { icono: '📚', nombre: 'Clases y tutorías' },
  { icono: '🍽️', nombre: 'Cocina y catering' },
  { icono: '🧘', nombre: 'Bienestar y salud' },
  { icono: '🐾', nombre: 'Cuidado de mascotas' },
  { icono: '👶', nombre: 'Cuidado infantil' },
  { icono: '💻', nombre: 'Tecnología y diseño' },
]

const trabajadoras = [
  { iniciales: 'CP', nombre: 'Carla Pérez', trabajo: 'Estilista · Santiago', estrellas: 5, desc: 'Especialista en colorimetría y corte. 8 años de experiencia en salones premium.', tag: 'Disponible hoy', color: '#d4537e' },
  { iniciales: 'MR', nombre: 'María Rojas', trabajo: 'Profesora · Las Condes', estrellas: 5, desc: 'Clases de matemáticas y física para enseñanza media y universitaria.', tag: '5 reseñas este mes', color: '#c4892a' },
  { iniciales: 'VL', nombre: 'Valentina Lagos', trabajo: 'Chef · Providencia', estrellas: 4, desc: 'Cocina chilena fusión para eventos, cumpleaños y cenas privadas.', tag: 'Top del mes', color: '#7a3aa8' },
]

function Estrellas({ cantidad }) {
  return (
    <div style={{ color: '#e8b86d', fontSize: '13px', marginBottom: '8px' }}>
      {'★'.repeat(cantidad)}{'☆'.repeat(5 - cantidad)}
    </div>
  )
}

function Home() {
  return (
   <div style={{ backgroundColor: '#2d0a1e', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      {/* HERO */}
      <section style={{
        padding: '80px 48px 64px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 70% 0%, rgba(212,83,126,0.45) 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(232,184,109,0.25) 0%, transparent 50%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '60px', right: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(212,83,126,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '5%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(232,184,109,0.1)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{
          display: 'inline-block',
          background: 'rgba(212,83,126,0.15)',
          border: '1px solid rgba(212,83,126,0.4)',
          color: '#e8a0b8',
          fontSize: '12px',
          padding: '6px 16px',
          borderRadius: '50px',
          marginBottom: '24px',
          letterSpacing: '1px',
        }}>
          ★ La plataforma hecha por y para mujeres
        </div>

        <h1 style={{ fontSize: '52px', fontWeight: '700', lineHeight: '1.2', margin: '0 0 20px' }}>
          Encuentra a la experta<br />
          que <span style={{ color: '#e8b86d' }}>necesitas</span>
        </h1>

        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: '1.7' }}>
          Conectamos mujeres que buscan servicios de confianza con profesionales que los ofrecen. Seguro, simple y empoderador.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{
            backgroundColor: '#d4537e', color: 'white', padding: '14px 32px',
            borderRadius: '50px', textDecoration: 'none', fontSize: '15px', fontWeight: '500',
          }}>
            Buscar servicios
          </Link>
          <Link to="/register-worker" style={{
            backgroundColor: 'transparent', color: '#e8b86d',
            border: '1.5px solid #e8b86d', padding: '14px 32px',
            borderRadius: '50px', textDecoration: 'none', fontSize: '15px', fontWeight: '500',
          }}>
            Ofrecer mis servicios
          </Link>
        </div>

        {/* ESTADÍSTICAS */}
        <div style={{
          display: 'flex', gap: '48px', justifyContent: 'center',
          marginTop: '56px', paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '2.400+', label: 'Profesionales activas' },
            { num: '18', label: 'Categorías de servicio' },
            { num: '4.9★', label: 'Valoración promedio' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#e8b86d' }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS */}
     {/* BANNER LLAMATIVO */}
      <section style={{
        background: 'linear-gradient(135deg, #d4537e 0%, #b83060 40%, #e8b86d 100%)',
        padding: '40px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-40px', left: '-40px',
          width: '180px', height: '180px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', right: '-20px',
          width: '240px', height: '240px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', letterSpacing: '2px', marginBottom: '10px', textTransform: 'uppercase' }}>
          ¿Eres profesional?
        </p>
        <h2 style={{ fontSize: '32px', fontWeight: '700', color: 'white', margin: '0 0 14px', lineHeight: '1.2' }}>
          Únete a Hana y haz crecer tu negocio
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: '1.6' }}>
          Miles de clientas te están buscando. Crea tu perfil gratis, muestra tus servicios y empieza a recibir contactos hoy.
        </p>
        <Link to="/register-worker" style={{
          backgroundColor: 'white',
          color: '#b83060',
          padding: '13px 32px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: '600',
        }}>
          Crear mi perfil gratis →
        </Link>
      </section>

      {/* CATEGORÍAS */}
      <section style={{ padding: '56px 48px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
          ¿Qué servicio necesitas?
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '14px', marginBottom: '36px' }}>
          Explora nuestras categorías más populares
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', maxWidth: '800px', margin: '0 auto' }}>
          {categorias.map((cat) => (
            <div key={cat.nombre} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(212,83,126,0.2)',
              borderRadius: '12px', padding: '20px 14px', textAlign: 'center', cursor: 'pointer',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{cat.icono}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{cat.nombre}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRABAJADORAS DESTACADAS */}
      <section style={{ background: 'rgba(255,255,255,0.02)', padding: '56px 48px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
          Profesionales destacadas
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '14px', marginBottom: '36px' }}>
          Valoradas por la comunidad Hana
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
          {trabajadoras.map((w) => (
            <div key={w.nombre} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '20px',
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  backgroundColor: w.color, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: '600', fontSize: '14px', flexShrink: 0,
                }}>
                  {w.iniciales}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{w.nombre}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{w.trabajo}</div>
                </div>
              </div>
              <Estrellas cantidad={w.estrellas} />
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6' }}>{w.desc}</div>
              <span style={{
                display: 'inline-block', background: 'rgba(212,83,126,0.15)',
                color: '#e8a0b8', fontSize: '11px', padding: '3px 10px',
                borderRadius: '50px', marginTop: '10px',
              }}>
                {w.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '28px 48px', borderTop: '1px solid rgba(255,255,255,0.06)',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <span style={{ fontSize: '20px', fontWeight: '700', color: '#e8b86d' }}>HANA</span>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>Conectando mujeres, construyendo confianza</span>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>© 2025 Hana</span>
      </footer>
    </div>
  )
}

export default Home
