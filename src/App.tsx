import React from "react";
import "./App.css";
import BombsCounter from "./BombsCounter";
import Timer from "./Timer";
import Game from "./Game";

interface AppState {
  numOfBombsLeft: number;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      numOfBombsLeft: 15,
    };
  }

  setNumOfBombsLeft = (numToAdd: number) => {
    this.setState((prevState) => {
      return { numOfBombsLeft: prevState.numOfBombsLeft + numToAdd };
    });
  };

  render() {
    return (
      <div className="app-container">
        <h1>MineSweeper Game</h1>
        <div className="game-container">
          <BombsCounter numOfBombsLeft={this.state.numOfBombsLeft} />
          <Game
            gameSize={30}
            numOfBombs={this.state.numOfBombsLeft}
            setNumOfBombsLeft={this.setNumOfBombsLeft.bind(this)}
          />
          <Timer />
        </div>
      </div>
    );
  }
}

export default App;
