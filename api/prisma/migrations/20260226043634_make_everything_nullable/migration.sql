-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "common_name" TEXT,
    "scientific_name" JSONB,
    "other_name" JSONB,
    "family" TEXT,
    "hybrid" TEXT,
    "subspecies" TEXT,
    "cultivar" TEXT,
    "variety" TEXT,
    "species_epithet" TEXT,
    "genus" TEXT,
    "origin" JSONB,
    "type" TEXT,
    "dimensions" JSONB,
    "cycle" TEXT,
    "attracts" JSONB,
    "propagation" JSONB,
    "hardiness" JSONB,
    "watering" TEXT,
    "watering_general_benchmark" JSONB,
    "plant_anatomy" JSONB,
    "pruning_month" JSONB,
    "seeds" BOOLEAN,
    "maintenance" TEXT,
    "soil" JSONB,
    "growth_rate" TEXT,
    "drought_tolerant" BOOLEAN,
    "salt_tolerant" BOOLEAN,
    "thorny" BOOLEAN,
    "invasive" BOOLEAN,
    "tropical" BOOLEAN,
    "indoor" BOOLEAN,
    "care_level" TEXT,
    "pest_susceptibility" JSONB,
    "flowers" BOOLEAN,
    "flowering_season" TEXT,
    "cones" BOOLEAN,
    "fruits" BOOLEAN,
    "edible_fruit" BOOLEAN,
    "harvest_season" TEXT,
    "leaf" BOOLEAN,
    "edible_leaf" BOOLEAN,
    "cuisine" BOOLEAN,
    "medicinal" BOOLEAN,
    "poisonous_to_humans" BOOLEAN,
    "poisonous_to_pets" BOOLEAN,
    "description" TEXT,
    "default_image" JSONB
);
INSERT INTO "new_Plant" ("attracts", "care_level", "common_name", "cones", "cuisine", "cultivar", "cycle", "default_image", "description", "dimensions", "drought_tolerant", "edible_fruit", "edible_leaf", "family", "flowering_season", "flowers", "fruits", "genus", "growth_rate", "hardiness", "harvest_season", "hybrid", "id", "indoor", "invasive", "leaf", "maintenance", "medicinal", "origin", "other_name", "pest_susceptibility", "plant_anatomy", "poisonous_to_humans", "poisonous_to_pets", "propagation", "pruning_month", "salt_tolerant", "scientific_name", "seeds", "soil", "species_epithet", "subspecies", "thorny", "tropical", "type", "variety", "watering", "watering_general_benchmark") SELECT "attracts", "care_level", "common_name", "cones", "cuisine", "cultivar", "cycle", "default_image", "description", "dimensions", "drought_tolerant", "edible_fruit", "edible_leaf", "family", "flowering_season", "flowers", "fruits", "genus", "growth_rate", "hardiness", "harvest_season", "hybrid", "id", "indoor", "invasive", "leaf", "maintenance", "medicinal", "origin", "other_name", "pest_susceptibility", "plant_anatomy", "poisonous_to_humans", "poisonous_to_pets", "propagation", "pruning_month", "salt_tolerant", "scientific_name", "seeds", "soil", "species_epithet", "subspecies", "thorny", "tropical", "type", "variety", "watering", "watering_general_benchmark" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
