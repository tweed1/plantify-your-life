import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/esm/Container';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const PlantSchema = z.object({
	common_name: z.string().min(1, { message: 'this is too small' }).optional(),
	scientific_name: z.array(z.string()).optional(),
	family: z.string().optional(),
	origin: z.array(z.string()).optional(),
	cycle: z.string().optional(),
	sunlight: z.array(z.string()).optional().optional(),
	description: z.string().optional(),
	watering: z.string().optional(),
	hardiness: z
		.object({
			min: z.string(),
			max: z.string(),
		})
		.optional(),
	pest_susceptibility: z.array(z.string()).optional(),
	edible_fruit: z.boolean().optional(),
	edible_leaf: z.boolean().optional(),
	image_url: z.string().optional(),
});

type Plant = z.infer<typeof PlantSchema>;
const data: unknown = {};
const validated = PlantSchema.safeParse(data);

function EditForm() {
	const [loading, setLoading] = useState(false);
	const [plant, setPlant] = useState<Plant | undefined>();
	const [error, setError] = useState<string | undefined>();
	const params = useParams();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: zodResolver(PlantSchema) });

	const onSubmit: SubmitHandler<Plant> = async (data): Promise<void> => {
		console.dir(data);
		try {
			const response = await fetch(
				`http://localhost:3000/plants/${params.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json', // Inform the server the body is JSON
						// Add any other necessary headers, e.g., 'Authorization': 'Bearer <token>'
					},
					body: JSON.stringify(data),
				},
			);

			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			const incomingData = await response.json();
			console.dir(incomingData);
		} catch (error: any) {
			setError(error);
		} finally {
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
		<Container>
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
									placeholder={plant.common_name}
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
										placeholder={plant.scientific_name?.join(
											' ',
										)}
									/>
								</Form.Group>
							</Col>
						</Row>

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

						<Form.Group
							className="mb-3"
							controlId="formGridAddress1">
							<Form.Label>Address</Form.Label>
							<Form.Control placeholder="1234 Main St" />
						</Form.Group>

						<Form.Group
							className="mb-3"
							controlId="formGridAddress2">
							<Form.Label>Address 2</Form.Label>
							<Form.Control placeholder="Apartment, studio, or floor" />
						</Form.Group>

						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridCity">
								<Form.Label>City</Form.Label>
								<Form.Control />
							</Form.Group>

							<Form.Group as={Col} controlId="formGridState">
								<Form.Label>State</Form.Label>
								<Form.Select defaultValue="Choose...">
									<option>Choose...</option>
									<option>...</option>
								</Form.Select>
							</Form.Group>

							<Form.Group as={Col} controlId="formGridZip">
								<Form.Label>Zip</Form.Label>
								<Form.Control />
							</Form.Group>
						</Row>

						<Form.Group className="mb-3" id="formGridCheckbox">
							<Form.Check type="checkbox" label="Check me out" />
						</Form.Group>
					</Col>
					<Col xl>
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
								/>
							</Form.Group>

							<Form.Group as={Col} controlId="formGridPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
								/>
							</Form.Group>
						</Row>

						<Form.Group
							className="mb-3"
							controlId="formGridAddress1">
							<Form.Label>Address</Form.Label>
							<Form.Control placeholder="1234 Main St" />
						</Form.Group>

						<Form.Group
							className="mb-3"
							controlId="formGridAddress2">
							<Form.Label>Address 2</Form.Label>
							<Form.Control placeholder="Apartment, studio, or floor" />
						</Form.Group>

						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridCity">
								<Form.Label>City</Form.Label>
								<Form.Control />
							</Form.Group>

							<Form.Group as={Col} controlId="formGridState">
								<Form.Label>State</Form.Label>
								<Form.Select defaultValue="Choose...">
									<option>Choose...</option>
									<option>...</option>
								</Form.Select>
							</Form.Group>

							<Form.Group as={Col} controlId="formGridZip">
								<Form.Label>Zip</Form.Label>
								<Form.Control />
							</Form.Group>
						</Row>

						<Form.Group className="mb-3" id="formGridCheckbox">
							<Form.Check type="checkbox" label="Check me out" />
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Col>
				</Row>
			</Form>
		</Container>
	);
}

export default EditForm;
