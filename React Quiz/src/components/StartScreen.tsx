import { Dispatch } from "react";
import { Action } from "../App";

interface Proops {
  numQuestions: number | undefined;
  dispatch: Dispatch<Action>;
}

export const StartScreen = ({ numQuestions, dispatch }: Proops) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
};
