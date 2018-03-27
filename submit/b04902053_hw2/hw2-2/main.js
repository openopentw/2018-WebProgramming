function random (min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min
  return num
}

let starPic = document.getElementById('star_pic')
let width = starPic.clientWidth
let height = starPic.clientHeight

let c = document.createElement('canvas')
let ctx = c.getContext('2d')
c.width = width
c.height = height

ctx.fillStyle = 'rgb(0, 0, 0)'
ctx.fillRect(0, 0, width, height)

let N_STARS = 1000

for (let i = 0; i < N_STARS; i++) {
  ctx.beginPath()
  ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.random() + ')'
  ctx.arc(random(0, width),
          random(0, height),
          Math.random() * 2,
          0,
          2 * Math.PI)
  ctx.fill()
}

starPic.style.background = 'url(' + c.toDataURL() + ')'
