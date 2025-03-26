import { Movie2 } from "../../Models";
import WatchedMovie from "./WatchedMovie";

// Define the props interface
interface ListOfWatchedMoviesProps {
  watched: Movie2[];
  onDeleteWatched: (id: string) => void;
}

const ListOfWatchedMovies: React.FC<ListOfWatchedMoviesProps> = ({
  watched,
  onDeleteWatched,
}) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

export default ListOfWatchedMovies;
