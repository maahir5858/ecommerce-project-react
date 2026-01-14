import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<HomePage />} /> */}
      <Route index element={<HomePage />} />
      <Route path='/checkout' element={<div>nigga marda nigga marda ve !!</div>} />
    </Routes>
    
  )
}

export default App
