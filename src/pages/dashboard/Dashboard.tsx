import React, {  useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'
import '../../styles/Dashboard.css'
import Penduduk from '../../component/Penduduk'
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

const Dashboard = () => {
  const [totalHariIni, setTotalHariIni] = useState(30)
  const [totalPenduduk, setTotalPenduduk] = useState(200)
  const [chartData, setChartData] = useState<number[]>([2, 5, 3, 8, 6, 9])
  const [chartLabels, setChartLabels] = useState<string[]>([
    '10:00',
    '10:05',
    '10:10',
    '10:15',
    '10:20',
    '10:25',
    '10:30',
  ])

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Pendaftaran per 5 menit',
        data: chartData,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 123, 255, 0.3)',
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <p className="dashboard-card-label">Total Hari Ini</p>
          <h3 className="dashboard-card-value">{totalHariIni}</h3>
        </div>
        <div className="dashboard-card">
          <p className="dashboard-card-label">Total Penduduk</p>
          <h3 className="dashboard-card-value">{totalPenduduk}</h3>
        </div>
      </div>

      <div className="dashboard-chart">
        <h4 className="dashboard-chart-title">Grafik Pendaftaran (30 menit terakhir)</h4>
        <Line data={data} options={options} />
      </div>

      <div className='dashboard-penduduk'>
        <Penduduk/>
      </div>
      
    </div>
  )
}

export default Dashboard;