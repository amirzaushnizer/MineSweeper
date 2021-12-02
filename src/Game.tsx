import React, {Component} from "react";
import Square from "./Square";

interface GameProps {
  gameSize: number;
  numOfBombs: number;
}

class Game extends Component<GameProps> {
  private readonly bombsMatrix: boolean[][];

  constructor(props: GameProps) {
    super(props);
    this.bombsMatrix = this.initBombsMatrix();
  }

  initBombsMatrix = () => {
    const bombsMatrix = Array(this.props.gameSize)
        .fill(false)
        .map(() => {
          return Array(this.props.gameSize).fill(false);
        });

    for (let i = 0; i < this.props.numOfBombs; i++) {
      const row = Math.floor(Math.random() * this.props.gameSize);
      const column = Math.floor(Math.random() * this.props.gameSize);
      bombsMatrix[row][column] = true;
    }

    return bombsMatrix;
  };

  componentDidMount() {
    console.log(this.bombsMatrix);
  }

  render() {
    return (
        <div className="grid-container">
          {Array.from(Array(this.props.gameSize).keys()).map((i) => (
              <div className="square-column" key={i}>
                {Array.from(Array(this.props.gameSize).keys()).map((j) => {
                  return <Square
                      key={j}
                      isBomb={this.bombsMatrix[i][j]}
                  />;
                })}
              </div>
          ))}
        </div>
    );
  }
}

export default Game;
