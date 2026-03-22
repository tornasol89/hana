import Navbar from '../components/Navbar'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Compromiso() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const destino = searchParams.get('destino') || 'clienta'

  const aceptar = (tipo) => {
    localStorage.setItem('aceptoCompromiso', 'true')
    localStorage.setItem('fechaAceptacion', new Date().toISOString())
    if (tipo === 'trabajadora') {
      navigate('/register-worker')
    } else {
      navigate('/register-client')
    }
  }

  return (
    <div style={{ backgroundColor: '#1a0a10', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>

      <Navbar />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '56px 24px' }}>

        {/* LOGO */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
          <img src="/logoHana2.png" alt="Logo Hana" style={{ height: '260px', width: '260px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
        </div>

        {/* ENCABEZADO */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '16px', color: '#d4537e', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 16px' }}>⚠️ Documento oficial</p>
          <h1 style={{ fontSize: '56px', fontWeight: '900', color: '#fff', margin: '0 0 16px', lineHeight: '1.1' }}>Compromiso Hana</h1>
          <p style={{ fontSize: '22px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: '1.6' }}>
            Condiciones obligatorias para todas las usuarias de la plataforma
          </p>
        </div>

        {/* SECCIÓN 1 */}
        <div style={{ background: '#2d0a1e', borderRadius: '16px', padding: '36px', marginBottom: '24px', border: '1px solid rgba(212,83,126,0.3)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#e8b86d', margin: '0 0 20px' }}>🛡️ Verificación de identidad obligatoria</h2>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', margin: '0 0 16px' }}>
            Todas las usuarias de Hana — tanto clientas como trabajadoras — deben verificar su identidad con documento oficial vigente antes de poder acceder a los servicios de la plataforma.
          </p>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', margin: '0 0 12px' }}>
            Para completar el registro es obligatorio subir:
          </p>
          <ul style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '2.2', marginTop: '8px', paddingLeft: '24px' }}>
            <li>Foto de perfil real y visible</li>
            <li>Foto de documento de identidad vigente (carnet por ambos lados)</li>
          </ul>
          <div style={{ background: 'rgba(212,83,126,0.1)', border: '1px solid rgba(212,83,126,0.4)', borderRadius: '12px', padding: '20px 24px', marginTop: '20px' }}>
            <p style={{ fontSize: '18px', color: '#ffb8d1', margin: 0, lineHeight: '1.8' }}>
              ⚠️ Sin verificación aprobada por nuestro equipo, no podrás contratar ni ofrecer servicios en Hana.
            </p>
          </div>
        </div>

        {/* SECCIÓN 2 */}
        <div style={{ background: '#2d0a1e', borderRadius: '16px', padding: '36px', marginBottom: '24px', border: '1px solid rgba(212,83,126,0.3)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#e8b86d', margin: '0 0 20px' }}>👑 Presencia obligatoria durante el servicio</h2>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', margin: '0 0 16px' }}>
            La persona que contrata el servicio debe estar presente durante toda su ejecución. No está permitido que un tercero no incluido en el acuerdo reciba a la trabajadora en su lugar — sea pareja, familiar, vecino u otra persona.
          </p>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', margin: 0 }}>
            Si la clienta no puede estar presente, debe notificar a la trabajadora con anticipación suficiente para reorganizar la agenda.
          </p>
          <div style={{ background: 'rgba(232,184,109,0.08)', border: '1px solid rgba(232,184,109,0.3)', borderRadius: '12px', padding: '20px 24px', marginTop: '20px' }}>
            <p style={{ fontSize: '18px', color: '#e8b86d', margin: 0, lineHeight: '1.8' }}>
              👑 Si la trabajadora llega al lugar y la clienta no está presente sin aviso previo, tiene derecho a cancelar el servicio sin penalización.
            </p>
          </div>
        </div>

        {/* SECCIÓN 2B */}
        <div style={{ background: '#2d0a1e', borderRadius: '16px', padding: '36px', marginBottom: '24px', border: '1px solid rgba(212,83,126,0.3)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#e8b86d', margin: '0 0 20px' }}>🚫 La trabajadora acude sola al servicio</h2>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', margin: '0 0 16px' }}>
            La trabajadora no está autorizada a llevar terceras personas al lugar del servicio — sean acompañantes, familiares, colegas u otras personas no incluidas en el acuerdo original.
          </p>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', margin: 0 }}>
            Si por razones excepcionales necesita asistencia, debe notificarlo a la clienta con anticipación y obtener su aprobación explícita antes de proceder.
          </p>
          <div style={{ background: 'rgba(212,83,126,0.1)', border: '1px solid rgba(212,83,126,0.4)', borderRadius: '12px', padding: '20px 24px', marginTop: '20px' }}>
            <p style={{ fontSize: '18px', color: '#ffb8d1', margin: 0, lineHeight: '1.8' }}>
              ⚠️ Si la trabajadora llega acompañada sin autorización previa, la clienta tiene derecho a cancelar el servicio sin penalización.
            </p>
          </div>
        </div>

        {/* SECCIÓN 3 */}
        <div style={{ background: '#2d0a1e', borderRadius: '16px', padding: '36px', marginBottom: '24px', border: '1px solid rgba(212,83,126,0.3)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#e8b86d', margin: '0 0 20px' }}>🤝 Una comunidad bidireccional</h2>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', margin: '0 0 16px' }}>
            Hana protege a ambas partes por igual. Tanto la trabajadora como la clienta merecen un entorno seguro, transparente y respetuoso.
          </p>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', margin: 0 }}>
            Usar Hana no es solo resolver una necesidad. Es apoyar el trabajo femenino, fortalecer la economía de otras mujeres y construir una comunidad donde todas estamos más seguras.
          </p>
        </div>

        {/* SECCIÓN 4 */}
        <div style={{ background: '#2d0a1e', borderRadius: '16px', padding: '36px', marginBottom: '48px', border: '1px solid rgba(212,83,126,0.3)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#e8b86d', margin: '0 0 20px' }}>🔒 Privacidad y confidencialidad</h2>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', margin: '0 0 16px' }}>
            Todos los datos personales y documentos de identidad son tratados con estricta confidencialidad. Solo el equipo de verificación de Hana tiene acceso a esta información, únicamente con el propósito de validar la identidad de las usuarias.
          </p>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', margin: 0 }}>
            Hana nunca compartirá tu información personal con terceros sin tu consentimiento explícito.
          </p>
        </div>

        {/* AVISO LEGAL */}
        <div style={{ background: 'rgba(232,184,109,0.06)', border: '1px solid rgba(232,184,109,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: '1.7' }}>
            Al hacer clic en "Acepto" quedará registrado en nuestra base de datos tu aceptación de estas condiciones, junto con la fecha y hora exacta. Este registro tiene validez legal en caso de incumplimiento.
          </p>
        </div>

        {/* BOTONES */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => aceptar('clienta')}
            style={{ backgroundColor: '#d4537e', color: 'white', padding: '18px 44px', borderRadius: '50px', border: 'none', fontSize: '17px', fontWeight: '700', cursor: 'pointer' }}
          >
            Acepto — Quiero contratar servicios
          </button>
          <button
            onClick={() => aceptar('trabajadora')}
            style={{ backgroundColor: 'transparent', color: '#e8b86d', border: '2px solid #e8b86d', padding: '18px 44px', borderRadius: '50px', fontSize: '17px', fontWeight: '600', cursor: 'pointer' }}
          >
            Acepto — Quiero ofrecer mis servicios
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 48px', backgroundColor: '#000000', borderTop: '3px solid transparent', borderImage: 'linear-gradient(to right, #d4537e, #e8b86d) 1', gap: '20px', marginTop: '40px' }}>
        <img src="/logoHana2.png" alt="Logo Hana" style={{ height: '200px', width: '200px', objectFit: 'contain' }} />
        <span style={{ fontSize: '14px', color: '#cccccc', letterSpacing: '1px' }}>Conectando mujeres, construyendo confianza</span>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>© 2025 Hana</span>
      </footer>

    </div>
  )
}

export default Compromiso