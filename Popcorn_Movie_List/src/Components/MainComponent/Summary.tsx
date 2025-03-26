import { Movie2 } from "../../Models";

interface WatchedBox {
  watched: Movie2[]; // assuming Movie2 is the type for your movie objects
}

const average = (numbers: number[]): number => {
  if (numbers.length === 0) return 0; // Avoid division by zero
  const total = numbers.reduce((acc, num) => acc + num, 0);
  return total / numbers.length;
};

const Summary: React.FC<WatchedBox> = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating ?? 0));

  const avgUserRating = average(
    watched.map((movie) =>
      typeof movie.userRating === "string"
        ? Number(movie.userRating) || 0
        : movie.userRating ?? 0
    )
  );

  const avgRuntime = average(
    watched.map((movie) => movie.runtime ?? 0) // Default to 0 if undefined
  );
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

export default Summary;
