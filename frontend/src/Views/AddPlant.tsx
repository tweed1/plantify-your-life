import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AddPlantForm from '../Components/AddPlantForm';

const AddPlant = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Add';
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

			<AddPlantForm />
		</div>
	);
};

export default AddPlant;