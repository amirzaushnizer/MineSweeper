import React, { Component } from "react";
import { GamePhase } from "../App";

interface SquareProps {
  isBomb: boolean;
  numOfAdjacentBombs: number;
  setNumOfBombsLeft: (numToAdd: number) => void;
  handleOpen: (row: number, col: number) => void;
  loc: number[];
  gamePhase: GamePhase;
}

interface SquareState {
  markState: MarkStates;
}

enum MarkStates {
  Unmarked = 0,
  Marked = 1,
  QuestionMark = 2,
}

class Square extends Component<SquareProps, SquareState> {
  constructor(props: SquareProps) {
    super(props);
    this.state = { markState: MarkStates.Unmarked };
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
    const { setNumOfBombsLeft, numOfAdjacentBombs } = this.props;
    const { markState } = this.state;

    e.preventDefault();
    if (numOfAdjacentBombs < 0) {
      if (markState === MarkStates.Unmarked) {
        setNumOfBombsLeft(-1);
      }
      if (markState === MarkStates.Marked) {
        setNumOfBombsLeft(1);
      }
      this.setState(
        { markState: (markState + 1) % 3 } //Hardcore discrete math
      );
    }
  };

  buildSquareClassNameString = () => {
    const { numOfAdjacentBombs, isBomb, gamePhase } = this.props;
    const isOpen = numOfAdjacentBombs > -1;
    let className = "square";
    if (isOpen) {
      className += " open";
    }

    if (gamePhase === GamePhase.Lose && isBomb) {
      className += " bomb";
    }

    if (gamePhase === GamePhase.Win) {
      className += " game-win";
    }

    return className;
  };

  render() {
    const { handleOpen, loc, numOfAdjacentBombs, gamePhase } = this.props;
    const isOpen = numOfAdjacentBombs > -1;
    return (
      <button
        className={this.buildSquareClassNameString()}
        onContextMenu={this.handleRightClick}
        disabled={gamePhase !== GamePhase.Playing}
        onClick={() => {
          handleOpen(loc[0], loc[1]);
        }}
      >
        {gamePhase !== GamePhase.Playing
          ? this.displayOpen()
          : isOpen
          ? this.displayOpen()
          : this.displayHidden()}
      </button>
    );
  }
}

export default Square;
