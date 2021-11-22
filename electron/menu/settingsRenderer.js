const { ipcRenderer } = require('electron')

let pictureSetting = document.getElementById('picture-setting')
let pictureSelect = document.getElementById('picture-select')
let colorPicker = document.getElementById('color-picker')
// get color for picker from settings

function togglePicture(){
  ipcRenderer.send('show-picture', this.checked)
}

function selectPicture(){
  ipcRenderer.send('select-picture')
}

function changeColor(event) {
  ipcRenderer.send('change-color', event.target.value)
}

pictureSetting.checked = true
pictureSetting.addEventListener('click', togglePicture)

pictureSelect.addEventListener('click', selectPicture)

colorPicker.addEventListener("input", changeColor)

console.log('renderer')