import React, { Component } from "react";

interface SquareProps {
  isBomb: boolean;
  numOfAdjacentBombs: number;
}

class Square extends Component<SquareProps> {
  render() {
    return (
      <button className="square">
        {this.props.isBomb
          ? "X"
          : this.props.numOfAdjacentBombs > 0
          ? this.props.numOfAdjacentBombs
          : ""}
      </button>
    );
  }
}

export default Square;
