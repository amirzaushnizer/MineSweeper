import React from "react";
import "./App.css";
import BombsCounter from "./BombsCounter";
import Timer from "./Timer";
import Game from "./Game";

class App extends React.Component {
  render() {
    const numOfBombsLeft = 10;
    const numOfBombs = 10;
    const gameSize = 30;
    return (
      <div className="app-container">
        <h1>MineSweeper Game</h1>
        <div className="game-container">
          <BombsCounter numOfBombsLeft={numOfBombsLeft} />
          <Game gameSize={gameSize} numOfBombs={numOfBombs} />
          <Timer />
        </div>
      </div>
    );
  }
}

export default App;
