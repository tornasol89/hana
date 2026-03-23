import { useState } from 'react'
import axios from 'axios'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

  .bm-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.75);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    backdrop-filter: blur(4px);
    animation: bm-fade-in 0.2s ease;
  }
  @keyframes bm-fade-in { from { opacity: 0 } to { opacity: 1 } }

  .bm-modal {
    background: #1a0a10;
    border: 1px solid rgba(212,83,126,0.3);
    border-radius: 20px;
    width: 100%;
    max-width: 460px;
    padding: 32px;
    position: relative;
    animation: bm-slide-up 0.25s ease;
    font-family: 'DM Sans', sans-serif;
  }
  @keyframes bm-slide-up { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

  .bm-cerrar {
    position: absolute; top: 16px; right: 20px;
    background: transparent; border: none; color: rgba(255,255,255,0.4);
    font-size: 20px; cursor: pointer; transition: color 0.2s;
    line-height: 1;
  }
  .bm-cerrar:hover { color: white; }

  .bm-titulo { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; color: white; margin: 0 0 4px; }
  .bm-subtitulo { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 24px; }

  .bm-field { margin-bottom: 16px; }
  .bm-label { font-size: 12px; color: rgba(255,255,255,0.45); letter-spacing: 0.5px; display: block; margin-bottom: 7px; text-transform: uppercase; }
  .bm-input, .bm-select, .bm-textarea {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(212,83,126,0.25);
    border-radius: 10px;
    padding: 12px 14px;
    color: white;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s;
    -webkit-appearance: none;
  }
  .bm-input:focus, .bm-select:focus, .bm-textarea:focus { border-color: #d4537e; }
  .bm-input::placeholder, .bm-textarea::placeholder { color: rgba(255,255,255,0.25); }
  .bm-select option { background: #1a0a10; color: white; }
  .bm-textarea { resize: vertical; min-height: 90px; }

  .bm-horarios { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; }
  .bm-hora { padding: 9px 6px; border-radius: 8px; border: 1px solid rgba(212,83,126,0.2); background: transparent; color: rgba(255,255,255,0.5); font-size: 12px; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; text-align: center; }
  .bm-hora.seleccionado { background: rgba(212,83,126,0.2); border-color: #d4537e; color: white; }
  .bm-hora:hover:not(.seleccionado) { border-color: rgba(212,83,126,0.5); color: rgba(255,255,255,0.8); }

  .bm-btn {
    width: 100%;
    background: linear-gradient(135deg, #d4537e, #b83060);
    color: white; border: none; border-radius: 50px;
    padding: 14px; font-size: 15px; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-top: 24px;
  }
  .bm-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,83,126,0.35); }
  .bm-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .bm-alert { border-radius: 10px; padding: 12px 14px; margin-bottom: 16px; font-size: 13px; }
  .bm-alert.error { background: rgba(212,83,126,0.12); border: 1px solid rgba(212,83,126,0.3); color: #ffb8d1; }
  .bm-alert.success { background: rgba(93,202,165,0.12); border: 1px solid rgba(93,202,165,0.3); color: #5DCAA5; }

  .bm-no-sesion { text-align: center; padding: 12px 0 4px; }
  .bm-no-sesion p { font-size: 13px; color: rgba(255,255,255,0.5); margin-bottom: 16px; }
  .bm-link { display: inline-block; padding: 10px 28px; background: linear-gradient(135deg, #d4537e, #b83060); color: white; border-radius: 50px; text-decoration: none; font-size: 14px; font-weight: 600; }
`

const HORAS_DISP = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

// Props:
// - trabajadoraId: string
// - trabajadoraNombre: string
// - categoria: string
// - onClose: () => void
// - onReservaExitosa: () => void (opcional)
export default function BookingModal({ trabajadoraId, trabajadoraNombre, categoria, onClose, onReservaExitosa }) {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [servicio, setServicio] = useState(categoria || '')
  const [notas, setNotas] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [alerta, setAlerta] = useState(null)

  const hoyStr = new Date().toISOString().split('T')[0]

  async function handleSubmit() {
    if (!fecha || !hora || !servicio) {
      setAlerta({ tipo: 'error', msg: 'Por favor completa fecha, hora y tipo de servicio.' })
      return
    }

    setEnviando(true)
    setAlerta(null)

    try {
      const fechaCompleta = new Date(`${fecha}T${hora}:00`)
      await axios.post('http://localhost:5000/api/bookings', {
        trabajadora: trabajadoraId,
        servicio,
        fecha: fechaCompleta.toISOString(),
        notas,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setAlerta({ tipo: 'success', msg: '¡Reserva enviada exitosamente! La profesional la revisará pronto.' })
      if (onReservaExitosa) onReservaExitosa()
      setTimeout(onClose, 2500)
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al enviar la reserva. Intenta de nuevo.'
      setAlerta({ tipo: 'error', msg })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="bm-overlay" onClick={e => e.target.classList.contains('bm-overlay') && onClose()}>
        <div className="bm-modal">
          <button className="bm-cerrar" onClick={onClose}>✕</button>

          <h2 className="bm-titulo">Reservar servicio</h2>
          <p className="bm-subtitulo">con {trabajadoraNombre}</p>

          {!token || !user ? (
            <div className="bm-no-sesion">
              <p>Necesitas iniciar sesión para reservar</p>
              <a href="/login" className="bm-link">Iniciar sesión</a>
            </div>
          ) : (
            <>
              {alerta && (
                <div className={`bm-alert ${alerta.tipo}`}>{alerta.msg}</div>
              )}

              <div className="bm-field">
                <label className="bm-label">Tipo de servicio</label>
                <input
                  className="bm-input"
                  placeholder="Ej: Corte de pelo, Gasfitería urgente…"
                  value={servicio}
                  onChange={e => setServicio(e.target.value)}
                />
              </div>

              <div className="bm-field">
                <label className="bm-label">Fecha</label>
                <input
                  className="bm-input"
                  type="date"
                  min={hoyStr}
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <div className="bm-field">
                <label className="bm-label">Hora</label>
                <div className="bm-horarios">
                  {HORAS_DISP.map(h => (
                    <button
                      key={h}
                      className={`bm-hora ${hora === h ? 'seleccionado' : ''}`}
                      onClick={() => setHora(h)}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bm-field">
                <label className="bm-label">Notas adicionales (opcional)</label>
                <textarea
                  className="bm-textarea"
                  placeholder="Describe lo que necesitas con más detalle…"
                  value={notas}
                  onChange={e => setNotas(e.target.value)}
                />
              </div>

              <button className="bm-btn" onClick={handleSubmit} disabled={enviando}>
                {enviando ? 'Enviando reserva…' : 'Confirmar reserva →'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
