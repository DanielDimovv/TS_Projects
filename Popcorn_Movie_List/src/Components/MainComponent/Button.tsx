import { ToggleButtonProps } from "../../Models";

const Button: React.FC<ToggleButtonProps> = ({ isOpen, setIsOpen }) => {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
};

export default Button;
