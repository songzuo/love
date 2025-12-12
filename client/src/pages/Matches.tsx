import { useState, useEffect } from 'react'
import axios from 'axios'

interface User {
  id: number
  username: string
  email: string
  role: string
  status: string
  createdAt: string
}

const Matches = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('未登录')
        }
        const response = await axios.get('/api/matches', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUsers(response.data)
      } catch (err: any) {
        setError(err.response?.data?.message || '获取推荐用户失败')
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  const handleLike = async (userId: number) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(`/api/matches/${userId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('已发送好友请求！')
      setUsers(users.filter(user => user.id !== userId))
    } catch (err: any) {
      alert(err.response?.data?.message || '操作失败')
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>{error}</div>
  }

  return (
    <div className="matches">
      <h2>匹配推荐</h2>
      {users.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>暂无推荐用户</p>
      ) : (
        <div className="user-grid">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <h3>{user.username}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-date">加入时间: {new Date(user.createdAt).toLocaleDateString()}</p>
              <button 
                className="btn btn-primary" 
                onClick={() => handleLike(user.id)}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                感兴趣
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Matches
