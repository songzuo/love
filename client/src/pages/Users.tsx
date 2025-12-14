import { useState, useEffect } from 'react'
import axios from 'axios'
import SendMessageModal from '../components/SendMessageModal'

interface User {
  id: number
  username: string
  email: string
  role: string
  status: string
  createdAt: string
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{ id: number; username: string } | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('未登录')
        }
        const response = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // 确保数据是数组格式
        setUsers(Array.isArray(response.data) ? response.data : [])
      } catch (err: any) {
        setError(err.response?.data?.message || '获取用户列表失败')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleSendMessage = (userId: number, username: string) => {
    setSelectedUser({ id: userId, username })
    setShowMessageModal(true)
  }

  const handleAddFavorite = async (userId: number, username: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(`/api/favorites/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert(`已将 ${username} 添加到收藏！`)
    } catch (err: any) {
      alert(err.response?.data?.message || '添加收藏失败')
    }
  }

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>{error}</div>
  }

  return (
    <div className="users">
      <h2>浏览用户</h2>
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="搜索用户名或邮箱..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>
      {filteredUsers.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>没有找到用户</p>
      ) : (
        <div className="user-grid">
          {filteredUsers.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <h3>{user.username}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-date">加入时间: {new Date(user.createdAt).toLocaleDateString()}</p>
              <p className="user-status">
                状态: <span style={{ color: user.status === 'active' ? '#51cf66' : '#ff6b6b' }}>
                  {user.status === 'active' ? '在线' : '离线'}
                </span>
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleSendMessage(user.id, user.username)}
                  style={{ flex: 1 }}
                >
                  发消息
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => handleAddFavorite(user.id, user.username)}
                  style={{ flex: 1 }}
                >
                  收藏
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showMessageModal && selectedUser && (
        <SendMessageModal
          recipientId={selectedUser.id}
          recipientName={selectedUser.username}
          onClose={() => setShowMessageModal(false)}
          onSuccess={() => {
            // Optionally refresh or show success message
          }}
        />
      )}
    </div>
  )
}

export default Users
