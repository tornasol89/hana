import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    const data = localStorage.getItem('usuario')
    if (data) setUsuario(JSON.parse(data))
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
    navigate('/')
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '0 20px' : '0 40px',
      height: '72px',
      backgroundColor: '#1a0408',
      borderBottom: '3px solid transparent',
      borderImage: 'linear-gradient(to right, #d4537e, #e8b86d) 1',
    }}>

      {/* LOGO */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #d4537e, #e8b86d)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px',
          boxShadow: '0 0 0 3px rgba(232,184,109,0.25)',
        }}>👑</div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
          <span style={{ fontSize: isMobile ? '20px' : '27px', fontWeight: '900', color: '#e8b86d', letterSpacing: '7px' }}>HANA</span>
          {!isMobile && (
            <span style={{ fontSize: '9px', color: 'rgba(232,184,109,0.65)', letterSpacing: '2px', textTransform: 'uppercase', fontStyle: 'italic' }}>
              Hecho por mujeres, para mujeres
            </span>
          )}
        </div>
      </Link>

      {/* CENTRO — solo desktop */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <Link to="/" style={{ padding: '8px 16px', color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Servicios
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '16px' }}>·</span>
          <Link to="/" style={{ padding: '8px 16px', color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Profesionales
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '16px' }}>·</span>
          <Link to="/impacto" style={{ padding: '8px 16px', color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Por qué Hana
          </Link>
        </div>
      )}

      {/* DERECHA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {usuario ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4537e, #e8b86d)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '700', fontSize: '14px', color: 'white',
                boxShadow: '0 0 0 2px rgba(232,184,109,0.3)',
              }}>
                {usuario.nombre?.charAt(0)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#e8b86d' }}>
                  Hola, {usuario.nombre} 👑
                </span>
                {!isMobile && (
                  <span style={{ fontSize: '10px', color: 'rgba(232,184,109,0.5)', fontStyle: 'italic' }}>
                    {usuario.tipo === 'trabajadora' ? 'Trabajadora verificada' : 'Clienta verificada'}
                  </span>
                )}
              </div>
            </div>
            <button onClick={cerrarSesion} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '7px 16px', borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent', cursor: 'pointer',
              fontSize: '12px', color: 'rgba(255,255,255,0.5)',
            }}>
              Salir
            </button>
          </>
        ) : (
          <>
            {!isMobile && (
              <>
                <Link to="/register-client" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '9px 20px', borderRadius: '50px',
                  border: '1.5px solid #d4537e', background: 'transparent',
                  textDecoration: 'none',
                  fontSize: '13px', fontWeight: '600', color: '#d4537e',
                }}>
                  Contratar servicios
                </Link>
                <Link to="/register-worker" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '9px 20px', borderRadius: '50px',
                  border: '1.5px solid #e8b86d', background: 'transparent',
                  textDecoration: 'none',
                  fontSize: '13px', fontWeight: '600', color: '#e8b86d',
                }}>
                  Ofrecer servicios
                </Link>
              </>
            )}
            <Link to="/login" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '9px 24px', borderRadius: '50px',
              background: 'linear-gradient(135deg, #d4537e, #c03068)',
              textDecoration: 'none',
              fontSize: '13px', fontWeight: '700', color: 'white',
            }}>
              Ingresar
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar