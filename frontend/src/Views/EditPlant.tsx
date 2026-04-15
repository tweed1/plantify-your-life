import { useEffect } from 'react';
import EditForm from '../Components/EditForm';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';

const EditPlant = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Edit';
	}, []);

	return (
		<div className="pt-4">
			<Container className='text-start'>
				<button
					onClick={() => navigate('/manage')}
					className="back-btn btn">
					Back
				</button>
                
			</Container>
            <Container>
                <EditForm />
            </Container>

			
		</div>
	);
};

export default EditPlant;
