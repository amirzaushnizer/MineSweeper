import React, { Component } from "react";

class BombsCounter extends Component<{ numOfBombsLeft: number }> {
  render() {
    return (
      <div>
        <h3>Bombs Left</h3>
        <h5>{this.props.numOfBombsLeft}</h5>
      </div>
    );
  }
}

export default BombsCounter;
