const client = require("../database/db");

async function getMetadata() {
  try {
    const selectquery = "SELECT * FROM metadado ORDER BY id";

    await client
      .query(selectquery)
      .then((res) => {
        console.log(res.rows);
      })
      .catch((e) => console.error(e.stack));
  } catch (err) {
    console.log(err);
  }
}

module.exports = getMetadata;
