import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { Col, Container, Row, Image, Button, Form } from 'react-bootstrap';
import flower from '../assets/images/white_strawflower_sm.png';

const ManageSearch = () => {
	const [loading, setLoading] = useState(false);
	const [instruction, setInstruction] = useState(true);
	const [allPlants, setAllPlants] = useState([]);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [actionType, setActionType] = useState('update');
	const navigate = useNavigate();

	/* fetches species list with given search term and page number */
	const fetchPlants = async (page = 1, term = searchTerm) => {
		try {
			setLoading(true);
			const response = await fetch(
				`/api/plants?q=${term}&page=${page}`,
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
			console.log(error);
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
                    {/* NEW CONTENT */}
					<h2 className="text-start ps-2 my-ultra fs-1">
						<span
							style={{
								cursor: 'pointer',
								textDecoration: actionType === "update" ? "underline" : "none"
							}}
							onClick={() => setActionType('update')}>
							Update
						</span>

						{' or '}

						<span
							style={{
								cursor: 'pointer',
								textDecoration: actionType === "delete" ? "underline" : "none"
							}}
							onClick={() => setActionType('delete')}>
							Delete
						</span>
					</h2>
                    {/* END NEW CONTENT */}
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

				{/* NEW CONTENT */}
				{/* List Results */}
				<div className="col-12 col-sm-12 col-md-8 col-lg-6 mx-auto">
					<ListGroup className="mx-auto" variant="flush">
						{allPlants.map((plant: any) => (
							<ListGroup.Item
								key={plant.id}
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
								</span>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
				{/* END NEW CONTENT */}
				{/* * Page Navigation */}
				{allPlants.length > 0 && (
					<nav aria-label="Plant pagination" className="mt-4 mx-auto">
						<ul className="pagination">
							<li
								className={`page-item ${
									currentPage === 1 ? 'disabled' : ''
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
									currentPage === lastPage ? 'disabled' : ''
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
                {/* NEW CONTENT */}
				{/* Add new plant flower button*/}
				<Container fluid className="mx-0 px-0">
					<Row>
						<Col>
							<Button
								variant="link"
								className="p-0 border-0 flower-btn" // p-0 removes default button padding
								onClick={() => navigate('/add')}>
								<Image
									src={flower}
									alt="open white strawflower with text 'add a new plant'"
									rounded
									width={150}
									height={150}></Image>
							</Button>
						</Col>
						<Col></Col>
						<Col className=""></Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default ManageSearch;
