import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {

    const base = "text-sm bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

    const styles = {
        primary: `${base} py-3 px-4 md:px-6 md:py-4`,
        small: `${base} py-2 px-4 md:px-5 md:py-2 text-xs`,
        round: `${base} py-1 px-2.5 md:px-3.5 md:py-2 text-sm`,
        secondary: ` text-sm border-2 border-stone-300 uppercase font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:bg-stone-300 transition-colors duration-300 focus:outline-none hover:text-stone-800 
         focus:text-stone-800 focus:ring-2 focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed  py-2.5 px-4 md:px-6 md:py-3.5 `

    };

    if (to) {
        return (
            <Link to={to} className={styles[type]}>{children}</Link>
        );
    }

    if (onClick)
        return (
            <button onClick={onClick} disabled={disabled} className={styles[type]}>
                {children}
            </button>
        );

    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children can be text, JSX, etc.
    disabled: PropTypes.bool, // Ensures disabled is a boolean
    to: PropTypes.string, // Optional string for link navigation
    type: PropTypes.string,
    onClick: PropTypes.func // Ensures onClick is a function
};

export default Button;
