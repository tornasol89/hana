import { Link } from 'react-router-dom'

const trabajadora = {
  nombre: 'Carla Pérez',
  trabajo: 'Estilista profesional',
  categoria: 'Estética y belleza',
  region: 'Metropolitana',
  comuna: 'Providencia, Santiago',
  descripcion: 'Especialista en colorimetría, corte y peinados para eventos. 8 años de experiencia en salones premium. Trabajo con productos de primera calidad y me adapto a todo tipo de cabello.',
  estrellas: 4.9,
  totalReseñas: 84,
  servicios: 98,
  mesesActiva: 14,
  tasaRespuesta: 97,
  verificada: true,
  disponible: true,
  color: '#d4537e',
  iniciales: 'CP',
  metricas: {
    puntualidad: 97,
    confiabilidad: 98,
    calidad: 95,
    comunicacion: 99,
    precio: 92,
  },
  reseñas: [
    { nombre: 'Ana González', estrellas: 5, comentario: 'Llegó puntual, excelente trabajo con el color. Muy profesional y amable. La recomiendo completamente.', fecha: 'Hace 2 días' },
    { nombre: 'María Fuentes', estrellas: 5, comentario: 'Segunda vez que la contrato. Siempre cumple con lo prometido y el resultado es mejor de lo esperado.', fecha: 'Hace 1 semana' },
    { nombre: 'Valentina Díaz', estrellas: 4, comentario: 'Muy buen trabajo, se demoró un poco más de lo estimado pero el resultado fue impecable.', fecha: 'Hace 2 semanas' },
  ],
  certificados: [
    { nombre: 'Colorimetría avanzada', institucion: 'Instituto SENCE' },
    { nombre: 'Técnicas de corte moderno', institucion: 'Academia L\'Oréal' },
  ],
}

function calcularIndice(t) {
  const porVerificacion = t.verificada ? 30 : 0
  const porEvaluaciones = (t.estrellas / 5) * 20
  const porServicios = Math.min(t.servicios / 50, 1) * 20
  const porRespuesta = (t.tasaRespuesta / 100) * 15
  const porAntiguedad = Math.min(t.mesesActiva / 12, 1) * 15
  return Math.round(porVerificacion + porEvaluaciones + porServicios + porRespuesta + porAntiguedad)
}

function Estrellas({ cantidad }) {
  const llenas = Math.floor(cantidad)
  return (
    <span style={{ color: '#e8b86d', fontSize: '14px' }}>
      {'★'.repeat(llenas)}{'☆'.repeat(5 - llenas)}
    </span>
  )
}

function BarraMetrica({ label, valor }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '13px', color: '#cccccc' }}>{label}</span>
        <span style={{ fontSize: '13px', fontWeight: '700', color: '#e8b86d' }}>{valor}%</span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50px', height: '8px' }}>
        <div style={{
          width: `${valor}%`, height: '8px', borderRadius: '50px',
          background: valor >= 95 ? '#d4537e' : valor >= 85 ? '#e8b86d' : '#5DCAA5',
          transition: 'width 0.8s ease',
        }} />
      </div>
    </div>
  )
}

