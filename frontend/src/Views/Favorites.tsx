import { useEffect } from "react";
import { useNavigate } from 'react-router';
import FavsList from "../Components/FavsList";

const Favorites = () => {

    useEffect(() => {
        document.title = 'Favorite Plants'
    },[])

	return (
		<div className="pt-4 search-page">
            <FavsList />
		</div>
	);
};

export default Favorites;