import "dotenv/config";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { config } from "dotenv";

config({ path: ".env" });

export const client = new Client({
  connectionString: process.env.Database_URL as string,
});

const main = async () => {
  await client.connect();
};
main();
const db = drizzle(client, { schema, logger: true });

export default db;
