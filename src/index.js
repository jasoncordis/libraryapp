import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => (
  <AudioPlayer
    autoPlay
    src="http://example.com/audio.mp3"
    onPlay={(e) => console.log("onPlay")}
    // other props here
  />
);

const rootElement = document.getElementById("root1");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
