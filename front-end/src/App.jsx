
import { AuthProvider } from './context/AuthContext'
import { NewsProvider } from './context/NewsContext'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'

function App() {

  return (
    <AuthProvider>
      <NewsProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      </NewsProvider>
    </AuthProvider>
  )
}

export default App
