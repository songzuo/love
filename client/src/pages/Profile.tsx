import { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('未登录')
        }
        const response = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(response.data)
      } catch (err: any) {
        setError(err.response?.data?.message || '获取个人资料失败')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>{error}</div>
  }

  return (
    <div className="profile">
      <h2>个人资料</h2>
      <div className="profile-info">
        <div className="profile-field">
          <label>用户名：</label>
          <span>{user.username}</span>
        </div>
        <div className="profile-field">
          <label>邮箱：</label>
          <span>{user.email}</span>
        </div>
        <div className="profile-field">
          <label>注册时间：</label>
          <span>{new Date(user.createdAt).toLocaleString()}</span>
        </div>
        <div className="profile-field">
          <label>角色：</label>
          <span>{user.role === 'admin' ? '管理员' : '普通用户'}</span>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="btn btn-primary" onClick={() => {/* 编辑资料逻辑 */}}>
          编辑资料
        </button>
      </div>
    </div>
  )
}

export default Profile