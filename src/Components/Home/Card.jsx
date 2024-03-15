import React from "react";
import { Play, Music4 } from "lucide-react";
import MusicArray from "../../Music/MusicArray";
import "../../Css/App.css";

const Card = () => {
  return (
    <div className="px-3 py-5 flex gap-3">
      {MusicArray.map((music, index) => (
        <div
          className="w-44 h-40 rounded-lg bg-slate-500 flex items-end justify-center"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}${music.SongBgPic})`,
            objectFit: "contain",
            backgroundSize: "100% 100%",
          }}
          key={index}
        >
          <div className="w-40 h-16 bg-bl2 rounded-lg mb-3 p-2 flex justify-between items-center gap-3">
            <div className="flex flex-col items-start">
              <p className="text-slate-100 text-sm">
                {music.SongName && music.SongName.length <= 12
                  ? music.SongName
                  : music.SongName
                  ? music.SongName.slice(0, 12) + "..."
                  : ""}
              </p>
              <div className="scrollable-container">
                <p className="text-xs text-slate-300 singer-name">
                  <span className="singer flex items-center gap-1">
                    <Music4 size={15} className=".music-icon" />
                    {music.Singer}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex justify-center items-center">
              <Play />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
