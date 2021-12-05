import React, { Component } from "react";

interface SquareProps {
  isBomb: boolean;
  numOfAdjacentBombs: number;
}

class Square extends Component<SquareProps> {
  render() {
    const { isBomb, numOfAdjacentBombs } = this.props;
    return (
      <button className="square">
        {isBomb ? "X" : numOfAdjacentBombs > 0 ? numOfAdjacentBombs : ""}
      </button>
    );
  }
}

export default Square;
