import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Deprem Takip
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Ana Sayfa
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/haritalar" className="nav-link">
              Haritalar
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/istatistikler" className="nav-link">
              İstatistikler
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/hakkimizda" className="nav-link">
              Hakkımızda
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar 