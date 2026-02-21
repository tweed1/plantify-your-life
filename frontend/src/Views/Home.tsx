import { useEffect } from "react";
import HardinessZones from "../Components/HardinessZones";

const Home = () => {
	useEffect(() => {
		document.title = "Home";
	});
	return (
		<div>
			<div className="justify-content-center d-flex flex-column container-fluid mb-5">
				<div className="py-0 d-flex flex-column align-items-center">
					<h1 className="my-ultra ">
						Welcome to the Plantify Dashboard!
					</h1>
					<h2 className="my-agu fs-4">- Plantify Your Life -</h2>
                    <p className="pb-0 my-0 my-default"> Explore a zone or search for specific plants</p>
                    <hr className="border-2 border-top rounded border-dark my-3 hr-style" />
					{/* <SearchPlant /> */}
				</div>
				<div className="container justify-content-center d-flex flex-column pt-0">
					<h3 className="my-ultra pb-0 mt-3 fs-2">Zone Map</h3>
					<p>Click a zone to explore the dashboard's capabilities</p>
				</div>
				<div className="zone-grid-container my-1">
					<HardinessZones />
				</div>
			</div>
		</div>
	);
};

export default Home;
