import React, { Component } from "react";
import { RootState } from "../store/store-types";
import { connect, ConnectedProps } from "react-redux";

type BombsCounterProps = ConnectedProps<typeof connector>;

class BombsCounter extends Component<BombsCounterProps> {
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

const mapStateToProps = (state: RootState) => ({
  numOfBombsLeft: state.bombsLeft,
});

const connector = connect(mapStateToProps);

export default connector(BombsCounter);
