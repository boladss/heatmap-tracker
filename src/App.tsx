import { useState } from 'react'
import './App.css'

function Day({ index, input, max, selected }: { index: number, input: number, max: number, selected: number} ) {
  // const [value, setValue] = useState(0);
  
  // hsl(0, 100%, 1.57%)
  const minOpacity = 0.2;
  const maxOpacity = 1;

  const opacity = input ? (((input/max) * (maxOpacity - minOpacity)) + minOpacity) : 0;
  const boxColor = opacity ? { backgroundColor: `hsl(120, 100%, 25.1%, ${opacity}` }
    : { backgroundColor: `hsl(0, 0%, 90%)` };

  const borderColor = (index === selected) ? { borderColor: `hsla(0, 0%, 0%, 50%)` }
    : { borderColor: `hsla(0, 0%, 0%, 10%)` };

  return (
    <div className="box" style={{...boxColor, ...borderColor}} />
  )
}

function Timeline({ values, selected }: { values: number[], selected: number}) {
  const max: number = Math.max(...values);

  const timeline = Array(365).fill(0).map((_, i) =>
    <Day 
      index={i} 
      input={values[i]} 
      max={max}
      selected={selected}
    />
  );

  return (
    <>
      {timeline}
    </>
  )
}

function EditForm({ values, setValue, selected, selectIndex }) {
  function handleIncrement(selected: number) {
    const nextValues = values.map((c: number, i: number) => {
      if (i === selected) return c + 1;
      else return c;
    })
    setValue(nextValues);
  }

  function handleDecrement(selected: number) {
    const nextValues = values.map((c: number, i: number) => {
      if (i === selected && c > 0) return c - 1;
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
        value={selected} 
        onChange={e => selectIndex(Number(e.target.value))}
        placeholder="Input index here."
      />
      <button
        className="value-buttons"
        onClick={() => handleIncrement(selected)}
      >
        INC
      </button>
      <button
        className="value-buttons"
        onClick={() => handleDecrement(selected)}
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
  const [values, setValue] = useState(Array(365).fill(0));
  const [selected, selectIndex] = useState(0); // selected index for highlighting

  return (
    <div className="heatmap-wrapper">
      <div className="heatmap-container">
        <Timeline values={values} selected={selected}/>
      </div>
      <p>
        <EditForm
          values={values}
          setValue={setValue}
          selected={selected}
          selectIndex={selectIndex}
        />
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
