import NavBar from "./Components/NavBar/NavBar";
import Main from "./Components/Main";
import { useState, useEffect } from "react";
import Search from "./Components/NavBar/Search";
import NumResult from "./Components/NavBar/NumResult";
import Box from "./Components/MainComponent/ListBox";
import ListOfMovies from "./Components/MainComponent/ListOfMovies";
import ListOfWatchedMovies from "./Components/MainComponent/ListOfWatchedMovies";
import Summary from "./Components/MainComponent/Summary";
import Loader from "./Components/Util/Loader";
import ErrorMessage from "./Components/Util/ErrorMesage";
import MovieDetail from "./Components/MainComponent/MovieDetail";
import { Movie2 } from "./Models";

export const APIKEY = "5b686fb4";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState<Movie2[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelectMovie(id: string | null): void {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function HandleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: Movie2) {
    setWatched((currentWatched) => [...currentWatched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    const controler = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true); // Start loading
      setError("");
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
          {
            signal: controler.signal,
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search || []);
        setError("");
      } catch (err: unknown) {
        console.error(err);

        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    HandleCloseMovie();
    fetchMovies();

    return function () {
      controler.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} onQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      <Main>
        {/* <Box element={<ListOfMovies movies={movies} />} />
        <Box
          element={
            <>
              {" "}
              <Summary watched={watched} />
              <ListOfWatchedMovies watched={watched} />
            </>
          }
        /> */}
        {/* <Box>
          {/* {isLoading ? <Loader /> : <ListOfMovies movies={movies} />} */}

        <Box>
          {isLoading && <Loader />} {/* Show loader while loading */}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && movies.length > 0 && (
            <ListOfMovies movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onCloseMovie={HandleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <ListOfWatchedMovies
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
