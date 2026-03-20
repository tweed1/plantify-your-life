import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import logo from "../assets/images/newton.jpeg";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Plant = {
	common_name: string;
	scientific_name: string[];
	family: string;
	origin: string[];
	cycle: string;
	sunlight?: string[];
	description: string;
	watering: string;
	hardiness_min: number;
    hardiness_max: number;
	pest_susceptibility: string[];
	edible_fruit: boolean;
	edible_leaf: boolean;
};

const PlantDetails = () => {
	const apiKey = import.meta.env.VITE_PERENUAL_API_KEY;
	const [loading, setLoading] = useState(false);
	const [plant, setPlant] = useState<Plant | undefined>();
	const [error, setError] = useState<string | undefined>();
	const params = useParams();

	useEffect(() => {
		document.title = "Plant Details";

		const id = Number(params.id);

		if (Number.isNaN(id) || !params.id) {
			setError("Invalid plant ID");
			return;
		}
		const fetchPlants = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`http://localhost:3000/plants/${params.id}`
				);

				if (!response.ok) throw new Error(`HTTP ${response.status}`);

				const incomingData = await response.json();
				console.dir(incomingData);
				setPlant(incomingData);
			} catch (error: any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchPlants();
	}, [params.id]);

	if (error) {
		return <p>Something went wrong :(</p>;
	}
	if (!plant || loading) {
		return (
			<div>
				<p> loading</p>
			</div>
		);
	}
	return (
		<div className="pt-4">
			<Container fluid className="p-0">
				<Row gx={4}>
					<Col lg={3} className="p-0">
						{" "}
						<Image
							src={logo}
							alt={`Image of ${plant.common_name}`}
							style={{
								width: "250x",
								height: "250px",
								objectFit: "cover",
							}}
							rounded
						/>
					</Col>
					<Col
						lg={8}
						className="p-0 mx-1 d-flex flex-column align-items-start">
						<h1 className="my-ultra">{plant.common_name} </h1>
						<h2 className="">{plant.scientific_name} </h2>
						<p className="text-start"> {plant.description}</p>
						<p className="mb-0">Family: {plant.family} </p>
						<p className="">Origin: {plant.origin}</p>
					</Col>
				</Row>
			</Container>

			<Container fluid className="p-0 my-4">
				<Row>
					<Col md={3} className="p-0"></Col>
					<div className="vr vr-style"></div>
					<Col
						md={8}
						className="p-0 mx-1 d-flex flex-column align-items-start my-ultra fs-5">
						<div className="hr"></div>
						<p className=""> Cycle: {plant.cycle}</p>
						<p className=""> Watering: {plant.watering}</p>
						<p className=""> Sunlight: {plant.sunlight?.join()}</p>
						{(plant.edible_fruit || plant.edible_leaf) && (
							<p className=""> {plant.common_name} is edible</p>
						)}
						{!plant.edible_fruit && !plant.edible_leaf && (
							<p className="">
								{" "}
								{plant.common_name} is not edible
							</p>
						)}

						<p className="">
							{" "}
							Hardiness Zone: {plant.hardiness_min} -{" "}
							{plant.hardiness_max}
						</p>
						<p className="">
							Pests: {plant.pest_susceptibility.join()}
						</p>
					</Col>
				</Row>
				<Row>
					{/*                     <div>{plant.other_images?.map((image)=> <img src={image.small_url}> </img>)}</div>
					 */}{" "}
				</Row>
			</Container>
		</div>
	);
};

export default PlantDetails;
