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
    BsSkipForwardBtnFill,
    BsFillSkipForwardCircleFill,
    BsHeart,
    BsCupHotFill,
    BsAirplaneFill,
} from 'react-icons/bs';
import ToggleReveal from '../Components/ToggleReveal';

const Me = () => {
	useEffect(() => {
		document.title = 'About';
	});

	return (
		<div className="top-spacing">
			<Container className="justify-content-center align-items-center px-3">
				<div className="py-4 d-flex flex-column align-items-start">
					<h1 className="my-ultra">Hey, its me</h1>
					<p className="m-0">I think plants are cool</p>
					<hr className="border-2 border-top rounded border-dark my-3 hr-style w-100" />
				</div>
                </Container>
                <Container className='justify-content-center align-items-center d-flex flex-column mb-2'>
				<IntroImages />
				<hr className="border-2 border-top rounded border-dark my-3 hr-style w-100" />
			</Container>
			<Container className="mb-4 align-items-xs-center justify-content-xs-center">
				<Row className="g-3 align-items-xs-center ps-xl-5 ms-xl-5">
					<Col xs={12} md={6} lg={4} className='justify-content-xs-center'>
						<ToggleReveal
							activeIcon={<BsFlower1 />}
							icon={<BsFlower3 />}
							title="Contact"
							items={[
								{
									label: 'katie-tweed',
									icon: <BsLinkedin />,
									href: 'https://www.linkedin.com/in/katie-tweed/',
								},
                                {
									label: 'tweed1',
									icon: <BsGithub />,
                                    href: 'https://github.com/tweed1/plantify-your-life',
								},
								{
									label: 'tweedde4364@gmail.com',
									icon: <BsEnvelopeCheck />,
								},

							]}></ToggleReveal>
					</Col>
					<Col xs={12} md={6} lg={4}>
						<ToggleReveal
							activeIcon={<BsFlower1 />}
							icon={<BsFlower3 />}
							title="Project Info"
							items={[
								{
									label: 'Started as a school project',
									icon: <BsMortarboardFill />,
								},
								{
									label: 'But I loved working on it!',
									icon: <BsFillClipboard2DataFill />,
								},
								{
									label: 'Accounts & more to come!',
									icon: <BsFillSkipForwardCircleFill />,
								},
							]}></ToggleReveal>
					</Col>
                    <Col xs={12} md={6} lg={4}>
						<ToggleReveal
							activeIcon={<BsFlower1 />}
							icon={<BsFlower3 />}
							title="Fun Facts"
							items={[
								{
									label: 'I have 2 cats',
									icon: <BsHeartFill />,
								},
								{
									label: 'Tea drinker',
									icon: <BsCupHotFill/>,
								},
								{
									label: 'From East Coast, but where am I now..',
									icon: <BsAirplaneFill />,
								},
							]}></ToggleReveal>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Me;
