import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// import { createBrowserRouter, RouterProvider, } from "react-router-dom";

// Routes
// import Register from './routes/register.jsx'
// import Login from './routes/login.jsx'
// import { Navbar } from './components/navbar.jsx';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/register",
//     element: <Register />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
// ]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
