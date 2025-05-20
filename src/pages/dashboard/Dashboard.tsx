import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../service/memberApi';
import StatsCard from '../../component/StatsCard';
import RegistrationChart from '../../component/RegistrationCard';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const data = await getDashboardStats(token);
        setStats(data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        <StatsCard 
          title="Total Members" 
          value={stats?.totalMembers} 
          icon="👥"
        />
        <StatsCard 
          title="Today's Registrations" 
          value={stats?.todaysRegistrations} 
          icon="📅"
        />
        <StatsCard 
          title="Active Regions" 
          value="5" 
          icon="🌏"
        />
      </div>
      
      <div className="chart-container">
        <h2>Recent Registrations</h2>
        <RegistrationChart data={stats?.chartData} />
      </div>
    </div>
  );
};

export default Dashboard;