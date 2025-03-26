import { useQuiz } from "../Context.tsx/Context";
function FinishScreen() {
  const {points,maxPossiblePoints,highscore,dispatch} = useQuiz()
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage < 50) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
        questions ({Math.ceil(percentage)}%) correct! {emoji}
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
