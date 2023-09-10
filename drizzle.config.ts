import type { Config } from "drizzle-kit";

export default {
    schema: "./src/lib/server/database/schema.ts",
    driver: 'pg',
    out: "./database/migrations"
} satisfies Config;