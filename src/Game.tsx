import React, { Component } from "react";
import Square from "./Square";

interface GameProps {
  gameSize: number;
  numOfBombs: number;
}

class Game extends Component<GameProps> {
  private readonly bombsMatrix: boolean[][];

  constructor(props: GameProps) {
    super(props);
    this.bombsMatrix = this.initBombsMatrix();
  }

  getSquareNeighbors = (row: number, col: number) => {
    const neighbors: number[][] = [];
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (!(i === row && j === col)) {
          if (
            i > -1 &&
            j > -1 &&
            i < this.props.gameSize &&
            j < this.props.gameSize
          ) {
            neighbors.push([i, j]);
          }
        }
      }
    }

    return neighbors;
  };

  calcNumOfAdjacentBombs = (row: number, col: number) => {
    const neighbors = this.getSquareNeighbors(row, col);
    return neighbors.filter(
      (neighbor) => this.bombsMatrix[neighbor[0]][neighbor[1]]
    ).length;
  };

  initBombsMatrix = () => {
    const bombsMatrix = Array(this.props.gameSize)
      .fill(false)
      .map(() => {
        return Array(this.props.gameSize).fill(false);
      });

    for (let i = 0; i < this.props.numOfBombs; i++) {
      const row = Math.floor(Math.random() * this.props.gameSize);
      const column = Math.floor(Math.random() * this.props.gameSize);
      bombsMatrix[row][column] = true;
    }

    return bombsMatrix;
  };

  componentDidMount() {}

  render() {
    return (
      <div className="grid-container">
        {Array.from(Array(this.props.gameSize).keys()).map((i) => (
          <div className="square-column" key={i}>
            {Array.from(Array(this.props.gameSize).keys()).map((j) => {
              return (
                <Square
                  key={j}
                  isBomb={this.bombsMatrix[i][j]}
                  numOfAdjacentBombs={this.calcNumOfAdjacentBombs(i, j)}
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
