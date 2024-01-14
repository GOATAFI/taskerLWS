import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import TaskBoard from "./Task/TaskBoard";

const App = () => {
  return (
    <>
      <Header></Header>
      <div className="flex flex-col justify-center items-center">
        <HeroSection></HeroSection>
        <TaskBoard></TaskBoard>
      </div>
      <Footer></Footer>
    </>
  );
};

export default App;
