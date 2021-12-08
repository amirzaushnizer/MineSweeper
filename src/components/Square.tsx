import React, { Component } from "react";

interface SquareProps {
  isBomb: boolean;
  numOfAdjacentBombs: number;
  setNumOfBombsLeft: (numToAdd: number) => void;
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
    const { isBomb, numOfAdjacentBombs } = this.props;
    return isBomb ? "X" : numOfAdjacentBombs > 0 ? numOfAdjacentBombs : "";
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
    if (markState === MarkStates.Unmarked) {
      setNumOfBombsLeft(-1);
    }
    if (markState === MarkStates.Marked) {
      setNumOfBombsLeft(1);
    }
    this.setState(
      { markState: (markState + 1) % 3 } //Hardcore discrete math
    );
  };

  render() {
    const { numOfAdjacentBombs } = this.props;
    const isOpen = numOfAdjacentBombs > -1;
    return (
      <button className="square" onContextMenu={this.handleRightClick}>
        {isOpen ? this.displayOpen() : this.displayHidden()}
      </button>
    );
  }
}

export default Square;
