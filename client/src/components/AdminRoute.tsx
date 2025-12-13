import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      try {
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if (response.data.role === 'admin') {
          setIsAdmin(true)
        } else {
          navigate('/profile')
        }
      } catch (error) {
        navigate('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAdmin()
  }, [navigate])

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>验证中...</div>
  }

  if (!isAdmin) {
    return null
  }

  return children
}

export default AdminRoute