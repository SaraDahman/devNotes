import pg from "pg";
import env from "../config/env.js";

const { Pool } = pg;

const pool = env.database.url
  ? new Pool({
      connectionString: env.database.url,
      ssl: env.nodeEnv === "production" ? { rejectUnauthorized: false } : false,
    })
  : new Pool({
      host: env.database.host,
      port: env.database.port,
      database: env.database.name,
      user: env.database.user,
      password: env.database.password,
    });

export default pool;
