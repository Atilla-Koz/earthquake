import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import DepremDetay from './pages/DepremDetay'
import Haritalar from './pages/Haritalar'
import Statistics from './pages/Statistics'
import About from './pages/About'
import './styles/App.css'
import './styles/Navbar.css'
import './styles/Footer.css'
import './styles/Home.css'
import './styles/EarthquakeCard.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deprem/:id" element={<DepremDetay />} />
          <Route path="/haritalar" element={<Haritalar />} />
          <Route path="/istatistikler" element={<Statistics />} />
          <Route path="/hakkimizda" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
