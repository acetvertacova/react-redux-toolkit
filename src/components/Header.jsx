import { Link } from "react-router";
import { selectCartItemsCount } from "../store/cart/actions";
import { useSelector } from "react-redux";

export default function Header() {
    const N = useSelector(selectCartItemsCount);

    return (
        <header className="bg-[#493D9E] text-center p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-[#C5BAFF] mb-4 drop-shadow-lg">Cafe</h1>
            <ul className="flex justify-center gap-8 text-lg font-medium">
                <li>
                    <Link to='/cart'>Cart ({N})</Link>
                </li>
                <li>
                    <Link to='/create'>Create menu item</Link>
                </li>
            </ul>
        </header>
    )
}