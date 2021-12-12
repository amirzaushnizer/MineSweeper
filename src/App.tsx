import React from "react";
import "./App.css";
import BombsCounter from "./components/BombsCounter";
import Timer from "./components/Timer";
import Game from "./components/Game";

interface AppState {
  numOfBombsLeft: number;
  gameSize: number;
}

interface AppProps {}

const NUM_OF_BOMBS = 15;

class App extends React.Component<AppProps, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      numOfBombsLeft: NUM_OF_BOMBS,
      gameSize: 20,
    };
  }

  setNumOfBombsLeft = (numToAdd: number) => {
    this.setState((prevState) => {
      return { numOfBombsLeft: prevState.numOfBombsLeft + numToAdd };
    });
  };

  render() {
    const { numOfBombsLeft, gameSize } = this.state;

    return (
      <div className="app-container">
        <h1>MineSweeper Game</h1>
        <div className="game-container">
          <BombsCounter numOfBombsLeft={numOfBombsLeft} />
          <Game
            gameSize={gameSize}
            totalNumOfBombs={NUM_OF_BOMBS}
            setNumOfBombsLeft={this.setNumOfBombsLeft}
          />
          <Timer />
        </div>
      </div>
    );
  }
}

export default App;
