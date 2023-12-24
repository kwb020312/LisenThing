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
  };

  useEffect(() => {
    loadModel();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
