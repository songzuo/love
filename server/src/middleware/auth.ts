import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { User } from '../index'

interface AuthRequest extends Request {
  user?: any
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' })
    }

    const token = authHeader.split(' ')[1]

    // Verify token
    const decoded = verifyToken(token)

    // Get user from database
    const user = await User.findByPk(decoded.userId)
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' })
    }

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Your account has been deactivated' })
    }

    // Attach user to request
    req.user = user
    next()
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' })
    }
    console.error('Error in auth middleware:', error)
    res.status(401).json({ message: 'Token is not valid' })
  }
}

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Admin access denied' })
  }
}