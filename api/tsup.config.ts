import { defineConfig } from 'tsup';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
	entry: ['src/main.ts'],
	// ... other tsup options
	clean: true,
	format: ['esm'],
	// Define specific environment variables to embed in the bundle
	env: {
		DATABASE_URL: process.env.DATABASE_URL!,
	},
	minify: true,
	shims: true,
	sourcemap: true,
	external: ['dotenv'],
});
