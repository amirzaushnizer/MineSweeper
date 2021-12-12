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
  totalNumOfBombs: number;
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
      bombSquares: Array(props.gameSize)
        .fill(false)
        .map(() => {
          return Array(props.gameSize).fill(false);
        }),
    };
  }

  initBombs = (loc: number[]) => {
    const { gameSize, totalNumOfBombs, setPhase } = this.props;
    setPhase(GamePhase.Playing);
    this.setState(
      {
        bombSquares: initBombsMatrix(gameSize, totalNumOfBombs, loc),
      },
      () => {
        this.handleOpen(loc[0], loc[1]);
      }
    );
  };

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
    const { setPhase } = this.props;

    if (bombSquares[row][col]) {
      // if hit a bomb, handle lose
      setPhase(GamePhase.Lose);
      return;
    }

    const openSquaresCopy = openSquares.map((arr) => arr.slice()); // create a snapshot of the current state
    this.openSquare(row, col, openSquaresCopy);

    this.setState({ openSquares: openSquaresCopy }, this.isWin); // after snapshot is updated - update the state accordingly.
  };

  isWin = () => {
    const { openSquares } = this.state;
    const { totalNumOfBombs, setPhase } = this.props;

    const numOfClosedSquares = openSquares
      .flat()
      .filter((square) => square === -1).length;

    if (numOfClosedSquares === totalNumOfBombs) {
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
                  initBombs={this.initBombs.bind(this)}
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
