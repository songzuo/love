import { useState, useEffect } from 'react'
import axios from 'axios'

interface DetailedStats {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  adminUsers: number
  regularUsers: number
  newUsersToday: number
  newUsersThisWeek: number
  newUsersThisMonth: number
  userGrowth: Array<{ date: string; count: number }>
}

const AdminStatistics = () => {
  const [stats, setStats] = useState<DetailedStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/api/admin/statistics/detailed', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStats(response.data)
      } catch (err: any) {
        setError(err.response?.data?.message || '获取统计数据失败')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>{error}</div>
  }

  return (
    <div className="admin-statistics">
      <h2>数据统计</h2>
      
      <div className="stats-section">
        <h3>用户概览</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>总用户数</h4>
            <p className="stat-number">{stats?.totalUsers || 0}</p>
          </div>
          <div className="stat-card">
            <h4>活跃用户</h4>
            <p className="stat-number" style={{ color: '#51cf66' }}>{stats?.activeUsers || 0}</p>
          </div>
          <div className="stat-card">
            <h4>禁用用户</h4>
            <p className="stat-number" style={{ color: '#ff6b6b' }}>{stats?.inactiveUsers || 0}</p>
          </div>
          <div className="stat-card">
            <h4>管理员</h4>
            <p className="stat-number" style={{ color: '#ffd93d' }}>{stats?.adminUsers || 0}</p>
          </div>
          <div className="stat-card">
            <h4>普通用户</h4>
            <p className="stat-number" style={{ color: '#4ecdc4' }}>{stats?.regularUsers || 0}</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3>用户增长</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>今日新增</h4>
            <p className="stat-number">{stats?.newUsersToday || 0}</p>
          </div>
          <div className="stat-card">
            <h4>本周新增</h4>
            <p className="stat-number">{stats?.newUsersThisWeek || 0}</p>
          </div>
          <div className="stat-card">
            <h4>本月新增</h4>
            <p className="stat-number">{stats?.newUsersThisMonth || 0}</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3>用户比例</h3>
        <div className="progress-bars">
          <div className="progress-item">
            <label>活跃用户比例</label>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${stats?.totalUsers ? (stats.activeUsers / stats.totalUsers * 100) : 0}%`,
                  background: '#51cf66'
                }}
              />
            </div>
            <span>{stats?.totalUsers ? ((stats.activeUsers / stats.totalUsers * 100).toFixed(1)) : 0}%</span>
          </div>
          <div className="progress-item">
            <label>管理员比例</label>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${stats?.totalUsers ? (stats.adminUsers / stats.totalUsers * 100) : 0}%`,
                  background: '#ffd93d'
                }}
              />
            </div>
            <span>{stats?.totalUsers ? ((stats.adminUsers / stats.totalUsers * 100).toFixed(1)) : 0}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStatistics
