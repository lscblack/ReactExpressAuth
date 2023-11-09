import Register from './Register'
import Home from './Home'
import Login from './Login'
import Footer from './Footer'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
<>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
  <Footer />
</>
  )
}

export default App
