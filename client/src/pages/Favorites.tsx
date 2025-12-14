import { useState, useEffect } from 'react'
import axios from 'axios'
import SendMessageModal from '../components/SendMessageModal'

interface User {
  id: number
  username: string
  email: string
  createdAt: string
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{ id: number; username: string } | null>(null)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // 处理后端返回的数据结构，提取favoritedUser对象
      const userData = Array.isArray(response.data) ? 
        response.data.map(item => item.favoritedUser || {}).filter(user => user.id) : 
        []
      setFavorites(userData)
    } catch (err: any) {
      setError(err.response?.data?.message || '获取收藏列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (userId: number) => {
    if (!window.confirm('确定要取消收藏吗？')) {
      return
    }
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/favorites/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // 从本地状态中移除已取消收藏的用户
      setFavorites(favorites.filter(user => user.id !== userId))
      alert('已取消收藏')
    } catch (err: any) {
      alert(err.response?.data?.message || '操作失败')
    }
  }

  const handleSendMessage = (userId: number, username: string) => {
    setSelectedUser({ id: userId, username })
    setShowMessageModal(true)
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>{error}</div>
  }

  return (
    <div className="favorites">
      <h2>我的收藏</h2>
      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#999', marginBottom: '1rem' }}>还没有收藏任何用户</p>
          <a href="/users" className="btn btn-primary">去浏览用户</a>
        </div>
      ) : (
        <>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>共收藏 {favorites.length} 个用户</p>
          <div className="user-grid">
            {favorites.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <h3>{user.username}</h3>
                <p className="user-email">{user.email}</p>
                <p className="user-date">加入时间: {new Date(user.createdAt).toLocaleDateString()}</p>
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
                    onClick={() => handleRemoveFavorite(user.id)}
                    style={{ flex: 1 }}
                  >
                    取消收藏
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
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

export default Favorites
