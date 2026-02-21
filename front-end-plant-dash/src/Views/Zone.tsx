import { useEffect} from "react";
import { useParams} from "react-router";
import ZoneBarChart from "../Components/ZoneBarChart";
import ZoneRadarChart from "../Components/ZoneRadarChart";
import Results from "../Components/ZoneResultsList";
import { Col, Container, Row } from "react-bootstrap";

/* https://perenual.com/api/v2/species-list?key=[YOUR-API-KEY]&hardiness=1-13 */

const Zone = () => {
	const params = useParams<{id:string}>();

	useEffect(() => {
		document.title = "zone";
	},[]);

    if (!params.id) {
        return (
            <p> invalid id </p>
        )
    }
	return (
		<div className="m-0 search-page pb-5 pt-2">
			<div>
				<Container fluid className="m-0 p-0">
					<Row className="p-0">
						<Col lg={6} sm={12} className="p-0 custom-border">
							<h2 className="my-ultra">
								Plants in Zone {params.id}
							</h2>
							<Results />
						</Col>
						<Col lg={6} sm={12} className="">
							<div>
								<ZoneRadarChart zoneId={params.id} />
							</div>
							<div>
								<ZoneBarChart zoneId={params.id} />
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default Zone;
