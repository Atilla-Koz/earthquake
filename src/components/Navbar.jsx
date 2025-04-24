import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faInfoCircle, faMap, faChartLine } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">Deprem Takip</span>
        </Link>
        
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Ana Sayfa</span>
          </Link>
          <Link 
            to="/harita" 
            className={`nav-link ${isActive('/harita') ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faMap} />
            <span>Harita</span>
          </Link>
          <Link 
            to="/istatistikler" 
            className={`nav-link ${isActive('/istatistikler') ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faChartLine} />
            <span>İstatistikler</span>
          </Link>
          <Link 
            to="/hakkimizda" 
            className={`nav-link ${isActive('/hakkimizda') ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>Hakkımızda</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 