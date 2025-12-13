import jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
  email: string
  role: string
}

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key_here'
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  return jwt.sign(payload, secret, { expiresIn })
}

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key_here'
  return jwt.verify(token, secret) as JwtPayload
}