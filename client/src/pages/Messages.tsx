import { useState, useEffect } from 'react'
import axios from 'axios'
import SendMessageModal from '../components/SendMessageModal'

interface Message {
  id: number
  senderId: number
  senderName: string
  recipientId: number
  recipientName: string
  content: string
  createdAt: string
  read: boolean
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'received' | 'sent'>('all')
  const [currentUserId, setCurrentUserId] = useState<number>(0)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [replyTarget, setReplyTarget] = useState<{ id: number; username: string } | null>(null)

  useEffect(() => {
    fetchUserProfile()
    fetchMessages()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCurrentUserId(response.data.id)
    } catch (err) {
      console.error('Failed to fetch user profile')
    }
  }

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/messages', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // API returns { message: string, data: Message[] }
      const messagesData = response.data.data || response.data || []
      
      // Transform the data to match our interface
      const transformedMessages = messagesData.map((msg: any) => ({
        id: msg.id,
        senderId: msg.senderId,
        senderName: msg.sender?.username || 'Unknown',
        recipientId: msg.recipientId,
        recipientName: msg.recipient?.username || 'Unknown',
        content: msg.content,
        createdAt: msg.createdAt,
        read: msg.isRead || false
      }))
      
      setMessages(transformedMessages)
    } catch (err: any) {
      setError(err.response?.data?.message || '获取消息失败')
    } finally {
      setLoading(false)
    }
  }

  const handleReply = (senderId: number, senderName: string) => {
    setReplyTarget({ id: senderId, username: senderName })
    setShowMessageModal(true)
  }

  const handleMarkAsRead = async (messageId: number) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`/api/messages/${messageId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ))
    } catch (err: any) {
      alert(err.response?.data?.message || '操作失败')
    }
  }

  const handleDeleteMessage = async (messageId: number) => {
    if (!window.confirm('确定要删除这条消息吗？')) {
      return
    }
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessages(messages.filter(msg => msg.id !== messageId))
      alert('消息已删除')
    } catch (err: any) {
      alert(err.response?.data?.message || '删除失败')
    }
  }

  const filteredMessages = messages.filter(msg => {
    if (filter === 'received') return msg.recipientId === currentUserId
    if (filter === 'sent') return msg.senderId === currentUserId
    return true
  })

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>加载中...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>{error}</div>
  }

  return (
    <div className="messages-page">
      <h2>消息中心</h2>
      
      <div className="message-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          全部消息
        </button>
        <button 
          className={`filter-btn ${filter === 'received' ? 'active' : ''}`}
          onClick={() => setFilter('received')}
        >
          收到的消息
        </button>
        <button 
          className={`filter-btn ${filter === 'sent' ? 'active' : ''}`}
          onClick={() => setFilter('sent')}
        >
          发送的消息
        </button>
      </div>

      {filteredMessages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#999' }}>暂无消息</p>
        </div>
      ) : (
        <div className="messages-list">
          {filteredMessages.map(message => (
            <div key={message.id} className={`message-card ${!message.read ? 'unread' : ''}`}>
              <div className="message-header">
                <div className="message-user">
                  <span className="message-label">
                    {message.senderId === currentUserId ? '发送给' : '来自'}:
                  </span>
                  <span className="message-username">
                    {message.senderId === currentUserId 
                      ? message.recipientName 
                      : message.senderName}
                  </span>
                </div>
                <span className="message-time">{new Date(message.createdAt).toLocaleString()}</span>
              </div>
              <div className="message-content">
                {message.content}
              </div>
              <div className="message-actions">
                {message.recipientId === currentUserId && (
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleReply(message.senderId, message.senderName)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    回复
                  </button>
                )}
                {!message.read && message.recipientId === currentUserId && (
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleMarkAsRead(message.id)}
                    style={{ marginRight: '0.5rem', backgroundColor: '#e9ecef', color: '#495057' }}
                  >
                    标记已读
                  </button>
                )}
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleDeleteMessage(message.id)}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showMessageModal && replyTarget && (
        <SendMessageModal
          recipientId={replyTarget.id}
          recipientName={replyTarget.username}
          onClose={() => setShowMessageModal(false)}
          onSuccess={() => {
            fetchMessages() // Refresh messages after sending reply
          }}
        />
      )}
    </div>
  )
}

export default Messages
