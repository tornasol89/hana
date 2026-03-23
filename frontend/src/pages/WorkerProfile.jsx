import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CameraIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
// Asegúrate de tener este archivo de estilos

// URL Base apuntando al puerto 5000 que vimos que funciona
const API_URL = 'http://localhost:5000/api';

function WorkerProfile() {
  const { id } = useParams(); // El ID de la trabajadora de la URL
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Referencia para el input de archivo oculto

  // Estados
  const [perfil, setPerfil] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [promedio, setPromedio] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [subiendoPhoto, setSubiendoPhoto] = useState(false);

  // --- CORRECCIÓN DE LOGICA ---
  // Recuperamos el usuario logueado del localStorage (donde lo guardaste al iniciar sesión)
  const usuarioLogueadoJSON = localStorage.getItem('usuario');
  const usuarioLogueado = usuarioLogueadoJSON ? JSON.parse(usuarioLogueadoJSON) : null;
  // Recuperamos el token de autenticación
  const token = localStorage.getItem('token');

  // Determinar si yo soy el dueño de este perfil
  const esMiPerfil = usuarioLogueado && usuarioLogueado._id === id;

  const cargarDatos = async () => {
    setCargando(true);
    setError(null);
    try {
      // Petición pública (no requiere token por ahora)
      const response = await fetch(`${API_URL}/workers/${id}`);
      if (!response.ok) throw new Error('No se pudo cargar el perfil');
      const data = await response.ok ? await response.json() : null;
      if (!data) throw new Error('No se encontraron datos');

      setPerfil(data.worker || data); // Ajustar según la estructura de tu respuesta
      setReviews(data.reviews || []);
      setPromedio(data.averageRating || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [id]);

  // Función para manejar el clic en la cámara
  const handleEditPhotoClick = () => {
    if (esMiPerfil && fileInputRef.current) {
      fileInputRef.current.click(); // Abre el selector de archivos
    }
  };

  // --- CORRECCIÓN DE TOKEN ---
  // Función para subir la foto a Cloudinary a través de tu Backend
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !esMiPerfil || !token) {
      if (!token) alert("Error de sesión: No se encontró el token.");
      return;
    }

    const formData = new FormData();
    formData.append('photo', file); // Nombre que espera tu multer en backend

    setSubiendoPhoto(true);
    try {
      const response = await fetch(`${API_URL}/workers/${id}/upload-photo`, {
        method: 'POST',
        headers: {
          // 'Content-Type' NO se pone aquí con FormData, el navegador lo calcula
          'Authorization': `Bearer ${token}` // --- AQUÍ VA EL TOKEN REQUERIDO ---
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al subir la foto');
      }

      // Si todo sale bien, actualizamos el estado con la nueva URL de Cloudinary
      setPerfil(prev => ({ ...prev, photoUrl: data.worker.photoUrl }));
      alert('¡Foto actualizada con éxito!');
      
    } catch (err) {
      alert(`Error al subir la foto: ${err.message}`);
    } finally {
      setSubiendoPhoto(false);
    }
  };

  if (cargando) return <div className="cargando">Cargando perfil...</div>;
  if (error) return <div className="error-profile">Error: {error}</div>;
  if (!perfil) return <div className="error-profile">No se encontró la trabajadora.</div>;

  return (
    <div className="worker-profile-container">
      {/* Botón Volver */}
      <button onClick={() => navigate(-1)} className="back-button">
        ← Volver
      </button>

      {/* Cabecera del perfil */}
      <header className="profile-header">
        <div className="profile-photo-wrapper">
          {/* Foto o iniciales */}
          {perfil.photoUrl ? (
            <img src={perfil.photoUrl} alt={perfil.name} className="profile-image" />
          ) : (
            <div className="profile-initials">
              {perfil.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}

          {/* --- CORRECCIÓN VISUAL: Solo aparece si ES MI PERFIL --- */}
          {esMiPerfil && (
            <div className="camera-icon-container" onClick={handleEditPhotoClick} style={{ cursor: 'pointer' }}>
              {subiendoPhoto ? (
                <div className="loading-spinner-small"></div>
              ) : (
                <CameraIcon className="camera-icon-overlay" />
              )}
            </div>
          )}
          
          {/* Input de archivo oculto para la subida */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
        </div>

        {/* Info principal */}
        <div className="profile-main-info">
          <h1>{perfil.name}</h1>
          <p className="specialty">{perfil.specialty || 'Especialidad no definida'}</p>
          <div className="location">
            <MapPinIcon className="icon-map" />
            <span>{perfil.location || 'Ubicación no disponible'}</span>
          </div>
          <div className="rating-info">
            <StarIcon className="icon-star" />
            <span>{promedio.toFixed(1)}</span>
            <span className="reviews-count">({reviews.length} reseñas)</span>
          </div>
        </div>

        {/* Índice HANA */}
        <div className="hana-index-box">
          <p className="hana-label">ÍNDICE HANA</p>
          <span className="hana-value">{promedio > 0 ? (promedio * 20).toFixed(0) : 'NaN'}</span>
          <p className="hana-status">{promedio > 3.5 ? 'Confiable' : 'Por evaluar'}</p>
        </div>
      </header>

      {/* Sección intermedia y reservas */}
      <section className="profile-sections">
        <div className="services-details">
          <h2>Valoraciones detalladas</h2>
          {/* Ejemplo de barras (ajusta según tus datos reales) */}
          {[ 'Puntualidad', 'Confiabilidad', 'Calidad del trabajo', 'Comunicación', 'Precio justo' ].map(val => (
            <div key={val} className="detail-bar">
              <span>{val}</span>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: `${perfil[val.toLowerCase()] || 0}%` }}></div>
              </div>
              <span className="percentage">0%</span>
            </div>
          ))}
        </div>

        <div className="booking-info">
          <div className="stat">
            <span>Servicios completados</span>
            <span className="value">0</span>
          </div>
          <div className="stat">
            <span>Tasa de respuesta</span>
            <span className="value">100%</span>
          </div>
          <div className="stat tariff">
            <span>Tarifa</span>
            <span className="value">A convenir</span>
          </div>
          <div className="stat">
            <span>Reseñas recibidas</span>
            <span className="value">0</span>
          </div>
        </div>
      </section>

      {/* Sobre mi servicio */}
      <section className="about-service">
        <h2>Sobre mi servicio</h2>
        <p>{perfil.description || 'La trabajadora no ha añadido una descripción de su servicio.'}</p>
      </section>

      {/* Reseñas de clientes */}
      <section className="client-reviews">
        <h2>Reseñas de clientes</h2>
        {reviews.length === 0 ? (
          <p className="no-reviews">Aún no hay reseñas.</p>
        ) : (
          <p>Mostrar reseñas aquí...</p>
        )}
      </section>

      {/* Botones de acción inferiores */}
      <footer className="profile-actions">
        {/* Solo mostrar Solicitar Reserva si NO ES MI PERFIL */}
        {!esMiPerfil && usuarioLogueado && (
          <button className="booking-button">Solicitar reserva</button>
        )}
      </footer>
    </div>
  );
}

export default WorkerProfile;