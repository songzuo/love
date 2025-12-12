import { useState, useEffect } from 'react'
import axios from 'axios'

interface Stats {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  adminUsers: number
  newUsersToday: number
  newUsersThisWeek: number
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/api/admin/statistics', {
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
    <div className="admin-dashboard">
      <h2>管理面板</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#4ecdc4' }}>👥</div>
          <div className="stat-content">
            <h3>{stats?.totalUsers || 0}</h3>
            <p>总用户数</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#51cf66' }}>✓</div>
          <div className="stat-content">
            <h3>{stats?.activeUsers || 0}</h3>
            <p>活跃用户</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ff6b6b' }}>✗</div>
          <div className="stat-content">
            <h3>{stats?.inactiveUsers || 0}</h3>
            <p>禁用用户</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ffd93d' }}>⭐</div>
          <div className="stat-content">
            <h3>{stats?.adminUsers || 0}</h3>
            <p>管理员</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#a29bfe' }}>📅</div>
          <div className="stat-content">
            <h3>{stats?.newUsersToday || 0}</h3>
            <p>今日新增</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fd79a8' }}>📊</div>
          <div className="stat-content">
            <h3>{stats?.newUsersThisWeek || 0}</h3>
            <p>本周新增</p>
          </div>
        </div>
      </div>
      
      <div className="admin-actions">
        <h3>快捷操作</h3>
        <div className="action-buttons">
          <a href="/admin/users" className="btn btn-primary">用户管理</a>
          <a href="/admin/statistics" className="btn btn-secondary">详细统计</a>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
