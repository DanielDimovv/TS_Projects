import Button from "./Button";

import { useState } from "react";
import { ReactNode } from "react";

interface BoxProps {
  children?: ReactNode;
}

// interface BoxProps {
//   element: ReactElement;
// }

const Box = ({ children }: BoxProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
};

export default Box;

// import { WatchedBox as WatchedBoxProops } from "../../Models";
// import Button from "./Button";
// import ListOfWatchedMovies from "./ListOfWatchedMovies";
// import Summary from "./Summary";

// const WatchedBox: React.FC<WatchedBoxProops> = ({
//   watched,
//   setWatched,
//   isOpen2,
//   setIsOpen2,
//   avgImdbRating,
//   avgUserRating,
//   avgRuntime,
// }) => {
//   return (
//     <div className="box">
//       <Button isOpen={isOpen2 as boolean} setIsOpen={setIsOpen2!} />
//       {isOpen2 && (
//         <>
//           <Summary watched={watched} />
//           <ListOfWatchedMovies watched={watched} />
//         </>
//       )}
//     </div>
//   );
// };

// export default WatchedBox;
