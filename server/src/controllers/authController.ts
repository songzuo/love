import { Request, Response } from 'express'
import { Op } from 'sequelize'
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

    console.log('Register request received:', { username, email, password: password ? '***' : 'empty' });
    
    // 获取User模型
    const User = (global as any).User;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    })
    
    if (existingUser) {
      console.log('User already exists:', { 
        existingEmail: existingUser.email, 
        existingUsername: existingUser.username 
      });
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' })
      }
      return res.status(400).json({ message: 'Username already exists' })
    }

    // Create new user
    console.log('Creating new user...');
    const user = await User.create({ username, email, password, role: 'user', status: 'active' })
    console.log('User created:', { 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      role: user.role,
      status: user.status
    });

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
    console.error('Error in register:', error)
    if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err: any) => err.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body

    console.log('Login request received:', { email, password: password ? '***' : 'empty' });
    
    // 获取User模型
    const User = (global as any).User;

    // Check if user exists
    const user = await User.findOne({
      where: { email }
    })
    
    console.log('User lookup result:', user ? { 
      id: user.id, 
      email: user.email, 
      username: user.username,
      role: user.role,
      status: user.status
    } : 'User not found');

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Check if password is correct
    console.log('Comparing passwords...');
    const isMatch = await user.comparePassword(password)
    console.log('Password comparison result:', isMatch);
    
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Check if user is active
    if (user.status !== 'active') {
      console.log('User account is not active:', email);
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