import { Request, Response } from 'express'
import { User } from '../index'
import { generateToken } from '../utils/jwt'

interface RegisterRequest {
  username: string
  email: string
  password: string
}

interface LoginRequest {
  email: string
  password: string
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: RegisterRequest = req.body

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [User.sequelize?.Op.or]: [{ email }, { username }]
      }
    })
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' })
      }
      return res.status(400).json({ message: 'Username already exists' })
    }

    // Create new user
    const user = await User.create({ username, email, password })

    // Generate token
    const token = generateToken({
      userId: user.id.toString(),
      email: user.email,
      role: user.role
    })

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err: any) => err.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    console.error('Error in register:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body

    // Check if user exists
    const user = await User.findOne({
      where: { email }
    })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Your account has been deactivated' })
    }

    // Generate token
    const token = generateToken({
      userId: user.id.toString(),
      email: user.email,
      role: user.role
    })

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (error: any) {
    console.error('Error in login:', error)
    res.status(500).json({ message: 'Server error' })
  }
}