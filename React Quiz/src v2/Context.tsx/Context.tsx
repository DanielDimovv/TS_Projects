import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

interface QuizContextInterface {
  questions: any[] | undefined;
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: any[] | undefined | number | string | null | undefined | any;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
  numQuestions: number | undefined;
  maxPossiblePoints: number | undefined;
  dispatch: React.Dispatch<Action>;
}

const QuizContext = createContext<QuizContextInterface | undefined>(undefined);

export interface Action {
  type:
    | "dataReceived"
    | "dataFailed"
    | "start"
    | "newAnswer"
    | "nextQuestion"
    | "finish"
    | "restart"
    | "tick";
  payload?: any[] | undefined | number | string | null | undefined | any;
}

interface initialStateInterface {
  questions: any[] | undefined;
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: any[] | undefined | number | string | null | undefined | any;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

const SECONDS_PER_QUESTION = 40;

const initialState: initialStateInterface = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(
  state: initialStateInterface,
  action: Action
): initialStateInterface {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        index: 0,
        secondsRemaining: (state.questions?.length ?? 0) * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions?.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + Number(question.points)
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining
          ? state.secondsRemaining - 1
          : 0,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      return state;
  }
}

function QuizProvider({ children }: { children: ReactNode }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions?.length;
  const maxPossiblePoints = questions?.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { useQuiz, QuizProvider };
