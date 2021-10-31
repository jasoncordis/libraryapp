import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function TheGreatGatsby() {
  return (
    <div className="container">
      <h1>Great Gatsby</h1>
      <AudioPlayer
        src="catalog_items/audiobooks/greatgatsby_ch1.mp3"
        // Try other props!
      />
    </div>
  );
}
