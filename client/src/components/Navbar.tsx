import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    
    if (token) {
      fetchUserRole()
    }
  }, [])

  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUserRole(response.data.role)
    } catch (err) {
      console.error('Failed to fetch user role')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUserRole('')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          婚恋交友
        </Link>
        <ul className="navbar-links">
          <li><Link to="/">首页</Link></li>
          {!isLoggedIn ? (
            <>
              <li><Link to="/register">注册</Link></li>
              <li><Link to="/login">登录</Link></li>
            </>
          ) : (
            <>
              {userRole === 'admin' ? (
                <>
                  <li><Link to="/admin/dashboard">管理面板</Link></li>
                  <li><Link to="/admin/users">用户管理</Link></li>
                  <li><Link to="/admin/statistics">数据统计</Link></li>
                  <li><Link to="/profile">个人资料</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/matches">匹配推荐</Link></li>
                  <li><Link to="/users">浏览用户</Link></li>
                  <li><Link to="/favorites">我的收藏</Link></li>
                  <li><Link to="/messages">消息中心</Link></li>
                  <li><Link to="/profile">个人资料</Link></li>
                </>
              )}
              <li><button onClick={handleLogout} className="btn-logout">退出</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar