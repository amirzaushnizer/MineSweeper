import React, { Component } from "react";

interface SquareProps {
  isBomb: boolean;
}

class Square extends Component<SquareProps> {
  render() {
    return <button className="square">{this.props.isBomb ? "X" : ""}</button>;
  }
}

export default Square;
