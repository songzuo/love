import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          婚恋交友
        </Link>
        <ul className="navbar-links">
          <li><Link to="/">首页</Link></li>
          <li><Link to="/register">注册</Link></li>
          <li><Link to="/login">登录</Link></li>
          <li><Link to="/profile">个人资料</Link></li>
          <li><Link to="/admin">管理员</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar