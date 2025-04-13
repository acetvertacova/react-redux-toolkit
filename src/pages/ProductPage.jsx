import { useParams } from "react-router";
import menuJson from "../data/menu.json";
import MenuCard from "../components/MenuCard";
import NotFoundPage from "./NotFoundPage";

export default function ProductPage() {
    const { id } = useParams();
    const product = menuJson.find(product => product.id == id);

    if (!id || !product || isNaN(Number(id))) {
        return <NotFoundPage />
    }

    return (
        <MenuCard menuItem={product} />
    );
}