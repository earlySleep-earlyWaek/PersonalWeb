import { Request } from '@/api/request'

// ========================
// 基础类型定义
// ========================

// 定义聊天消息类型
export interface ChatMessage {
  sender: string // 发送者用户名
  content: string // 消息内容
  type: 'CHAT' | 'JOIN' | 'LEAVE' // 消息类型：聊天、加入、离开
  timestamp?: Date // 消息发送时间戳（可选）
}

// 定义聊天室类型
export interface ChatRoom {
  id: number // 聊天室唯一标识ID
  name: string // 聊天室名称
  type: 'PUBLIC' | 'PRIVATE' | 'DIRECT' // 聊天室类型：公开、私有、一对一
  ownerId: number // 房主用户ID
  createdBy: number // 创建者用户ID
  createdAt: Date // 创建时间
}

// 定义用户类型
export interface User {
  id: number // 用户唯一标识ID
  username: string // 用户名（登录用）
  nickname: string // 昵称（显示用）
  avatar?: string // 用户头像URL（可选）
}

// 定义聊天室用户关系类型
export interface ChatRoomUser {
  roomId: number // 聊天室ID
  userId: number // 用户ID
  role: 'OWNER' | 'ADMIN' | 'MEMBER' // 用户角色：房主、管理员、成员
  joinedAt: Date // 加入时间
}

// 定义创建聊天室请求
export interface CreateRoomRequest {
  roomName: string // 聊天室名称
  roomType: 'PUBLIC' | 'PRIVATE' | 'DIRECT' // 聊天室类型
  ownerId: number // 房主用户ID
  createdBy: number // 创建者用户ID
}

// 定义创建一对一聊天室请求
export interface CreateDirectRoomRequest {
  user1Id: number // 第一个用户ID
  user2Id: number // 第二个用户ID
}

// ========================
// 聊天室管理API
// ========================

export const chatRoomApi = {
  // 创建聊天室
  createRoom: (request: CreateRoomRequest) => {
    return Request.post('/api/chat/rooms', request)
  },

  // 创建一对一聊天室
  createDirectRoom: (request: CreateDirectRoomRequest) => {
    return Request.post('/api/chat/rooms/direct', request)
  },

  // 根据聊天室ID获取聊天室详情
  getRoomById: (roomId: number) => {
    return Request.get(`/api/chat/rooms/${roomId}`)
  },

  // 获取所有聊天室
  getAllRooms: () => {
    return Request.get('/api/chat/rooms')
  },

  // 根据类型获取聊天室
  getRoomsByType: (type: 'PUBLIC' | 'PRIVATE' | 'DIRECT') => {
    return Request.get(`/api/chat/rooms/type/${type}`)
  },

  // 获取用户加入的聊天室
  getRoomsByUserId: (userId: number) => {
    return Request.get(`/api/chat/rooms/user/${userId}`)
  },

  // 获取聊天室用户列表
  getRoomUsers: (roomId: number) => {
    return Request.get(`/api/chat/rooms/${roomId}/users`)
  },

  // 添加用户到聊天室
  addUserToRoom: (
    roomId: number,
    userId: number,
    role: 'OWNER' | 'ADMIN' | 'MEMBER' = 'MEMBER',
  ) => {
    return Request.post(`/api/chat/rooms/${roomId}/users/${userId}`, { role })
  },

  // 从聊天室移除用户
  removeUserFromRoom: (roomId: number, userId: number) => {
    return Request.delete(`/api/chat/rooms/${roomId}/users/${userId}`)
  },

  // 检查用户是否在聊天室中
  checkUserInRoom: (roomId: number, userId: number) => {
    return Request.get(`/api/chat/rooms/${roomId}/users/${userId}/check`)
  },
}

// ========================
// 聊天历史API
// ========================

export const chatHistoryApi = {
  // 根据聊天室ID获取聊天历史记录
  getChatHistoryByRoom: (roomId: number) => {
    return Request.get(`/api/chat/history/room/${roomId}`)
  },

  // 获取所有聊天历史记录（默认房间）
  getAllChatHistory: () => {
    return Request.get('/api/chat/history')
  },

  // 根据用户名获取聊天历史记录
  getChatHistoryByUser: (username: string) => {
    return Request.get(`/api/chat/history/${username}`)
  },

  // 获取指定聊天室的完整聊天历史记录
  getFullChatHistoryByRoom: (roomId: number) => {
    return Request.get(`/api/chat/history/room/${roomId}/full`)
  },
}

// ========================
// 聊天消息API
// ========================

export const chatMessageApi = {
  // 发送聊天消息
  sendMessage: (message: ChatMessage) => {
    return Request.post('/api/chat/sendMessage', message)
  },

  // 用户加入房间
  addUser: (roomId: string, username: string) => {
    const message = {
      sender: username, // 发送者用户名
      content: roomId, // 房间ID（作为消息内容）
      type: 'JOIN', // 消息类型：加入房间
    }
    return Request.post('/api/chat/addUser', message)
  },

  // 获取房间消息历史
  getMessages: (roomId: string) => {
    return Request.get(`/api/chat/messages/${roomId}`)
  },

  // 离开房间
  leaveRoom: (roomId: string, username: string) => {
    const message = {
      sender: username, // 发送者用户名
      content: roomId, // 房间ID（作为消息内容）
      type: 'LEAVE', // 消息类型：离开房间
    }
    return Request.post('/api/chat/leaveRoom', message)
  },
}
