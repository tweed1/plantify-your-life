import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function EditForm() {
	return (
		<Form>
			<Row>
				<Col xl>
					<Row className="mb-1">
						<Form.Group
							as={Col}
							controlId="formFile"
							className="mb-3">
							<Form.Label>Upload Image</Form.Label>
							<Form.Control
								type="file"
								accept="image/png, image/jpeg" // Restrict to image file types
								/* onChange={handleFileChange} */
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridCommon">
							<Form.Label>Common Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Name"
							/>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Col md={{ offset: 6, span: 6  }}>
							<Form.Group controlId="formGridScientific">
								<Form.Label>Scientific Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Name"
								/>
							</Form.Group>
						</Col>
					</Row>

					<Form.Group className="mb-3" controlId="formGridAddress1">
						<Form.Label>Address</Form.Label>
						<Form.Control placeholder="1234 Main St" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGridAddress2">
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

					<Form.Group className="mb-3" controlId="formGridAddress1">
						<Form.Label>Address</Form.Label>
						<Form.Control placeholder="1234 Main St" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGridAddress2">
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
	);
}

export default EditForm;
