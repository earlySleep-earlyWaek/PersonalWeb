export const player = {
  mounted(el: HTMLElement, binding) {
    // 缓存元素尺寸（若元素尺寸动态变化，需监听resize/尺寸变化事件重新计算）
    let elWidth = el.clientWidth
    let elHeight = el.clientHeight

    // 节流函数：限制执行频率
    let throttleTimer: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimer) return

      // 与浏览器重绘帧同步执行DOM操作
      throttleTimer = requestAnimationFrame(() => {
        try {
          const OFFSET_X = 250
          const OFFSET_Y = 37
          const X = e.clientX - OFFSET_X - elWidth / 2
          const Y = e.clientY - OFFSET_Y - elHeight / 2

          el.style.transform = `translate(${X}px, ${Y}px)`
        } finally {
          throttleTimer = null
        }
      })
    }

    // 缓存事件处理函数到元素上，便于卸载时移除
    ;(el as any)._mouseMoveHandler = handleMouseMove
    // window.addEventListener('mousemove', handleMouseMove)
  },
  unmounted(el: HTMLElement) {
    // 移除鼠标移动监听
    const handleMouseMove = (el as any)._mouseMoveHandler
    if (handleMouseMove) {
      window.removeEventListener('mousemove', handleMouseMove)
      delete (el as any)._mouseMoveHandler
    }

    // 取消未执行的动画帧
    if ((el as any)._throttleTimer) {
      cancelAnimationFrame((el as any)._throttleTimer)
    }
  },
}
