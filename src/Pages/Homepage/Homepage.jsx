import React from "react";
import Navbar from "../../Components/Home/Navbar";
import LeftTab from "../../Components/Home/LeftTab";
import Card from "../../Components/Home/Card";

const Homepage = () => {
  return (
    <div
      className="flex bg-bl1"
      style={{ maxWidth: "100vw", minHeight: "100vh" }}
    >
      <LeftTab />
      <div className="flex flex-col gap-3">
        <Navbar />
        <Card />
      </div>
    </div>
  );
};

export default Homepage;
