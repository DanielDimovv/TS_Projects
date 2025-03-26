function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: {
  index: number;
  numQuestions: number | undefined;
  points: number;
  maxPossiblePoints: number;
  answer: string | null;
}) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
