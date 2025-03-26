import { useState, useEffect } from "react";

const APIKEY = "5b686fb4";

const useMovies = (query: string) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    //callBack?.();
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

    // HandleCloseMovie();
    fetchMovies();

    return function () {
      controler.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
};

export default useMovies;
