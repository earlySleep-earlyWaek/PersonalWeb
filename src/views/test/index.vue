<template>
  <div class="qq-input-container">
    <!-- 输入区域 -->
    <div class="qq-input-wrapper">
      <!-- 表情面板 -->
      <div class="emoji-panel" v-show="showEmoji">
        <div class="emoji-item" v-for="emoji in emojiList" :key="emoji" @click="insertEmoji(emoji)">
          {{ emoji }}
        </div>
      </div>

      <!-- 输入框 -->
      <textarea
        ref="inputRef"
        v-model="inputValue"
        class="qq-input-area"
        placeholder="说点什么..."
        :style="{ height: `${inputHeight}px` }"
        @input="autoResize"
        @keydown="handleKeydown"
        maxlength="500"
      ></textarea>

      <!-- 功能按钮区 -->
      <div class="qq-input-actions">
        <button class="action-btn" @click="showEmoji = !showEmoji">😊</button>
        <button class="action-btn" @click="triggerFileUpload">📎</button>
        <input
          ref="fileInputRef"
          type="file"
          accept="image/*,.txt,.doc,.pdf"
          class="file-input"
          @change="handleFileUpload"
        />
        <span class="word-count">{{ inputValue.length }}/500</span>
        <button class="send-btn" @click="sendMessage" :disabled="!inputValue.trim()">发送</button>
      </div>
    </div>

    <!-- 消息展示区（预览） -->
    <div class="message-list">
      <div class="message-item" v-for="(msg, index) in messageList" :key="index">
        <span class="msg-content">{{ msg.content }}</span>
        <span class="msg-time">{{ msg.time }}</span>
        <span class="msg-attach" v-if="msg.attach"> 📎 {{ msg.attach.name }} </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// 输入框相关
const inputRef = ref(null)
const inputValue = ref('')
const inputHeight = ref(80) // 初始高度
const showEmoji = ref(false) // 表情面板显隐
const fileInputRef = ref(null) // 文件上传input

// 消息列表
const messageList = ref([])

// 常用表情列表（可扩展）
const emojiList = ref([
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '🙂',
  '🤗',
  '🤩',
  '🤔',
])

// 自动调整输入框高度
const autoResize = () => {
  if (!inputRef.value) return
  // 重置高度以获取真实scrollHeight
  inputRef.value.style.height = 'auto'
  // 限制最大高度，超过则滚动
  const maxHeight = 200
  const scrollHeight = inputRef.value.scrollHeight
  inputHeight.value = Math.min(scrollHeight, maxHeight)
}

// 插入表情
const insertEmoji = (emoji) => {
  inputValue.value += emoji
  // 插入后重新计算高度
  autoResize()
  // 聚焦输入框
  inputRef.value?.focus()
}

// 键盘事件处理（回车发送，shift+回车换行）
const handleKeydown = (e) => {
  // 回车且未按shift
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault() // 阻止默认换行
    sendMessage()
  }
}

// 触发文件上传
const triggerFileUpload = () => {
  fileInputRef.value?.click()
}

// 处理文件上传
const handleFileUpload = (e) => {
  const files = e.target.files
  if (!files.length) return

  // 示例：取第一个文件
  const file = files[0]
  // 模拟上传（实际项目中替换为真实接口请求）
  console.log('上传文件：', file)

  // 发送包含文件的消息
  sendMessage(file)

  // 清空文件选择器
  e.target.value = ''
}

// 发送消息
const sendMessage = (attach = null) => {
  const content = inputValue.value.trim()
  if (!content && !attach) return

  // 构造消息
  const message = {
    content,
    time: new Date().toLocaleTimeString(), // 本地时间
    attach: attach || null,
  }

  // 添加到消息列表
  messageList.value.push(message)

  // 清空输入框并重置高度
  inputValue.value = ''
  inputHeight.value = 80

  // 隐藏表情面板
  showEmoji.value = false

  // 可在此处添加发送到后端的逻辑
  console.log('发送消息：', message)
}

// 监听输入值变化，自动调整高度
watch(inputValue, autoResize)
</script>

<style scoped>
.qq-input-container {
  width: 400px;
  margin: 20px auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
  font-family: 'Microsoft Yahei', sans-serif;
}

.qq-input-wrapper {
  position: relative;
}

/* 表情面板 */
.emoji-panel {
  position: absolute;
  top: -200px;
  left: 0;
  width: 300px;
  height: 180px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.emoji-item {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
}

.emoji-item:hover {
  background: #f3f4f6;
}

/* 输入框 */
.qq-input-area {
  width: 100%;
  /* 核心：取消边框 */
  border: none;
  /* 可选：取消边框圆角（如需） */
  /* border-radius: 0; */
  padding: 10px;
  font-size: 14px;
  resize: none;
  outline: none; /* 取消聚焦时的默认轮廓 */
  box-sizing: border-box;
  line-height: 1.5;
  /* 可选：添加背景色，让输入域更明显 */
  /* background: #f9fafb; */
}

/* 聚焦时也无轮廓（可选，如需聚焦反馈可保留浅轮廓） */
.qq-input-area:focus {
  border-color: transparent; /* 确保聚焦时也无边框 */
  outline: none; /* 取消聚焦轮廓 */
  /* 可选：聚焦时加轻微阴影替代边框 */
  /* box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1); */
}

/* 功能按钮区 */
.qq-input-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.action-btn {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: #f3f4f6;
}

.file-input {
  display: none;
}

.word-count {
  font-size: 12px;
  color: #6b7280;
  margin-right: 10px;
}

.send-btn {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  background: #1d4ed8;
}

/* 消息列表 */
.message-list {
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
  border-top: 1px solid #e5e7eb;
  padding-top: 10px;
}

.message-item {
  margin-bottom: 10px;
  padding: 8px;
  background: #f9fafb;
  border-radius: 6px;
}

.msg-content {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
}

.msg-time {
  font-size: 12px;
  color: #6b7280;
  margin-right: 10px;
}

.msg-attach {
  font-size: 12px;
  color: #2563eb;
}
</style>
