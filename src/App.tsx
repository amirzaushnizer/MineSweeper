import React from "react";
import "./App.css";
import BombsCounter from "./components/BombsCounter";
import Timer from "./components/Timer";
import Game from "./components/Game";

interface AppState {
  numOfBombsLeft: number;
  gameSize: number;
  gamePhase: GamePhase;
}

interface AppProps {}

export enum GamePhase {
  FirstClick = 0,
  Playing = 1,
  Win = 2,
  Lose = 3,
}

const NUM_OF_BOMBS = 15;

class App extends React.Component<AppProps, AppState> {
  state = {
    numOfBombsLeft: NUM_OF_BOMBS,
    gameSize: 20,
    gamePhase: GamePhase.FirstClick,
  };

  setNumOfBombsLeft = (numToAdd: number) => {
    this.setState((prevState) => {
      return { numOfBombsLeft: prevState.numOfBombsLeft + numToAdd };
    });
  };

  setGamePhase = (phase: GamePhase) => {
    this.setState({ gamePhase: phase });
  };

  render() {
    const { numOfBombsLeft, gameSize, gamePhase } = this.state;

    return (
      <div className="app-container">
        <h1>MineSweeper Game</h1>
        <div className="game-container">
          <BombsCounter numOfBombsLeft={numOfBombsLeft} />
          <Game
            setPhase={this.setGamePhase}
            gamePhase={gamePhase}
            gameSize={gameSize}
            totalNumOfBombs={NUM_OF_BOMBS}
            setNumOfBombsLeft={this.setNumOfBombsLeft}
          />
          <Timer gamePhase={gamePhase} />
        </div>
      </div>
    );
  }
}

export default App;
