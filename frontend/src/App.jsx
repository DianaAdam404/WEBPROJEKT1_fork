import './App.css'
import TermekLista from './components/TermekLista'
import LoginForm from './components/LoginForm'
import RegForm from './components/RegForm'
import UserForm from './components/UserForm'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MultiForm from './components/MultiForm'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegForm />} />
          <Route path="/user" element={<UserForm />} />
          <Route path="/multi-form" element={<MultiForm />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
