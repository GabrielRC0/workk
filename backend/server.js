const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

let connection;

async function connectWithRetry() {
  while (true) {
    try {
      connection = mysql
        .createConnection({
          host: process.env.DB_HOST || "db",
          user: process.env.DB_USER || "root",
          password: process.env.DB_PASSWORD || "",
          database: process.env.DB_NAME || "testdb",
        })
        .promise();

      await connection.query("SELECT 1");
      console.log("MySQL conectado com sucesso!");
      break;
    } catch (error) {
      console.error(
        "Erro ao conectar ao MySQL, tentando novamente em 3 segundos...",
        error
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

(async () => {
  await connectWithRetry();

  app.get("/projects-screens", async (req, res) => {
    try {
      const [projects] = await connection.query(
        "SELECT * FROM projects ORDER BY id"
      );
      const result = await Promise.all(
        projects.map(async (proj) => {
          const [[userRow]] = await connection.query(
            "SELECT * FROM users WHERE id = ?",
            [proj.user_id]
          );

          const [screens] = await connection.query(
            "SELECT * FROM project_screens WHERE project_id = ? ORDER BY id",
            [proj.id]
          );

          return {
            project_id: proj.id,
            project_title: proj.title,
            user_name: userRow ? userRow.name : "Usuário Desconhecido",
            screens: screens.map((s) => ({
              id: s.id,
              header_color: s.header_color,
              body_color: s.body_color,
              footer_color: s.footer_color,
            })),
          };
        })
      );

      res.json(result);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      res.status(500).send(error);
    }
  });

  app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
  });
})();
