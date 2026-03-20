import { Link } from 'react-router-dom'

function RegisterWorker() {
  return (
    <div style={{ backgroundColor: '#1a0a10', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 48px', backgroundColor: '#000000', borderBottom: '3px solid #e8b86d',
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
        <Link to="/login" style={{ color: '#ffffff', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>
          ¿Ya tienes cuenta? <span style={{ color: '#e8b86d', fontWeight: '700' }}>Ingresar</span>
        </Link>
      </nav>

      {/* CONTENIDO */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 24px',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(232,184,109,0.15) 0%, transparent 60%), #1a0a10',
      }}>
        <div style={{
          background: '#2d0a1e', border: '1px solid #e8b86d',
          borderRadius: '20px', padding: '48px 40px', width: '100%', maxWidth: '460px',
        }}>

          {/* TÍTULO */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #e8b86d, #d4537e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '900', fontSize: '24px', color: 'white', margin: '0 auto 16px',
            }}>💼</div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', margin: '0 0 8px' }}>
              Ofrece tus servicios
            </h1>
            <p style={{ fontSize: '14px', color: '#cccccc', margin: 0 }}>
              Crea tu perfil profesional en Hana
            </p>
          </div>

          {/* SELECTOR TIPO DE CUENTA */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <Link to="/register-client" style={{
              flex: 1, textAlign: 'center', padding: '10px',
              backgroundColor: 'transparent', border: '2px solid rgba(212,83,126,0.4)',
              borderRadius: '10px', cursor: 'pointer', textDecoration: 'none',
            }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#cccccc' }}>👩 Busco servicios</div>
            </Link>
            <div style={{
              flex: 1, textAlign: 'center', padding: '10px',
              backgroundColor: '#e8b86d', border: '2px solid #e8b86d',
              borderRadius: '10px', cursor: 'pointer',
            }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#1a0a10' }}>💼 Ofrezco servicios</div>
            </div>
          </div>

          {/* FORMULARIO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '13px', color: '#e8b86d', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Nombre</label>
                <input type="text" placeholder="Ana" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '13px', color: '#e8b86d', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Apellido</label>
                <input type="text" placeholder="González" style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#e8b86d', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Correo electrónico</label>
              <input type="email" placeholder="tu@correo.com" style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#e8b86d', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Categoría de servicio</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="" style={{ backgroundColor: '#1a0a10' }}>Selecciona una categoría</option>
                <option value="belleza" style={{ backgroundColor: '#1a0a10' }}>💇 Estética y belleza</option>
                <option value="hogar" style={{ backgroundColor: '#1a0a10' }}>🧹 Hogar y limpieza</option>
                <option value="clases" style={{ backgroundColor: '#1a0a10' }}>📚 Clases y tutorías</option>
                <option value="cocina" style={{ backgroundColor: '#1a0a10' }}>🍽️ Cocina y catering</option>
                <option value="bienestar" style={{ backgroundColor: '#1a0a10' }}>🧘 Bienestar y salud</option>
                <option value="mascotas" style={{ backgroundColor: '#1a0a10' }}>🐾 Cuidado de mascotas</option>
                <option value="infantil" style={{ backgroundColor: '#1a0a10' }}>👶 Cuidado infantil</option>
                <option value="tech" style={{ backgroundColor: '#1a0a10' }}>💻 Tecnología y diseño</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#e8b86d', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Comuna o ciudad</label>
              <input type="text" placeholder="Ej: Providencia, Santiago" style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#e8b86d', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Contraseña</label>
              <input type="password" placeholder="Mínimo 8 caracteres" style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#e8b86d', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Confirmar contraseña</label>
              <input type="password" placeholder="Repite tu contraseña" style={inputStyle} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
              <input type="checkbox" style={{ marginTop: '3px', accentColor: '#e8b86d' }} />
              <span style={{ fontSize: '12px', color: '#cccccc', lineHeight: '1.5' }}>
                Acepto los <span style={{ color: '#e8b86d', cursor: 'pointer' }}>términos y condiciones</span> y la <span style={{ color: '#e8b86d', cursor: 'pointer' }}>política de privacidad</span>
              </span>
            </div>

            <button style={{
              background: 'linear-gradient(135deg, #e8b86d, #d4537e)',
              color: 'white', padding: '14px', borderRadius: '50px', border: 'none',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '8px',
            }}>
              Crear mi perfil profesional
            </button>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '13px', color: '#cccccc' }}>¿Ya tienes cuenta? </span>
              <Link to="/login" style={{ fontSize: '13px', color: '#e8b86d', fontWeight: '700', textDecoration: 'none' }}>
                Ingresar
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center', padding: '20px',
        backgroundColor: '#000000', borderTop: '2px solid #e8b86d',
      }}>
        <span style={{ fontSize: '12px', color: '#cccccc' }}>© 2025 Hana · Conectando mujeres, construyendo confianza</span>
      </footer>

    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: '10px',
  backgroundColor: '#1a0a10', border: '1.5px solid #e8b86d',
  color: '#ffffff', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box',
}

export default RegisterWorker