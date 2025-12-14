import axios from 'axios'
import { ElMessage } from 'element-plus'

// 1. 环境区分：开发/生产环境的基础URL
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:2002' // 开发环境
    : 'https://api.production.com' // 生产环境

// 2. 创建Axios实例
const service = axios.create({
  baseURL, // 基础请求地址
  timeout: 10000, // 请求超时时间（10秒）
  headers: {
    'Content-Type': 'application/json;charset=utf-8', // 默认请求头
  },
})

// 3. 取消请求控制器：用于取消重复请求
const pendingRequests = new Map()
const generateKey = (config) => {
  return [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&')
}

// 4. 请求拦截器：添加token、取消重复请求、请求头处理等
service.interceptors.request.use(
  (config) => {
    // 取消重复请求
    const requestKey = generateKey(config)
    if (pendingRequests.has(requestKey)) {
      pendingRequests.get(requestKey).cancel('重复请求已取消')
      pendingRequests.delete(requestKey)
    }
    // 添加取消令牌
    const CancelToken = axios.CancelToken
    config.cancelToken = new CancelToken((cancel) => {
      pendingRequests.set(requestKey, { cancel })
    })

    // 添加token（示例：从localStorage获取）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    // 请求拦截错误处理
    console.error('请求拦截器错误：', error)
    return Promise.reject(error)
  },
)

// 5. 响应拦截器：统一处理响应、错误码、清除取消请求标识
service.interceptors.response.use(
  (response) => {
    // 清除已完成请求的取消标识
    const requestKey = generateKey(response.config)
    pendingRequests.delete(requestKey)

    // 统一处理响应数据（根据后端返回格式调整）
    const res = response.data
    // 假设后端约定：code=200为成功，其他为失败
    if (res.code !== 200) {
      // 错误提示
      ElMessage.error(res.msg || '请求失败')
      // 特殊错误码处理（示例：401未登录）
      if (res.code === 401) {
        localStorage.removeItem('token')
        // 跳转到登录页（需引入路由）
        // router.push('/login');
        Elmessage.warning('登录已过期，请重新登录')
      }
      return Promise.reject(res)
    }
    return res // 只返回业务数据，简化上层调用
  },
  (error) => {
    // 清除失败请求的取消标识
    if (error.config) {
      const requestKey = generateKey(error.config)
      pendingRequests.delete(requestKey)
    }

    // 统一处理网络错误
    let errorMsg = '请求失败'
    if (axios.isCancel(error)) {
      errorMsg = '请求已取消：' + error.Elmessage
    } else if (error.Elmessage.includes('timeout')) {
      errorMsg = '请求超时，请稍后重试'
    } else if (error.Elmessage.includes('Network Error')) {
      errorMsg = '网络异常，请检查网络连接'
    } else if (error.response) {
      // HTTP状态码错误
      const status = error.response.status
      switch (status) {
        case 400:
          errorMsg = '参数错误'
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
    Elmessage.error(errorMsg)
    console.error('响应拦截器错误：', error)
    return Promise.reject(error)
  },
)

// 6. 封装通用请求方法
const Request = {
  /**
   * GET请求
   * @param {string} url - 请求地址（相对路径）
   * @param {object} params - URL参数
   * @param {object} config - 额外Axios配置
   * @returns {Promise}
   */
  get(url, params = {}, config = {}) {
    return service.get(url, { params, ...config })
  },

  /**
   * POST请求
   * @param {string} url - 请求地址（相对路径）
   * @param {object} data - 请求体数据
   * @param {object} config - 额外Axios配置
   * @returns {Promise}
   */
  post(url, data = {}, config = {}) {
    return service.post(url, data, config)
  },

  /**
   * PUT请求
   * @param {string} url - 请求地址（相对路径）
   * @param {object} data - 请求体数据
   * @param {object} config - 额外Axios配置
   * @returns {Promise}
   */
  put(url, data = {}, config = {}) {
    return service.put(url, data, config)
  },

  /**
   * DELETE请求
   * @param {string} url - 请求地址（相对路径）
   * @param {object} params - URL参数
   * @param {object} config - 额外Axios配置
   * @returns {Promise}
   */
  delete(url, params = {}, config = {}) {
    return service.delete(url, { params, ...config })
  },

  /**
   * 上传文件（FormData）
   * @param {string} url - 请求地址
   * @param {FormData} formData - 表单数据
   * @returns {Promise}
   */
  upload(url, formData) {
    return service.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

// 7. 导出封装后的实例和方法
export default service
export { Request }
