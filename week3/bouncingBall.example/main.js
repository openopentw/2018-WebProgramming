// setup canvas

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let width = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight

ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
ctx.fillRect(0, 0, width, height)

// function to generate random number

function random (min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min
  return num
}

function Ball (x, y, vx, vy, color, r) {
  this.x = x
  this.y = y
  this.vx = vx
  this.vy = vy
  this.color = color
  this.r = r
}

Ball.prototype.draw = function () {
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
  ctx.fill()
}

Ball.prototype.move = function () {
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

Ball.prototype.checkCollision = function (n) {
  for (let i = n + 1; i < balls.length; ++i) {
    let dis = Math.pow(this.x - balls[i].x, 2) + Math.pow(this.y - balls[i].y, 2)
    if (dis <= Math.pow(this.r, 2)) {
      this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')'
    }
    if (dis <= Math.pow(balls[i].r, 2)) {
      balls[i].color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')'
    }
  }
}

let balls = []
for (let i = 0; i < 50; ++i) {
  let ball = new Ball(
    random(0, width),
    random(0, height),
    random(-10, 10),
    random(-10, 10),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    random(25, 50)
  )
  balls.push(ball)
}

function loop () {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.fillRect(0, 0, width, height)
  for (let i = 0; i < balls.length; ++i) {
    balls[i].draw()
    balls[i].move()
    balls[i].checkCollision(i)
  }
  requestAnimationFrame(loop)
}
loop()
