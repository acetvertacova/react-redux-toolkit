import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { removeFromCart, updateQuantity } from "../store/cart/slice";
import { selectCart } from "../store/cart/actions";

export default function CartPage() {
    const items = useSelector(selectCart);
    const dispatch = useDispatch();

    const handleDelete = (item) => {
        dispatch(removeFromCart({
            id: item.id,
            size: item.size,
        }));
    }

    const handlePlus = (item) => {
        const quant = dispatch(updateQuantity({
            id: item.id,
            size: item.size,
            quantity: item.quantity + 1,
        }));
    }

    const handleMinus = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                id: item.id,
                size: item.size,
                quantity: item.quantity - 1,
            }));
        } else {
            handleDelete(item);
        }
    }

    return (
        <>
            <ul>
                {items.map((item) => (
                    <div key={`${item.id}-${item.size}`}>
                        <li> {item.name} — {item.size} — ${item.price} x {item.quantity}</li>
                        <button onClick={() => handleDelete(item)}>Delete</button>
                        <button onClick={() => handlePlus(item)}>+</button>
                        <button onClick={() => handleMinus(item)}>-</button>
                    </div>
                ))}
            </ul>

            <Link to='/'>Back</Link>
        </>
    );
}