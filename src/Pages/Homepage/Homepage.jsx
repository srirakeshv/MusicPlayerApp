import React, { useState } from "react";
import Navbar from "../../Components/Home/Navbar";
import LeftTab from "../../Components/Home/LeftTab";
import Card from "../../Components/Home/Card";
import Player from "../../Components/Home/Player";

const Homepage = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedIndex(index);
  };
  return (
    <div
      className="flex bg-bl1"
      style={{ maxWidth: "100vw", minHeight: "100vh" }}
    >
      <LeftTab />
      <div className="flex flex-col gap-1">
        <Navbar />
        <Card onCardClick={handleCardClick} />
        <Player index={selectedIndex} />
      </div>
    </div>
  );
};

export default Homepage;
