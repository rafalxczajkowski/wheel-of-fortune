const mainContainer = document.getElementById('main-container')
const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')
// const canvasContainer = document.getElementById('canvas-container')

// localStorage.getItem(wheelOptions)

const wheelOptions = [
  {
    name: 'Pizza',
    color: '#F94892',
  },
  {
    name: 'Yoghurt with musli',
    color: '#FF7F3F',
  },
  {
    name: 'Scrambled eggs',
    color: '#FBDF07',
  },
  {
    name: 'Sandwitches with hummus',
    color: '#89CFFD',
  },
  {
    name: 'Toasts',
    color: '#FBE7C6',
  },
]

function draw() {
  const numberOfOptions = wheelOptions.length
  let startAngle = 0
  wheelOptions.forEach((wheelOption) => {
    console.log(wheelOption.color)
    let endAngle = startAngle + (2 * Math.PI) / numberOfOptions
    ctx.fillStyle = wheelOption.color
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, canvas.height / 2)
    ctx.arc(canvas.width / 2, canvas.height / 2, 300, startAngle, endAngle)
    ctx.fill()
    startAngle = endAngle
  })
}

let rotation = 3
canvas.addEventListener('click', () => {
  rotation += 5 + Math.random() * 10
  console.log(rotation)
  canvas.style.transform = 'rotate(' + rotation + 'turn)'
})

draw()
