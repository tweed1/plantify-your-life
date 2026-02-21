import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "../assets/images/newton.jpeg";

const SearchPlant = () => {
	const apiKey = import.meta.env.VITE_PERENUAL_API_KEY;
	const [loading, setLoading] = useState(false);
	const [instruction, setInstruction] = useState(true);
	const [allPlants, setAllPlants] = useState([]);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	/* fetches species list with given search term and page number */
	const fetchPlants = async (page = 1, term = searchTerm) => {
		try {
			setLoading(true);
			const response = await fetch(
				`https://perenual.com/api/v2/species-list?key=${apiKey}&q=${term}&page=${page}`,
				{ mode: "cors" }
			);

			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			const data = await response.json();
			console.log(data);

			setAllPlants(data.data ?? []);
			console.dir(data);
			setCurrentPage(data.current_page);
			setLastPage(data.last_page);
		} catch (error: any) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	/* handles api fetch on form submission = search */
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setInstruction(false);
		setError(null);
		setCurrentPage(1);
		fetchPlants(1, searchTerm);
	};

	/* fetches the next page on click 'next' */
	const goToNextPage = () => {
		if (currentPage < lastPage) fetchPlants(currentPage + 1);
	};

	/* fetches previous page on click 'previous' */
	const goToPrevPage = () => {
		if (currentPage > 1) fetchPlants(currentPage - 1);
	};

	return (
		<div className="container-fluid">
			<div className="d-flex flex-column">
				{/* Search Bar */}
				<form
					onSubmit={handleSubmit}
					className="col-12 col-sm-12 col-md-8 col-lg-6 mx-auto">
					<h2 className="text-start ps-2 my-ultra fs-1">Explore</h2>
					<InputGroup className="mb-3" size="lg">
						<Form.Control
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Enter a plant name"
							aria-label="Enter a plant name"
							aria-describedby="basic-addon2"
						/>
						<Button
							type="submit"
							className="custom-primary"
							variant="primary"
							id="basic-addon2">
							Search
						</Button>
					</InputGroup>
				</form>
				{instruction && (
					<p>Click "Search" with no input to search all plants</p>
				)}
				{loading && <p>Loading...</p>}
				{error && <p> Error: </p>}

				{/* Card Results */}
				<div className="d-flex flex-wrap justify-content-center align-items-center gap-4 card-container">
					{allPlants.map((plant: any) => (
						<Link
							key={plant.id}
							to={`/plant-details/${plant.id}`}
							style={{
								textDecoration: "none",
								color: "inherit",
							}}>
							<Card
								style={{ width: "250px", height: "330px" }}
								className="shadow-sm p-3 align-items-center">
								<Card.Img
									variant="top"
									src={
										plant.default_image?.thumbnail ??
										placeholder
									}
									alt={plant.common_name}
									style={{
										height: "160px",
										width: "180px",
										objectFit: "cover",
										/* display: "block",
                                        margin: "0 auto", */
									}}
								/>
								<Card.Body>
									<Card.Title className="fs-5 plant-card-title">
										{plant.common_name || "Unknown"}
									</Card.Title>
									<Card.Text className="text-muted plant-card-text">
										{plant.scientific_name || ""}
									</Card.Text>
								</Card.Body>
							</Card>
						</Link>
					))}
				</div>
				{/* * Page Navigation */}
				{allPlants.length > 0 && (
					<nav aria-label="Plant pagination" className="mt-4 mx-auto">
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
									currentPage === lastPage ? "disabled" : ""
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
		</div>
	);
};

export default SearchPlant;
