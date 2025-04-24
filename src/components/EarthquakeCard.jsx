import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faClock, faLink } from '@fortawesome/free-solid-svg-icons'

const EarthquakeCard = ({ earthquake }) => {
  if (!earthquake || !earthquake.properties) {
    return null
  }

  const { mag, place, time, url } = earthquake.properties
  const magnitude = parseFloat(mag).toFixed(1)

  const getMagnitudeColor = (magnitude) => {
    if (magnitude >= 6.0) return '#ff0000'
    if (magnitude >= 5.0) return '#ff4500'
    if (magnitude >= 4.0) return '#ffa500'
    return '#ffd700'
  }

  return (
    <div className="earthquake-card">
      <div className="magnitude" style={{ backgroundColor: getMagnitudeColor(magnitude) }}>
        {magnitude}
      </div>
      <div className="details">
        <h3>{place}</h3>
        <div className="info">
          <span>
            <FontAwesomeIcon icon={faClock} />
            {new Date(time).toLocaleString('tr-TR')}
          </span>
          <span>
            <FontAwesomeIcon icon={faLocationDot} />
            {place}
          </span>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="details-link">
          <FontAwesomeIcon icon={faLink} />
          Detaylar
        </a>
      </div>
    </div>
  )
}

export default EarthquakeCard 