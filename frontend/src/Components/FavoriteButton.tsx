import Button from 'react-bootstrap/Button';
import { BsHeart, BsHeartFill } from 'react-icons/bs'; 
import { useFavorites } from '../hooks/use-favorites';
import type { PlantModel } from "../types/plant";

function FavoriteButton({plant}: {plant:PlantModel | undefined}) {
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();
	const active = isFavorite(plant?.id);

	const handleToggle = () => {
		if (active) {
			removeFavorite(plant?.id);
		} else {
			// pass the whole object to be stored
			addFavorite(plant);
		}
	};
	return (
		<Button
			variant={active ? 'info' : 'outline-info'}
			onClick={handleToggle}>
			{active ? <BsHeartFill /> : <BsHeart />}
			{active ? ' Favorited' : ' Favorite'}
		</Button>
	);
}

export default FavoriteButton;

/* 
https://icons.getbootstrap.com/#usage
https://react-icons.github.io/react-icons/icons/bs/
*/
