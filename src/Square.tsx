import React, { Component } from "react";

interface SquareProps {
  isBomb: boolean;
  numOfAdjacentBombs: number;
  isOpen: boolean;
  setNumOfBombsLeft: Function;
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
    return this.props.isBomb
      ? "X"
      : this.props.numOfAdjacentBombs > 0
      ? this.props.numOfAdjacentBombs
      : "";
  };

  displayHidden = () => {
    switch (this.state.markState) {
      case MarkStates.Marked:
        return "🏳️‍⚧️";
      case MarkStates.QuestionMark:
        return "?";
      default:
        return "";
    }
  };

  handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (this.state.markState === MarkStates.Unmarked) {
      this.props.setNumOfBombsLeft(-1);
    }
    if (this.state.markState === MarkStates.Marked) {
      this.props.setNumOfBombsLeft(1);
    }
    this.setState((prevState: SquareState) => {
      return { markState: (prevState.markState + 1) % 3 };
    });
  };

  render() {
    return (
      <button
        className="square"
        onContextMenu={this.handleRightClick.bind(this)}
      >
        {this.props.isOpen ? this.displayOpen() : this.displayHidden()}
      </button>
    );
  }
}

export default Square;
