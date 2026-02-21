import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = (props: { zoneId: string }) => {

    type Entry = {
		total: number;
		percentage: number;
	};
	type ZoneData = {
        totalPlants: number;
		edibleLeaf: Entry;
		edibleFruit: Entry;
		cuisine: Entry;
		medicinal: Entry;
		poisonousToHumans: Entry;
		poisonousToPets: Entry;
		fruits: Entry;
	};

	const [details, setDetails] = useState<undefined | ZoneData>(undefined);
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("graph_data/zone_analysis_2.json");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const jsonData = await response.json();
				console.dir(jsonData);
				console.dir(jsonData[props.zoneId]);

				setDetails(jsonData[props.zoneId]);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (error) {
		return <p> Something went wrong :( </p>;
	}

	if (!details) {
		return (
			<div>
				<p> loading</p>
			</div>
		);
	}

	const data = {
		labels: [
			"Edible Leaf",
			"Edible Fruit",
			"Used in Cuisine",
			"Medicinal",
			"Poisonous to Humans",
			"Poisonous to Pets",
			"Has Fruits",
		],
		datasets: [
			{
				label: `Zone ${props.zoneId} Edibleness Totals`,
				data: [
					details.edibleLeaf.total,
					details.edibleFruit.total,
					details.cuisine.total,
					details.medicinal.total,
					details.poisonousToHumans.total,
					details.poisonousToPets.total,
					details.fruits.total,
				],
				backgroundColor: [
					"#0f5231ff",
					"#177244",
					"#3B8751",
					"#5E9C5E",
					"#82B26C",
					"#A5C779",
					"#C9DC86",
				],
				borderColor: "#004040",
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const value = context.raw;
                        return `${value} / ${details.totalPlants}`;
                    },
                },
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: `Count (out of ${details.totalPlants})`,
				},
			},
		},
	};

	return (
		<div>
			{loading ? (
				<p>Loading data...</p>
			) : (
				<Container fluid="sm" className="my-ultra">
					<p id="chart-desc" className="visually-hidden">
						Bar chart showing plant counts by category.
					</p>

					<h3>Zone {props.zoneId} Edibleness Totals</h3>
                    <p>Total Plants in Zone {props.zoneId}: {details.totalPlants}</p>
					<Bar data={data} options={options} aria-describedby="chart-desc"/>
				</Container>
			)}
		</div>
	);
};

export default BarChart;
