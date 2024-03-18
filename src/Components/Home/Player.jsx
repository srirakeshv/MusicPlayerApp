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
  const [currsong, setcurrsong] = useState(index);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const audioRef = useRef(new Audio());

  // checking wether it recevies song index or not
  useEffect(() => {
    if (
      typeof index !== "undefined" &&
      index >= 0 &&
      index < MusicArray.length &&
      MusicArray[index]
    ) {
      const sourceUrl = `${process.env.PUBLIC_URL}${MusicArray[index].songLink}`;
      audioRef.current.src = sourceUrl;
      setcurrsong(index);
      setPlayActive(false);
      setPauseActive(true);
      audioRef.current.load();
      audioRef.current.play();
      console.log("Audio source:", sourceUrl);
    } else {
      console.log("Index is undefined or invalid.");
      audioRef.current.load();
    }

    console.log(index);
  }, [index]);

  useEffect(() => {
    const threshold = 0.5; // Define a threshold for considering the song ended
    if (audioRef.current.currentTime >= audioRef.current.duration - threshold) {
      const nextIndex = (currsong + 1) % MusicArray.length;
      setcurrsong(nextIndex);
      audioRef.current.src = `${process.env.PUBLIC_URL}${MusicArray[nextIndex].songLink}`;
      audioRef.current.play();
      setPauseActive(true);
      setPlayActive(false);
      console.log("next");
    } else {
      console.log("same");
    }
  }, [currsong, audioRef.current.currentTime, audioRef.current.duration]);

  // play function
  const handleplay = () => {
    if (index !== undefined) {
      setPlayActive(false);
      setPauseActive(true);
      audioRef.current.play();
    } else {
      console.log("error");
    }
  };

  // pause function
  const handlepause = () => {
    setPauseActive(false);
    setPlayActive(true);
    audioRef.current.pause();
  };

  // next song
  const handlenextSong = () => {
    const next = (currsong + 1) % MusicArray.length;
    setcurrsong(next);
    console.log(next);
    audioRef.current.src = `${process.env.PUBLIC_URL}${MusicArray[next].songLink}`;
    audioRef.current.play();
    setPauseActive(true);
    setPlayActive(false);
  };

  // prev song
  const handleprevsong = () => {
    const prev = (currsong - 1 + MusicArray.length) % MusicArray.length;
    setcurrsong(prev);
    console.log(prev);
    audioRef.current.src = `${process.env.PUBLIC_URL}${MusicArray[prev].songLink}`;
    audioRef.current.play();
    setPauseActive(true);
    setPlayActive(false);
  };

  // tracing the songs duration
  useEffect(() => {
    const progressBar = document.querySelector(".progress-bar");

    const handleMouseDown = (e) => {
      const progressBar = document.querySelector(".progress-bar");
      const progressBarWidth = progressBar.clientWidth;
      const clickPosition =
        e.clientX - progressBar.getBoundingClientRect().left;
      const seekPercentage = (clickPosition / progressBarWidth) * 100;
      const newCurrentTime = (seekPercentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newCurrentTime;
      progressBar.style.background = `linear-gradient(to right, #ff5722 0%, #ff5722 ${seekPercentage}%, #e0e0e0 ${seekPercentage}%, #e0e0e0 100%)`;

      const handleMouseMove = (e) => {
        const clickPosition =
          e.clientX - progressBar.getBoundingClientRect().left;
        const seekPercentage = (clickPosition / progressBarWidth) * 100;
        const newCurrentTime =
          (seekPercentage / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newCurrentTime;
        progressBar.style.background = `linear-gradient(to right, #ff5722 0%, #ff5722 ${seekPercentage}%, #e0e0e0 ${seekPercentage}%, #e0e0e0 100%)`;
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    progressBar.addEventListener("mousedown", handleMouseDown);

    // running time
    audioRef.current.ontimeupdate = () => {
      const currenttime = formatTime(audioRef.current.currentTime);
      setCurrentTime(currenttime);
      const thumbPosition =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      progressBar.style.background = `linear-gradient(to right, #ff5722 0%, #ff5722 ${thumbPosition}%, #e0e0e0 ${thumbPosition}%, #e0e0e0 100%)`;
    };

    // total duration
    audioRef.current.onloadedmetadata = () => {
      const totalduration = formatTime(audioRef.current.duration);
      setDuration(totalduration);
    };

    return () => {
      audioRef.current.ontimeupdate = null;
      audioRef.current.onloadedmetadata = null;
      progressBar.removeEventListener("mousedown", handleMouseDown);
    };
  }, [currsong]);

  // formattime
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
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
        <p className="text-slate-100 text-xl">
          {currsong !== undefined && MusicArray[currsong]?.SongName
            ? MusicArray[currsong].SongName
            : "Song name"}
        </p>
        <div className="scrollable-container1">
          <p className="text-xs text-slate-300 singer-name">
            <span className="singer flex items-center gap-1">
              {currsong !== undefined && MusicArray[currsong]?.Singer
                ? MusicArray[currsong].Singer
                : "Singer name"}
            </span>
          </p>
        </div>
      </div>
      <div className="container px-3">
        <div className="duration">
          <p className="text-slate-100">{currentTime}</p>
          <div className="progress-bar cursor-pointer">
            <div
              className="progress"
              style={{
                left: `${
                  (audioRef.current.currentTime / audioRef.current.duration) *
                    100 -
                  1
                }%`,
              }}
            ></div>
          </div>
          <p className="text-slate-100">{duration}</p>
        </div>
      </div>
      <div className="mb-4 flex justify-between items-center w-full px-3">
        <Repeat size={25} color="#ffffff" className="cursor-pointer" />
        <div className="flex gap-2 items-center">
          <SkipBack
            size={25}
            color="#ffffff"
            className="cursor-pointer"
            onClick={handleprevsong}
          />
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
          <SkipForward
            size={25}
            color="#ffffff"
            className="cursor-pointer"
            onClick={handlenextSong}
          />
        </div>
        <Shuffle size={25} color="#ffffff" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Player;
