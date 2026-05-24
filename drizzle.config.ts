import { defineConfig } from 'drizzle-kit';

// The Spring backend (Flyway/JPA) owns the database schema. This app only
// introspects it: use `pnpm db:pull` to regenerate the schema, never push.
export default defineConfig({
	schema: './src/lib/db/schema.ts',
	// Pull writes the generated schema (+ relations/meta) straight into the app's
	// db folder, so `src/lib/db/schema.ts` is always the introspected output.
	out: './src/lib/db',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	},
	// Flyway's own bookkeeping table is not part of the app schema.
	tablesFilter: ['!flyway_schema_history']
});
