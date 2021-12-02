import React from "react";
import "./App.css";
import BombsCounter from "./BombsCounter";
import Timer from "./Timer";
import Game from "./Game";

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <h1>MineSweeper Game</h1>
        <div className="game-container">
          <BombsCounter numOfBombsLeft={10} />
          <Game />
          <Timer />
        </div>
      </div>
    );
  }
}

export default App;
