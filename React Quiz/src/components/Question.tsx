import { Options } from "./Options";
import { Action } from "../App";
import { Dispatch } from "react";

export interface QuestionInterface {
  question: string;
  options: string[];
  correctOption: number;
}

interface QuestionProps {
  question: QuestionInterface;
  answer: number | null;
  dispatch: Dispatch<Action>;
}

export const Question = ({ question, answer, dispatch }: QuestionProps) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};
