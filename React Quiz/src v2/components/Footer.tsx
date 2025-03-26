import { FC, ReactNode } from "react";

const Footer: FC<{ children: ReactNode }> = ({ children }) => {
  return <footer>{children}</footer>;
};

export default Footer;
