import { useEffect, useState, useRef } from "react";
import { APIKEY } from "../../App";
import StarRating from "../Util/StarRating";
import Loader from "../Util/Loader";
import { Movie2, MovieDetails } from "../../Models";
import { useKey } from "../Util/useKey";

interface MovieDetailProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: Movie2) => void;
  watched: Movie2[];
}

const MovieDetail: React.FC<MovieDetailProps> = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState<MovieDetails>({});
  const [isLoading, setIsloading] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);

  const countRef = useRef(0);

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot, // Fixed naming for "Plot"
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre, // Fixed typo
  } = movie;

  function hadnleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      imdbRating: Number(imdbRating),
      title,
      year,
      poster,
      runtime: Number(runtime?.split(" ").at(0)),
      userRating: Number(userRating),
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  console.log(title, year);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      setIsloading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedId}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: MovieDetails = await res.json(); // Cast the response to the `Movie` type
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie info:", err);

        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("An unknown error occurred:", err);
        }
      } finally {
        setIsloading(false);
      }
    };

    fetchMovieInfo();
  }, [selectedId]);

  useEffect(
    function () {
      if (!title) return;

      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={(rating) => setUserRating(Number(rating))}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={hadnleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
