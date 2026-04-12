import { useEffect } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import IntroImages from '../Components/IntroImages';
import {
	BsMortarboardFill,
	BsLuggageFill,
	BsLinkedin,
	BsInfoCircleFill,
	BsHouseDoorFill,
	BsHeartFill,
	BsGithub,
	BsFlower1,
	BsFillSignpostSplitFill,
	BsFillCupHotFill,
	BsFillClipboard2DataFill,
	BsFillAirplaneFill,
	BsEnvelopeCheck,
    BsFlower3,
    BsInfoCircle,
} from 'react-icons/bs';
import ToggleReveal from '../Components/ToggleReveal';

const Me = () => {
	useEffect(() => {
		document.title = 'Me';
	});

	return (
		<div className="top-spacing">
			<Container className="justify-content-center align-items-center d-flex flex-column mb-5">
				<div className="py-4 d-flex flex-column align-items-start">
					<h1 className="my-ultra">Hey, its me</h1>
					<hr className="border-2 border-top rounded border-dark my-3 hr-style" />
				</div>
				<IntroImages />
				<hr className="border-2 border-top rounded border-dark my-3 hr-style" />
				<div className="p-4 my-5"></div>
			</Container>
			<Container className="">
				<Row className="g-3">
					<Col xs={12} md={6} lg={3} className='align-items-start'>
						<ToggleReveal activeIcon={<BsFlower1 />} icon={<BsFlower3 />}>
							<p>Hidden content here</p>
						</ToggleReveal>
					</Col>
					<Col xs={12} md={6} lg={3}>
                    <ToggleReveal activeIcon={<BsInfoCircleFill />} icon={<BsInfoCircle />}>
							<p>Hidden content here</p>
						</ToggleReveal>
                    </Col>
					<Col xs={12} md={6} lg={3}>
                    <ToggleReveal activeIcon={<BsInfoCircleFill />} icon={<BsInfoCircle />}>
							<p>Hidden content here</p>
						</ToggleReveal></Col>
					<Col xs={12} md={6} lg={3}> <ToggleReveal activeIcon={<BsInfoCircleFill />} icon={<BsInfoCircle />}>
							<p>Hidden content here</p>
						</ToggleReveal></Col>
				</Row>
			</Container>
		</div>
	);
};

export default Me;
