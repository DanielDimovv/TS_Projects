import { Dispatch } from "react";
import { Action } from "../App";
import { QuestionInterface } from "./Question";

interface OptionsProps {
  question: QuestionInterface;
  dispatch: Dispatch<Action>;
  answer: number | null;
}

export const Options = ({ question, dispatch, answer }: OptionsProps) => {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
