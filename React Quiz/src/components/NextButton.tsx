function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: {
  dispatch: any;
  answer: any;
  index: number;
  numQuestions: number | undefined;
}) {
  if (answer === null || !numQuestions) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  return null;
}

export default NextButton;
