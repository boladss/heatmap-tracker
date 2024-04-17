import { useState } from 'react'
import './App.css'

function Day({ index, input, max, selected, selectIndex }: { index: number, input: number, max: number, selected: number, selectIndex} ) {
  // const [value, setValue] = useState(0);
  
  // hsl(0, 100%, 1.57%)
  const minOpacity = 0.2;
  const maxOpacity = 1;

  const opacity = input ? (((input/max) * (maxOpacity - minOpacity)) + minOpacity) : 0;
  const boxColor = opacity ? { backgroundColor: `hsl(120, 100%, 25.1%, ${opacity}` }
    : { backgroundColor: `hsl(0, 0%, 90%)` };

  const borderColor = (index === selected) ? { border: `2pt solid hsla(0, 0%, 0%, 75%)` }
    : { borderColor: `hsla(0, 0%, 0%, 10%)` };

  return (
    <div
      className="box"
      style={{...boxColor, ...borderColor}}
      onClick={() => {selectIndex(index)}}
    />
  );
}

function Timeline({ values, selected, selectIndex }: { values: number[], selected: number, selectIndex}) {
  const max: number = Math.max(...values);

  const timeline = Array(365).fill(0).map((_, i) =>
    <Day 
      index={i} 
      input={values[i]} 
      max={max}
      selected={selected}
      selectIndex={selectIndex}
    />
  );

  return (<>{timeline}</>);
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
        className="value-button"
        onClick={() => handleIncrement(selected)}
      >
        Increase
      </button>
      <button
        className="value-button"
        onClick={() => handleDecrement(selected)}
      >
        Decrease
      </button>
      <button
        className="value-button"
        onClick={handleRandom}
      >
        Randomize
      </button>
      <button
        className="value-button"
        onClick={handleClear}
      >
        Clear
      </button>
    </>
  )
}

function Heatmap() {
  const [values, setValue] = useState(Array(365).fill(0));
  const [selected, selectIndex] = useState(0); // selected index for highlighting

  return (
    <div className="heatmap-wrapper">
      <div className="heatmap-container">
        <Timeline values={values} selected={selected} selectIndex={selectIndex}/>
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

function Button({disabled, onClick, text}: { disabled: boolean, onClick, text: string}) {
  return (<button className="heatmap-button" disabled={disabled} onClick={onClick}>{text}</button>)
}

function App() {
  const [heatmaps, setHeatmaps] = useState([<Heatmap />]);
  const [removeDisabled, setRemoveDisabled] = useState(true); // enable/disable remove button

  function handleAddHeatmap() {
    setHeatmaps(heatmaps => [...heatmaps, <Heatmap />]);
    setRemoveDisabled(false);
  }

  function handleRemoveHeatmap() {
    if (heatmaps.length > 1) {
      if (heatmaps.length === 2) setRemoveDisabled(true);
      const nextHeatmaps = heatmaps.slice();
      nextHeatmaps.pop();
      setHeatmaps(nextHeatmaps);
    }
  }

  return (
    <div className="content">
      {heatmaps}
      <div>
        <button className="heatmap-button" onClick={handleAddHeatmap}>Add heatmap</button><br/>
        <Button disabled={removeDisabled} onClick={handleRemoveHeatmap} text="Remove heatmap"/>
      </div>
    </div>
  )
}

export default App
