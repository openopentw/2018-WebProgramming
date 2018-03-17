// setup canvas

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let width = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight

// function to generate random number

function random (min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min
  return num
}

function updateScore (score) {
  document.getElementById('score').innerHTML = score
}

class Ball {
  constructor (x, y, vx, vy, color, r) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.color = color
    this.r = r
  }

  draw () {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
  }

  move () {
    if (this.x + this.vx < 0) {
      this.x = -this.vx - this.x
      this.vx = -this.vx
    } else if (this.x + this.vx > width) {
      this.x = width - (this.vx + this.x - width)
      this.vx = -this.vx
    } else {
      this.x += this.vx
    }

    if (this.y + this.vy < 0) {
      this.y = -this.vy - this.y
      this.vy = -this.vy
    } else if (this.y + this.vy > height) {
      this.y = height - (this.vy + this.y - height)
      this.vy = -this.vy
    } else {
      this.y += this.vy
    }
  }
}

class EvilBall extends Ball {
  constructor () {
    super(width / 2, height / 2, 0, 0, 'white', 30)
  }

  move () {
    if (this.x + this.vx < 0) {
      this.x = 0
    } else if (this.x + this.vx > width) {
      this.x = width
    } else {
      this.x += this.vx
    }

    if (this.y + this.vy < 0) {
      this.y = 0
    } else if (this.y + this.vy > height) {
      this.y = height
    } else {
      this.y += this.vy
    }
  }

  checkCollision (regBall) {
    let dis = Math.pow(this.x - regBall.x, 2) + Math.pow(this.y - regBall.y, 2)
    if (dis <= Math.pow(this.r, 2) || dis <= Math.pow(regBall.r, 2)) {
      return true
    } else {
      return false
    }
  }

  checkKey () {
    window.addEventListener('keydown', function (e) {
      switch (e.key) {
        case 'ArrowUp':
          if (this.vy < 0) {
            this.vy -= 1
          } else {
            this.vy = -5
          }
          this.vx = 0
          break
        case 'ArrowDown':
          if (this.vy > 0) {
            this.vy += 1
          } else {
            this.vy = 5
          }
          this.vx = 0
          break
        case 'ArrowLeft':
          if (this.vx < 0) {
            this.vx -= 1
          } else {
            this.vx = -5
          }
          this.vy = 0
          break
        case 'ArrowRight':
          if (this.vx > 0) {
            this.vx += 1
          } else {
            this.vx = 5
          }
          this.vy = 0
          break
      }
    }.bind(this))
  }
}

class RegBall extends Ball {
}

let regBalls = []
for (let i = 0; i < 50; ++i) {
  let regBall = new RegBall(
    random(0, width),
    random(0, height),
    random(-5, 5),
    random(-5, 5),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    random(10, 20)
  )
  regBalls.push(regBall)
}

document.getElementById('total').innerHTML = regBalls.length

let evilBall = new EvilBall()
evilBall.checkKey()

function loop () {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.fillRect(0, 0, width, height)
  evilBall.draw()
  evilBall.move()
  let score = 0
  for (let i = 0; i < regBalls.length; ++i) {
    if (regBalls[i] !== undefined) {
      regBalls[i].draw()
      regBalls[i].move()
      if (evilBall.checkCollision(regBalls[i])) {
        delete regBalls[i]
      }
    } else {
      ++score
    }
  }
  updateScore(score)
  requestAnimationFrame(loop)
}
loop()
