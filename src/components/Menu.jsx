import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu, selectMenu } from "../store/menu/actions";
import MenuCard from "./MenuCard";

export default function Menu() {
    const { status, error } = useSelector(state => state.menu);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

    const menu = useSelector(selectMenu);

    return (
        <div>
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error occured: {error}</h2>}

            {menu.map((item) => (
                <MenuCard key={item.id} menuItem={item} />
            ))}
        </div>
    )
}