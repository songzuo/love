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

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || '获取用户列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (userId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`/api/admin/users/${userId}/status`, {
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ))
      alert('状态更新成功！')
    } catch (err: any) {
      alert(err.response?.data?.message || '更新状态失败')
    }
  }

  const handleRoleChange = async (userId: number, newRole: string) => {
    if (!window.confirm(`确定要将该用户角色改为 ${newRole === 'admin' ? '管理员' : '普通用户'} 吗？`)) {
      return
    }
    try {
      const token = localStorage.getItem('token')
      await axios.put(`/api/admin/users/${userId}/role`, {
        role: newRole
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ))
      alert('角色更新成功！')
    } catch (err: any) {
      alert(err.response?.data?.message || '更新角色失败')
    }
  }

  const handleDeleteUser = async (userId: number, username: string) => {
    if (!window.confirm(`确定要删除用户 "${username}" 吗？此操作不可恢复！`)) {
      return
    }
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(users.filter(user => user.id !== userId))
      alert('用户删除成功！')
    } catch (err: any) {
      alert(err.response?.data?.message || '删除用户失败')
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>{error}</div>
  }

  return (
    <div className="admin-users">
      <h2>用户管理</h2>
      
      <div className="filters">
        <input
          type="text"
          placeholder="搜索用户名或邮箱..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="filter-select">
          <option value="all">全部角色</option>
          <option value="user">普通用户</option>
          <option value="admin">管理员</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="all">全部状态</option>
          <option value="active">活跃</option>
          <option value="inactive">禁用</option>
        </select>
      </div>

      <div className="user-count">
        共 {filteredUsers.length} 个用户
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>状态</th>
            <th>注册时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select 
                  value={user.role} 
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="role-select"
                >
                  <option value="user">普通用户</option>
                  <option value="admin">管理员</option>
                </select>
              </td>
              <td>
                <span className={`status-badge ${user.status}`}>
                  {user.status === 'active' ? '活跃' : '禁用'}
                </span>
              </td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                >
                  {user.status === 'active' ? '禁用' : '启用'}
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteUser(user.id, user.username)}
                  style={{ marginLeft: '0.5rem' }}
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsers
