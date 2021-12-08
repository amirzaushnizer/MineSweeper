import React, { Component } from "react";
import Square from "./Square";
import {
  getSquareNeighbors,
  initBombsMatrix,
  initOpenSquaresMatrix,
} from "../utils";
import { GamePhase } from "../App";

interface GameProps {
  gameSize: number;
  numOfBombs: number;
  setNumOfBombsLeft: (numToAdd: number) => void;
  gamePhase: GamePhase;
  setPhase: (phase: GamePhase) => void;
}

interface GameState {
  openSquares: number[][];
  bombSquares: boolean[][];
}

class Game extends Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      openSquares: initOpenSquaresMatrix(props.gameSize),
      bombSquares: initBombsMatrix(props.gameSize, props.numOfBombs),
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
    const { setPhase } = this.props;
    const { openSquares, bombSquares } = this.state;

    if (bombSquares[row][col]) {
      // if hit a bomb, handle lose
      setPhase(GamePhase.Lose);
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
    const { numOfBombs, setPhase } = this.props;
    const numOfClosedSquares = openSquares
      .map((col) => {
        // NOT STACK OVERFLOW I SWEAR
        return col.reduce((count, cur) => {
          return cur === -1 ? count + 1 : count;
        }, 0);
      })
      .reduce((sum, cur) => {
        return sum + cur;
      }, 0);

    if (numOfClosedSquares === numOfBombs) {
      setPhase(GamePhase.Win);
    }
  };

  render() {
    const { gameSize, setNumOfBombsLeft, gamePhase } = this.props;
    const { openSquares, bombSquares } = this.state;
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
