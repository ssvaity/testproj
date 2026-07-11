import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Search from './pages/Search.jsx'
import Library from './pages/Library.jsx'
import Contact from './pages/Contact.jsx'
import Requests from './pages/Requests.jsx'
import IntroDemo from './pages/IntroDemo.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="search" element={<Search />} />
        <Route path="library" element={<Library />} />
        <Route path="contact" element={<Contact />} />
        <Route path="requests" element={<Requests />} />
        <Route path="intro-demo" element={<IntroDemo />} />
      </Route>
    </Routes>
  )
}
