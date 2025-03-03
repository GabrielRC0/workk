const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "testdb",
});

app.get("/users-projects", (req, res) => {
  const query = `
    SELECT u.id as user_id, u.name as user_name, p.id as project_id, p.title as project_title
    FROM users u
    JOIN projects p ON u.id = p.user_id
    ORDER BY u.id, p.id
  `;
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    const data = {};
    results.forEach((row) => {
      if (!data[row.user_id]) {
        data[row.user_id] = {
          id: row.user_id,
          name: row.user_name,
          projects: [],
        };
      }
      data[row.user_id].projects.push({
        id: row.project_id,
        title: row.project_title,
      });
    });
    res.json(Object.values(data));
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
