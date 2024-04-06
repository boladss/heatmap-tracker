import { useState } from 'react'
import './App.css'

function Day({ index }) {
  return (
    // <div className="box">{index}</div>
    <div className="box"></div>
  )
}

function HeatMap() {
  const [timeline, setTimeline] = useState(Array(365).fill(0).map((_, i) => <Day index={i} />));

  return (
    <div className="heatmap-container">
      {timeline}
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="heatmap-wrapper">
      <HeatMap />
    </div>
  )
}

export default App
