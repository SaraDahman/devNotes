import pool from "../db/pool.js";

export async function findAll() {
  const result = await pool.query(`
    SELECT id, name, created_at
    FROM folders
    ORDER BY name ASC
  `);

  return result.rows;
}

export async function findById(id) {
  const result = await pool.query(
    `
      SELECT id, name, created_at
      FROM folders
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
}

export async function findByName(name) {
  const result = await pool.query(
    `
      SELECT id, name, created_at
      FROM folders
      WHERE LOWER(name) = LOWER($1)
    `,
    [name],
  );

  return result.rows[0] ?? null;
}

export async function create(name) {
  const result = await pool.query(
    `
      INSERT INTO folders (name)
      VALUES ($1)
      RETURNING id, name, created_at
    `,
    [name],
  );

  return result.rows[0];
}

export async function update(id, name) {
  const result = await pool.query(
    `
      UPDATE folders
      SET name = $1
      WHERE id = $2
      RETURNING id, name, created_at
    `,
    [name, id],
  );

  return result.rows[0] ?? null;
}

export async function remove(id) {
  const result = await pool.query(
    `
      DELETE FROM folders
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );

  return result.rows[0] ?? null;
}
