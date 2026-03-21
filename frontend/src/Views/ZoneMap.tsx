import { useEffect } from "react";
import HardinessZonesMap from "../Components/HardinessZones";

const ZoneMap = () => {
	useEffect(() => {
		document.title = "Hardiness Zones";
	}, []);

	return (
		<div className="">
			<div className="container justify-content-center d-flex flex-column pt-0">
				<h2 className="my-ultra pb-0">Zone Map</h2>
			</div>

			<HardinessZonesMap />
		</div>
	);
};

export default ZoneMap;
