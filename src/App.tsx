import { useState } from 'react'
import './App.css'

function Day({ key, input, max }: { key: number, input: number, max: number} ) {
  // const [value, setValue] = useState(0);
  
  // hsl(0, 100%, 1.57%)
  const minOpacity = 0.2;
  const maxOpacity = 1;

  const opacity = input ? (((input/max) * (maxOpacity - minOpacity)) + minOpacity) : 0;
  const boxColor = opacity ? { backgroundColor: `hsl(120, 100%, 25.1%, ${opacity}` }
    : { backgroundColor: `hsl(0, 0%, 90%)` };

  return (
    <div className="box" style={boxColor}/>
  )
}

function Timeline({ values }) {
  const max: number = Math.max(...values);

  const timeline = Array(365).fill(0).map((_, i) =>
    <Day 
      key={i} 
      input={values[i]} 
      max={max}
    />
  );

  return (
    <>
      {timeline}
    </>
  )
}

function EditForm({ values, setValue }) {
  const [index, setIndex] = useState(0);

  function handleIncrement(index: number) {
    const nextValues = values.map((c: number, i: number) => {
      if (i === index) return c + 1;
      else return c;
    })
    setValue(nextValues);
  }

  function handleDecrement(index: number) {
    const nextValues = values.map((c: number, i: number) => {
      if (i === index && c > 0) return c - 1;
      else return c;
    })
    setValue(nextValues);
  }

  function handleRandom() {
    const nextValues = Array(365).fill(0).map(() => Math.floor(Math.random() * 10));
    setValue(nextValues);
  }

  function handleClear() {
    const nextValues = Array(365).fill(0);
    setValue(nextValues);
  }

  return (
    <>
      <input
        type="number" 
        value={index} 
        onChange={e => setIndex(Number(e.target.value))}
        placeholder="Input index here."
      />
      <button
        className="value-buttons"
        onClick={() => handleIncrement(index)}
      >
        INC
      </button>
      <button
        className="value-buttons"
        onClick={() => handleDecrement(index)}
      >
        DEC
      </button>
      <button
        className="value-buttons"
        onClick={handleRandom}
      >
        Random
      </button>
      <button
        className="value-buttons"
        onClick={handleClear}
      >
        Clear
      </button>
    </>
  )
}

function HeatMap() {
  // Temporary Values
  
  // const [values, setValue] = useState(Array(365).fill(0).map(() => Math.floor(Math.random() * 10)));
  const [values, setValue] = useState(Array(365).fill(0));

  return (
    <div className="heatmap-wrapper">
      <div className="heatmap-container">
        <Timeline values={values}/>
      </div>
      <p>
        <EditForm values={values} setValue={setValue}/>
      </p>
    </div>
  )
}

function App() {
  return (
    <div className="content">
      <HeatMap />
      <HeatMap />
      <HeatMap />
    </div>
  )
}

export default App
