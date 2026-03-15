-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "lastname" TEXT
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "common_name" TEXT,
    "scientific_name" TEXT,
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
    "hardiness_min" INTEGER,
    "hardiness_max" INTEGER,
    "watering" TEXT,
    "watering_general_benchmark" JSONB,
    "plant_anatomy" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
