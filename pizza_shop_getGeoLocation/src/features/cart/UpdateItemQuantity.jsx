import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
    console.log(pizzaId)
    const dispatch = useDispatch()
    return (<div className="flex gap-2 items-center md:gap-3">
        <Button type='round' onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        <span className="text-sm font-medium font-bold">{currentQuantity}</span>
        <Button type='round' onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>

    </div>
    )
}



UpdateItemQuantity.propTypes = {
    pizzaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    currentQuantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default UpdateItemQuantity
