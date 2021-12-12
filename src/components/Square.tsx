import React, { Component } from "react";
import { GamePhase } from "./Game";

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

  componentDidUpdate(prevProps: Readonly<SquareProps>) {
    const { markState } = this.state;
    const { setNumOfBombsLeft } = this.props;
    if (
      markState === MarkStates.Marked &&
      prevProps.numOfAdjacentBombs < 0 &&
      this.isOpen()
    ) {
      setNumOfBombsLeft(1);
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
    const { setNumOfBombsLeft } = this.props;
    const { markState } = this.state;

    e.preventDefault();
    if (!this.isOpen()) {
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

  isOpen = () => {
    const { numOfAdjacentBombs } = this.props;
    return numOfAdjacentBombs > -1;
  };

  shouldDisplayOpen = () => {
    const { gamePhase } = this.props;
    return gamePhase !== GamePhase.Playing || this.isOpen();
  };

  buildSquareClassNameString = () => {
    const { isBomb, gamePhase } = this.props;

    let className = "square";
    if (this.isOpen()) {
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
    const { markState } = this.state;
    const { handleOpen, loc, gamePhase } = this.props;
    return (
      <button
        className={this.buildSquareClassNameString()}
        onContextMenu={this.handleRightClick}
        disabled={
          gamePhase !== GamePhase.Playing || markState === MarkStates.Marked
        }
        onClick={() => {
          handleOpen(loc[0], loc[1]);
        }}
      >
        {this.shouldDisplayOpen() ? this.displayOpen() : this.displayHidden()}
      </button>
    );
  }
}

export default Square;
