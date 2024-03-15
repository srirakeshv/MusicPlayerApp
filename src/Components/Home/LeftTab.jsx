import React from "react";
import {
  CircleDotDashed,
  Home,
  AudioLines,
  Folder,
  User,
  Heart,
  Sparkle,
  Settings,
} from "lucide-react";

const LeftTab = () => {
  return (
    <aside className="flex flex-col justify-between items-center w-16 bg-vio text-slate-500 px-3 py-5 rounded-l-3xl">
      <p className="bg-vio2 p-1 rounded-full text-slate-200">
        <CircleDotDashed size={20} />
      </p>
      <div className="flex flex-col gap-4">
        <p className="p-1 rounded-full">
          <Home size={20} />
        </p>
        <p className="p-1 rounded-full">
          <AudioLines size={20} />
        </p>
        <p className="p-1 rounded-full">
          <Folder size={20} />
        </p>
        <p className="p-1 rounded-full">
          <User size={20} />
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="p-1 rounded-full">
          <Heart size={20} />
        </p>
        <p className="p-1 rounded-full">
          <Sparkle size={20} />
        </p>
        <p className="p-1 rounded-full">
          <Folder size={20} />
        </p>
      </div>
      <p className="p-1 rounded-full">
        <Settings size={20} />
      </p>
    </aside>
  );
};

export default LeftTab;
