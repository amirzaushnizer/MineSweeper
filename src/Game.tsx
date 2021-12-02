import React, { Component } from "react";
import Square from "./Square";

class Game extends Component {
  private gameSize: number;

  constructor(props: any) {
    super(props);
    this.gameSize = 30;
  }

  render() {
    return (
      <div className="grid-container">
        {Array.from(Array(this.gameSize).keys()).map((i) => (
          <div className="square-column">
            {Array.from(Array(this.gameSize).keys()).map((j) => {
              return <Square />;
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default Game;
