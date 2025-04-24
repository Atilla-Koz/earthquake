import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Deprem Takip
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Ana Sayfa
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/haritalar" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Haritalar
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/istatistikler" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              İstatistikler
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/hakkimizda" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Hakkımızda
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar 