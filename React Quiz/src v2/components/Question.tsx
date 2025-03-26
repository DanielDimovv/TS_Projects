import { Options } from "./Options";
import { Action } from "../App";
import { Dispatch } from "react";
import { useQuiz } from "../Context.tsx/Context";

// export interface QuestionInterface {
//   question: string;
//   options: string[];
//   correctOption: number;
// }

// interface QuestionProps {
//   question: QuestionInterface;
//   answer: number | null;
//   dispatch: Dispatch<Action>;
// }

export const Question = () => {
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};
