const canvas = document.getElementsByClassName('main-canvas')[0]
const canvasSize = canvas.width
const ctx = canvas.getContext('2d')
const sideNav = document.getElementsByClassName('side-nav')[0]
const closeImg = document.getElementsByClassName('close-img')[0]
const wheelOptions = []
if (localStorage.length === 0) {
  // default data
  console.log('localStorage is empty!')
  wheelOptions.push(
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
      name01: 'Sushi',
      color: '#89CFFD',
    },
    {
      name: 'Kebab',
      color: '#FBE7C6',
    }
  )
} else {
  wheelOptions.push({
    name: 'taco',
    color: '#FBE7C6',
  })
  // localStorage.forEach((key, value) => {
  //   wheelOptions.push(key)
  // })
}
const vname = 'name'+'01'
console.log(vname)
console.log(localStorage)
console.log(wheelOptions[3]['name'+'01'])

function populate() {
  const numberOfOptions = wheelOptions.length
  let startAngle = 0
  const angleOfOption = (2 * Math.PI) / numberOfOptions
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

    const sideNavElement = document.createElement('div')
    sideNavElement.classList.add('side-nav-element')

    sideNav.append(sideNavElement)
    const sideNavElTextField = document.createElement('input')
    sideNavElTextField.classList.add('nav-element-text')
    sideNavElTextField.value = wheelOption.name
    sideNavElement.append(sideNavElTextField)

    const sideNavElColor = document.createElement('input')
    sideNavElColor.classList.add('color-picker')
    sideNavElColor.type = 'color'
    sideNavElColor.value = wheelOption.color
    sideNavElement.append(sideNavElColor)
  })
}

let rotation = 3
canvas.addEventListener('click', () => {
  rotation += 5 + Math.random() * 10
  canvas.style.transform = 'rotate(' + rotation + 'turn)'
})

function toggleNav() {
  sideNav.classList.toggle('visible')
  closeImg.classList.toggle('fa-angles-left')
  closeImg.classList.toggle('fa-angles-right')
}

populate()
