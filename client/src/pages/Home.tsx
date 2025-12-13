const Home = () => {
  return (
    <div className="home">
      <h1>欢迎来到婚恋交友网站</h1>
      <p>在这里，你可以找到你的人生伴侣，开启美好的爱情之旅。注册并完善你的个人资料，让我们为你匹配最适合的对象。</p>
      <div>
        <a href="/register" className="btn btn-primary">立即注册</a>
        <a href="/login" className="btn btn-outline" style={{ marginLeft: '1rem' }}>已有账号？登录</a>
      </div>
    </div>
  )
}

export default Home