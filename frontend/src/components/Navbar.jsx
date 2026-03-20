import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 48px',
      backgroundColor: 'rgba(26,10,16,0.97)',
      borderBottom: '1px solid rgba(212,83,126,0.25)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '24px', fontWeight: '700', color: '#e8b86d', letterSpacing: '3px' }}>
          HANA
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Servicios</Link>
        <Link to="/" style={linkStyle}>Profesionales</Link>
        <Link to="/" style={linkStyle}>Cómo funciona</Link>
        <Link to="/login" style={btnStyle}>Ingresar</Link>
      </div>
    </nav>
  )
}

const linkStyle = {
  color: 'rgba(255,255,255,0.65)',
  textDecoration: 'none',
  fontSize: '14px',
}

const btnStyle = {
  backgroundColor: '#d4537e',
  color: 'white',
  padding: '9px 22px',
  borderRadius: '50px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
}

export default Navbar