function WorkerProfile() {
  const indice = calcularIndice(trabajadora)

  const colorIndice = indice >= 85 ? '#d4537e' : indice >= 70 ? '#e8b86d' : '#5DCAA5'
  const labelIndice = indice >= 85 ? 'Confianza excepcional' : indice >= 70 ? 'Muy confiable' : 'Confiable'

  return (
    <div style={{ backgroundColor: '#1a0a10', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 48px', backgroundColor: '#000000', borderBottom: '3px solid #d4537e',
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4537e, #e8b86d)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '900', fontSize: '16px', color: 'white',
          }}>H</div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#e8b86d', letterSpacing: '4px' }}>HANA</span>
        </Link>
        <Link to="/" style={{ color: '#cccccc', fontSize: '14px', textDecoration: 'none' }}>← Volver a búsqueda</Link>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

       {/* FOTO HERO */}
        <div style={{
          width: '100%', height: '420px', borderRadius: '16px',
          overflow: 'hidden', marginBottom: '0',
          position: 'relative',
        }}>
          <img
            src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Carla Pérez"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(26,10,16,0.95) 100%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '20px', left: '28px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            {trabajadora.verificada && (
              <span style={{ background: 'rgba(93,202,165,0.9)', color: '#04342C', fontSize: '12px', padding: '4px 12px', borderRadius: '50px', fontWeight: '700' }}>
                ✓ Identidad verificada
              </span>
            )}
            <span style={{
              background: trabajadora.disponible ? 'rgba(93,202,165,0.9)' : 'rgba(136,135,128,0.9)',
              color: trabajadora.disponible ? '#04342C' : '#ffffff',
              fontSize: '12px', padding: '4px 12px', borderRadius: '50px', fontWeight: '700',
            }}>
              {trabajadora.disponible ? '● Disponible ahora' : '● No disponible'}
            </span>
          </div>
        </div>

        {/* HEADER PERFIL */}
        <div style={{
          background: '#2d0a1e', border: '1px solid #d4537e',
          borderRadius: '0 0 16px 16px', padding: '24px 32px 32px',
          marginBottom: '24px',
          display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px' }}>{trabajadora.nombre}</h1>
            <p style={{ fontSize: '15px', color: '#e8b86d', margin: '0 0 4px', fontWeight: '600' }}>{trabajadora.trabajo}</p>
            <p style={{ fontSize: '13px', color: '#cccccc', margin: '0 0 10px' }}>📍 {trabajadora.comuna} · {trabajadora.categoria}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Estrellas cantidad={trabajadora.estrellas} />
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#e8b86d' }}>{trabajadora.estrellas}</span>
              <span style={{ fontSize: '13px', color: '#cccccc' }}>({trabajadora.totalReseñas} reseñas)</span>
            </div>
            <p style={{ fontSize: '14px', color: '#dddddd', lineHeight: '1.7', margin: 0 }}>{trabajadora.descripcion}</p>
          </div>

          {/* ÍNDICE DE CONFIANZA */}
          <div style={{
            background: '#1a0a10', border: `2px solid ${colorIndice}`,
            borderRadius: '16px', padding: '20px', textAlign: 'center',
            minWidth: '140px', flexShrink: 0,
          }}>
            <div style={{ fontSize: '11px', color: '#cccccc', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Índice Hana
            </div>
            <div style={{ fontSize: '52px', fontWeight: '900', color: colorIndice, lineHeight: 1 }}>
              {indice}
            </div>
            <div style={{ fontSize: '11px', color: colorIndice, marginTop: '6px', fontWeight: '600' }}>
              {labelIndice}
            </div>
            <div style={{ marginTop: '12px', fontSize: '10px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6' }}>
              Verificación · Evaluaciones<br />Servicios · Respuesta · Antigüedad
            </div>
          </div>
        </div>
          

        {/* MÉTRICAS + ESTADÍSTICAS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>

          {/* MÉTRICAS */}
          <div style={{ background: '#2d0a1e', border: '1px solid rgba(212,83,126,0.3)', borderRadius: '14px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '0 0 20px' }}>Valoraciones detalladas</h3>
            <BarraMetrica label="Puntualidad" valor={trabajadora.metricas.puntualidad} />
            <BarraMetrica label="Confiabilidad" valor={trabajadora.metricas.confiabilidad} />
            <BarraMetrica label="Calidad del trabajo" valor={trabajadora.metricas.calidad} />
            <BarraMetrica label="Comunicación" valor={trabajadora.metricas.comunicacion} />
            <BarraMetrica label="Precio justo" valor={trabajadora.metricas.precio} />
          </div>

          {/* ESTADÍSTICAS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { num: trabajadora.servicios, label: 'Servicios completados' },
              { num: `${trabajadora.tasaRespuesta}%`, label: 'Tasa de respuesta' },
              { num: `${trabajadora.mesesActiva} meses`, label: 'En la plataforma' },
              { num: trabajadora.totalReseñas, label: 'Reseñas recibidas' },
            ].map((s) => (
              <div key={s.label} style={{
                background: '#2d0a1e', border: '1px solid rgba(212,83,126,0.3)',
                borderRadius: '10px', padding: '16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '13px', color: '#cccccc' }}>{s.label}</span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#e8b86d' }}>{s.num}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICADOS */}
        {trabajadora.certificados.length > 0 && (
          <div style={{ background: '#2d0a1e', border: '1px solid rgba(212,83,126,0.3)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '0 0 16px' }}>Certificados y capacitaciones</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {trabajadora.certificados.map((cert) => (
                <div key={cert.nombre} style={{
                  background: 'rgba(232,184,109,0.1)', border: '1px solid #e8b86d',
                  borderRadius: '10px', padding: '12px 16px',
                }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#e8b86d' }}>🎓 {cert.nombre}</div>
                  <div style={{ fontSize: '11px', color: '#cccccc', marginTop: '2px' }}>{cert.institucion}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESEÑAS */}
        <div style={{ background: '#2d0a1e', border: '1px solid rgba(212,83,126,0.3)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '0 0 16px' }}>Reseñas de clientas</h3>
          {trabajadora.reseñas.map((r) => (
            <div key={r.nombre} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '16px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#d4537e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>
                    {r.nombre.charAt(0)}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>{r.nombre}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Estrellas cantidad={r.estrellas} />
                  <span style={{ fontSize: '12px', color: '#888780' }}>{r.fecha}</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#dddddd', lineHeight: '1.6', margin: 0 }}>{r.comentario}</p>
            </div>
          ))}
        </div>

        {/* BOTÓN CONTACTAR */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/login" style={{
            backgroundColor: '#d4537e', color: 'white',
            padding: '16px 40px', borderRadius: '50px',
            textDecoration: 'none', fontSize: '16px', fontWeight: '700',
          }}>
            Solicitar reserva
          </Link>
          <Link to="/" style={{
            backgroundColor: 'transparent', color: '#e8b86d',
            border: '2px solid #e8b86d', padding: '16px 40px',
            borderRadius: '50px', textDecoration: 'none',
            fontSize: '16px', fontWeight: '600',
          }}>
            ← Volver
          </Link>
        </div>

      </div>
    </div>
  )
}

export default WorkerProfile