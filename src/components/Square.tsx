import React, { Component } from "react";

import classNames from "classnames";
import { GamePhase, RootState } from "../store/store-types";
import { connect, ConnectedProps } from "react-redux";
import {
  firstMove,
  loseGame,
  markSquare,
  openSquares,
  unMarkSquare,
} from "../store/actions";
import { isGameOver } from "../utils";

interface OwnProps {
  loc: number[];
}

type ReduxSquareProps = ConnectedProps<typeof connector>;

type SquareProps = OwnProps & ReduxSquareProps;

interface SquareState {
  markState: MarkStates;
}

enum MarkStates {
  Unmarked = 0,
  Marked = 1,
  QuestionMark = 2,
}

class Square extends Component<SquareProps, SquareState> {
  state = { markState: MarkStates.Unmarked };

  componentDidUpdate(prevProps: Readonly<SquareProps>) {
    const { unmark } = this.props;
    const { markState } = this.state;
    if (
      markState === MarkStates.Marked &&
      prevProps.numOfAdjacentBombs < 0 &&
      this.isOpen()
    ) {
      unmark();
    }
  }

  displayOpen = () => {
    const { isBomb, numOfAdjacentBombs, gamePhase } = this.props;
    return isBomb
      ? gamePhase === GamePhase.Win
        ? "✅"
        : "💣"
      : numOfAdjacentBombs > 0
      ? numOfAdjacentBombs
      : "";
  };

  displayHidden = () => {
    const { markState } = this.state;
    switch (markState) {
      case MarkStates.Marked:
        return "🏳️‍⚧️";
      case MarkStates.QuestionMark:
        return "?";
      default:
        return "";
    }
  };

  handleRightClick = (e: React.MouseEvent) => {
    const { mark, unmark } = this.props;
    const { markState } = this.state;

    e.preventDefault();
    if (!this.isOpen()) {
      if (markState === MarkStates.Unmarked) {
        mark();
      }
      if (markState === MarkStates.Marked) {
        unmark();
      }
      this.setState(
        { markState: (markState + 1) % 3 } //Hardcore discrete math
      );
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

  handleLeftClick = () => {
    const { gamePhase, firstMove, loc } = this.props;
    const row = loc[0];
    const col = loc[1];
    if (gamePhase === GamePhase.FirstClick) {
      firstMove(row, col);
    }
    this.handleOpen(row, col);
  };

  isOpen = () => {
    const { numOfAdjacentBombs } = this.props;
    return numOfAdjacentBombs > -1;
  };

  shouldDisplayOpen = () => {
    const { gamePhase } = this.props;
    return isGameOver(gamePhase) || this.isOpen();
  };

  buildSquareClassNameString = () => {
    const { isBomb, gamePhase } = this.props;

    return classNames("square", {
      open: this.isOpen(),
      bomb: gamePhase === GamePhase.Lose && isBomb,
      "game-win": gamePhase === GamePhase.Win,
    });
  };

  render() {
    const { markState } = this.state;
    const { gamePhase } = this.props;
    return (
      <button
        className={this.buildSquareClassNameString()}
        onContextMenu={this.handleRightClick}
        disabled={
          gamePhase > GamePhase.Playing || markState === MarkStates.Marked
        }
        onClick={this.handleLeftClick}
      >
        {this.shouldDisplayOpen() ? this.displayOpen() : this.displayHidden()}
      </button>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { loc } = ownProps;
  return {
    isBomb: state.bombsSquares[loc[0]][loc[1]],
    numOfAdjacentBombs: state.openSquares[loc[0]][loc[1]],
    gamePhase: state.gamePhase,
    bombsSquaresMat: state.bombsSquares,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  unmark: () => dispatch(unMarkSquare()),
  mark: () => dispatch(markSquare()),
  firstMove: (row: number, col: number) => dispatch(firstMove(row, col)),
  lose: () => dispatch(loseGame()),
  openSquares: (row: number, col: number) => dispatch(openSquares(row, col)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Square);
