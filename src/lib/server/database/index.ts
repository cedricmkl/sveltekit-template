import postgres from "postgres";
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DATABASE_URI } from "$env/static/private";

const client = postgres(DATABASE_URI, { ssl: "require" });
const db = drizzle(client, { schema });

export default db;