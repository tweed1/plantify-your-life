import { useEffect } from "react";
import { useNavigate } from 'react-router';
import FavsList from "../Components/FavsList";

const Favorites = () => {

    useEffect(() => {
        document.title = 'Favorite Plants'
    },[])

	return (
		<div className="pt-4 top-spacing ">
            <FavsList />
		</div>
	);
};

export default Favorites;