import React from "react";
import { Music4 } from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center gap-2 px-3 pt-4">
        <p className="text-3xl italic">Music</p>
        <Music4 />
      </nav>
    </div>
  );
};

export default Navbar;
