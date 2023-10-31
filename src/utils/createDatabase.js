const client = require("../database/db");

// Não funciona, tem que criar na mão. Srry.
async function createDatabase() {
  try {
    client.query("DROP DATABASE IF EXISTS bdlog");

    client
      .query("CREATE DATABASE bdlog")
      .then((res) => console.log("CREATED DATABASE bdlog"))
      .catch((e) => console.error(e.stack));
  } catch (err) {
    next(err);
    console.log(err);
  }
}

module.exports = createDatabase;
