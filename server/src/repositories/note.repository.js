import pool from "../db/pool.js";

export async function findAll({ folderId = null, favorite = null } = {}) {
  const conditions = [];
  const params = [];

  if (folderId) {
    params.push(folderId);
    conditions.push(`n.folder_id = $${params.length}`);
  }

  if (favorite !== null) {
    params.push(favorite === "true" || favorite === true);
    conditions.push(`n.favorite = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query(
    `
      SELECT
        n.id,
        n.title,
        n.content,
        n.folder_id,
        n.favorite,
        n.created_at,
        n.updated_at,
        f.name AS folder_name
      FROM notes n
      LEFT JOIN folders f ON f.id = n.folder_id
      ${where}
      ORDER BY n.updated_at DESC
    `,
    params,
  );

  return result.rows;
}

export async function findOthers() {
  const result = await pool.query(
    `
      SELECT
        n.id,
        n.title,
        n.content,
        n.folder_id,
        n.favorite,
        n.created_at,
        n.updated_at,
        f.name AS folder_name
      FROM notes n
      LEFT JOIN folders f ON f.id = n.folder_id
      WHERE n.folder_id IS NULL
      ORDER BY n.updated_at DESC
    `,
  );

  return result.rows;
}

export async function findById(id) {
  const result = await pool.query(
    `
      SELECT
        n.id,
        n.title,
        n.content,
        n.folder_id,
        n.favorite,
        n.created_at,
        n.updated_at,
        f.name AS folder_name
      FROM notes n
      LEFT JOIN folders f ON f.id = n.folder_id
      WHERE n.id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
}

export async function create({
  title,
  content,
  folderId = null,
  favorite = false,
}) {
  const result = await pool.query(
    `
      INSERT INTO notes (
        title,
        content,
        folder_id,
        favorite
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        title,
        content,
        folder_id,
        favorite,
        created_at,
        updated_at
    `,
    [title, content, folderId, favorite],
  );

  return result.rows[0];
}

export async function update(
  id,
  { title, content, folderId = null, favorite = false },
) {
  const result = await pool.query(
    `
      UPDATE notes
      SET
        title = $1,
        content = $2,
        folder_id = $3,
        favorite = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING
        id,
        title,
        content,
        folder_id,
        favorite,
        created_at,
        updated_at
    `,
    [title, content, folderId, favorite, id],
  );

  return result.rows[0] ?? null;
}

export async function remove(id) {
  const result = await pool.query(
    `
      DELETE FROM notes
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );

  return result.rows[0] ?? null;
}
