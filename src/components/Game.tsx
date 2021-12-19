import React, { Component } from "react";
import Square from "./Square";
import { getSquareNeighbors } from "../utils";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/store-types";
import { firstMove, loseGame, openSquares } from "../store/actions";

interface GameProps extends ReduxGameProps {
  totalNumOfBombs: number;
}

class Game extends Component<GameProps> {
  handleFirstMove = (row: number, col: number) => {
    const { firstMove } = this.props;
    firstMove(row, col);
  };

  calcNumOfAdjacentBombs = (row: number, col: number): number => {
    const { gameSize, bombsSquaresMat } = this.props;
    const neighbors = getSquareNeighbors(row, col, gameSize);
    return neighbors.filter(
      (neighbor) => bombsSquaresMat[neighbor[0]][neighbor[1]]
    ).length;
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
    const { bombsSquaresMat, lose, openSquares } = this.props;

    if (bombsSquaresMat[row][col]) {
      // if hit a bomb, handle lose
      lose();
      return;
    }

    openSquares(row, col);
  };

  render() {
    const { gameSize } = this.props;

    return (
      <div className="grid-container">
        {Array.from(Array(gameSize).keys()).map((i) => (
          <div className="square-column" key={i}>
            {Array.from(Array(gameSize).keys()).map((j) => {
              return (
                <Square
                  handleFirstMove={this.handleFirstMove}
                  key={j}
                  loc={[i, j]}
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

const mapStateToProps = (state: RootState) => {
  return {
    bombsSquaresMat: state.bombsSquares,
    openSquaresMat: state.openSquares,
    gameSize: state.gameSize,
    gamePhase: state.gamePhase,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  firstMove: (row: number, col: number) => dispatch(firstMove(row, col)),
  lose: () => dispatch(loseGame()),
  openSquares: (row: number, col: number) => dispatch(openSquares(row, col)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxGameProps = ConnectedProps<typeof connector>;

export default connector(Game);
