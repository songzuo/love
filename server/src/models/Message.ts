import mongoose, { Schema, Document } from 'mongoose'

interface IMessage extends Document {
  sender: mongoose.Schema.Types.ObjectId
  recipient: mongoose.Schema.Types.ObjectId
  content: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

const MessageSchema: Schema<IMessage> = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// 自动更新updatedAt字段
MessageSchema.pre<IMessage>('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.model<IMessage>('Message', MessageSchema)