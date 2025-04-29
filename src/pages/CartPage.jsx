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

    const handleIncreaseItem = (item) => {
        const quant = dispatch(updateQuantity({
            id: item.id,
            size: item.size,
            quantity: item.quantity + 1,
        }));
    }

    const handleDecreaseItem = (item) => {
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
        <div className="form-container">
            <ul className="list">
                {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="list-item">
                        <li className="flex justify-between items-center bg-white border border-indigo-700 rounded-lg p-4 mb-3 shadow-sm">
                            <div>
                                <div className="font-semibold text-lg text-indigo-900">{item.name}</div>
                                <div className="text-sm text-gray-600">Size: {item.size}</div>
                                <div className="text-sm text-gray-600">${item.price} × {item.quantity}</div>
                                <div className="text-sm text-gray-600">Total price: {item.totalPrice}</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleDecreaseItem(item)}
                                    className="px-3 py-1 bg-indigo-700 text-white rounded hover:bg-indigo-500"
                                >–</button>
                                <button
                                    onClick={() => handleIncreaseItem(item)}
                                    className="px-3 py-1 bg-indigo-700 text-white rounded hover:bg-indigo-500"
                                >+</button>
                                <button
                                    onClick={() => handleDelete(item)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-300"
                                >Delete</button>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>

            <Link to='/' className="link">Back</Link>
        </div>
    );
}