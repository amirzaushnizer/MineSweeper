import React, { Component } from "react";
import { GamePhase } from "../App";

import classNames from "classnames";
import { RootState } from "../store/store-types";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { markSquare, unMarkSquare } from "../store/actions";
import { isGameOver } from "../utils";

interface OwnProps {
  handleOpen: (row: number, col: number) => void;
  loc: number[];
  handleFirstMove: (row: number, col: number) => void;
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

  handleLeftClick = () => {
    const { gamePhase, handleFirstMove, loc, handleOpen } = this.props;
    const row = loc[0];
    const col = loc[1];
    if (gamePhase === GamePhase.FirstClick) {
      handleFirstMove(row, col);
    }
    handleOpen(row, col);
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
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  unmark: () => dispatch(unMarkSquare()),
  mark: () => dispatch(markSquare()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Square);
