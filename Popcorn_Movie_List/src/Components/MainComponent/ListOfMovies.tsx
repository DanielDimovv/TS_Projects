import { Movie as MovieType } from "../../Models";
import Movie from "./Movie";

export interface MovieProps {
  movies?: MovieType[];
  onSelectMovie: (id: string | null) => void;
}

const ListOfMovies: React.FC<MovieProps> = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

export default ListOfMovies;
