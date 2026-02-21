import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Radar } from "react-chartjs-2";

import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

const RadarChart = (props: { zoneId: string }) => {
    type Entry = {
        total: number;
        percentage: number;
    }
	type ZoneData = {
		edibleLeaf: Entry;
		edibleFruit: Entry;
		cuisine: Entry;
		medicinal: Entry;
		poisonousToHumans: Entry;
		poisonousToPets: Entry;
		fruits: Entry;
	};
	const [details, setDetails] = useState<null | ZoneData>(null);
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"graph_data/zone_analysis_2.json"
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const jsonData = await response.json();
				/* console.dir(jsonData);
				console.dir(jsonData[props.zoneId]); */
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
        return (
            <p> Something went wrong :( </p>
        )
    }

	if (details === null) {
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
				label: `Zone ${props.zoneId} Percentage of Plant Consumption Stats`,
				data: [
					details.edibleLeaf.percentage,
					details.edibleFruit.percentage,
					details.cuisine.percentage,
					details.medicinal.percentage,
					details.poisonousToHumans.percentage,
					details.poisonousToPets.percentage,
					details.fruits.percentage,
				],
				fill: true,
				backgroundColor: "rgba(92, 70, 26, 0.2)",
				borderColor: "rgba(103, 164, 63, 1)",
				borderWidth: 3,
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			r: {
				beginAtZero: true,
				angleLines: { color: "#a2a2a2ff" },
				grid: { color: "#a2a2a2ff" },
				pointLabels: { font: { size: 14 , weight: "bold",} },
			},
		},
		plugins: {
			legend: { position: "top" },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.dataset.label || "";
                        const value = context.parsed.r;
                        return `${label}: ${value.toFixed(2)}%`;
                    }
                }
            }
		},
    } as const;

	return (
		<div>
			{loading ? (
				<p>Loading radar data...</p>
			) : (
				<Container fluid="lg" className="zone-radar-chart my-ultra p-0">
                    <p id="radar-chart-desc" className="visually-hidden">
						Radar chart showing plant averages by edibleness category.
					</p>
					<h2>Can it Consumify?</h2>
					<p>
						What's the average edibleness profile in this zone?
					</p>
					<Radar data={data} options={options}  aria-describedby="radar-chart-desc"/>
				</Container>
			)}
		</div>
	);
};

export default RadarChart;

/* 
soil
sunlight

drought tolerant
salt tolerant
invasive
tropical
rare
indoor
fruits
flowers

origin
cycle
watering

consumption profile:
edible_leaf,
edible_fruit
cuisine
medicinal
poisonous_to_humans
poisonous_to_pets
fruits
harvest season


x% of plants in in zone y are perennial



*/
