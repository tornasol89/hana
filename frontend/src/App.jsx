import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import RegisterClient from './pages/RegisterClient'
import RegisterWorker from './pages/RegisterWorker'
import WorkerProfile from './pages/WorkerProfile'
import Impacto from './pages/Impacto'
import Compromiso from './pages/Compromiso'
import MiPerfil from './pages/MiPerfil'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-client" element={<RegisterClient />} />
        <Route path="/register-worker" element={<RegisterWorker />} />
        <Route path="/worker/:id" element={<WorkerProfile />} />
        <Route path="/impacto" element={<Impacto />} />
        <Route path="/compromiso" element={<Compromiso />} />
        <Route path="/mi-perfil" element={<MiPerfil />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App