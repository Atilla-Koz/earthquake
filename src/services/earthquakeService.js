import axios from 'axios';

const TURKEY_BOUNDS = {
  north: 42.0,
  south: 36.0,
  east: 45.0,
  west: 26.0
}

export const getEarthquakes = async (limit = 20) => {
  try {
    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&minlatitude=36&maxlatitude=42&minlongitude=26&maxlongitude=45&minmagnitude=2.5&limit=${limit}`
    )
    const data = await response.json()
    
    return data.features.map(feature => ({
      id: feature.id,
      properties: {
        mag: feature.properties.mag,
        place: feature.properties.place,
        time: feature.properties.time,
        url: feature.properties.url
      },
      geometry: {
        coordinates: feature.geometry.coordinates
      }
    }))
  } catch (error) {
    console.error('Deprem verileri alınırken hata oluştu:', error)
    throw error
  }
} 