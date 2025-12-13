import { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ username: '', email: '' })
  const [updateError, setUpdateError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        setFormData({ username: response.data.username, email: response.data.email })
      } catch (err: any) {
        setError(err.response?.data?.message || '获取个人资料失败')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
    setUpdateError('')
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({ username: user.username, email: user.email })
    setUpdateError('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: typeof formData) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setUpdateError('')
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put('/api/users/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data.user)
      setIsEditing(false)
      alert('资料更新成功！')
    } catch (err: any) {
      setUpdateError(err.response?.data?.message || '更新失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>{error}</div>
  }

  return (
    <div className="profile">
      <h2>个人资料</h2>
      {!isEditing ? (
        <>
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
            <button className="btn btn-primary" onClick={handleEdit}>
              编辑资料
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          {updateError && <div className="form-error">{updateError}</div>}
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">邮箱</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={isSubmitting}>
              取消
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Profile