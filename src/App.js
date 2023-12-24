import React, { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";

import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";

function App() {
  const [model, setModel] = useState(null);
  const [action, setAction] = useState(null);
  const [labels, setLabels] = useState(null);

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT");
    console.log("Model Loaded");
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  };

  useEffect(() => {
    loadModel();
  }, []);

  function argMax(arr) {
    return arr
      .map((x, i) => [x, i])
      .reduce((acc, cur) => (cur[0] > acc[0] ? cur : acc))[1];
  }

  const recognizeCommands = async () => {
    console.log("Listening for commands");
    model.listen(
      (result) => {
        console.log(result.scores);
        setAction(labels[argMax(Object.values(result.scores))]);
      },
      { includeSpectrogram: true, probabilityThreshold: 0.9 }
    );
    setTimeout(() => model.stopListening(), 10e3);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={recognizeCommands}>Command</button>
        {action ? <div>{action}</div> : <div>No Action Detect</div>}
      </header>
    </div>
  );
}

export default App;
