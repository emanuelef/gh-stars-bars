import { useState } from 'react'
import RacingBars from "racing-bars/react";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const options = {
    dataUrl: "./output.csv",
    autorun: true,
    labelsPosition: "outside",
    tickDuration: 100,
    theme: 'dark',
    highlightBars: true,
  };

  return (
    <>
      <div>
        <RacingBars {...options}>Loading...</RacingBars>
      </div>
    </>
  )
}

export default App
