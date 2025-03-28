import { ReactNode } from "react";
import Logo from "./Logo";

interface NavBarProps {
  children?: ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default NavBar;
