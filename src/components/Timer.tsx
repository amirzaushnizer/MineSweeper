import React, { Component } from "react";
import { GamePhase } from "../App";

interface TimerProps {
  gamePhase: GamePhase;
}

interface TimerState {
  seconds: number;
  interval: NodeJS.Timeout;
}

class Timer extends Component<TimerProps, TimerState> {
  constructor(props: TimerProps) {
    super(props);
    this.state = {
      seconds: 0,
      interval: setTimeout(() => {}, 0),
    };
  }

  incSeconds = () => {
    const { seconds } = this.state;
    this.setState({ seconds: seconds + 1 });
  };

  componentDidMount() {
    const intervalId = setInterval(this.incSeconds, 1000);
    this.setState({ interval: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const { seconds } = this.state;
    const sec = seconds % 60;
    const minutes = Math.floor(seconds / 60) % 60;
    const hours = Math.floor(minutes / 60) % 24;
    return (
      <div>
        <h3>Time passed</h3>
        <h5>{`${hours} : ${minutes}: ${sec}`}</h5>
      </div>
    );
  }
}

export default Timer;
