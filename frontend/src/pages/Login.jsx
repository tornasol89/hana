import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setError('')
    if (!form.email || !form.password) {
      return setError('Por favor ingresa tu email y contraseña')
    }
    try {
      setCargando(true)
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: form.email,
        password: form.password,
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Email o contraseña incorrectos')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#1a0a10', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 48px', backgroundColor: '#000000', borderBottom: '3px solid #d4537e' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4537e, #e8b86d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '16px', color: 'white' }}>H</div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#e8b86d', letterSpacing: '4px' }}>HANA</span>
        </Link>
        <Link to="/register-client" style={{ color: '#ffffff', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>
          ¿No tienes cuenta? <span style={{ color: '#e8b86d', fontWeight: '700' }}>Regístrate</span>
        </Link>
      </nav>

      {/* CONTENIDO */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', background: 'radial-gradient(ellipse at 30% 50%, rgba(212,83,126,0.2) 0%, transparent 60%), #1a0a10' }}>
        <div style={{ background: '#2d0a1e', border: '1px solid #d4537e', borderRadius: '20px', padding: '48px 40px', width: '100%', maxWidth: '420px' }}>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4537e, #e8b86d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '24px', color: 'white', margin: '0 auto 16px' }}>H</div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', margin: '0 0 8px' }}>Bienvenida de vuelta</h1>
            <p style={{ fontSize: '14px', color: '#cccccc', margin: 0 }}>Ingresa a tu cuenta Hana</p>
          </div>

          {/* ERROR */}
          {error && (
            <div style={{ background: 'rgba(226,75,74,0.15)', border: '1px solid #E24B4A', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#F09595' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div>
              <label style={labelStyle}>Correo electrónico</label>
              <input name="email" type="email" placeholder="tu@correo.com" value={form.email} onChange={handleChange} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Contraseña</label>
              <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '13px', color: '#e8b86d', cursor: 'pointer' }}>¿Olvidaste tu contraseña?</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={cargando}
              style={{ backgroundColor: cargando ? '#888' : '#d4537e', color: 'white', padding: '14px', borderRadius: '50px', border: 'none', fontSize: '15px', fontWeight: '700', cursor: cargando ? 'not-allowed' : 'pointer', marginTop: '8px' }}
            >
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <span style={{ fontSize: '13px', color: '#cccccc' }}>¿No tienes cuenta? </span>
              <Link to="/register-client" style={{ fontSize: '13px', color: '#e8b86d', fontWeight: '700', textDecoration: 'none' }}>Regístrate gratis</Link>
            </div>

          </div>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#000000', borderTop: '2px solid #d4537e' }}>
        <span style={{ fontSize: '12px', color: '#cccccc' }}>© 2025 Hana · Conectando mujeres, construyendo confianza</span>
      </footer>

    </div>
  )
}

const labelStyle = { fontSize: '13px', color: '#e8b86d', fontWeight: '600', display: 'block', marginBottom: '6px' }
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#1a0a10', border: '1.5px solid #d4537e', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }

export default Login