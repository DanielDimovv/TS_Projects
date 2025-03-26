import { useEffect } from "react";
import { Dispatch } from "react";
import { Action } from "../App";

interface TimerProps {
  dispatch: Dispatch<Action>;
  secondsRemaining: number | null;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const Timer = ({ dispatch, secondsRemaining }: TimerProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);
  return <div className="timer">{formatTime(secondsRemaining ?? 0)}</div>;
};

export default Timer;
