export interface SearchProps {
  query: string; // Current query string
  onQuery: (value: string) => void; // Function to update the query
}

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime?: number; // Optional field
  imdbRating?: number; // Optional field
  userRating?: number; // Optional field
}

export interface Movie2 {
  imdbID: string;
  // Title: string;
  // Year: string;
  // Poster: string;
  // runtime: number; // Required field
  // imdbRating: number; // Required field
  userRating?: number | string; // Required field
  title?: string;
  Year?: string;
  poster?: string;
  runtime?: number;
  imdbRating?: number;
  Plot?: string;
  Released?: string;
  Actors?: string;
  Director?: string;
  Genre?: string;
  countRatingDecisions?: number;
}

export interface SetMoviesProps {
  movies: Movie[];
  setMovies?: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export interface ListBox {
  movies: Movie[];
  setMovies?: React.Dispatch<React.SetStateAction<Movie[]>>;
  isOpen1: boolean;
  setIsOpen1: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface WatchedBox {
  watched: Movie2[];
  setWatched?: React.Dispatch<React.SetStateAction<Movie2[]>>; // Set state action for Movie[]
  isOpen2: boolean;
  setIsOpen2?: React.Dispatch<React.SetStateAction<boolean>>;
  avgImdbRating?: number;
  avgUserRating?: number;
  avgRuntime?: number;
}

export interface ToggleButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MovieDetails {
  userRating?: number;
  Title?: string;
  Year?: string;
  Poster?: string;
  Runtime?: string;
  imdbRating?: string;
  Plot?: string;
  Released?: string;
  Actors?: string;
  Director?: string;
  Genre?: string;
}
