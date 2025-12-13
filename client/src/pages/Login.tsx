import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: typeof formData) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email.trim()) newErrors.email = '邮箱不能为空'
    if (!formData.password) newErrors.password = '密码不能为空'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)
      try {
        const response = await axios.post('/api/auth/login', {
          email: formData.email,
          password: formData.password
        })
        localStorage.setItem('token', response.data.token)
        // 登录成功后刷新页面以确保UI更新
        window.location.href = '/profile'
      } catch (err: any) {
        setErrors({ submit: err.response?.data?.message || '登录失败，请检查邮箱和密码' })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>登录账号</h2>
        {errors.submit && <div className="form-error">{errors.submit}</div>}
        
        <div className="form-group">
          <label htmlFor="email">邮箱</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="form-error">{errors.password}</div>}
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? '登录中...' : '登录'}
        </button>
        
        {/* 管理员账户信息 */}
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          backgroundColor: '#f0f8ff', 
          border: '1px solid #bee5eb', 
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#0c5460' }}>管理员测试账户</h4>
          <p style={{ margin: '0.25rem 0' }}><strong>邮箱:</strong> admin@admin.com</p>
          <p style={{ margin: '0.25rem 0' }}><strong>密码:</strong> 123456</p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#6c757d' }}>
            也可使用 bigasong5@gmail.com 登录（已设为管理员）
          </p>
        </div>
        
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          还没有账号？ <Link to="/register">立即注册</Link>
        </p>
      </form>
    </div>
  )
}

export default Login