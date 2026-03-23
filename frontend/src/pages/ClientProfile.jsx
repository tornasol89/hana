import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  .cp-root { background: #0f0508; min-height: 100vh; color: white; font-family: 'DM Sans', sans-serif; }
  .cp-hero { background: linear-gradient(135deg, #1a0a10 0%, #2d0a1e 100%); border-bottom: 1px solid rgba(212,83,126,0.2); padding: 48px 24px 40px; }
  .cp-avatar-wrap { position: relative; display: inline-block; margin-bottom: 16px; }
  .cp-avatar { width: 96px; height: 96px; border-radius: 50%; border: 3px solid rgba(212,83,126,0.5); object-fit: cover; display: block; }
  .cp-avatar-initials { width: 96px; height: 96px; border-radius: 50%; border: 3px solid rgba(212,83,126,0.5); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; color: white; }
  .cp-avatar-badge { position: absolute; bottom: 2px; right: 2px; background: #e8b86d; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; font-size: 13px; border: 2px solid #0f0508; }
  .cp-nombre { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 700; margin: 0 0 4px; }
  .cp-email { font-size: 13px; color: rgba(255,255,255,0.45); margin-bottom: 16px; }
  .cp-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 50px; font-size: 12px; font-weight: 600; }
  .cp-section { padding: 40px 24px; max-width: 760px; margin: 0 auto; }
  .cp-section-titulo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: white; margin: 0 0 20px; }
  .cp-card { background: #1a0a10; border: 1px solid rgba(212,83,126,0.2); border-radius: 14px; padding: 20px; margin-bottom: 12px; transition: border-color 0.2s; }
  .cp-card:hover { border-color: rgba(212,83,126,0.5); }
  .cp-reserva-estado { display: inline-block; font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 50px; letter-spacing: 0.5px; text-transform: uppercase; }
  .cp-confianza-bar { height: 6px; border-radius: 50px; background: rgba(255,255,255,0.08); overflow: hidden; margin-top: 8px; }
  .cp-confianza-fill { height: 100%; border-radius: 50px; background: linear-gradient(90deg, #d4537e, #e8b86d); transition: width 1s ease; }
  .cp-foto-btn { display: inline-flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: 50px; border: 1.5px solid rgba(212,83,126,0.4); background: transparent; color: #d4537e; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .cp-foto-btn:hover { border-color: #d4537e; background: rgba(212,83,126,0.1); }
  .cp-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(212,83,126,0.25); border-radius: 10px; padding: 12px 16px; color: white; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s; }
  .cp-input:focus { border-color: #d4537e; }
  .cp-btn-save { background: linear-gradient(135deg, #d4537e, #b83060); color: white; border: none; border-radius: 50px; padding: 12px 32px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: transform 0.2s, box-shadow 0.2s; }
  .cp-btn-save:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,83,126,0.35); }
  .divider { height: 1px; background: rgba(212,83,126,0.1); margin: 8px 0 32px; }
`

const coloresAvatar = ['#d4537e', '#c4892a', '#7a3aa8', '#5DCAA5']

function calcularNivelConfianza(reservas) {
  const total = reservas.length
  if (total === 0) return { nivel: 'Nueva', pct: 10, color: '#888' }
  const completadas = reservas.filter(r => r.estado === 'completada').length
  const pct = Math.min(Math.round((completadas / Math.max(total, 1)) * 80 + (total > 2 ? 20 : 0)), 100)
  if (pct >= 80) return { nivel: 'Muy confiable', pct, color: '#5DCAA5' }
  if (pct >= 50) return { nivel: 'Confiable', pct, color: '#e8b86d' }
  return { nivel: 'En construcción', pct, color: '#d4537e' }
}

const estadoConfig = {
  pendiente: { color: '#e8b86d', bg: 'rgba(232,184,109,0.12)', texto: 'Pendiente' },
  aceptada: { color: '#5DCAA5', bg: 'rgba(93,202,165,0.12)', texto: 'Aceptada' },
  rechazada: { color: '#d4537e', bg: 'rgba(212,83,126,0.12)', texto: 'Rechazada' },
  completada: { color: '#9b6fd4', bg: 'rgba(155,111,212,0.12)', texto: 'Completada' },
}

export default function ClientProfile() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(false)
  const [formData, setFormData] = useState({ nombre: '', apellido: '', region: '', comuna: '' })
  const [guardando, setGuardando] = useState(false)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userGuardado = localStorage.getItem('user')
    if (!token || !userGuardado) { navigate('/login'); return }
    const u = JSON.parse(userGuardado)
    setUsuario(u)
    setFormData({ nombre: u.nombre || '', apellido: u.apellido || '', region: u.region || '', comuna: u.comuna || '' })
    fetchReservas(token)
  }, [])

  async function fetchReservas(token) {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/mis-reservas', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setReservas(res.data)
    } catch (err) {
      console.error('Error cargando reservas:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleFotoChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setFotoPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  async function handleGuardar() {
    setGuardando(true)
    try {
      const token = localStorage.getItem('token')
      // Actualizar datos (requiere ruta PUT /api/auth/me en backend — ver instrucciones)
      await axios.put('http://localhost:5000/api/auth/me', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const userActualizado = { ...usuario, ...formData }
      localStorage.setItem('user', JSON.stringify(userActualizado))
      setUsuario(userActualizado)
      setEditando(false)
      setMensaje('¡Perfil actualizado exitosamente!')
      setTimeout(() => setMensaje(''), 3000)
    } catch (err) {
      setMensaje('Error al guardar. Intenta de nuevo.')
      setTimeout(() => setMensaje(''), 3000)
    } finally {
      setGuardando(false)
    }
  }

  if (loading) return (
    <div style={{ background: '#0f0508', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#d4537e', fontSize: '14px' }}>Cargando perfil…</div>
    </div>
  )

  if (!usuario) return null

  const iniciales = `${usuario.nombre?.charAt(0) || ''}${usuario.apellido?.charAt(0) || ''}`
  const colorAvatar = coloresAvatar[usuario._id?.charCodeAt(0) % coloresAvatar.length] || '#d4537e'
  const confianza = calcularNivelConfianza(reservas)
  const nombre = `${usuario.nombre} ${usuario.apellido}`

  return (
    <>
      <style>{styles}</style>
      <div className="cp-root">
        <Navbar />

        {/* HERO */}
        <div className="cp-hero">
          <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="cp-avatar-wrap">
              {fotoPreview ? (
                <img src={fotoPreview} className="cp-avatar" alt="foto" />
              ) : usuario.foto ? (
                <img src={usuario.foto} className="cp-avatar" alt="foto" />
              ) : (
                <div className="cp-avatar-initials" style={{ background: colorAvatar }}>{iniciales}</div>
              )}
              <div className="cp-avatar-badge">👑</div>
            </div>

            <label htmlFor="foto-input">
              <div className="cp-foto-btn" style={{ marginBottom: '16px' }}>
                📷 Cambiar foto
              </div>
            </label>
            <input id="foto-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFotoChange} />

            <h1 className="cp-nombre">{nombre}</h1>
            <div className="cp-email">{usuario.email}</div>

            <div
              className="cp-badge"
              style={{ background: `${confianza.color}20`, border: `1px solid ${confianza.color}60`, color: confianza.color }}
            >
              ★ {confianza.nivel}
            </div>
          </div>
        </div>

        {/* ÍNDICE DE CONFIANZA */}
        <div className="cp-section">
          <h2 className="cp-section-titulo">Tu índice de confianza</h2>
          <div className="divider" />
          <div className="cp-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{confianza.nivel}</span>
              <span style={{ fontSize: '22px', fontFamily: 'Cormorant Garamond, serif', fontWeight: '700', color: confianza.color }}>{confianza.pct}%</span>
            </div>
            <div className="cp-confianza-bar">
              <div className="cp-confianza-fill" style={{ width: `${confianza.pct}%`, background: `linear-gradient(90deg, ${confianza.color}, #e8b86d)` }} />
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '10px', lineHeight: '1.6' }}>
              Tu índice sube con cada servicio completado y evaluado. Ayuda a las trabajadoras a confiar en ti.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
            {[
              { num: reservas.length, label: 'Reservas totales' },
              { num: reservas.filter(r => r.estado === 'completada').length, label: 'Completadas' },
              { num: reservas.filter(r => r.estado === 'pendiente').length, label: 'Pendientes' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#1a0a10', border: '1px solid rgba(212,83,126,0.2)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: '700', color: '#e8b86d' }}>{stat.num}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MIS RESERVAS */}
        <div className="cp-section" style={{ paddingTop: 0 }}>
          <h2 className="cp-section-titulo">Mis reservas</h2>
          <div className="divider" />
          {reservas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📅</div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>
                Aún no tienes reservas. ¡Busca una profesional y agenda hoy!
              </p>
              <button
                onClick={() => document.getElementById('categorias') ? document.getElementById('categorias').scrollIntoView() : navigate('/')}
                style={{ marginTop: '20px', background: 'rgba(212,83,126,0.15)', border: '1px solid #d4537e', color: '#d4537e', padding: '10px 24px', borderRadius: '50px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '13px' }}
              >
                Buscar servicios →
              </button>
            </div>
          ) : (
            reservas.map(r => {
              const cfg = estadoConfig[r.estado] || estadoConfig.pendiente
              const trabajadoraNombre = r.trabajadora?.usuario
                ? `${r.trabajadora.usuario.nombre} ${r.trabajadora.usuario.apellido}`
                : 'Profesional'
              return (
                <div key={r._id} className="cp-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{r.servicio}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                        con {trabajadoraNombre}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>
                        📅 {r.fecha ? new Date(r.fecha).toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Fecha por confirmar'}
                      </div>
                    </div>
                    <span className="cp-reserva-estado" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}50`, flexShrink: 0 }}>
                      {cfg.texto}
                    </span>
                  </div>
                  {r.estado === 'completada' && (
                    <Link
                      to={`/worker/${r.trabajadora?._id}`}
                      style={{ display: 'inline-block', marginTop: '12px', fontSize: '12px', color: '#e8b86d', textDecoration: 'none', borderBottom: '1px solid rgba(232,184,109,0.3)' }}
                    >
                      Dejar evaluación →
                    </Link>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* MIS DATOS */}
        <div className="cp-section" style={{ paddingTop: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="cp-section-titulo" style={{ margin: 0 }}>Mis datos</h2>
            {!editando && (
              <button onClick={() => setEditando(true)} style={{ background: 'transparent', border: '1px solid rgba(212,83,126,0.4)', color: '#d4537e', padding: '8px 18px', borderRadius: '50px', cursor: 'pointer', fontSize: '13px', fontFamily: 'DM Sans, sans-serif' }}>
                Editar
              </button>
            )}
          </div>
          <div className="divider" />

          {mensaje && (
            <div style={{ background: mensaje.includes('Error') ? 'rgba(212,83,126,0.15)' : 'rgba(93,202,165,0.15)', border: `1px solid ${mensaje.includes('Error') ? '#d4537e' : '#5DCAA5'}40`, borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontSize: '13px', color: mensaje.includes('Error') ? '#d4537e' : '#5DCAA5' }}>
              {mensaje}
            </div>
          )}

          {editando ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { key: 'nombre', label: 'Nombre', placeholder: 'Tu nombre' },
                { key: 'apellido', label: 'Apellido', placeholder: 'Tu apellido' },
                { key: 'region', label: 'Región', placeholder: 'Ej: Metropolitana' },
                { key: 'comuna', label: 'Comuna', placeholder: 'Ej: Santiago' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                  <input
                    className="cp-input"
                    placeholder={f.placeholder}
                    value={formData[f.key]}
                    onChange={e => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button className="cp-btn-save" onClick={handleGuardar} disabled={guardando}>
                  {guardando ? 'Guardando…' : 'Guardar cambios'}
                </button>
                <button onClick={() => setEditando(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', padding: '12px 24px', borderRadius: '50px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }}>
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="cp-card">
              {[
                { label: 'Nombre completo', valor: nombre },
                { label: 'Email', valor: usuario.email },
                { label: 'Región', valor: usuario.region || 'No especificada' },
                { label: 'Comuna', valor: usuario.comuna || 'No especificada' },
                { label: 'Compromiso Hana', valor: usuario.aceptoCompromiso ? '✓ Aceptado' : '✗ Pendiente' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', color: 'white', fontWeight: '500' }}>{item.valor}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  )
}
