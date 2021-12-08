import React, { Component } from "react";
import Square from "./Square";
import {
  getSquareNeighbors,
  initOpenSquaresMatrix,
  initBombsMatrix,
} from "../utils";

interface GameProps {
  gameSize: number;
  numOfBombs: number;
  setNumOfBombsLeft: (numToAdd: number) => void;
}

interface GameState {
  openSquares: number[][];
  bombSquares: boolean[][];
  gamePhase: GamePhase;
}

enum GamePhase {
  Playing = 0,
  Win = 1,
  Lose = 2,
}

class Game extends Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);

    this.state = {
      openSquares: initOpenSquaresMatrix(props.gameSize),
      bombSquares: initBombsMatrix(props.gameSize, props.numOfBombs),
      gamePhase: GamePhase.Playing,
    };
  }

  calcNumOfAdjacentBombs = (row: number, col: number) => {
    const { gameSize } = this.props;
    const { bombSquares } = this.state;
    const neighbors = getSquareNeighbors(row, col, gameSize);
    return neighbors.filter(
      (neighbor) => bombSquares[neighbor[0]][neighbor[1]]
    ).length;
  };

  openSquare = (row: number, col: number, newMatrix: number[][]) => {
    const { bombSquares } = this.state;
    const { gameSize } = this.props;

    if (newMatrix[row][col] < 0) {
      newMatrix[row][col] = this.calcNumOfAdjacentBombs(row, col);
      if (bombSquares[row][col]) {
        this.setState({ gamePhase: GamePhase.Lose });
        return;
      }

      if (newMatrix[row][col] === 0) {
        const neighbors = getSquareNeighbors(row, col, gameSize);
        neighbors.forEach((neighbor) => {
          this.openSquare(neighbor[0], neighbor[1], newMatrix);
        });
      }
    }
  };

  handleOpen = (row: number, col: number) => {
    const { openSquares } = this.state;

    const openSquaresCopy = openSquares.map((arr) => {
      return arr.slice();
    });
    this.openSquare(row, col, openSquaresCopy);
    this.setState({ openSquares: openSquaresCopy });
  };

  render() {
    const { gameSize, setNumOfBombsLeft } = this.props;
    const { openSquares, bombSquares } = this.state;
    return (
      <div className="grid-container">
        {Array.from(Array(gameSize).keys()).map((i) => (
          <div className="square-column" key={i}>
            {Array.from(Array(gameSize).keys()).map((j) => {
              return (
                <Square
                  key={j}
                  loc={[i, j]}
                  isBomb={bombSquares[i][j]}
                  numOfAdjacentBombs={openSquares[i][j]}
                  setNumOfBombsLeft={setNumOfBombsLeft}
                  handleOpen={this.handleOpen.bind(this)}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default Game;
