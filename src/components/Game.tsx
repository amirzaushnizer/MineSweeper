import Square from "./Square";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/store-types";
import React from "react";

type GameProps = ConnectedProps<typeof connector>;

const Game: React.FC<GameProps> = (props) => {
  return (
    <div className="grid-container">
      {Array.from(Array(props.gameSize).keys()).map((i) => (
        <div className="square-column" key={i}>
          {Array.from(Array(props.gameSize).keys()).map((j) => {
            return <Square key={j} loc={[i, j]} />;
          })}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    gameSize: state.gameSize,
  };
};

const connector = connect(mapStateToProps);

export default connector(Game);
