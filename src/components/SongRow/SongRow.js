import React from "react";
import "./SongRow.css";

function SongRow({ item, playSong, index }) {

  return (
    <div className="songRow" onClick={() => playSong(item.audio, item.title, index)}>
      <div className="songRow__info">
        <h1>{item.title}</h1>
        <p>
          Created by {item.teacher}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
