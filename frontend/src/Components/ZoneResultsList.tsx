import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import placeholder from "../assets/images/newton.jpeg";

const Results = () => {
	const apiKey = import.meta.env.VITE_PERENUAL_API_KEY;
	const [allPlants, setAllPlants] = useState([]);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [loadResults, setLoadResults] = useState(false);
	const params = useParams();

	useEffect(() => {
		/* fetches species list with given search term and page number */
		const fetchPlants = async () => {
			try {
				setError(null);

				const response = await fetch(
					`https://perenual.com/api/v2/species-list?key=${apiKey}&page=${currentPage}&hardiness=${params.id}`,
					{ mode: "cors" }
				);

				if (!response.ok) throw new Error(`HTTP ${response.status}`);

				const data = await response.json();

				setAllPlants(data.data ?? []);
				setLoadResults(true);
				setLastPage(data.last_page);
				console.dir(data);
			} catch (error: any) {
				setError(error);
			} finally {
			}
		};
		fetchPlants();
	}, [params.id, currentPage]);

	/* fetches the next page on click 'next' */
	const goToNextPage = () => {
		if (currentPage < lastPage) setCurrentPage(currentPage + 1);
	};

	/* fetches previous page on click 'previous' */
	const goToPrevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	return (
		<div className="container-fluid m-0">
			<div className="d-flex flex-column justify-content-center align-items-center m-0">
				{error && <p> Error: </p>}
				{loadResults && (
					<div>
						<div className="d-flex flex-wrap justify-content-center align-items-center gap-2 card-container">
							{allPlants.map((plant: any) => (
								<Link
									key={plant.id}
									to={`/plant-details/${plant.id}`}
									style={{
										textDecoration: "none",
										color: "inherit",
									}}>
									<Card
										style={{
											width: "170px",
											height: "230px",
										}}
										className="shadow-sm p-2 align-items-center">
										<Card.Img
											variant="top"
											src={
												plant.default_image
													?.thumbnail ?? placeholder
											}
											alt={`Image of ${plant.common_name}`}
											style={{
												height: "80px",
												width: "110px",
												objectFit: "cover",
												/* display: "block",
                                        margin: "0 auto", */
											}}
										/>
										<Card.Body>
											<Card.Title className="fs-5 plant-card-title">
												{plant.common_name || "Unknown"}
											</Card.Title>
										</Card.Body>
									</Card>
								</Link>
							))}
						</div>
						{/* * Page Navigation */}
						{allPlants.length > 0 && (
							<nav
								aria-label="Plant pagination"
								className="mt-4 mx-auto">
								<ul className="pagination">
									<li
										className={`page-item ${
											currentPage === 1 ? "disabled" : ""
										}`}>
										<button
											className="page-link"
											onClick={goToPrevPage}
											disabled={currentPage === 1}>
											Previous
										</button>
									</li>

									<li
										className={`page-item ${
											currentPage === lastPage
												? "disabled"
												: ""
										}`}>
										<button
											className="page-link"
											onClick={goToNextPage}
											disabled={currentPage === lastPage}>
											Next
										</button>
									</li>
								</ul>
								<p className="text-center text-muted">
									Page {currentPage} of {lastPage}
								</p>
							</nav>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Results;
