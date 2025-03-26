import { Dispatch } from "react";
import { Action } from "../App";
import { QuestionInterface } from "./Question";
import { useQuiz } from "../Context.tsx/Context";

interface OptionsProps {
  question: QuestionInterface;
}

export const Options = ({ question }: OptionsProps) => {
  const { answer, dispatch } = useQuiz();
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
