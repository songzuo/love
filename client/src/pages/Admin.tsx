import { useState, useEffect } from 'react'
import axios from 'axios'

interface User {
  _id: string
  username: string
  email: string
  role: string
  status: string
  createdAt: string
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('未登录')
        }
        const response = await axios.get('/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUsers(response.data)
      } catch (err: any) {
        setError(err.response?.data?.message || '获取用户列表失败')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`/api/admin/users/${userId}/status`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUsers(users.map(user => 
        user._id === userId ? { ...user, status: newStatus } : user
      ))
    } catch (err: any) {
      alert(err.response?.data?.message || '更新状态失败')
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>{error}</div>
  }

  return (
    <div className="admin">
      <h2>管理员后台</h2>
      <h3>用户管理</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>用户名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>状态</th>
            <th>注册时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role === 'admin' ? '管理员' : '普通用户'}</td>
              <td>{user.status === 'active' ? '活跃' : '禁用'}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                  onClick={() => handleStatusChange(user._id, user.status === 'active' ? 'inactive' : 'active')}
                >
                  {user.status === 'active' ? '禁用' : '启用'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Admin