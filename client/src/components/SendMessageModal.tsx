import { useState } from 'react'
import axios from 'axios'

interface SendMessageModalProps {
  recipientId: number
  recipientName: string
  onClose: () => void
  onSuccess: () => void
}

const SendMessageModal = ({ recipientId, recipientName, onClose, onSuccess }: SendMessageModalProps) => {
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) {
      setError('消息内容不能为空')
      return
    }

    setSending(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      await axios.post('/api/messages/send', {
        recipientId,
        content: content.trim()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      alert('消息发送成功！')
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || '发送失败，请重试')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>发送消息给 {recipientName}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="message-content">消息内容</label>
            <textarea
              id="message-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="输入你想说的话..."
              rows={5}
              maxLength={500}
              disabled={sending}
            />
            <div className="char-count">{content.length}/500</div>
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={sending}
            >
              取消
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={sending || !content.trim()}
            >
              {sending ? '发送中...' : '发送'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SendMessageModal
