import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage } from 'element-plus'

// 用于在拦截器中处理路由跳转
let router: any

// 尝试获取路由实例
try {
  // 从应用中获取router实例
  import('@/router/index.js').then((module) => {
    router = module.default
  })
} catch (e) {
  console.warn('无法获取路由实例:', e)
}

// 1. 环境区分：开发/生产环境的基础URL
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080' // 开发环境 - 根据项目规范使用8080端口
    : 'http://localhost:8080' // 生产环境 - 根据项目规范使用实际后端地址

// 2. 创建Axios实例
const service = axios.create({
  baseURL, // 基础请求地址
  timeout: 10000, // 请求超时时间（10秒）
  headers: {
    'Content-Type': 'application/json;charset=utf-8', // 默认请求头
  },
})

// 3. 取消请求控制器：用于取消重复请求
const pendingRequests = new Map<string, AbortController>()
const generateKey = (config: InternalAxiosRequestConfig | AxiosRequestConfig): string => {
  return [
    config.method?.toLowerCase(),
    config.url,
    JSON.stringify(config.params || {}),
    JSON.stringify(config.data || {}),
  ]
    .filter(Boolean) // 过滤掉 undefined 或 null 值
    .join('&')
}

// 4. 请求拦截器：添加token、取消重复请求、请求头处理等
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 取消重复请求
    const requestKey = generateKey(config)
    if (pendingRequests.has(requestKey)) {
      const controller = pendingRequests.get(requestKey)!
      controller.abort('重复请求已取消')
      pendingRequests.delete(requestKey)
    }

    // 添加取消令牌（使用AbortController替代已废弃的CancelToken）
    const controller = new AbortController()
    config.signal = controller.signal
    pendingRequests.set(requestKey, controller)

    // 添加JWT token（根据项目规范，JWT令牌必须放在HTTP请求头的Authorization字段中，并以Bearer为前缀）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    // 请求拦截错误处理
    console.error('请求拦截器错误：', error)
    return Promise.reject(error)
  },
)

// 5. 响应拦截器：统一处理响应、错误码、清除取消请求标识
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 清除已完成请求的取消标识
    if (response.config) {
      const requestKey = generateKey(response.config as InternalAxiosRequestConfig)
      if (pendingRequests.has(requestKey)) {
        pendingRequests.delete(requestKey)
      }
    }

    // 统一处理响应数据
    const res = response.data

    // 如果后端返回特定格式的错误码，可以根据需要处理
    // 这里假设200-299状态码都表示成功
    if (response.status >= 200 && response.status < 300) {
      return res // 返回业务数据，简化上层调用
    } else {
      // 处理非标准HTTP状态码错误
      ElMessage.error('请求失败')
      return Promise.reject(res)
    }
  },
  (error: AxiosError) => {
    // 清除失败请求的取消标识
    if (error.config) {
      const requestKey = generateKey(error.config as InternalAxiosRequestConfig)
      if (pendingRequests.has(requestKey)) {
        pendingRequests.delete(requestKey)
      }
    }

    // 统一处理网络错误
    let errorMsg = '请求失败'
    if (axios.isCancel(error)) {
      errorMsg = '请求已取消：' + error.message
    } else if (error.message?.includes('timeout')) {
      errorMsg = '请求超时，请稍后重试'
    } else if (error.message?.includes('Network Error')) {
      errorMsg = '网络异常，请检查网络连接'
    } else if (error.response) {
      // HTTP状态码错误
      const status = error.response.status
      switch (status) {
        case 400:
          errorMsg = '参数错误'
          break
        case 401:
          // JWT认证失败，清除本地token
          localStorage.removeItem('token')
          errorMsg = '登录已过期，请重新登录'
          // 不在这里直接跳转，让业务组件处理
          break
        case 403:
          errorMsg = '权限不足'
          break
        case 404:
          errorMsg = '请求地址不存在'
          break
        case 500:
          errorMsg = '服务器内部错误'
          break
        default:
          errorMsg = `请求失败（${status}）`
      }
    }

    // 错误提示
    // ElMessage.error(errorMsg)
    console.error('响应拦截器错误：', error)
    return Promise.reject(error)
  },
)

// 6. 封装通用请求方法
export const Request = {
  /**
   * GET请求
   * @param {string} url - 请求地址（相对路径）
   * @param {object} params - URL参数
   * @param {object} config - 额外Axios配置
   * @returns {Promise}
   */
  get<T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return service.get(url, { params, ...config })
  },

  /**
   * POST请求
   * @param {string} url - 请求地址（相对路径）
   * @param {object} data - 请求体数据
   * @param {object} config - 额外Axios配置
   * @returns {Promise}
   */
  post<T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return service.post(url, data, config)
  },

  /**
   * PUT请求
   * @param {string} url - 请求地址（相对路径）
   * @param {object} data - 请求体数据
   * @param {object} config - 额外Axios配置
   * @returns {Promise}
   */
  put<T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return service.put(url, data, config)
  },

  /**
   * DELETE请求
   * @param {string} url - 请求地址（相对路径）
   * @param {object} params - URL参数
   * @param {object} config - 额外Axios配置
   * @returns {Promise}
   */
  delete<T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return service.delete(url, { params, ...config })
  },

  /**
   * 上传文件（FormData）
   * @param {string} url - 请求地址
   * @param {FormData} formData - 表单数据
   * @returns {Promise}
   */
  upload<T = any>(url: string, formData: FormData): Promise<T> {
    return service.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

// 7. 导出封装后的实例和方法
export { service }
