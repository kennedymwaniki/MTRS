// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";
// import * as schema from "./schema";

// config({ path: ".env" });

// const client = neon(process.env.DATABASE_URL!);
// export const db = drizzle(client, { schema, logger: true }); // create a drizzle instance
//  this is for migrating using neon in package json"migrate": "drizzle-kit migrate",

// export default db;

// this if for the local postgress
import "dotenv/config";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { config } from "dotenv";

config({ path: ".env" });

const pool = new pg.Pool({
  connectionString: process.env.Database_URL,
});

const db = drizzle(pool, { schema, logger: true });

const main = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};
main();

export default db;
