import React, { Component } from "react";
import { secondsToTimestamp } from "../utils";
import { GamePhase, RootState } from "../store/store-types";
import { connect, ConnectedProps } from "react-redux";

type TimerProps = ConnectedProps<typeof connector>;

interface TimerState {
  seconds: number;
  interval: NodeJS.Timeout;
}

class Timer extends Component<TimerProps, TimerState> {
  state = {
    seconds: 0,
    interval: setTimeout(() => {}, 0),
  };

  componentDidMount() {
    const intervalId = setInterval(this.incSeconds, 1000);
    this.setState({ interval: intervalId });
  }

  componentDidUpdate() {
    const { gamePhase } = this.props;
    const { interval } = this.state;
    if (gamePhase > GamePhase.Playing) {
      clearInterval(interval);
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  incSeconds = () => {
    const { seconds } = this.state;
    this.setState({ seconds: seconds + 1 });
  };

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <h3>Time passed</h3>
        <h5>{secondsToTimestamp(seconds)}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  gamePhase: state.gamePhase,
});

const connector = connect(mapStateToProps);

export default connector(Timer);
