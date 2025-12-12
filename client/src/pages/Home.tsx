import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface UserStats {
  username: string
  role: string
  totalUsers?: number
  newMatches?: number
  unreadMessages?: number
}

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    
    if (token) {
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      // Get additional stats
      const usersResponse = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setUserStats({
        username: response.data.username,
        role: response.data.role,
        totalUsers: usersResponse.data.length,
        newMatches: Math.min(10, usersResponse.data.length),
        unreadMessages: 0
      })
    } catch (err) {
      console.error('Failed to fetch user data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>
  }

  if (!isLoggedIn) {
    return (
      <div className="home">
        <div className="hero-section">
          <h1>欢迎来到婚恋交友网站</h1>
          <p className="hero-subtitle">在这里，你可以找到你的人生伴侣，开启美好的爱情之旅</p>
          <div className="hero-buttons">
            <a href="/register" className="btn btn-primary btn-large">立即注册</a>
            <a href="/login" className="btn btn-outline btn-large">已有账号？登录</a>
          </div>
        </div>

        <div className="features-section">
          <h2>平台特色</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💕</div>
              <h3>智能匹配</h3>
              <p>基于兴趣爱好和个人资料，为您推荐最合适的对象</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>海量用户</h3>
              <p>数千名真实用户，总有一个适合你</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>即时通讯</h3>
              <p>实时消息系统，让沟通更便捷</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>隐私保护</h3>
              <p>严格的隐私保护机制，保障您的信息安全</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Logged in user dashboard
  if (userStats?.role === 'admin') {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>管理员控制台</h1>
          <p>欢迎回来，{userStats.username}！</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card" onClick={() => navigate('/admin/dashboard')}>
            <div className="dashboard-icon" style={{ background: '#4ecdc4' }}>📊</div>
            <h3>管理面板</h3>
            <p>查看系统统计数据</p>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/admin/users')}>
            <div className="dashboard-icon" style={{ background: '#ff6b6b' }}>👥</div>
            <h3>用户管理</h3>
            <p>管理所有用户账号</p>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/admin/statistics')}>
            <div className="dashboard-icon" style={{ background: '#ffd93d' }}>📈</div>
            <h3>数据统计</h3>
            <p>详细的数据分析</p>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/profile')}>
            <div className="dashboard-icon" style={{ background: '#a29bfe' }}>⚙️</div>
            <h3>个人设置</h3>
            <p>管理个人资料</p>
          </div>
        </div>
      </div>
    )
  }

  // Regular user dashboard
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>欢迎回来，{userStats?.username}！</h1>
        <p>开始你的缘分之旅</p>
      </div>

      <div className="stats-overview">
        <div className="stat-box">
          <div className="stat-value">{userStats?.totalUsers || 0}</div>
          <div className="stat-label">在线用户</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{userStats?.newMatches || 0}</div>
          <div className="stat-label">新推荐</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{userStats?.unreadMessages || 0}</div>
          <div className="stat-label">未读消息</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card featured" onClick={() => navigate('/matches')}>
          <div className="dashboard-icon" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)' }}>💕</div>
          <h3>匹配推荐</h3>
          <p>查看为你精心挑选的推荐用户</p>
          <span className="card-badge">有 {userStats?.newMatches || 0} 个新推荐</span>
        </div>
        
        <div className="dashboard-card" onClick={() => navigate('/users')}>
          <div className="dashboard-icon" style={{ background: '#4ecdc4' }}>👥</div>
          <h3>浏览用户</h3>
          <p>浏览所有活跃用户，找到心仪对象</p>
        </div>
        
        <div className="dashboard-card" onClick={() => navigate('/favorites')}>
          <div className="dashboard-icon" style={{ background: '#ffd93d' }}>⭐</div>
          <h3>我的收藏</h3>
          <p>查看你收藏的用户列表</p>
        </div>
        
        <div className="dashboard-card" onClick={() => navigate('/messages')}>
          <div className="dashboard-icon" style={{ background: '#a29bfe' }}>💬</div>
          <h3>消息中心</h3>
          <p>查看和管理你的消息</p>
          {userStats?.unreadMessages ? (
            <span className="card-badge unread">{userStats.unreadMessages} 条未读</span>
          ) : null}
        </div>
        
        <div className="dashboard-card" onClick={() => navigate('/profile')}>
          <div className="dashboard-icon" style={{ background: '#51cf66' }}>👤</div>
          <h3>个人资料</h3>
          <p>编辑和完善你的个人信息</p>
        </div>
      </div>

      <div className="quick-tips">
        <h3>💡 使用小贴士</h3>
        <ul>
          <li>完善个人资料可以获得更精准的匹配推荐</li>
          <li>主动发送消息，增加互动机会</li>
          <li>收藏感兴趣的用户，方便后续联系</li>
          <li>保持活跃状态，提高曝光率</li>
        </ul>
      </div>
    </div>
  )
}

export default Home