import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT) || 5432,
});

pool
    .connect()
    .then(client => {
        console.log("✅ Connected to PostgreSQL successfully!");
        client.release();
    })
    .catch(err => console.error("❌ Postgres connection error:", err));