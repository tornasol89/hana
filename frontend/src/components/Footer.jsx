function Footer() {
  return (
    <footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 48px', backgroundColor: '#000000', borderTop: '3px solid transparent', borderImage: 'linear-gradient(to right, #d4537e, #e8b86d) 1', gap: '20px' }}>
      <img src="/logoHana2.png" alt="Logo Hana" style={{ height: '200px', width: '200px', objectFit: 'contain' }} />
      <span style={{ fontSize: '13px', color: '#cccccc', letterSpacing: '1px' }}>Conectando mujeres, construyendo confianza</span>
      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>© 2025 Hana</span>
    </footer>
  )
}

export default Footer
