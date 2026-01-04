import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Request } from '@/api/request'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户状态
    const token = ref<string | null>(localStorage.getItem('token'))
    const isAuthenticated = computed(() => !!token.value)
    const userInfo = ref<{ username: string; nickname: string }>({ username: '', nickname: '' })

    // 登录
    const login = async (usernameInput: string, password: string) => {
      try {
        const response = await Request.post('/api/users/login', {
          username: usernameInput,
          password,
        })

        console.log(response)
        console.log(response.data.token)

        // 假设后端返回 token 和用户信息
        token.value = response.data.token
        localStorage.setItem('token', response.data.token)

        // 设置用户信息
        userInfo.value = {
          username: response.data.username,
          nickname: response.data.nickname,
        }
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('nickname', response.data.nickname)

        console.log(userInfo.value)

        return response
      } catch (error) {
        throw error
      }
    }

    const getUserInfo = () => {
      return userInfo.value
    }

    // 登出
    const logout = async () => {
      token.value = null
      userInfo.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('nickname')
    }

    // 自动登录（从本地存储恢复状态）
    const autoLogin = () => {
      const storedToken = localStorage.getItem('token')
      const storedUsername = localStorage.getItem('username')
      const storedNickname = localStorage.getItem('nickname')

      if (storedToken) {
        token.value = storedToken

        // 恢复用户信息
        if (storedUsername || storedNickname) {
          userInfo.value = {
            username: storedUsername,
            nickname: storedNickname,
          }
        }

        // 可以选择在此处获取用户信息
        // fetchUserInfo()
      }
    }

    // 获取用户信息
    const fetchUserInfo = async () => {
      if (!token.value) {
        throw new Error('No token available')
      }

      try {
        const response: any = await Request.get('/api/users/profile')
        userInfo.value = response.data || response || {}
        return response
      } catch (error) {
        // 如果获取用户信息失败，可能是 token 过期，执行登出
        logout()
        throw error
      }
    }

    // 刷新 token
    const refreshToken = async () => {
      if (!token.value) {
        throw new Error('No token available')
      }

      try {
        const response: any = await Request.post('/api/users/refresh-token')
        if (response.token) {
          token.value = response.token
          localStorage.setItem('token', response.token)
        }
        return response
      } catch (error) {
        logout()
        throw error
      }
    }

    return {
      token,
      userInfo,
      isAuthenticated,
      login,
      logout,
      autoLogin,
      fetchUserInfo,
      refreshToken,
    }
  },
  {
    persist: {
      key: 'user-info',
      storage: localStorage,
      paths: ['token'],
    },
  } as any,
)
