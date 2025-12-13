# 婚恋交友网站

一个基于 React + TypeScript + Node.js + Express + MongoDB 的婚恋交友网站，包含管理员后台管理功能。

## 项目结构

```
dating-app/
├── client/                # 前端项目
│   ├── src/
│   │   ├── components/    # React 组件
│   │   ├── pages/         # 页面组件
│   │   ├── hooks/         # 自定义 Hooks
│   │   ├── utils/         # 工具函数
│   │   ├── types/         # TypeScript 类型定义
│   │   └── services/      # API 服务
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                # 后端项目
│   ├── src/
│   │   ├── controllers/   # 控制器
│   │   ├── models/        # 数据模型
│   │   ├── routes/        # 路由
│   │   ├── middleware/    # 中间件
│   │   └── utils/         # 工具函数
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── config/                # 配置文件
└── README.md
```

## 技术栈

### 前端
- React 18
- TypeScript
- Vite
- React Router DOM
- Axios

### 后端
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT 认证
- bcryptjs 密码加密

## 功能特性

### 用户功能
- 注册、登录
- 个人资料管理
- 查看匹配推荐

### 管理员功能
- 用户列表管理
- 用户状态修改
- 用户删除

## 安装和运行

### 前置要求
- Node.js 18+
- MongoDB 4+

### 后端安装和运行

1. 进入后端目录
```bash
cd server
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
   - 复制 `.env.example` 为 `.env`
   - 根据需要修改 `.env` 中的配置

4. 启动开发服务器
```bash
npm run dev
```

### 前端安装和运行

1. 进入前端目录
```bash
cd client
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

## API 接口

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### 用户相关
- `GET /api/users/profile` - 获取当前用户资料
- `PUT /api/users/profile` - 更新用户资料

### 管理员相关
- `GET /api/admin/users` - 获取所有用户列表
- `PUT /api/admin/users/:id/status` - 更新用户状态
- `DELETE /api/admin/users/:id` - 删除用户

## 开发说明

### 前端开发
- 前端开发服务器运行在 http://localhost:3000
- API 请求会代理到 http://localhost:5000

### 后端开发
- 后端开发服务器运行在 http://localhost:5000
- 数据库连接地址：mongodb://localhost:27017/dating-app

## 构建和部署

### 前端构建
```bash
cd client
npm run build
```

### 后端构建
```bash
cd server
npm run build
```

## 许可证

MIT
