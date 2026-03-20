import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 48px',
      background: 'rgba(0,0,0,0.5)',
      borderBottom: '1px solid rgba(212,83,126,0.4)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    }}>

      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" fill="url(#grad)" />
          <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="serif">H</text>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#d4537e" />
              <stop offset="100%" stopColor="#e8b86d" />
            </linearGradient>
          </defs>
        </svg>
        <span style={{ fontSize: '22px', fontWeight: '700', color: '#e8b86d', letterSpacing: '3px' }}>
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
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
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