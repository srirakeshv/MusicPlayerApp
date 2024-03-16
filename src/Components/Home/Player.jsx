import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Pause,
} from "lucide-react";
import "../../Css/App.css";
import MusicArray from "../../Music/MusicArray";

const Player = ({ index }) => {
  const [playactive, setPlayActive] = useState(true);
  const [pauseActive, setPauseActive] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (index !== undefined && MusicArray[index]) {
      const sourceUrl = `${process.env.PUBLIC_URL}${MusicArray[index].songLink}`;
      audioRef.current.src = sourceUrl;
      audioRef.current.load();
      console.log("Audio source:", sourceUrl);
    } else {
      console.log("Index is undefined or invalid.");
    }

    console.log(index);
  }, [index]);

  const handleplay = () => {
    if (index !== undefined) {
      setPlayActive(false);
      setPauseActive(true);
      audioRef.current.play();
    } else {
      console.log("error");
    }
  };

  const handlepause = () => {
    setPauseActive(false);
    setPlayActive(true);
    audioRef.current.pause();
  };

  return (
    <div className="w-72 min-h-44 bg-vio3 mx-3 rounded-xl flex flex-col items-center gap-2">
      <div
        className="w-64 h-36 mt-4 rounded-xl"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/Asset/images/MusicBg.jpeg)`,
          backgroundSize: "100% 100%",
          objectFit: "cover",
        }}
      ></div>
      <div className="flex flex-col items-center w-full px-3">
        <p className="text-slate-100 text-xl">Song name</p>
        <div className="scrollable-container1">
          <p className="text-xs text-slate-300 singer-name">
            <span className="singer flex items-center gap-1">music.Singer</span>
          </p>
        </div>
      </div>
      <div className="container px-3">
        <div className="duration">
          <p className="text-slate-100">00:00</p>
          <div className="progress-bar">
            <div
              className="progress"
              // style={{
              //   left: `${
              //     (audioRef.current.currentTime / audioRef.current.duration) *
              //       100 -
              //     1
              //   }%`,
              // }}
            ></div>
          </div>
          <p className="text-slate-100">00:00</p>
        </div>
      </div>
      <div className="mb-4 flex justify-between items-center w-full px-3">
        <Repeat size={25} color="#ffffff" className="cursor-pointer" />
        <div className="flex gap-2 items-center">
          <SkipBack size={25} color="#ffffff" className="cursor-pointer" />
          <div className="w-14 h-14 rounded-full bg-slate-100 flex justify-center items-center cursor-pointer">
            {playactive && (
              <Play size={30} onClick={handleplay} className="cursor-pointer" />
            )}
            {pauseActive && (
              <Pause
                size={30}
                onClick={handlepause}
                className="cursor-pointer"
              />
            )}
          </div>
          <SkipForward size={25} color="#ffffff" className="cursor-pointer" />
        </div>
        <Shuffle size={25} color="#ffffff" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Player;
