import { useState } from 'react'
import './App.css'

interface DayBox {
  index: number;
  value: number;
  max: number;
}

function Day({ index, value, max }: DayBox) {
  // hsl(0, 100%, 1.57%)
  const minOpacity = 0.2;
  const maxOpacity = 1;

  const opacity = (((value/max) * (maxOpacity - minOpacity)) + minOpacity);
  const boxColor = opacity ? { backgroundColor: `hsl(120, 100%, 25.1%, ${opacity}` }
    : { backgroundColor: `hsl(0, 0%, 90%)` };

  return (
    <div className="box" style={boxColor} />
  )
}

function HeatMap() {
  // Temporary Values
  const values: number[] = Array(365).fill(0).map(() => Math.floor(Math.random() * 10));
  const max: number = Math.max(...values);

  const [timeline, setTimeline] = useState(Array(365).fill(0).map((_, i) =>
    <Day 
      index={i} 
      value={values[i]} 
      max={max}
    />
  ));

  return (
    <div className="heatmap-wrapper">
      <div className="heatmap-container">
        {timeline}
      </div>
    </div>
  )
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeatMap />
      <HeatMap />
      <HeatMap />
    </>
  )
}

export default App
