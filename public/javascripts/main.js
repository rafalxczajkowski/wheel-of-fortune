import drawWheel from './canvas.js'

const defaultData = [
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
  },
]

const closeImg = document.querySelector('.close-img')
const sideNav = document.querySelector('.side-nav')
const closeBtn = document.querySelector('.close-btn')
const resultCaption = document.querySelector('.result-caption')
const addButton = document.querySelector('.add-btn')

// Sidebar button function
closeBtn.addEventListener('click', () => {
  sideNav.classList.toggle('visible-bar')
  closeImg.classList.toggle('fa-angles-left')
  closeImg.classList.toggle('fa-angles-right')
})

// Result caption remove function
resultCaption.addEventListener('click', () => {
  resultCaption.classList.remove('visible-div')
})

// Add button function
addButton.addEventListener('click', async () => {
  try {
    await axios.post('/api/v1/wheeloptions', {
      name: '',
      color: randomColor(),
    })
    await populate()
  } catch (error) {
    console.log(error)
  }
})

function randomColor() {
  let colorStr = Math.floor(Math.random() * 16777216).toString(16)
  return '#' + colorStr.padStart(6, '0')
}

// Get data from db
async function getWheelOptions() {
  try {
    const { data: wheelOptionsRes } = await axios.get('/api/v1/wheeloptions')
    const numberOfOptions = wheelOptionsRes.length

    if (numberOfOptions === 0) {
      return defaultData
    } else {
      return wheelOptionsRes
    }
  } catch (error) {
    console.log(error)
  }
}

// Update data in db
async function update(id, value, prop) {
  try {
    await axios.patch(`/api/v1/wheeloptions/${id}`, {
      [prop]: value,
    })
  } catch (error) {
    console.log(error)
  }
}

// Delete wheelOption by id
async function deleteWheelOption(id) {
  try {
    await axios.delete(`/api/v1/wheeloptions/${id}`)
  } catch (error) {
    console.log(error)
  }
}

function populateNav(wheelOptions) {
  // if (document.querySelector('.options-container'))
  let optionsContainer = document.querySelector('.options-container')
  if (optionsContainer) {
    optionsContainer.remove()
  }

  optionsContainer = document.createElement('div')
  optionsContainer.classList.add('options-container')
  sideNav.prepend(optionsContainer)

  wheelOptions.forEach((wheelOption) => {
    const sideNavElement = document.createElement('div')
    sideNavElement.classList.add('side-nav-element')
    optionsContainer.append(sideNavElement)

    const sideNavElementText = document.createElement('input')
    sideNavElementText.classList.add('nav-element-text')
    sideNavElementText.setAttribute('maxlength', '20')
    sideNavElementText.value = wheelOption.name
    sideNavElement.append(sideNavElementText)

    const sideNavElementColor = document.createElement('input')
    sideNavElementColor.setAttribute('type', 'color')
    sideNavElementColor.classList.add('nav-element-color')
    sideNavElementColor.value = wheelOption.color
    sideNavElement.append(sideNavElementColor)

    const sideNavElementDel = document.createElement('i')
    sideNavElementDel.classList.add('trash-btn', 'fa-solid', 'fa-trash')
    sideNavElement.append(sideNavElementDel)

    sideNavElementText.addEventListener('change', async () => {
      await update(wheelOption._id, sideNavElementText.value, 'name')
      drawWheel(await getWheelOptions())
    })
    sideNavElementColor.addEventListener('change', async () => {
      await update(wheelOption._id, sideNavElementColor.value, 'color')
      drawWheel(await getWheelOptions())
    })
    sideNavElementDel.addEventListener('click', async () => {
      await deleteWheelOption(wheelOption._id)
      await populate()
    })
  })
}

async function populate() {
  try {
    const wheelOptions = await getWheelOptions()
    populateNav(wheelOptions)
    drawWheel(wheelOptions)
  } catch (error) {
    console.log(error)
  }
}

populate()
