import { RpgPlace } from '../config'

let playerInc: HTMLDivElement = null

const config = {
  keyDown: '',
  speed: 20,
  left: 0,
  top: 0,
  width: null,
  height: null,
}

export const RpgPlayerController = {
  setPlayer(player: HTMLDivElement) {
    // getBoundingClientRect
    playerInc = player

    const playerRect = player.getBoundingClientRect()

    config.width = playerRect.width
    config.height = playerRect.height

    this.setMove()
    playerMove()
  },
  setMove() {
    window.addEventListener('keydown', handelKeyDown)
    window.addEventListener('keyup', handelKeyUp)
  },
}

// 玩家移动
const handelKeyDown = (event: any) => {
  config.keyDown = event.code
}
const handelKeyUp = () => {
  config.keyDown = ''
}

const playerMove = () => {
  switch (config.keyDown) {
    case 'KeyA': {
      //   console.log('左')
      config.left -= config.speed
      if (config.left < 0) config.left = 0
      break
    }
    case 'KeyD': {
      //   console.log('右')
      config.left += config.speed
      if (config.left > RpgPlace.width - config.width) config.left = RpgPlace.width - config.width

      break
    }
    case 'KeyW': {
      //   console.log('上')
      config.top -= config.speed
      if (config.top < 0) config.top = 0
      break
    }
    case 'KeyS': {
      //   console.log('下')
      config.top += config.speed
      if (config.top > RpgPlace.height - config.height) config.top = RpgPlace.height - config.height
      break
    }
    default: {
    }
  }

  playerInc.style.left = config.left + 'px'
  playerInc.style.top = config.top + 'px'

  setTimeout(() => playerMove(), 20)
}
