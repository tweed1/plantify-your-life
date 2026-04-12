import { useEffect } from "react";
import HardinessZones from "../Components/HardinessZones";
import { Container, Image } from "react-bootstrap";
import SearchPlant from "../Components/SearchPlantDB";
import IntroImages from "../Components/IntroImages";

const Home = () => {
	useEffect(() => {
		document.title = "Home";
	});
	return (
		<div className="top-spacing">
			<Container className="justify-content-center align-items-center d-flex flex-column mb-5">
				<div className="py-4 d-flex flex-column align-items-start">
                    
					<h1 className="my-ultra">
						Plantify
					</h1>
					<h2 className="my-sans fs-5">Find plant details, save your favorites, & add new plants</h2>
                    <hr className="border-2 border-top rounded border-dark my-3 hr-style" />
				</div>
                < IntroImages />
                <h3 className="my-ultra"> Katie </h3>
                <hr className="border-2 border-top rounded border-dark my-3 hr-style" />
                <div className="p-4 my-5"></div>
                
                < SearchPlant />
				<div className="container justify-content-center d-flex flex-column pt-0">
					<h4 className="my-ultra pb-0 mt-3 fs-2">Zone Map</h4>
					<p>Click a zone to explore other dashboard capabilities</p>
				</div>
				<div className="zone-grid-container my-1">
					<HardinessZones />
				</div>
			</Container>
		</div>
	);
};

export default Home;
