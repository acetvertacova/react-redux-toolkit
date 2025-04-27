import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cart/slice";

export default function MenuCard({ menuItem }) {
    const [selectedSize, setSize] = useState(menuItem.sizes[0]);
    const handleSizeChange = (size) => {
        setSize(size);
    };
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(addToCart({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            size: selectedSize,
            totalPrice: menuItem.price,
        }));

    };

    return (
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 w-72" style={{ display: "inline-block" }}>
            <img src={menuItem.image} alt={menuItem.name} className="w-80 h-80 object-cover" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{menuItem.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{menuItem.description}</p>
            <p className="text-lg font-semibold text-[#493D9E] mb-4">${menuItem.price}</p>
            <div className="flex space-x-2 mb-4">
                {menuItem.sizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${selectedSize === size ? "bg-[#493D9E] text-white" : "bg-gray-100 text-[#493D9E]"
                            }`}>
                        {size}
                    </button>
                ))}
            </div>
            <button onClick={handleAdd} className="px-6 py-2 bg-[#493D9E] text-white rounded-lg shadow hover:bg-[#B2A5FF]">
                Add to cart
            </button>
        </div>
    )
}