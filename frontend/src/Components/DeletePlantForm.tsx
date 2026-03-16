import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Container from 'react-bootstrap/esm/Container';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from 'react-bootstrap';

const PlantSchema = z.object({
	common_name: z.string().min(1, { message: 'this is too small' }).optional(),
	scientific_name: z
		.string()
		.min(1, { message: 'this is too small' })
		.optional(),
	family: z.string().optional(),
	type: z.string().optional(),
	genus: z.string().optional(),
	cycle: z.string().optional(),
	flowering_season: z.string().optional(),
	harvest_season: z.string().optional(),
	plant_anatomy: z.string().optional(),
	description: z.string().optional(),
	watering: z.string().optional(),
	hardiness_min: z.coerce.number().int().optional(),
	hardiness_max: z.coerce.number().int().optional(),
	edible_fruit: z.boolean().optional(),
	edible_leaf: z.boolean().optional(),
	image_url: z.string().optional(),
});

type Plant = z.infer<typeof PlantSchema>;
const data: unknown = {};
const validated = PlantSchema.safeParse(data);

function DeletePlantForm() {
	const [loading, setLoading] = useState(false);
	const [plant, setPlant] = useState<Plant | undefined>();
	const [error, setError] = useState<string | undefined>();
	const params = useParams();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm({ resolver: zodResolver(PlantSchema) });

	const onSubmit: SubmitHandler<Plant> = async (data): Promise<void> => {
		console.dir(data);
		try {
			const response = await fetch(
				`http://localhost:3000/plants/${params.id}`,
				{
					method: 'DELETE',
				},
			);
			if (response.ok) {
				navigate('/manage');
			} else {
				throw new Error(`HTTP ${response.status}`);
			}
		} catch (error: any) {
			setError(error);
		}
	};

	useEffect(() => {
		document.title = 'Edit Plant Details';

		const id = Number(params.id);

		if (Number.isNaN(id) || !params.id) {
			setError('Invalid plant ID');
			return;
		}
		const fetchPlants = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`http://localhost:3000/plants/${params.id}`,
					{
						method: 'GET',
					},
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
	<Container className="mb-3">
		<Row>
			<Col xl>
				{/* Image + Common Name */}
				<Row className="mb-3 text-start">
					<Col>
						<p className="fw-bold mb-1">Image</p>
						<p>{plant.image ? plant.image : "No image uploaded"}</p>
					</Col>

					<Col>
						<p className="fw-bold mb-1">Common Name</p>
						<p>{plant.common_name ? plant.common_name : "Not provided"}</p>
					</Col>
				</Row>

				{/* Scientific Name */}
				<Row className="mb-3 text-start">
					<Col md={{ offset: 6, span: 6 }}>
						<p className="fw-bold mb-1">Scientific Name</p>
						<p>{plant.scientific_name ? plant.scientific_name :  "Not provided"}</p>
					</Col>
				</Row>

				{/* Plant Anatomy */}
				<div className="mb-3 text-start">
					<p className="fw-bold mb-1">Plant Anatomy</p>
					<p>{plant.plant_anatomy ? plant.plant_anatomy : "Not provided"}</p>
				</div>

				{/* Description */}
				<div className="mb-3 text-start">
					<p className="fw-bold mb-1">Description</p>
					<p>{plant.description ? plant.description : "Not provided"}</p>
				</div>
			</Col>

			<Col xl>
				{/* Family / Genus / Type */}
				<Row className="mb-3 text-start">
					<Col>
						<p className="fw-bold mb-1">Family</p>
						<p>{plant.family ? plant.family : "Not provided"}</p>
					</Col>

					<Col>
						<p className="fw-bold mb-1">Genus</p>
						<p>{plant.genus ? plant.genus : "Not provided"}</p>
					</Col>

					<Col>
						<p className="fw-bold mb-1">Type</p>
						<p>{plant.type ? plant.type : "Not provided"}</p>
					</Col>
				</Row>

				{/* Cycle / Flowering / Harvest */}
				<Row className="mb-3 text-start">
					<Col>
						<p className="fw-bold mb-1">Cycle</p>
						<p>{plant.cycle ? plant.cycle : "Not provided"}</p>
					</Col>

					<Col>
						<p className="fw-bold mb-1">Flowering Season</p>
						<p>{plant.flowering_season ? plant.flowering_season :  "Not provided"}</p>
					</Col>

					<Col>
						<p className="fw-bold mb-1">Harvest Season</p>
						<p>{plant.harvest_season ? plant.harvest_season : "Not provided"}</p>
					</Col>
				</Row>

				{/* Hardiness */}
				<Row className="mb-3 text-start">
					<p className="fw-bold mb-1">Hardiness Zones</p>
					<Col>
						<p>From: {plant.hardiness_min ? plant.hardiness_min :  "N/A"}</p>
					</Col>
					<Col>
						<p>To: {plant.hardiness_max ? plant.hardiness_max : "N/A"}</p>
					</Col>
				</Row>

				{/* Edible */}
				<Row className="mb-3 text-start">
					<Col>
						<p className="fw-bold mb-1">Edible Fruit</p>
						<p>{plant.edible_fruit ? "Yes" : "No"}</p>
					</Col>

					<Col>
						<p className="fw-bold mb-1">Edible Leaves</p>
						<p>{plant.edible_leaves ? "Yes" : "No"}</p>
					</Col>
				</Row>

				<hr />

				{/* Delete Trigger */}
				<Button variant="danger" onClick={handleShow}>
					Delete Plant
				</Button>

				{/* Modal */}
				<Modal show={show} onHide={handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Deletion</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						Are you sure you want to delete this plant? This action cannot be undone.
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>

						<Button
							variant="danger"
							onClick={onSubmit}
							disabled={isSubmitting}
						>
							{isSubmitting ? "Deleting..." : "Yes, Delete Item"}
						</Button>
					</Modal.Footer>
				</Modal>
			</Col>
		</Row>
	</Container>
);
}

export default DeletePlantForm;
