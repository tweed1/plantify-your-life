import { useEffect } from 'react';
import EditForm from '../Components/EditForm';
import { useNavigate } from 'react-router';

const EditPlant = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Edit';
	}, []);

	return (
		<div className="pt-4">
			<div className='text-start'>
				<button
					onClick={() => navigate('/manage')}
					className="back-btn btn">
					Back
				</button>
			</div>

			<EditForm />
		</div>
	);
};

export default EditPlant;
