const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')
try {
	require('electron-reloader')(module)
} catch {}

let mainWindow
let settings

new Menu()
let menu = Menu.buildFromTemplate([
  {
    label: 'LD Hub',
    submenu: [
      {
        label:'Settings',
        click() {
          openSettings()
        }
      },
      {type:'separator'},
      {
        label:'Exit', 
        click() { 
          app.quit() 
        } 
      }
    ]
  }
])

function onAppReady() {
  mainWindow = new BrowserWindow({
    width: 542,
    height: 260,
    transparent: true,
    frame: false,
    hasShadow: false,
    title: "LD Hub",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadURL('http://localhost:3000')
  mainWindow.once('close', () => {
    mainWindow = null
  })

  mainWindow.webContents.openDevTools()
}

function openSettings(){
  settings = new BrowserWindow({
    width: 400,
    height: 500,
    title: "LD Hub Settings",
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  settings.loadURL(path.join('file://', __dirname, 'menu/settings.html'))
  settings.once('ready-to-show', () => {
    settings.show()
  })

  settings.webContents.openDevTools()
}


ipcMain.on('show-picture', (event, arg) => {
  mainWindow.webContents.send('display-picture', arg)
})

ipcMain.on('select-picture', (event, arg) => {
  dialog.showOpenDialog(settings, { 
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }]
  })
  .then(({canceled, filePaths}) => {
    if(!canceled){
      let img = fs.readFileSync(filePaths[0]).toString('base64')
      let src = `data:image/jpg;base64,${img}`
      mainWindow.webContents.send('set-picture', src)
    }
  })
  .catch(err => {console.log(err)})
})

ipcMain.on('change-color', (event, color) => {
  mainWindow.webContents.send('change-color', color)
  //save to settings
})

Menu.setApplicationMenu(menu)

app.on('ready', () => setTimeout(onAppReady, 500))
