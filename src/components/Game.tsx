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

export enum GamePhase {
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

  calcNumOfAdjacentBombs = (row: number, col: number): number => {
    const { gameSize } = this.props;
    const { bombSquares } = this.state;
    const neighbors = getSquareNeighbors(row, col, gameSize);
    return neighbors.filter((neighbor) => bombSquares[neighbor[0]][neighbor[1]])
      .length;
  };

  openSquare = (row: number, col: number, newMatrix: number[][]) => {
    const { gameSize } = this.props;

    if (newMatrix[row][col] < 0) {
      // if current square not open
      newMatrix[row][col] = this.calcNumOfAdjacentBombs(row, col);

      if (newMatrix[row][col] === 0) {
        // if all neighbors are clear, open them recursively
        const neighbors = getSquareNeighbors(row, col, gameSize);
        neighbors.forEach((neighbor) => {
          this.openSquare(neighbor[0], neighbor[1], newMatrix);
        });
      }
    }
  };

  handleOpen = (row: number, col: number) => {
    const { openSquares, bombSquares } = this.state;

    if (bombSquares[row][col]) {
      // if hit a bomb, handle lose
      this.setState({ gamePhase: GamePhase.Lose });
      return;
    }

    const openSquaresCopy = openSquares.map((arr) => {
      // create a snapshot of the current state
      return arr.slice();
    });

    this.openSquare(row, col, openSquaresCopy);

    this.setState({ openSquares: openSquaresCopy }, this.isWin); // after snapshot is updated - update the state accordingly.
  };

  isWin = () => {
    const { openSquares } = this.state;
    const { numOfBombs } = this.props;
    const numOfClosedSquares = openSquares
      .map((col) => {
        return col.reduce((count, cur) => {
          return cur === -1 ? count + 1 : count;
        }, 0);
      })
      .reduce((sum, cur) => {
        return sum + cur;
      }, 0);

    console.log(numOfClosedSquares);

    console.log(numOfBombs);

    if (numOfClosedSquares === numOfBombs) {
      console.log("WIN");
      this.setState({ gamePhase: GamePhase.Win });
    }
  };

  render() {
    const { gameSize, setNumOfBombsLeft } = this.props;
    const { openSquares, bombSquares, gamePhase } = this.state;
    return (
      <div className="grid-container">
        {Array.from(Array(gameSize).keys()).map((i) => (
          <div className="square-column" key={i}>
            {Array.from(Array(gameSize).keys()).map((j) => {
              return (
                <Square
                  gamePhase={gamePhase}
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
