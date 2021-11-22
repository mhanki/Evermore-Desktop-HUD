import React, { useState, useEffect } from 'react'
import Clock from './Clock'
import Weather from './Weather'
const electron = window.require('electron')
const ipcRenderer  = electron.ipcRenderer


function App() {
  const [showPicture, setShowPicture] = useState(true)
  const [src, setSrc] = useState("https://images.pexels.com/photos/7260931/pexels-photo-7260931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")
  const [color, setColor] = useState('#ffffff')

  ipcRenderer.on('display-picture', (event, arg) => {
    setShowPicture(arg)
  })

  ipcRenderer.on('set-picture', (event, arg) => {
    setSrc(arg)
  })

  ipcRenderer.on('change-color', (event, arg) => {
    setColor(arg)
  })

  function allowDrop(ev) {
    ev.preventDefault()
  }

  function drag(ev) {
    ev.dataTransfer.setData("src", ev.target.id)
  }

  function drop(ev) {
    ev.preventDefault();
    var src = document.getElementById(ev.dataTransfer.getData("src"))
    var srcParent = src.parentNode
    var tgt = ev.currentTarget.firstElementChild

    ev.currentTarget.replaceChild(src, tgt)
    srcParent.appendChild(tgt)
  }

  useEffect(() => {
    document.getElementById('root').style.color = color
  }, [color])

  return (
    <div className="app">
      <div id="position-1" onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}>
        <div className="hub-info">
          <Weather city={"Denver"} />
          <Clock timezone="America/Denver"/>
        </div>
      </div>
      <div id="position-2" onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}>
        <img id="photo" className="photo" src={src} draggable="true" onDragStart={(event) => drag(event)} style={{ display: showPicture ? "inline" : "none" }} />
      </div>
    </div>
  )
}

export default App