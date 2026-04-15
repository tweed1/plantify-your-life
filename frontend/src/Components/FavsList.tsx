import { Container, ListGroup } from "react-bootstrap";
import { useFavorites } from "../hooks/use-favorites";
import { useNavigate } from 'react-router';

const FavsList = () => {
    const { favorites } = useFavorites();
    const navigate = useNavigate();
	return (
        <Container>
        <h2 className="ps-2 my-ultra fs-1">My Favorites</h2>
        <p className="mb-2">Favorited plants are displayed here!</p>
        <div className='mb-4'>
				<button
					onClick={() => navigate('/search')}
					className="back-btn btn custom-primary py-1 px-2 text-white">
					Search for Plants to Add
				</button>
			</div>
		<div className="col-12 col-sm-12 col-md-8 col-lg-6 mx-auto">
			<ListGroup className="mx-auto" variant="flush">
				{favorites.map((plant: any) => (
					<ListGroup.Item
						key={plant.id}
						action
						onClick={() =>
							navigate(
								`/plant-details/${plant.id}`
							)
						}
						className="text-start">
						<span className="fw-semibold">
							{plant.common_name || 'Unknown'}
						</span>
						<span className="text-muted fst-italic ms-2">
							{plant.scientific_name || ''}
						</span>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
        </Container>
	);
};

export default FavsList;
