import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const regiones = [
  'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama',
  'Coquimbo', 'Valparaíso', 'Metropolitana', "O'Higgins",
  'Maule', 'Ñuble', 'Biobío', 'La Araucanía',
  'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
]

const categorias = [
  'Estética y belleza', 'Hogar y limpieza', 'Clases y tutorías',
  'Cocina y catering', 'Bienestar y salud', 'Cuidado de mascotas',
  'Cuidado infantil', 'Tecnología y diseño', 'Gasfitería',
  'Electricidad', 'Mecánica', 'Carpintería', 'Plomería',
  'Pintura de interiores', 'Mudanzas y fletes', 'Jardinería',
  'Transporte y traslados'
]

function RegisterWorker() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmar: '',
    rut: '',
    region: '',
    comuna: '',
    categoria: ''
  })

  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const acepto = localStorage.getItem('aceptoCompromiso')
    if (!acepto) {
      navigate('/compromiso?destino=trabajadora')
    }
  }, [navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setError('')

    if (!form.nombre || !form.apellido || !form.email || !form.password || !form.categoria) {
      return setError('Por favor completa todos los campos obligatorios')
    }

    if (form.password !== form.confirmar) {
      return setError('Las contraseñas no coinciden')
    }

    if (form.password.length < 8) {
      return setError('La contraseña debe tener al menos 8 caracteres')
    }

    const acepto = localStorage.getItem('aceptoCompromiso')
    const fechaAceptacion = localStorage.getItem('fechaAceptacion')

    if (!acepto) {
      return setError('Debes aceptar el Compromiso Hana antes de registrarte')
    }

    try {
      setCargando(true)

      const res = await axios.post('http://localhost:5000/api/auth/register', {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        password: form.password,
        tipo: 'trabajadora',
        rut: form.rut,
        region: form.region,
        comuna: form.comuna,
        aceptoCompromiso: true,
        fechaAceptacion
      })

      const token = res.data.token
      localStorage.setItem('token', token)
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario))

      await axios.post(
        'http://localhost:5000/api/workers',
        {
          categoria: form.categoria,
          descripcion: '',
          tarifaHora: 0
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      localStorage.removeItem('aceptoCompromiso')
      localStorage.removeItem('fechaAceptacion')

      navigate('/')
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al registrarse')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#1a0a10',
        minHeight: '100vh',
        color: 'white',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 48px',
          backgroundColor: '#000000',
          borderBottom: '3px solid #e8b86d'
        }}
      >
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4537e, #e8b86d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '16px',
              color: 'white'
            }}
          >
            H
          </div>
          <span
            style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#e8b86d',
              letterSpacing: '4px'
            }}
          >
            HANA
          </span>
        </Link>

        <Link
          to="/login"
          style={{ color: '#ffffff', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}
        >
          ¿Ya tienes cuenta? <span style={{ color: '#e8b86d', fontWeight: '700' }}>Ingresar</span>
        </Link>
      </nav>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          background: 'radial-gradient(ellipse at 30% 50%, rgba(232,184,109,0.08), transparent 40%), radial-gradient(ellipse at 70% 50%, rgba(212,83,126,0.08), transparent 40%)'
        }}
      >
        <div
          style={{
            backgroundColor: '#2d0a1e',
            border: '1px solid #e8b86d',
            borderRadius: '20px',
            padding: '40px',
            width: '100%',
            maxWidth: '480px'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e8b86d, #d4537e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '24px',
                color: 'white',
                margin: '0 auto 16px'
              }}
            >
              💼
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px' }}>
              Ofrece tus servicios
            </h1>

            <p style={{ fontSize: '14px', color: '#cccccc', margin: 0 }}>
              Crea tu perfil profesional en Hana
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <Link
              to="/register-client"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '10px',
                backgroundColor: 'transparent',
                border: '2px solid rgba(212,83,126,0.4)',
                borderRadius: '10px',
                textDecoration: 'none'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#cccccc' }}>
                👩 Busco servicios
              </div>
            </Link>

            <div
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '10px',
                backgroundColor: '#e8b86d',
                border: '2px solid #e8b86d',
                borderRadius: '10px'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#1a0a10' }}>
                💼 Ofrezco servicios
              </div>
            </div>
          </div>

          {error && (
            <div
              style={{
                background: 'rgba(226,75,74,0.15)',
                border: '1px solid #E24B4A',
                borderRadius: '8px',
                padding: '10px 14px',
                marginBottom: '16px',
                fontSize: '13px',
                color: '#F09595'
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Nombre *</label>
                <input
                  name="nombre"
                  type="text"
                  placeholder="Ana"
                  value={form.nombre}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Apellido *</label>
                <input
                  name="apellido"
                  type="text"
                  placeholder="González"
                  value={form.apellido}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Correo electrónico *</label>
              <input
                name="email"
                type="email"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Categoría de servicio *</label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>RUT</label>
              <input
                name="rut"
                type="text"
                placeholder="12.345.678-9"
                value={form.rut}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Región</label>
              <select
                name="region"
                value={form.region}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Selecciona una región</option>
                {regiones.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Comuna</label>
              <input
                name="comuna"
                type="text"
                placeholder="Ej: Viña del Mar"
                value={form.comuna}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Contraseña *</label>
              <input
                name="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Confirmar contraseña *</label>
              <input
                name="confirmar"
                type="password"
                placeholder="Repite tu contraseña"
                value={form.confirmar}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div
              style={{
                background: 'rgba(232,184,109,0.08)',
                border: '1px solid rgba(232,184,109,0.3)',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: '1.6'
              }}
            >
              ✅ Ya aceptaste el <Link to="/compromiso" style={{ color: '#e8b86d' }}>Compromiso Hana</Link>. Tu aceptación quedará registrada al crear tu perfil.
            </div>

            <button
              onClick={handleSubmit}
              disabled={cargando}
              style={{
                background: cargando ? '#888' : 'linear-gradient(135deg, #e8b86d, #d4537e)',
                color: 'white',
                padding: '14px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '15px',
                fontWeight: '700',
                cursor: cargando ? 'not-allowed' : 'pointer',
                marginTop: '8px'
              }}
            >
              {cargando ? 'Creando perfil...' : 'Crear mi perfil profesional'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '13px', color: '#cccccc' }}>¿Ya tienes cuenta? </span>
              <Link
                to="/login"
                style={{ fontSize: '13px', color: '#e8b86d', fontWeight: '700', textDecoration: 'none' }}
              >
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#000000',
          borderTop: '2px solid #e8b86d'
        }}
      >
        <span style={{ fontSize: '12px', color: '#cccccc' }}>
          © 2025 Hana · Conectando mujeres, construyendo confianza
        </span>
      </footer>
    </div>
  )
}

const labelStyle = {
  fontSize: '13px',
  color: '#e8b86d',
  fontWeight: '600',
  display: 'block',
  marginBottom: '6px'
}

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  backgroundColor: '#1a0a10',
  border: '1.5px solid #e8b86d',
  color: '#ffffff',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box'
}

export default RegisterWorker