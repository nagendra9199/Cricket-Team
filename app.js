const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;
const initilizeServerAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {});
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initilizeServerAndServer();

app.get("/players/", async (request, response) => {
  const getPlayers = `Select * From cricketTeam Order By playerId`;
  const players = await db.all(getPlayers);
  response.send(players);
});
module.exports = app;
