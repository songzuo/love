// API配置文件，用于管理不同环境的API端点

const getApiBaseUrl = () => {
  // 生产环境 - GitHub Pages
  if (process.env.NODE_ENV === 'production') {
    // 指向Render部署的后端服务URL
    return 'https://dating-app-api.onrender.com';
  }
  
  // 开发环境
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();