import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import DeletePlantForm from '../Components/DeletePlantForm';

const DeletePlant = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Delete';
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

			<DeletePlantForm />
		</div>
	);
};

export default DeletePlant;