import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Deprem Takip</h3>
            <p>Türkiye'deki son depremleri anlık olarak takip edin.</p>
          </div>
          
          <div className="footer-section">
            <h3>Bağlantılar</h3>
            <ul className="footer-links">
              <li><a href="/">Ana Sayfa</a></li>
              <li><a href="/harita">Harita</a></li>
              <li><a href="/istatistikler">İstatistikler</a></li>
              <li><a href="/hakkimizda">Hakkımızda</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Sosyal Medya</h3>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Deprem Takip. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 