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

const PublicAdminUsers = () => {
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
      setLoading(true)
      console.log('Fetching users from API...')
      const response = await axios.get('/api/public-admin/users')
      console.log('Raw API Response:', response)
      console.log('Response data type:', typeof response.data)
      console.log('Response data:', response.data)
      
      // 检查响应是否为字符串（可能是HTML错误页面）
      if (typeof response.data === 'string') {
        console.error('Received string response instead of JSON:', response.data.substring(0, 500))
        setError(`服务器返回了意外的响应格式，请检查服务器状态。响应内容预览: ${response.data.substring(0, 200)}`)
        return
      }
      
      // 确保响应数据是数组格式
      if (response.data && response.data.success && Array.isArray(response.data.users)) {
        console.log('Setting users from response.data.users')
        setUsers(response.data.users)
      } else if (response.data && typeof response.data === 'object' && response.data.users && Array.isArray(response.data.users)) {
        // 如果数据嵌套在users属性中
        console.log('Setting users from response.data.users (alternative format)')
        setUsers(response.data.users)
      } else if (Array.isArray(response.data)) {
        // 兼容旧格式
        console.log('Setting users from response.data (direct array)')
        setUsers(response.data)
      } else {
        console.error('Unexpected data format:', response.data)
        setError('数据格式错误: 期望包含users数组的对象，但收到 ' + typeof response.data)
      }
    } catch (err: any) {
      console.error('API Error:', err)
      if (err.response) {
        console.error('Error response:', err.response)
        // 检查错误响应是否为字符串
        if (typeof err.response.data === 'string') {
          setError(`服务器错误 (${err.response.status}): 服务器返回了HTML错误页面。请检查服务器日志。`)
        } else {
          setError(`服务器错误 (${err.response.status}): ${err.response.data?.message || '未知错误'}`)
        }
      } else if (err.request) {
        console.error('Error request:', err.request)
        setError('网络错误: 无法连接到服务器')
      } else {
        setError(`请求错误: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePromoteToAdmin = async (userId: number) => {
    if (!window.confirm('确定要将该用户提升为管理员吗？')) {
      return
    }
    try {
      const response = await axios.put(`/api/public-admin/users/${userId}/promote`, {})
      // 确保响应数据包含user对象
      if (response.data && response.data.user) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: response.data.user.role } : user
        ))
        alert('用户已成功提升为管理员！')
      } else {
        throw new Error('响应数据格式不正确')
      }
    } catch (err: any) {
      if (err.response) {
        alert(`服务器错误 (${err.response.status}): ${err.response.data?.message || '未知错误'}`)
      } else if (err.request) {
        alert('网络错误: 无法连接到服务器')
      } else {
        alert(`请求错误: ${err.message || '提升用户失败'}`)
      }
    }
  }

  const handleDemoteToUser = async (userId: number) => {
    if (!window.confirm('确定要将该管理员降级为普通用户吗？')) {
      return
    }
    try {
      const response = await axios.put(`/api/public-admin/users/${userId}/demote`, {})
      // 确保响应数据包含user对象
      if (response.data && response.data.user) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: response.data.user.role } : user
        ))
        alert('管理员已成功降级为普通用户！')
      } else {
        throw new Error('响应数据格式不正确')
      }
    } catch (err: any) {
      if (err.response) {
        alert(`服务器错误 (${err.response.status}): ${err.response.data?.message || '未知错误'}`)
      } else if (err.request) {
        alert('网络错误: 无法连接到服务器')
      } else {
        alert(`请求错误: ${err.message || '降级用户失败'}`)
      }
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
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
        <h3>错误</h3>
        <p>{error}</p>
        <button onClick={fetchUsers} className="btn btn-primary">重试</button>
      </div>
    )
  }

  return (
    <div className="admin-users">
      <h2>公共用户管理</h2>
      <p style={{ color: 'red', fontWeight: 'bold' }}>注意：此页面无需登录即可访问，仅用于测试目的。</p>
      
      <div className="filters">
        <input
          type="text"
          placeholder="搜索用户名或邮箱..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={filterRole} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterRole(e.target.value)} className="filter-select">
          <option value="all">全部角色</option>
          <option value="user">普通用户</option>
          <option value="admin">管理员</option>
        </select>
        <select value={filterStatus} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)} className="filter-select">
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
                <span className={`role-badge ${user.role}`}>
                  {user.role === 'admin' ? '管理员' : '普通用户'}
                </span>
              </td>
              <td>
                <span className={`status-badge ${user.status}`}>
                  {user.status === 'active' ? '活跃' : '禁用'}
                </span>
              </td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                {user.role === 'admin' ? (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleDemoteToUser(user.id)}
                  >
                    降级
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handlePromoteToAdmin(user.id)}
                  >
                    提升
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PublicAdminUsers