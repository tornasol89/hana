import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import RegisterClient from './pages/RegisterClient'
import RegisterWorker from './pages/RegisterWorker'
import WorkerProfile from './pages/WorkerProfile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-client" element={<RegisterClient />} />
        <Route path="/register-worker" element={<RegisterWorker />} />
        <Route path="/worker/:id" element={<WorkerProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App