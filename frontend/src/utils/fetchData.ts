import { openDB } from 'idb';

const DB_NAME = 'Plantify';
const STORE_NAME = 'data';

/** Fetches hardiness zone map data from the public folder and saves it to index db in the browser */
export async function getHardinessMapData() {
	const db = await openDB(DB_NAME, 1, {
		upgrade(db) {
			db.createObjectStore(STORE_NAME);
		},
	});

	if (!db.objectStoreNames.contains(STORE_NAME)) {
		db.createObjectStore(STORE_NAME, { keyPath: 'id' });
	}

	// 1. Check if we already have it locally
	const cachedData = await db.get(STORE_NAME, 'hardinessZones');
	if (cachedData) {
		console.log('📦 Loaded from IndexedDB (No Network!)');
		return cachedData;
	}

	// 2. If not, fetch it from the public folder
	console.log('🌐 Fetching from server for the first and only time...');

	const response = await fetch('/ophz/ophz.geojson');
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();

	// 3. Save it to IndexedDB for next time
	await db.put(STORE_NAME, data, 'hardinessZones');
	return data;
}
