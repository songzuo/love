// API配置文件，用于管理不同环境的API端点

const getApiBaseUrl = () => {
  // 生产环境 - GitHub Pages
  if (process.env.NODE_ENV === 'production') {
    // 指向Render部署的后端服务URL
    // 当前后后端服务同时提供API和前端静态文件
    return 'https://dating-app-api.onrender.com';
  }
  
  // 开发环境
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();