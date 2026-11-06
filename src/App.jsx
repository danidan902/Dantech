import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './page/Home'
import About from './page/AboutUs'
import Contact from './page/Contactt'
import Blog from './page/Bloog'
import SignIn from './page/SgnIn'
import Admin from './page/Admin'
import Footer from './components/Footer'
import Post from './page/Post'

function AppLayout() {
  const location = useLocation()
  const hideHeader = location.pathname.startsWith('/admin')

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
