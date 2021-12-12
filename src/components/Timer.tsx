import React, { Component } from "react";
import { GamePhase } from "../App";
import { secondsToTimestamp } from "../utils";

interface TimerProps {
  gamePhase: GamePhase;
}

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

export default Timer;
