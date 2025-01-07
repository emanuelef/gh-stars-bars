import { useState } from 'react'
import RacingBars from "racing-bars/react";
import './App.css'

function App() {
  const options = {
    dataUrl: "./output.csv",
    autorun: true,
    labelsPosition: "outside",
    tickDuration: 200,
    theme: 'dark',
    highlightBars: true,
    topN: 25,
    labelsWidth: 420,
    selectBars: true,
    title: "Top Starred Repositories on GitHub",
    marginTop: 20,
    subTitle: 'contact me to add more repos',
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
