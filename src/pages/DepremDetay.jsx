import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faMapMarkerAlt, faClock, faRulerVertical } from '@fortawesome/free-solid-svg-icons'
import '../styles/DepremDetay.css'

const DepremDetay = () => {
  const { id } = useParams()
  const [earthquake, setEarthquake] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEarthquakeDetails = async () => {
      try {
        const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=${id}&format=geojson`)
        const data = await response.json()
        
        if (data.properties) {
          setEarthquake(data.properties)
        } else {
          setError('Deprem detayları bulunamadı')
        }
      } catch (err) {
        setError('Deprem detayları yüklenirken bir hata oluştu')
        console.error('Error fetching earthquake details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEarthquakeDetails()
  }, [id])

  if (loading) {
    return <div className="loading">Yükleniyor...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!earthquake) {
    return <div className="error">Deprem detayları bulunamadı</div>
  }

  const getMagnitudeColor = (mag) => {
    if (mag >= 5) return '#dc3545'
    if (mag >= 4) return '#ffc107'
    return '#28a745'
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="deprem-detay">
      <div className="header">
        <Link to="/" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
          Geri Dön
        </Link>
        <h1>Deprem Detayları</h1>
      </div>

      <div 
        className="magnitude-circle"
        style={{
          width: '150px',
          height: '150px',
          backgroundColor: getMagnitudeColor(earthquake.mag)
        }}
      >
        {earthquake.mag.toFixed(1)}
      </div>

      <div className="details">
        <div className="detail-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <div>
            <h3>Konum</h3>
            <p>{earthquake.place}</p>
            <p className="coordinates">
              Enlem: {earthquake.coordinates[1].toFixed(2)}°N, 
              Boylam: {earthquake.coordinates[0].toFixed(2)}°E
            </p>
          </div>
        </div>

        <div className="detail-item">
          <FontAwesomeIcon icon={faClock} />
          <div>
            <h3>Zaman</h3>
            <p>{formatDate(earthquake.time)}</p>
          </div>
        </div>

        <div className="detail-item">
          <FontAwesomeIcon icon={faRulerVertical} />
          <div>
            <h3>Derinlik</h3>
            <p>{earthquake.depth.toFixed(1)} km</p>
          </div>
        </div>
      </div>

      <div className="map-container">
        <iframe
          title="Deprem Haritası"
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${earthquake.coordinates[0]-0.5}%2C${earthquake.coordinates[1]-0.5}%2C${earthquake.coordinates[0]+0.5}%2C${earthquake.coordinates[1]+0.5}&layer=mapnik&marker=${earthquake.coordinates[1]}%2C${earthquake.coordinates[0]}`}
        />
      </div>
    </div>
  )
}

export default DepremDetay 