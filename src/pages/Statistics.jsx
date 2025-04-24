import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../styles/Statistics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    averageMagnitude: 0,
    maxMagnitude: 0,
    minMagnitude: 0,
    byDay: {},
    byMagnitude: {},
    byDepth: {}
  });

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const response = await fetch(
          `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate.toISOString()}&endtime=${endDate.toISOString()}&minmagnitude=2.5&minlatitude=35&maxlatitude=43&minlongitude=25&maxlongitude=45`
        );
        const data = await response.json();
        setEarthquakes(data.features);
        calculateStats(data.features);
      } catch (err) {
        setError('Deprem verileri yüklenirken bir hata oluştu');
        console.error('Error fetching earthquake data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  const calculateStats = (data) => {
    const newStats = {
      total: data.length,
      averageMagnitude: 0,
      maxMagnitude: 0,
      minMagnitude: Infinity,
      byDay: {},
      byMagnitude: {
        '2.5-3.0': 0,
        '3.0-4.0': 0,
        '4.0-5.0': 0,
        '5.0+': 0
      },
      byDepth: {
        '0-10': 0,
        '10-20': 0,
        '20-30': 0,
        '30+': 0
      }
    };

    let totalMagnitude = 0;

    data.forEach(earthquake => {
      const magnitude = earthquake.properties.mag;
      const depth = earthquake.geometry.coordinates[2];
      const date = new Date(earthquake.properties.time).toLocaleDateString('tr-TR');

      // Genel istatistikler
      totalMagnitude += magnitude;
      newStats.maxMagnitude = Math.max(newStats.maxMagnitude, magnitude);
      newStats.minMagnitude = Math.min(newStats.minMagnitude, magnitude);

      // Günlük dağılım
      newStats.byDay[date] = (newStats.byDay[date] || 0) + 1;

      // Büyüklük dağılımı
      if (magnitude >= 5.0) newStats.byMagnitude['5.0+']++;
      else if (magnitude >= 4.0) newStats.byMagnitude['4.0-5.0']++;
      else if (magnitude >= 3.0) newStats.byMagnitude['3.0-4.0']++;
      else newStats.byMagnitude['2.5-3.0']++;

      // Derinlik dağılımı
      if (depth >= 30) newStats.byDepth['30+']++;
      else if (depth >= 20) newStats.byDepth['20-30']++;
      else if (depth >= 10) newStats.byDepth['10-20']++;
      else newStats.byDepth['0-10']++;
    });

    newStats.averageMagnitude = totalMagnitude / data.length;
    setStats(newStats);
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const lineChartData = {
    labels: Object.keys(stats.byDay),
    datasets: [
      {
        label: 'Günlük Deprem Sayısı',
        data: Object.values(stats.byDay),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const barChartData = {
    labels: Object.keys(stats.byMagnitude),
    datasets: [
      {
        label: 'Deprem Sayısı',
        data: Object.values(stats.byMagnitude),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 0, 0, 0.6)'
        ]
      }
    ]
  };

  const pieChartData = {
    labels: Object.keys(stats.byDepth),
    datasets: [
      {
        data: Object.values(stats.byDepth),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ]
      }
    ]
  };

  return (
    <div className="statistics-container">
      <h1>Deprem İstatistikleri</h1>
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Toplam Deprem</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Ortalama Büyüklük</h3>
          <p>{stats.averageMagnitude.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>En Büyük Deprem</h3>
          <p>{stats.maxMagnitude.toFixed(1)}</p>
        </div>
        <div className="stat-card">
          <h3>En Küçük Deprem</h3>
          <p>{stats.minMagnitude.toFixed(1)}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Günlük Deprem Dağılımı</h3>
          <Line data={lineChartData} />
        </div>
        <div className="chart-card">
          <h3>Büyüklük Dağılımı</h3>
          <Bar data={barChartData} />
        </div>
        <div className="chart-card">
          <h3>Derinlik Dağılımı</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Statistics; 