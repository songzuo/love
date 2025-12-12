import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.username.trim()) newErrors.username = '用户名不能为空'
    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确'
    }
    if (!formData.password) {
      newErrors.password = '密码不能为空'
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度不能少于6位'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次密码输入不一致'
    }
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)
      try {
        await axios.post('/api/auth/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
        navigate('/login')
      } catch (err: any) {
        setErrors({ submit: err.response?.data?.message || '注册失败，请稍后重试' })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>注册账号</h2>
        {errors.submit && <div className="form-error">{errors.submit}</div>}
        
        <div className="form-group">
          <label htmlFor="username">用户名</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="form-error">{errors.username}</div>}
        </div>
        
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
        
        <div className="form-group">
          <label htmlFor="confirmPassword">确认密码</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? '注册中...' : '注册'}
        </button>
        
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          已有账号？ <Link to="/login">登录</Link>
        </p>
      </form>
    </div>
  )
}

export default Register