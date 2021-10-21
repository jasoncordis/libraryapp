import "./styles.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function App() {
  return (
    <div className="container">
      <h1>Hello, audio player!</h1>
      <AudioPlayer
        src="greatgatsby.mp3"
        // Try other props!
      />
    </div>
  );
}
