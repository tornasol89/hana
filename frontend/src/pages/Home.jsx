import { Link } from 'react-router-dom'

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
    <div style={{ backgroundColor: '#1a0a10', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>

      {/* NAVBAR con fondo sólido negro */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 48px',
        backgroundColor: '#000000',
        borderBottom: '3px solid #d4537e',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4537e, #e8b86d)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '900', fontSize: '16px', color: 'white',
          }}>H</div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#e8b86d', letterSpacing: '4px' }}>
            HANA
          </span>
        </div>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Servicios</span>
          <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Profesionales</span>
          <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Cómo funciona</span>
          <Link to="/login" style={{
            backgroundColor: '#d4537e', color: 'white',
            padding: '9px 22px', borderRadius: '50px',
            textDecoration: 'none', fontSize: '14px', fontWeight: '600',
          }}>Ingresar</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        padding: '80px 48px 64px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 70% 0%, rgba(212,83,126,0.35) 0%, transparent 60%), #1a0a10',
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(212,83,126,0.2)',
          border: '1px solid #d4537e',
          color: '#ffb8d1',
          fontSize: '12px',
          padding: '6px 16px',
          borderRadius: '50px',
          marginBottom: '24px',
          letterSpacing: '1px',
        }}>
          ★ La plataforma hecha por y para mujeres
        </div>

        <h1 style={{ fontSize: '52px', fontWeight: '800', lineHeight: '1.2', margin: '0 0 20px', color: '#ffffff' }}>
          Encuentra a la experta<br />
          que <span style={{ color: '#e8b86d' }}>necesitas</span>
        </h1>

        <p style={{ fontSize: '17px', color: '#dddddd', maxWidth: '480px', margin: '0 auto 36px', lineHeight: '1.7' }}>
          Conectamos mujeres que buscan servicios de confianza con profesionales que los ofrecen. Seguro, simple y empoderador.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{
            backgroundColor: '#d4537e', color: '#ffffff',
            padding: '14px 32px', borderRadius: '50px',
            textDecoration: 'none', fontSize: '15px', fontWeight: '600',
          }}>Buscar servicios</Link>
          <Link to="/register-worker" style={{
            backgroundColor: 'transparent', color: '#e8b86d',
            border: '2px solid #e8b86d', padding: '14px 32px',
            borderRadius: '50px', textDecoration: 'none',
            fontSize: '15px', fontWeight: '600',
          }}>Ofrecer mis servicios</Link>
        </div>

        <div style={{
          display: 'flex', gap: '48px', justifyContent: 'center',
          marginTop: '56px', paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '2.400+', label: 'Profesionales activas' },
            { num: '18', label: 'Categorías de servicio' },
            { num: '4.9★', label: 'Valoración promedio' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#e8b86d' }}>{s.num}</div>
              <div style={{ fontSize: '13px', color: '#cccccc', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #d4537e 0%, #b83060 40%, #e8b86d 100%)',
        padding: '40px 48px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', marginBottom: '10px', textTransform: 'uppercase' }}>
          ¿Eres profesional?
        </p>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', margin: '0 0 14px' }}>
          Únete a Hana y haz crecer tu negocio
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.95)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: '1.6' }}>
          Miles de clientas te están buscando. Crea tu perfil gratis y empieza hoy.
        </p>
        <Link to="/register-worker" style={{
          backgroundColor: 'white', color: '#b83060',
          padding: '13px 32px', borderRadius: '50px',
          textDecoration: 'none', fontSize: '15px', fontWeight: '700',
        }}>Crear mi perfil gratis →</Link>
      </section>

      {/* CATEGORÍAS */}
      <section style={{ padding: '56px 48px', backgroundColor: '#1a0a10' }}>
        <h2 style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', marginBottom: '8px', color: '#ffffff' }}>
          ¿Qué servicio necesitas?
        </h2>
        <p style={{ textAlign: 'center', color: '#cccccc', fontSize: '14px', marginBottom: '36px' }}>
          Explora nuestras categorías más populares
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', maxWidth: '800px', margin: '0 auto' }}>
          {categorias.map((cat) => (
            <div key={cat.nombre} style={{
              background: '#2d0a1e',
              border: '1px solid #d4537e',
              borderRadius: '12px', padding: '20px 14px', textAlign: 'center', cursor: 'pointer',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{cat.icono}</div>
              <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: '500' }}>{cat.nombre}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRABAJADORAS */}
      <section style={{ backgroundColor: '#2d0a1e', padding: '56px 48px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', marginBottom: '8px', color: '#ffffff' }}>
          Profesionales destacadas
        </h2>
        <p style={{ textAlign: 'center', color: '#cccccc', fontSize: '14px', marginBottom: '36px' }}>
          Valoradas por la comunidad Hana
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
          {trabajadoras.map((w) => (
            <div key={w.nombre} style={{
              background: '#1a0a10',
              border: '1px solid #d4537e',
              borderRadius: '14px', padding: '20px',
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  backgroundColor: w.color, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: '700', fontSize: '14px',
                  color: 'white', flexShrink: 0,
                }}>{w.iniciales}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>{w.nombre}</div>
                  <div style={{ fontSize: '11px', color: '#cccccc', marginTop: '2px' }}>{w.trabajo}</div>
                </div>
              </div>
              <Estrellas cantidad={w.estrellas} />
              <div style={{ fontSize: '12px', color: '#dddddd', lineHeight: '1.6' }}>{w.desc}</div>
              <span style={{
                display: 'inline-block', background: 'rgba(212,83,126,0.25)',
                color: '#ffb8d1', fontSize: '11px', padding: '3px 10px',
                borderRadius: '50px', marginTop: '10px', border: '1px solid #d4537e',
              }}>{w.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '28px 48px', backgroundColor: '#000000',
        borderTop: '2px solid #d4537e', flexWrap: 'wrap', gap: '12px',
      }}>
        <span style={{ fontSize: '20px', fontWeight: '800', color: '#e8b86d' }}>HANA</span>
        <span style={{ fontSize: '12px', color: '#cccccc' }}>Conectando mujeres, construyendo confianza</span>
        <span style={{ fontSize: '12px', color: '#cccccc' }}>© 2025 Hana</span>
      </footer>

    </div>
  )
}

export default Home