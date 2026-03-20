import { useState, useEffect } from 'react';
import type { PlantModel } from '../types/plant';

export function useFavorites() {
	const key = 'favorites';

	const [favorites, setFavorites] = useState<PlantModel[]>(() => {
		try {
			const saved = localStorage.getItem(key); // Ensure the string is parsed back into a JS array of objects
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		// Store the entire array of objects as a JSON string
		localStorage.setItem(key, JSON.stringify(favorites));
	}, [favorites]); // Add: Only if the object's ID isn't already there

	const addFavorite = (item: PlantModel | undefined) => {
        if (!item) return;

		setFavorites((prev) => {
			const isAlreadyFav = prev.some((fav) => fav.id === item.id);
			return isAlreadyFav ? prev : [...prev, item];
		});
	}; 

	const removeFavorite = (id: number | undefined) => {
		setFavorites((prev) => prev.filter((fav) => fav.id !== id));
	};

	const isFavorite = (id: number | undefined) => favorites.some((fav) => fav.id === id);

	return { favorites, addFavorite, removeFavorite, isFavorite };
}
