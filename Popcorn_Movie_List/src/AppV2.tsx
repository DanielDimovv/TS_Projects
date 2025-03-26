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
import useMovies from "./Components/Util/useMovies";
import { useLocalStorageState } from "./Components/Util/UseLocalStorigeState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState<Movie2[]>([], "watched");

  function handleSelectMovie(id: string | null): void {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function HandleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: Movie2) {
    setWatched((currentWatched) => [...currentWatched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

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
