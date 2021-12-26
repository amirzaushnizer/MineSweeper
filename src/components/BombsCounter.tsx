import { RootState } from "../store/store-types";
import { connect, ConnectedProps } from "react-redux";
import React from "react";

type BombsCounterProps = ConnectedProps<typeof connector>;

const BombsCounter: React.FC<BombsCounterProps> = (props) => {
  return (
    <div>
      <h3>Bombs Left</h3>
      <h5>{props.numOfBombsLeft}</h5>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  numOfBombsLeft: state.bombsLeft,
});

const connector = connect(mapStateToProps);

export default connector(BombsCounter);
