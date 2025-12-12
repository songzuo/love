// API配置文件，用于管理不同环境的API端点

const getApiBaseUrl = () => {
  // 生产环境 - GitHub Pages
  if (process.env.NODE_ENV === 'production') {
    // 当后端部署完成后，这里应该指向您的后端服务URL
    // 例如: return 'https://your-backend-service.onrender.com';
    return ''; // 暂时返回空字符串，使用相对路径
  }
  
  // 开发环境
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();