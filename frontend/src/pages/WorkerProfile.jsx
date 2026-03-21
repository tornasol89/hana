import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function calcularIndice(perfil) {
  const porVerificacion = perfil.usuario?.verificada ? 30 : 0
  const porEvaluaciones = (perfil.estrellas / 5) * 20
  const porServicios = Math.min(perfil.serviciosCompletados / 50, 1) * 20
  const porRespuesta = (perfil.tasaRespuesta / 100) * 15
  const mesesActiva = perfil.createdAt
    ? Math.floor((Date.now() - new Date(perfil.createdAt)) / (1000 * 60 * 60 * 24 * 30))
    : 0
  const porAntiguedad = Math.min(mesesActiva / 12, 1) * 15
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
  const { id } = useParams()
  const [perfil, setPerfil] = useState(null)
  const [reviews, setReviews] = useState([])
  const [promedio, setPromedio] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true)

        // Cargar perfil de trabajadora
        const { data: perfilData } = await axios.get(`http://localhost:5000/api/workers/${id}`)
        setPerfil(perfilData)

        // Cargar reviews usando el ID del usuario
        const { data: reviewsData } = await axios.get(`http://localhost:5000/api/reviews/${perfilData.usuario._id}`)
        setReviews(reviewsData.reviews)
        setPromedio(reviewsData.promedio)

      } catch (err) {
        setError('No se pudo cargar el perfil')
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [id])

  if (cargando) return (
    <div style={{ backgroundColor: '#1a0a10', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#e8b86d', fontSize: '18px' }}>Cargando perfil...</p>
    </div>
  )

  if (error || !perfil) return (
    <div style={{ backgroundColor: '#1a0a10', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <p style={{ color: '#d4537e', fontSize: '18px' }}>{error || 'Perfil no encontrado'}</p>
      <Link to="/" style={{ color: '#e8b86d' }}>← Volver al inicio</Link>
    </div>
  )

  const indice = calcularIndice(perfil)
  const colorIndice = indice >= 85 ? '#d4537e' : indice >= 70 ? '#e8b86d' : '#5DCAA5'
  const labelIndice = indice >= 85 ? 'Confianza excepcional' : indice >= 70 ? 'Muy confiable' : 'Confiable'
  const nombreCompleto = `${perfil.usuario?.nombre} ${perfil.usuario?.apellido}`

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
        <Link to="/" style={{ color: '#cccccc', fontSize: '14px', textDecoration: 'none' }}>← Volver</Link>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 20px' }}>

        {/* BADGE DISPONIBLE */}
        <div style={{ marginBottom: '12px' }}>
          <span style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: '600',
            background: perfil.disponible ? 'rgba(93,202,165,0.15)' : 'rgba(255,255,255,0.07)',
            color: perfil.disponible ? '#5DCAA5' : '#888',
            border: `1px solid ${perfil.disponible ? '#5DCAA5' : '#555'}`,
          }}>
            {perfil.disponible ? '● Disponible ahora' : '● No disponible'}
          </span>
        </div>

        {/* HEADER PERFIL */}
        <div style={{
          background: '#2d0a1e', border: '1px solid #d4537e',
          borderRadius: '16px', padding: '24px 32px 32px',
          marginBottom: '24px',
          display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px' }}>{nombreCompleto}</h1>
            <p style={{ fontSize: '15px', color: '#e8b86d', margin: '0 0 4px', fontWeight: '600' }}>{perfil.categoria}</p>
            <p style={{ fontSize: '13px', color: '#cccccc', margin: '0 0 10px' }}>
              📍 {perfil.usuario?.comuna}, {perfil.usuario?.region}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Estrellas cantidad={Number(promedio)} />
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#e8b86d' }}>{promedio}</span>
              <span style={{ fontSize: '13px', color: '#cccccc' }}>({reviews.length} reseñas)</span>
            </div>
            <p style={{ fontSize: '14px', color: '#dddddd', lineHeight: '1.7', margin: 0 }}>{perfil.descripcion}</p>
          </div>

          {/* ÍNDICE DE CONFIANZA */}
          <div style={{
            background: '#1a0a10', border: `2px solid ${colorIndice}`,
            borderRadius: '16px', padding: '20px', textAlign: 'center', minWidth: '140px', flexShrink: 0,
          }}>
            <div style={{ fontSize: '11px', color: '#cccccc', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>Índice Hana</div>
            <div style={{ fontSize: '52px', fontWeight: '900', color: colorIndice, lineHeight: 1 }}>{indice}</div>
            <div style={{ fontSize: '11px', color: colorIndice, marginTop: '6px', fontWeight: '600' }}>{labelIndice}</div>
            <div style={{ marginTop: '12px', fontSize: '10px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6' }}>
              Verificación · Evaluaciones<br />Servicios · Respuesta · Antigüedad
            </div>
          </div>
        </div>

        {/* MÉTRICAS + ESTADÍSTICAS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div style={{ background: '#2d0a1e', border: '1px solid rgba(212,83,126,0.3)', borderRadius: '14px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '0 0 20px' }}>Valoraciones detalladas</h3>
            <BarraMetrica label="Puntualidad" valor={perfil.metricas?.puntualidad || 0} />
            <BarraMetrica label="Confiabilidad" valor={perfil.metricas?.confiabilidad || 0} />
            <BarraMetrica label="Calidad del trabajo" valor={perfil.metricas?.calidad || 0} />
            <BarraMetrica label="Comunicación" valor={perfil.metricas?.comunicacion || 0} />
            <BarraMetrica label="Precio justo" valor={perfil.metricas?.precio || 0} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { num: perfil.serviciosCompletados, label: 'Servicios completados' },
              { num: `${perfil.tasaRespuesta}%`, label: 'Tasa de respuesta' },
              { num: perfil.tarifaHora ? `$${perfil.tarifaHora}/hr` : 'A convenir', label: 'Tarifa' },
              { num: reviews.length, label: 'Reseñas recibidas' },
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
        {perfil.certificados?.length > 0 && (
          <div style={{ background: '#2d0a1e', border: '1px solid rgba(212,83,126,0.3)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '0 0 16px' }}>Certificados y capacitaciones</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {perfil.certificados.map((cert) => (
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
          {reviews.length === 0 ? (
            <p style={{ color: '#888', fontSize: '14px' }}>Aún no hay reseñas para esta trabajadora.</p>
          ) : (
            reviews.map((r) => (
              <div key={r._id} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#d4537e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>
                      {r.autor?.nombre?.charAt(0)}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>{r.autor?.nombre} {r.autor?.apellido}</span>
                  </div>
                  <Estrellas cantidad={r.estrellas} />
                </div>
                <p style={{ fontSize: '13px', color: '#dddddd', lineHeight: '1.6', margin: 0 }}>{r.comentario}</p>
              </div>
            ))
          )}
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
            ← Volver al inicio
          </Link>
        </div>

      </div>
    </div>
  )
}

export default WorkerProfile