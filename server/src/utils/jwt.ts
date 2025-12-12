import * as jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
  email: string
  role: string
}

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key_here'
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  // 使用类型断言确保expiresIn参数类型正确
  return jwt.sign(payload, secret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] })
}

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key_here'
  return jwt.verify(token, secret) as JwtPayload
}