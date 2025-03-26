import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch(deleteItem(pizzaId))} type="small">
            Delete
        </Button>
    );
}

// Prop validation
DeleteItem.propTypes = {
    pizzaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DeleteItem;