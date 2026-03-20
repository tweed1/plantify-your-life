import z from "zod";

export type Plant = {
	common_name: string;
	scientific_name: string[];
	family: string;
	origin: string[];
	cycle: string;
	sunlight?: string[];
	description: string;
	watering: string;
	hardiness_min: number;
    hardiness_max: number;
	pest_susceptibility: string[];
	edible_fruit: boolean;
	edible_leaf: boolean;
};

export type PlantModel = Plant &{
    id: number;
}

export const PlantUpdateSchema = z.object({
    common_name: z.string().min(1, { message: 'this is too small' }).optional(),
    scientific_name: z
        .string()
        .min(1, { message: 'this is too small' })
        .optional(),
    family: z.string().optional(),
    type: z.string().optional(),
    genus: z.string().optional(),
    cycle: z.string().optional(),
    flowering_season: z.string().optional(),
    harvest_season: z.string().optional(),
    plant_anatomy: z.string().optional(),
    description: z.string().optional(),
    watering: z.string().optional(),
    hardiness_min: z.coerce.number().int().optional(),
    hardiness_max: z.coerce.number().int().optional(),
    edible_fruit: z.boolean().optional(),
    edible_leaf: z.boolean().optional(),
    image_url: z.string().optional(),
});