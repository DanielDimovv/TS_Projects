import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
    const navigate = useNavigate();
    const className = 'text-sm text-blue-400 hover:text-blue-600 hover:underline'

    if (to === '-1') return <button className={className} onClick={() => navigate(-1)}>{children}</button>


    return (
        <Link className={className} to={to}>
            {children}
        </Link>
    )
}

LinkButton.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children can be text, JSX, etc.
    to: PropTypes.string.isRequired, // Ensures 'to' is a required string (valid path)
};

export default LinkButton;
