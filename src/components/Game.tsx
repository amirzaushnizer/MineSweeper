import React, { Component } from "react";
import Square from "./Square";
import {
  getSquareNeighbors,
  init2DBoolMatrix,
  initBombsMatrix,
} from "../utils";

interface GameProps {
  gameSize: number;
  numOfBombs: number;
  setNumOfBombsLeft: Function;
}

interface GameState {
  openSquares: boolean[][];
  bombSquares: boolean[][];
}

class Game extends Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);

    this.state = {
      openSquares: init2DBoolMatrix(props.gameSize),
      bombSquares: initBombsMatrix(props.gameSize, props.numOfBombs),
    };
  }

  calcNumOfAdjacentBombs = (row: number, col: number) => {
    const { gameSize } = this.props;
    const neighbors = getSquareNeighbors(row, col, gameSize);
    return neighbors.filter(
      (neighbor) => this.state.bombSquares[neighbor[0]][neighbor[1]]
    ).length;
  };

  openSquare = (row: number, col: number, newMatrix: boolean[][]) => {
    const { bombSquares } = this.state;
    const { gameSize } = this.props;

    if (!newMatrix[row][col]) {
      newMatrix[row][col] = true;
      if (bombSquares[row][col]) {
        return; // handle lose
      }

      if (this.calcNumOfAdjacentBombs(row, col) === 0) {
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
                  numOfAdjacentBombs={this.calcNumOfAdjacentBombs(i, j)}
                  isOpen={openSquares[i][j]}
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
