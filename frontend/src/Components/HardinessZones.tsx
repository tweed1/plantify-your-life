import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { getHardinessMapData } from '../utils/fetchData';
import { Container } from 'react-bootstrap';

// simple color scale for zones 1..13 (you can refine)
const zoneColors = [
	'#f7fbff',
	'#deebf7',
	'#c6dbef',
	'#9ecae1',
	'#6baed6',
	'#3182bd',
	'#08519c',
	'#fdd0a2',
	'#fdae6b',
	'#fd8d3c',
	'#f16913',
	'#d94801',
	'#8c2d04',
];

function getColorForZone(n: string) {
	const i = Math.max(1, Math.min(13, Math.round(Number(n)))); // clamp
	return zoneColors[i - 1] || '#ccc';
}

const HardinessZonesMap = () => {
	const navigate = useNavigate();
	const [geo, setGeo] = useState(null);
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Option A: fetch the geojson from public/ (recommended)
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await getHardinessMapData();
				if (!data) {
					throw new Error(`Failed to load zone map data!`);
				}
				setGeo(data as any);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const style = (feature: any) => {
		// adapt property name to match your geojson file
		const rawZone =
			feature.properties?.ZONE ??
			feature.properties?.PHZ ??
			feature.properties?.value;
		// convert things like "7a" -> 7, or "3-5" -> 3 (or use range)
		const zone = String(rawZone).replace(/[^\d-]/g, ''); // crude
		return {
			fillColor: getColorForZone(zone.split('-')[0]),
			weight: 1,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.8,
		};
	};

	const onEachFeature = (feature: any, layer: any) => {
		const rawZone =
			feature.properties?.ZONE ?? feature.properties?.value ?? 'unknown';
		const zone = String(rawZone);
		layer.on({
			click: () => {
				// navigate to zone page
				// normalize zone to integer or a range string
				const normalized = zone.replace(/[a-z]/i, '').trim();
				navigate(`/zone/${normalized}`);
			},
		});
		const label = `Zone: ${zone}`;
		layer.bindTooltip(label);
	};

	if (error) {
		return <p> Something went wrong :( </p>;
	}

	if (loading) {
		return (
			<>
				{/* <!-- Map Placeholder --> */}
				<div className="card custom-primary" aria-hidden="true" style={{ height: '85%', width: '85%' }}>
					<div
						className="placeholder-glow"
						style={{ height: '85%', width: '100%' }}>
						<div className="placeholder col-12 h-100 w-100 bg-secondary"></div>
					</div>

					<div className="card-body">
						<h5 className="card-title placeholder-glow">
							<span className="placeholder col-6"></span>
						</h5>
						<p className="card-text placeholder-glow">
							<span className="placeholder col-7"></span>
							<span className="placeholder col-4"></span>
						</p>
					</div>
				</div>
				{/* <Container className='placeholder-glow p-5'>
					<span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
                    <span className="placeholder col-12 bg-success"></span>
				</Container> */}
			</>
		);
	}

	return (
		<MapContainer
			preferCanvas={true}
			center={[39.5, -98.35]}
			zoom={4}
			style={{ height: '85%', width: '85%' }}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			{geo && (
				<GeoJSON
					data={geo}
					style={style}
					onEachFeature={onEachFeature}
				/>
			)}
		</MapContainer>
	);
};

export default HardinessZonesMap;
