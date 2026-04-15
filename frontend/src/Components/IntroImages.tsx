import { Col, Container, Row, Image, Spinner } from 'react-bootstrap';
import me from '../assets/images/roses-headshot.png';
import me2 from '../assets/images/sunflowerseedlings.png';
import me3 from '../assets/images/tuliphaul.png';
import me4 from '../assets/images/bigtree.png';
import { useState } from 'react';


const IntroImages = () => {
    const [loadedCount, setLoadedCount] = useState(0);
    const totalImages = 4;

    const handleImageLoad = () => {
        setLoadedCount((prev) => prev + 1);
    };

    // Calculate if we are finished
    const allImagesReady = loadedCount >= totalImages;

    return (
        <div>
            {/* Placeholder: Only shows while loading */}
            {!allImagesReady && (
                <Container className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading gallery...</p>
                </Container>
            )}

            {/* Hidden with CSS until ready so onLoad can still fire */}
            <Container 
                fluid 
                className="mx-0 px-0" 
                style={{ display: allImagesReady ? 'block' : 'none' }}
            >
                <Row className='g-3'>
                    <Col xs={12} md={6} lg={3}>
                        <Image
                            src={me}
                            alt=""
                            rounded fluid
                            width={250}
                            height={250}
                            onLoad={handleImageLoad}
                            onError={handleImageLoad} // Prevent getting stuck on broken links
                        />
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Image
                            src={me3}
                            alt=""
                            rounded fluid
                            width={250}
                            height={250}
                            onLoad={handleImageLoad}
                            onError={handleImageLoad}
                        />
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Image
                            src={me2}
                            alt=""
                            rounded fluid
                            width={250}
                            height={250}
                            onLoad={handleImageLoad}
                            onError={handleImageLoad}
                        />
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Image
                            src={me4}
                            alt=""
                            rounded fluid
                            width={250}
                            height={250}
                            onLoad={handleImageLoad}
                            onError={handleImageLoad}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default IntroImages;