import React from "react";
import "./App.css";
import BombsCounter from "./components/BombsCounter";
import Timer from "./components/Timer";
import Game from "./components/Game";
import { NUM_OF_BOMBS } from "./constants";

interface AppState {
  numOfBombsLeft: number;
}

interface AppProps {}

export enum GamePhase {
  FirstClick = 0,
  Playing = 1,
  Win = 2,
  Lose = 3,
}

class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div className="app-container">
        <h1>MineSweeper Game</h1>
        <div className="game-container">
          <BombsCounter />
          <Game totalNumOfBombs={NUM_OF_BOMBS} />
          <Timer />
        </div>
      </div>
    );
  }
}

export default App;
