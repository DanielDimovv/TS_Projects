import { useEffect, useRef } from "react";
import { SearchProps } from "../../Models";
import { useKey } from "../Util/useKey";
const Search: React.FC<SearchProps> = ({ query, onQuery }) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    onQuery("");
  });
  // useEffect(() => {
  //   const callback = (e: KeyboardEvent) => {
  //     if (document.activeElement === inputEl.current) return;
  //     if (e.key === "Enter") {
  //       inputEl.current?.focus();
  //       onQuery("");
  //     }
  //   };
  //   document.addEventListener("keydown", callback);
  //   return () => document.removeEventListener("keydown", callback);
  // }, [onQuery]);
  // // useEffect(() => {
  // //   const el = document.querySelector(".search") as HTMLInputElement;
  // //   el?.focus();
  // // }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query} // Use the query prop
      onChange={(e) => onQuery(e.target.value)} // Call the onQuery prop
      ref={inputEl}
    />
  );
};

export default Search;
