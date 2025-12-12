import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:5000/api/messages',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器，添加认证令牌
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 消息类型定义
export interface Message {
  _id: string;
  sender: { _id: string; username: string; email: string };
  recipient: { _id: string; username: string; email: string };
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// 发送消息
export const sendMessage = async (recipientId: string, content: string): Promise<Message> => {
  try {
    const response = await api.post('/send', { recipientId, content });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send message');
  }
};

// 获取所有消息
export const getMessages = async (): Promise<Message[]> => {
  try {
    const response = await api.get('/');
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get messages');
  }
};

// 获取与特定用户的对话
export const getConversation = async (userId: string): Promise<Message[]> => {
  try {
    const response = await api.get(`/conversation/${userId}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get conversation');
  }
};

// 标记消息为已读
export const markAsRead = async (messageId: string): Promise<Message> => {
  try {
    const response = await api.put(`/${messageId}/read`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to mark message as read');
  }
};

// 删除消息
export const deleteMessage = async (messageId: string): Promise<void> => {
  try {
    await api.delete(`/${messageId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete message');
  }
};

export default {
  sendMessage,
  getMessages,
  getConversation,
  markAsRead,
  deleteMessage
};