import { useEffect } from "react";
import { useNavigate } from 'react-router';
const Favorites = () => {

    useEffect(() => {
        document.title = 'Favorite Plants'
    },[])

	return (
		<div className="pt-4 search-page">
		</div>
	);
};

export default Favorites;