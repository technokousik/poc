import { useEffect, useState } from 'react'
import StatCard from '../components/dashboard/StatCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import RecentOrders from '../components/dashboard/RecentOrders'
import TopProducts from '../components/dashboard/TopProducts'
import { getDashboardData } from '../api/dashboardApi'

const Dashboard = () => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getDashboardData()
        setStats(response?.data?.dashboard)
      } catch (error) {
        console.error('Unable to load dashboard', error)
      }
    }

    loadDashboard()
  }, [])

  return (
    <div>
      <div className="grid-4" style={{ marginBottom: '1rem' }}>
        <StatCard title="Revenue" value={stats?.revenue || '₹4.2L'} />
        <StatCard title="Orders" value={stats?.orders || '128'} />
        <StatCard title="Users" value={stats?.users || '3.2K'} />
        <StatCard title="AI Insights" value={stats?.aiInsights || '24'} />
      </div>
      <div className="grid-2">
        <RevenueChart />
        <RecentOrders />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <TopProducts />
      </div>
    </div>
  )
}

export default Dashboard
