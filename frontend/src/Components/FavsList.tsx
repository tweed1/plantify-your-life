import { Container, ListGroup } from "react-bootstrap";

const FavsList = () => {
	return (
        <Container>
        <h2 className="ps-2 my-ultra fs-1">Explore</h2>
		<div className="col-12 col-sm-12 col-md-8 col-lg-6 mx-auto">
			<ListGroup className="mx-auto" variant="flush">
				{/* {allPlants.map((plant: any) => ( */}
					<ListGroup.Item>
						{/* key={plant.id}
						action
						onClick={() =>
							navigate(
								actionType === 'update'
									? `/edit/${plant.id}`
									: `/delete/${plant.id}`,
							)
						}
						className="text-start">
						<span className="fw-semibold">
							{plant.common_name || 'Unknown'}
						</span>
						<span className="text-muted fst-italic ms-2">
							{plant.scientific_name || ''}
						</span> */}
					</ListGroup.Item>
				{/* ))} */}
			</ListGroup>
		</div>
        </Container>
	);
};

export default FavsList;
