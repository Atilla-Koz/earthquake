import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import EarthquakeCard from '../components/EarthquakeCard'
import { getEarthquakes } from '../services/earthquakeService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const [earthquakes, setEarthquakes] = useState([])
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(20)

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        setLoading(true)
        const data = await getEarthquakes(limit)
        setEarthquakes(data)
      } catch (error) {
        toast.error('Deprem verileri alınırken bir hata oluştu')
        console.error('Hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEarthquakes()
  }, [limit])

  const handleLimitChange = (newLimit) => {
    if (newLimit >= 10 && newLimit <= 100) {
      setLimit(newLimit)
    }
  }

  return (
    <div className="home-container">
      <section className="header">
        <h1>Son Depremler</h1>
        <p>Türkiye ve çevresinde meydana gelen son depremler</p>
      </section>

      <section className="warning">
        <div className="warning-content">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <p>
            Önemli: Bu veriler USGS tarafından sağlanmaktadır. Acil durumlarda resmi kaynakları takip ediniz.
          </p>
        </div>
      </section>

      <section className="limit-control">
        <div className="limit-info">
          <span>Gösterilen Deprem Sayısı: {limit}</span>
          <div className="limit-buttons">
            <button 
              onClick={() => handleLimitChange(limit - 10)}
              disabled={limit <= 10}
              className="limit-button"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <button 
              onClick={() => handleLimitChange(limit + 10)}
              disabled={limit >= 100}
              className="limit-button"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="loading">Yükleniyor...</div>
      ) : earthquakes.length === 0 ? (
        <div className="no-data">Son deprem verisi bulunamadı.</div>
      ) : (
        <section className="earthquake-list">
          {earthquakes.map((earthquake) => (
            <EarthquakeCard key={earthquake.id} earthquake={earthquake} />
          ))}
        </section>
      )}
    </div>
  )
}

export default Home 