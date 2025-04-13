import { useState, useEffect } from "react";
import menuJson from "../data/menu.json";
import MenuCard from "./MenuCard";
import Search from "./Search";

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);

    useEffect(() => {
        setMenuItems(menuJson);
        setFilteredMenuItems(menuJson);
    }, []);

    const handleSearch = (query) => {
        setFilteredMenuItems(menuItems.filter(item => {
            return item.name.toLowerCase().includes(query.toLowerCase())
        }));
    };

    return (
        <div>
            <Search onSearch={handleSearch} />
            {filteredMenuItems.map((menuItem) => (
                <MenuCard key={menuItem.id} menuItem={menuItem} />
            ))}

        </div>
    )
}