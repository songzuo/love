# 消息系统实现总结

## 实现内容

### 1. 模型定义 (`Message.ts`)
- 定义了消息的数据结构，包括发送者、接收者、内容、是否已读等字段
- 使用MongoDB作为数据存储
- 实现了自动更新`updatedAt`字段的中间件

### 2. 控制器实现 (`messageController.ts`)
- **sendMessage**: 发送新消息，验证接收者存在性并返回包含发送者和接收者信息的完整消息
- **getMessages**: 获取当前用户的所有消息（作为发送者或接收者）
- **getConversation**: 获取与特定用户的对话，并自动标记收到的消息为已读
- **markAsRead**: 将指定消息标记为已读
- **deleteMessage**: 删除指定消息（仅允许发送者或接收者操作）

### 3. 路由配置 (`messages.ts`)
- 配置了5个API端点：
  - `POST /api/messages/send` - 发送消息
  - `GET /api/messages` - 获取所有消息
  - `GET /api/messages/conversation/:userId` - 获取与特定用户的对话
  - `PUT /api/messages/:messageId/read` - 标记消息为已读
  - `DELETE /api/messages/:messageId` - 删除消息
- 所有端点都需要身份验证（使用auth中间件）

### 4. 集成到应用
- 将消息路由注册到主应用中 (`index.ts`)
- 路由前缀为 `/api/messages`

## 技术栈

- **后端框架**: Express.js
- **数据库**: MongoDB (Mongoose ODM)
- **身份验证**: JWT (JSON Web Token)
- **语言**: TypeScript

## 如何运行

### 1. 安装依赖
```bash
cd server
npm install
```

### 2. 配置环境变量
- 复制 `.env.example` 为 `.env`
- 设置数据库连接字符串和JWT密钥

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 构建生产版本
```bash
npm run build
npm start
```

## API 文档

### 1. 发送消息
**POST /api/messages/send**

请求体:
```json
{
  "recipientId": "60c72b2f9b1d8e0015d13e9d",
  "content": "Hello! How are you?"
}
```

响应:
```json
{
  "message": "Message sent successfully",
  "data": {
    "_id": "60c72b2f9b1d8e0015d13e9e",
    "sender": {
      "_id": "60c72b2f9b1d8e0015d13e9c",
      "username": "senderUser",
      "email": "sender@example.com"
    },
    "recipient": {
      "_id": "60c72b2f9b1d8e0015d13e9d",
      "username": "recipientUser",
      "email": "recipient@example.com"
    },
    "content": "Hello! How are you?",
    "isRead": false,
    "createdAt": "2023-06-18T10:00:00.000Z",
    "updatedAt": "2023-06-18T10:00:00.000Z"
  }
}
```

### 2. 获取所有消息
**GET /api/messages**

响应:
```json
{
  "message": "Messages retrieved successfully",
  "data": [
    // 消息列表
  ]
}
```

### 3. 获取与特定用户的对话
**GET /api/messages/conversation/:userId**

响应:
```json
{
  "message": "Conversation retrieved successfully",
  "data": [
    // 对话消息列表（按时间顺序）
  ]
}
```

### 4. 标记消息为已读
**PUT /api/messages/:messageId/read**

响应:
```json
{
  "message": "Message marked as read",
  "data": {
    // 更新后的消息
  }
}
```

### 5. 删除消息
**DELETE /api/messages/:messageId**

响应:
```json
{
  "message": "Message deleted successfully"
}
```

## 注意事项

1. 所有API端点都需要在请求头中包含有效的JWT令牌
2. 消息删除是永久性的，无法恢复
3. 消息内容不能为空
4. 发送消息时，接收者必须存在

## 部署

项目使用GitHub Actions进行持续集成和部署。当代码推送到`main`分支时，会自动执行以下步骤：
1. 构建前端应用
2. 构建后端应用
3. 部署到服务器

详细配置可查看 `.github/workflows/deploy.yml` 文件。