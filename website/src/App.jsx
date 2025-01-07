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
    labelsWidth: 400,
    selectBars: true,
    title: "Top Starred Repositories on GitHub",
    marginTop: 20,
    subTitle: 'Contact me to add more repos',
    height: 'window',
  };

  return (
    <>
      <div className="AppContainer">
        <div className="OtherContainer">
          <RacingBars {...options}>Loading...</RacingBars>
        </div>
      </div>
    </>
  )
}

export default App
