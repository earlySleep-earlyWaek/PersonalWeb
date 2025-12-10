export const funPlayArea = {
  // 这个是游戏区域的一些信息
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}

export const bsPlayer = {
  topLeft: [],
  topRight: [],
  bottomLeft: [],
  bottomRight: [],
  size: 0,
}

export const bsGetSize = (width) => {
  const size = Math.floor((width * (width * 0.75)) / 20)
  return size
}

export const collisionDet = (enemy) => {
  const player = JSON.parse(JSON.stringify(bsPlayer))

  // 工具函数：从矩形四个顶点提取最小包围盒边界（兼容轴对齐场景）
  const getRectBounds = (rect) => {
    // 提取所有顶点的 x、y 坐标
    const points = [rect.topLeft, rect.topRight, rect.bottomLeft, rect.bottomRight]
    // 过滤无效顶点（避免空数组导致计算错误）
    const validPoints = points.filter((p) => Array.isArray(p) && p.length === 2)
    if (validPoints.length === 0) {
      return { x1: 0, x2: 0, y1: 0, y2: 0 } // 无有效顶点时返回默认值
    }
    const xs = validPoints.map((p) => p[0])
    const ys = validPoints.map((p) => p[1])
    return {
      x1: Math.min(...xs), // 左边界
      x2: Math.max(...xs), // 右边界
      y1: Math.min(...ys), // 下边界
      y2: Math.max(...ys), // 上边界
    }
  }

  // 获取玩家和敌人的边界
  const playerBounds = getRectBounds(player)
  const enemyBounds = getRectBounds(enemy)

  // 判断是否分离（分离则无碰撞，反之则碰撞）
  const isSeparated =
    playerBounds.x2 <= enemyBounds.x1 || // 玩家在敌人左侧
    playerBounds.x1 >= enemyBounds.x2 || // 玩家在敌人右侧
    playerBounds.y2 <= enemyBounds.y1 || // 玩家在敌人下方
    playerBounds.y1 >= enemyBounds.y2 // 玩家在敌人上方

  // 非分离状态即为碰撞
  const isCollided = !isSeparated

  //   可选：打印调试信息（开发阶段可保留，上线后删除）
  if (isCollided) {
    console.log('玩家边界：', playerBounds)
    console.log('敌人边界：', enemyBounds)
  }

  return isCollided
}
