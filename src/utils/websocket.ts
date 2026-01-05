import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

interface WebSocketConfig {
  url: string
  topicPrefix: string
  appPrefix: string
}

class WebSocketService {
  private client: Client | null = null
  private config: WebSocketConfig
  private isConnected: boolean = false

  constructor(config: WebSocketConfig) {
    this.config = config
  }

  connect(
    onConnect?: () => void,
    onMessage?: (message: any) => void,
    onError?: (error: any) => void,
  ) {
    try {
      const socket = new SockJS(this.config.url)

      this.client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
          console.log('STOMP调试信息:', str)
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('STOMP连接已建立')
          this.isConnected = true
          onConnect?.()
        },
        onStompError: (frame) => {
          console.error('STOMP错误:', frame.headers['message'])
          console.error('STOMP详细错误:', frame.body)
          onError?.(frame)
        },
        onWebSocketError: (error) => {
          console.error('WebSocket连接错误:', error)
          onError?.(error)
        },
        onDisconnect: () => {
          console.log('STOMP连接已断开')
          this.isConnected = false
        },
      })

      this.client.activate()
    } catch (error) {
      console.error('WebSocket连接失败:', error)
      onError?.(error)
    }
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate()
      this.isConnected = false
    }
  }

  subscribe(destination: string, callback: (message: any) => void) {
    if (this.client && this.isConnected) {
      return this.client.subscribe(destination, (message) => {
        try {
          const parsedMessage = JSON.parse(message.body)
          callback(parsedMessage)
        } catch (error) {
          console.error('解析WebSocket消息失败:', error)
          console.error('原始消息内容:', message.body)
        }
      })
    }
    return null
  }

  send(destination: string, body: any) {
    if (this.client && this.isConnected) {
      this.client.publish({
        destination,
        body: JSON.stringify(body),
      })
    } else {
      console.warn('WebSocket未连接，无法发送消息')
    }
  }

  isConnectedToWebSocket(): boolean {
    return this.isConnected
  }
}

// 默认配置
const defaultConfig: WebSocketConfig = {
  url: 'http://localhost:8080/ws', // 后端WebSocket端点
  topicPrefix: '/topic', // 订阅主题前缀
  appPrefix: '/app', // 发送消息前缀
}

export { WebSocketService, defaultConfig }
