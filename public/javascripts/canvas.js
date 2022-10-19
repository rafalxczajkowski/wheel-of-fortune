function drawWheel(wheelOptions) {
  let rotation = 0
  let startAngle = 0
  let canvas
  let spinTime = 7
  let isRunning = false
  document.documentElement.style.setProperty('--spin-time', spinTime + 's')
  let winOptionIndex
  const resultDiv = document.querySelector('.result-caption')
  const wheelAudio = new Audio('../sounds/prize-wheel.wav')
  const resultAudio = new Audio('../sounds/win-sound.wav')

  const numberOfOptions = wheelOptions.length
  const angleOfOption = (2 * Math.PI) / numberOfOptions

  if (document.querySelector('.main-canvas')) {
    canvas = document.querySelector('.main-canvas')
    canvas.remove()
  }

  // canvas
  canvas = document.createElement('canvas')
  canvas.classList.add('main-canvas')
  canvas.setAttribute('width', '1200')
  canvas.setAttribute('height', '1200')
  const wheelContainer = document.querySelector('.wheel-container')
  wheelContainer.prepend(canvas)

  const canvasSize = canvas.width
  const ctx = canvas.getContext('2d')

  wheelOptions.forEach((wheelOption) => {
    let endAngle = startAngle + angleOfOption
    ctx.fillStyle = wheelOption.color
    ctx.beginPath()
    ctx.moveTo(canvasSize / 2, canvasSize / 2)
    ctx.arc(
      canvasSize / 2,
      canvasSize / 2,
      canvasSize / 2,
      startAngle,
      endAngle
    )
    ctx.fill()
    startAngle = endAngle

    ctx.font = '40px Poppins'
    ctx.translate(canvasSize / 2, canvasSize / 2)
    ctx.rotate(startAngle - angleOfOption / 2)
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.fillText(wheelOption.name, canvasSize * 0.3, 15)
    ctx.resetTransform()
  })

  async function spin() {
    if (!isRunning) {
      isRunning = true
      wheelAudio.play()
      rotation += 5 + Math.random() * 10
      canvas.style.transform = 'rotate(' + rotation + 'turn)'
      winOptionIndex = Math.floor(
        (((rotation - 0.75) % 1) * -1 + 1) * numberOfOptions
      )
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resultDiv.classList.toggle('visible-div')
          resultDiv.innerHTML = wheelOptions[winOptionIndex].name
          resultAudio.play()
          setTimeout(resolve, 1000)
        }, spinTime * 1000)
      })
      isRunning = false
    }
  }

  canvas.addEventListener('click', spin)
}

export default drawWheel
