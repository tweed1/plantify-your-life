import { useEffect } from "react";
import HardinessZones from "../Components/HardinessZones";
import { Container } from "react-bootstrap";
import SearchPlant from "../Components/SearchPlantDB";

const Home = () => {
	useEffect(() => {
		document.title = "Home";
	}, []);
	return (
		<div className="top-spacing">
			<Container className="justify-content-center align-items-start px-3">
				<div className="py-4 d-flex flex-column align-items-start">
                    
					<h1 className="my-ultra">
						Plantify
					</h1>
					<h2 className="my-sans fs-5">Find plant details, save your favorites, & add new plants</h2>
                    <hr className="border-2 border-top rounded border-dark my-3 hr-style w-100"/>
				</div>
                <div className="my-4"></div>
                
                < SearchPlant />
				<div className="container justify-content-center d-flex flex-column pt-0">
					<h3 className="my-ultra pb-0 mt-3 fs-2">Zone Map</h3>
					<p>Click a zone to explore other dashboard capabilities</p>
				</div>
				<div className="zone-grid-container my-1 mb-4">
					<HardinessZones />
				</div>
			</Container>
		</div>
	);
};

export default Home;
