const client = require("../database/db.js");

async function createMetadadoTable() {
  try {
    // Comentar caso você não queira apagar tudo a cada execução
    client.query("DROP TABLE IF EXISTS metadado");

    client
      .query(
        "CREATE TABLE IF NOT EXISTS metadado (id VARCHAR(255) PRIMARY KEY, a INTEGER, b INTEGER)"
      )
      .then((res) => console.log("CREATED TABLE metadado"))
      .catch((e) => console.error(e.stack));
  } catch (err) {
    next(err);
    console.log(err);
  }
}

module.exports = createMetadadoTable;
