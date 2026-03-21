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

function AddForm() {
	const [loading, setLoading] = useState(false);
	const [plant, setPlant] = useState<Plant | undefined>();
	const [error, setError] = useState<string | undefined>();
	const params = useParams();
	const navigate = useNavigate();
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: zodResolver(PlantSchema) });

	const onSubmit: SubmitHandler<Plant> = async (data): Promise<void> => {
		console.dir(data);
		try {
			const response = await fetch(`/api/plants/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			/* Modal logic */
			setShowSuccessModal(true);
		} catch (error: any) {
			setError(error);
		} finally {
		}
	};

	useEffect(() => {
		document.title = 'Add New Plant';
	});
	if (error) {
		return <p>Something went wrong :(</p>;
	}

	return (
		<Container className="mb-3">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Row>
					<Col xl>
						{/* image upload and common name */}
						<Row className="mb-1">
							<Form.Group
								as={Col}
								controlId="formFile"
								className="mb-3 text-start">
								<Form.Label className="text-start">
									Upload Image
								</Form.Label>
								<Form.Control
									type="file"
									accept="image/png, image/jpeg" // Restrict to image file types

									/* onChange={handleFileChange} */
								/>
							</Form.Group>

							<Form.Group
								as={Col}
								controlId="formGridCommon"
								className="text-start">
								<Form.Label>Common Name</Form.Label>
								<Form.Control
									type="text"
									placeholder={'Enter common name'}
									{...register('common_name')}
								/>
								{errors.common_name && (
									<p> {errors.common_name.message} </p>
								)}
							</Form.Group>
						</Row>
						{/* offset and scientific name */}
						<Row className="mb-3">
							<Col md={{ offset: 6, span: 6 }}>
								<Form.Group
									controlId="formGridScientific"
									className="text-start">
									<Form.Label>Scientific Name</Form.Label>
									<Form.Control
										type="text"
										placeholder={'Enter scientific name'}
										{...register('scientific_name')}
									/>
									{errors.scientific_name && (
										<p>
											{' '}
											{
												errors.scientific_name.message
											}{' '}
										</p>
									)}
								</Form.Group>
							</Col>
						</Row>

						{/* plant anatomy description */}
						<Form.Group
							className="mb-3 text-start"
							controlId="formGridAnatomy">
							<Form.Label>Plant Anatomy</Form.Label>
							<Form.Control
								placeholder={
									'ex: Has pink and red leaves with a red stem and white flowers'
								}
								as="textarea"
								{...register('plant_anatomy')}
							/>
						</Form.Group>

						{/* Full description */}
						<Form.Group
							className="mb-3 text-start"
							controlId="formGridDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								placeholder={
									'ex: The Common Paw Paw is an amazing, versatile species native to North America. Not only can the cooked fruit be used in desserts and other culinary dishes, but the seeds, leaves and bark can also provide medicinal benefits.'
								}
								as="textarea"
								{...register('description')}
							/>
						</Form.Group>
					</Col>

					<Col xl>
						{/* family, genus, and type */}
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridFamily">
								<Form.Label>Family</Form.Label>
								<Form.Control
									type="text"
									placeholder={'ex: Annonaceae'}
									{...register('family')}
								/>
							</Form.Group>

							<Form.Group as={Col} controlId="formGridFamily">
								<Form.Label>Genus</Form.Label>
								<Form.Control
									type="text"
									placeholder={'ex: Asimina'}
									{...register('genus')}
								/>
							</Form.Group>

							{/* Eventually make this for type. When type is its own table
                            <Form.Group as={Col} controlId="formGridState">
								<Form.Label>State</Form.Label>
								<Form.Select defaultValue="Choose...">
									<option>Choose...</option>
									<option>...</option>
								</Form.Select>
							</Form.Group> */}

							<Form.Group as={Col} controlId="formGridFamily">
								<Form.Label>Type</Form.Label>
								<Form.Control
									type="text"
									placeholder={'ex: Tree'}
									{...register('type')}
								/>
							</Form.Group>
						</Row>
						{/* cycle, flowering season, harvest season */}
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridFamily">
								<Form.Label>Cycle</Form.Label>
								<Form.Control
									type="text"
									placeholder={'ex: Perennial'}
									{...register('cycle')}
								/>
							</Form.Group>

							<Form.Group as={Col} controlId="formGridFamily">
								<Form.Label>Flowering Season</Form.Label>
								<Form.Control
									type="text"
									placeholder={'ex: Spring'}
									{...register('flowering_season')}
								/>
							</Form.Group>

							<Form.Group as={Col} controlId="formGridFamily">
								<Form.Label>Harvest Season</Form.Label>
								<Form.Control
									type="text"
									placeholder={'ex: Fall'}
									{...register('harvest_season')}
								/>
							</Form.Group>
						</Row>
						{/* Hardiness zones */}
						<Row className="mb-3">
							<p className="mb-0 pb-0">Hardiness Zones</p>
							<Form.Group as={Col} controlId="formHardiness">
								<Form.Label>From:</Form.Label>
								<Form.Control
									type="number"
									placeholder={1}
									{...register('hardiness_min')}
								/>
								{errors.hardiness_min && (
									<p> {errors.hardiness_min.message} </p>
								)}
							</Form.Group>

							<Form.Group as={Col} controlId="formGridHardiness">
								<Form.Label>To:</Form.Label>
								<Form.Control
									type="number"
									placeholder={9}
									{...register('hardiness_max')}
								/>
								{errors.hardiness_max && (
									<p> {errors.hardiness_max.message} </p>
								)}
							</Form.Group>
						</Row>

						{/* T/F does it have edible fruit or leaves */}
						<Row className="mb-3">
							<Col>
								<Form.Group>
									<Form.Label>
										Does it have edible fruit?
									</Form.Label>
									<Form.Check // prettier-ignore
										type="switch"
										id="custom-switch"
										/* label="Check this switch" */
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>
										Does it have edible leaves?
									</Form.Label>
									<Form.Check // prettier-ignore
										type="switch"
										id="custom-switch"
										/* label="Check this switch" */
									/>
								</Form.Group>
							</Col>
						</Row>
						<hr></hr>
						<Button
							variant="primary"
							type="submit"
							className="custom-primary">
							Add Plant
						</Button>
					</Col>
				</Row>
			</Form>
			{/* Success Modal */}
			<Modal
				show={showSuccessModal}
				onHide={() => setShowSuccessModal(false)}
				centered
				backdrop="static" // prevent closing by clicking outside
			>
				<Modal.Header closeButton>
					<Modal.Title>Added Successfully!</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					The plant details have been added successfully. You can
					verify by searching for it again on the Manage page.
				</Modal.Body>

				<Modal.Footer>
					<Button
						className="custom-primary"
						variant="primary"
						
                        onClick={() => navigate('/manage')}>
						Back to Manage
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default AddForm;
