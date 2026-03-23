import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import './WorkerProfile.css'

const API_URL = 'http://localhost:5000/api'

function WorkerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [perfil, setPerfil] = useState(null)
  const [reviews, setReviews] = useState([])
  const [promedio, setPromedio] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const usuarioLogueadoJSON = localStorage.getItem('usuario')
  const usuarioLogueado = usuarioLogueadoJSON ? JSON.parse(usuarioLogueadoJSON) : null

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        setCargando(true)
        setError(null)

        const response = await fetch(`${API_URL}/workers/${id}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.message || 'No se pudo cargar el perfil')
        }

        const worker = data.worker || data
        setPerfil(worker)
        setReviews(Array.isArray(data.reviews) ? data.reviews : [])
        setPromedio(Number(data.averageRating) || 0)
      } catch (err) {
        console.error('Error cargando perfil:', err)
        setError(err.message || 'Error al cargar perfil')
      } finally {
        setCargando(false)
      }
    }

    cargarPerfil()
  }, [id])

  const nombreCompleto = useMemo(() => {
    if (!perfil) return ''
    const nombre = perfil.usuario?.nombre || ''
    const apellido = perfil.usuario?.apellido || ''
    return `${nombre} ${apellido}`.trim() || 'Profesional Hana'
  }, [perfil])

  const iniciales = useMemo(() => {
    if (!perfil) return 'H'
    const nombre = perfil.usuario?.nombre?.charAt(0) || ''
    const apellido = perfil.usuario?.apellido?.charAt(0) || ''
    return `${nombre}${apellido}`.toUpperCase() || 'H'
  }, [perfil])

  const categoria = perfil?.categoria || 'Especialidad no definida'
  const ubicacion =
    [perfil?.usuario?.comuna, perfil?.usuario?.region].filter(Boolean).join(', ') ||
    'Ubicación no disponible'

  const descripcion =
    perfil?.descripcion?.trim() || 'La trabajadora no ha añadido una descripción de su servicio.'

  const foto = perfil?.foto || perfil?.photoUrl || ''

  const indiceHana = promedio > 0 ? Math.round(promedio * 20) : 0

  const esMiPerfil =
    usuarioLogueado &&
    (usuarioLogueado.id === perfil?.usuario?._id ||
      usuarioLogueado._id === perfil?.usuario?._id)

  const valoraciones = [
    { nombre: 'Puntualidad', valor: 0 },
    { nombre: 'Confiabilidad', valor: 0 },
    { nombre: 'Calidad del trabajo', valor: 0 },
    { nombre: 'Comunicación', valor: 0 },
    { nombre: 'Precio justo', valor: 0 },
  ]

  if (cargando) {
    return <div className="worker-profile-state">Cargando perfil...</div>
  }

  if (error) {
    return <div className="worker-profile-state error">Error: {error}</div>
  }

  if (!perfil) {
    return <div className="worker-profile-state error">No se encontró la profesional.</div>
  }

  return (
    <div className="worker-profile-page">
      <div className="worker-profile-container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Volver
        </button>

        <header className="profile-header">
          <div className="profile-avatar-block">
            <div className="profile-photo-wrapper">
              {foto ? (
                <img src={foto} alt={nombreCompleto} className="profile-image" />
              ) : (
                <div className="profile-initials">{iniciales}</div>
              )}

              <span
                className={`status-dot ${perfil?.disponible ? 'available' : 'unavailable'}`}
                title={perfil?.disponible ? 'Disponible' : 'No disponible'}
              />
            </div>
          </div>

          <div className="profile-main-info">
            <h1>{nombreCompleto}</h1>
            <p className="specialty">{categoria.toUpperCase()}</p>

            <div className="location">
              <MapPinIcon className="icon-map" />
              <span>{ubicacion}</span>
            </div>

            <div className="rating-info">
              <StarIcon className="icon-star" />
              <span className="stars-text">★★★★★</span>
              <span className="rating-number">{promedio.toFixed(1)}</span>
              <span className="reviews-count">({reviews.length} reseñas)</span>
            </div>
          </div>

          <div className="hana-index-box">
            <p className="hana-label">ÍNDICE HANA</p>
            <span className="hana-value">{indiceHana}</span>
            <p className="hana-status">{indiceHana >= 70 ? 'Confiable' : 'Por evaluar'}</p>
          </div>
        </header>

        <section className="profile-sections">
          <div className="services-details">
            <h2>Valoraciones detalladas</h2>

            {valoraciones.map((item) => (
              <div key={item.nombre} className="detail-row">
                <div className="detail-row-top">
                  <span>{item.nombre}</span>
                  <span>{item.valor}%</span>
                </div>

                <div className="bar-container">
                  <div className="bar-fill" style={{ width: `${item.valor}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="booking-info">
            <div className="stat-card">
              <span>Servicios completados</span>
              <span className="value">0</span>
            </div>

            <div className="stat-card">
              <span>Tasa de respuesta</span>
              <span className="value">100%</span>
            </div>

            <div className="stat-card">
              <span>Tarifa</span>
              <span className="value">A convenir</span>
            </div>

            <div className="stat-card">
              <span>Reseñas recibidas</span>
              <span className="value">{reviews.length}</span>
            </div>
          </div>
        </section>

        <section className="about-service">
          <h2>Sobre mi servicio</h2>
          <p>{descripcion}</p>
        </section>

        <section className="client-reviews">
          <h2>Reseñas de clientas</h2>

          {reviews.length === 0 ? (
            <p className="no-reviews">Aún no hay reseñas.</p>
          ) : (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <p>{review.comentario || 'Sin comentario'}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="profile-actions">
          {!esMiPerfil && (
            <button className="booking-button">Solicitar reserva</button>
          )}

          <button onClick={() => navigate(-1)} className="back-outline-button">
            ← Volver
          </button>
        </footer>
      </div>
    </div>
  )
}

export default WorkerProfile