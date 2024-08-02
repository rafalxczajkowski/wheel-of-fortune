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
    name: 'Sushi',
    color: '#89CFFD',
  },
  {
    name: 'Kebab',
    color: '#FBE7C6',
  },
]

let userId

async function populate() {
  try {
    userId = await getUserId()
    if (userId) {
      const userWheelOptions = await getUserWheelOptions(userId)
      populateNav(userWheelOptions)
      drawWheel(userWheelOptions)
    }
  } catch (error) {
    console.error(error)
  }
}

populate()

// Get data from db
async function getUserWheelOptions(userId) {
  try {
    const { data: wheelOptionsRes } = await axios.get('/api/v1/wheeloptions', {
      params: { uid: userId },
    })
    return wheelOptionsRes
  } catch (error) {
    console.error(error.name, ':', error.message)
    localStorage.clear()
    populate()
  }
}

async function getUserId() {
  const userId_localStorage = localStorage.getItem('userId')
  if (!userId_localStorage) {
    return await createUser()
  }
  return userId_localStorage
}

async function createUser() {
  try {
    const res = await axios.post('/api/v1/users', {})
    const userId_new = res.data._id
    localStorage.setItem('userId', userId_new)
    await setDefaultWheelOptions(userId_new)
    return userId_new
  } catch (error) {
    console.error(error)
  }
}

async function setDefaultWheelOptions(userId) {
  for (const item of defaultData) {
    try {
      await axios.post('/api/v1/wheeloptions', {
        name: item.name,
        color: item.color,
        createdBy: userId,
      })
    } catch (error) {
      console.error(error)
    }
  }
}

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
      createdBy: userId,
    })
    await populate()
  } catch (error) {
    console.error(error)
  }
})

function randomColor() {
  let colorStr = Math.floor(Math.random() * 16777216).toString(16)
  return '#' + colorStr.padStart(6, '0')
}

// Update data in db
async function update(id, value, prop) {
  try {
    await axios.patch(`/api/v1/wheeloptions/${id}`, {
      [prop]: value,
    })
  } catch (error) {
    console.error(error)
  }
}

// Delete wheelOption by id
async function deleteWheelOption(id) {
  try {
    await axios.delete(`/api/v1/wheeloptions/${id}`)
  } catch (error) {
    console.error(error)
  }
}

function populateNav(wheelOptions) {
  let optionsContainer = document.querySelector('.options-container')
  if (optionsContainer) {
    optionsContainer.remove()
  }

  optionsContainer = document.createElement('div')
  optionsContainer.classList.add('options-container')
  sideNav.prepend(optionsContainer)

  let numberOfElement = 0
  wheelOptions.forEach((wheelOption) => {
    const sideNavElement = document.createElement('div')
    sideNavElement.classList.add('side-nav-element')
    optionsContainer.append(sideNavElement)

    const sideNavElementText = document.createElement('input')
    sideNavElementText.classList.add('nav-element-text')
    sideNavElementText.setAttribute('maxlength', '20')
    sideNavElementText.setAttribute('aria-label', 'Option name')
    sideNavElementText.setAttribute('id', 'text-input-' + numberOfElement)
    sideNavElementText.value = wheelOption.name
    sideNavElement.append(sideNavElementText)

    const sideNavElementColor = document.createElement('input')
    sideNavElementColor.setAttribute('type', 'color')
    sideNavElementColor.setAttribute('aria-label', 'Option color')
    sideNavElementColor.setAttribute('id', 'color-input-' + numberOfElement)
    sideNavElementColor.classList.add('nav-element-color')
    sideNavElementColor.value = wheelOption.color
    sideNavElement.append(sideNavElementColor)

    const sideNavElementDel = document.createElement('i')
    sideNavElementDel.classList.add('trash-btn', 'fa-solid', 'fa-trash')
    sideNavElement.append(sideNavElementDel)

    sideNavElementText.addEventListener('change', async () => {
      await update(wheelOption._id, sideNavElementText.value, 'name')
      drawWheel(await getUserWheelOptions(userId))
    })
    sideNavElementColor.addEventListener('change', async () => {
      await update(wheelOption._id, sideNavElementColor.value, 'color')
      drawWheel(await getUserWheelOptions(userId))
    })
    sideNavElementDel.addEventListener('click', async () => {
      await deleteWheelOption(wheelOption._id)
      await populate()
    })
    numberOfElement++
  })
}
