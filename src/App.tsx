import React from "react";
import "./App.css";
import BombsCounter from "./components/BombsCounter";
import Timer from "./components/Timer";
import Game from "./components/Game";

interface AppState {
  numOfBombsLeft: number;
  gameSize: number;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      numOfBombsLeft: 15,
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
            numOfBombs={numOfBombsLeft}
            setNumOfBombsLeft={this.setNumOfBombsLeft.bind(this)}
          />
          <Timer />
        </div>
      </div>
    );
  }
}

export default App;
