import { Col, Container, Row, Image } from 'react-bootstrap';
import me from '../assets/images/roses-headshot.png';
import me2 from '../assets/images/sunflowerseedlings.png';
import me3 from '../assets/images/tuliphaul.png';
import me4 from '../assets/images/bigtree.png';

const IntroImages = () => {
	return (
		<div>
			<Container fluid className="mx-0 px-0">
				<Row className='g-3'>
					<Col xs={12} md={6} lg={3}>
						<Image
							src={me}
							alt="open white strawflower with text 'add a new plant'"
							rounded fluid
							width={250}
							height={250}></Image>
					</Col>
					<Col xs={12} md={6} lg={3}>
						<Image
							src={me3}
							alt="open white strawflower with text 'add a new plant'"
							rounded fluid
							width={250}
							height={250}></Image>
					</Col>
					<Col xs={12} md={6} lg={3}>
						<Image
							src={me2}
							alt="open white strawflower with text 'add a new plant'"
							rounded fluid
							width={250}
							height={250}></Image>
					</Col>
					<Col xs={12} md={6} lg={3}>
						<Image
							src={me4}
							alt="open white strawflower with text 'add a new plant'"
							rounded fluid
							width={250}
							height={250}></Image>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default IntroImages;
