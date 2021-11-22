import React, {useState, useEffect} from 'react'
import { DateTime } from 'luxon'
import './index.css'

const Clock = ({timezone}) => {
  let [time, setTime] = useState(DateTime.local().setZone(timezone))

  const _format = (timeString) => timeString.toLocaleString(DateTime.TIME_24_SIMPLE)

  const tick = () => {
    setTime(DateTime.local().setZone(timezone))
  }

  // eslint-disable-next-line
  useEffect(() => {setInterval(tick, 1000)}, [])

  return (
    <div>
      <p className="time">{_format(time)}</p>
    </div>
  )
}


export default Clock