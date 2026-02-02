import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ChairRoom from './pages/ChairRoom'
import DelegateDashboard from './pages/DelegateDashboard'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chair" element={<ChairRoom />} />
        <Route path="delegate" element={<DelegateDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
