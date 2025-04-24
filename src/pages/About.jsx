import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>Hakkımızda</h1>
      <div className="about-content">
        <p>
          Deprem Takip uygulaması, Türkiye'deki son depremleri anlık olarak takip etmenizi sağlayan bir web uygulamasıdır.
          USGS (United States Geological Survey) verilerini kullanarak güncel deprem bilgilerini sunmaktadır.
        </p>
        
        <div className="developer-info">
          <h2>Geliştirici</h2>
          <p>Bu uygulama Atilla Koz tarafından geliştirilmiştir.</p>
          <a 
            href="https://atillakoz.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="portfolio-link"
          >
            <FontAwesomeIcon icon={faGlobe} />
            Portföyümü Ziyaret Edin
          </a>
        </div>

        <div className="features">
          <h2>Özellikler</h2>
          <ul>
            <li>Anlık deprem takibi</li>
            <li>Detaylı deprem bilgileri</li>
            <li>Harita üzerinde görüntüleme</li>
            <li>İstatistiksel analizler</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About; 