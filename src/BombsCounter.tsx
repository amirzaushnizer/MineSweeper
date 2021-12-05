import React, { Component } from "react";

class BombsCounter extends Component<{ numOfBombsLeft: number }> {
  render() {
    const { numOfBombsLeft } = this.props;
    return (
      <div>
        <h3>Bombs Left</h3>
        <h5>{numOfBombsLeft}</h5>
      </div>
    );
  }
}

export default BombsCounter;
