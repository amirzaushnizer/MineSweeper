import React from "react";
import "./App.css";
import BombsCounter from "./components/BombsCounter";
import Timer from "./components/Timer";
import Game from "./components/Game";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="app-container">
      <h1>MineSweeper Game</h1>
      <div className="game-container">
        <BombsCounter />
        <Game />
        <Timer />
      </div>
    </div>
  );
};

export default App;
