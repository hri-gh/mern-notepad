// import './App.css'

import { BrowserRouter, Routes, Route, } from 'react-router-dom';


// Routes
import Register from './routes/register.jsx'
import Login from './routes/login.jsx'
import { Navbar } from './components/navbar.jsx';
import Home from './routes/home.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container bg-red-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
