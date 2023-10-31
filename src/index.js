const express = require("express");
const client = require("./database/db");

const transactionsToUndo = require("./utils/transactionsToUndo");
const createDatabase = require("./utils/createDatabase");
const createMetadadoTable = require("./utils/createMetadadoTable");
const insertInitialData = require("./utils/insertInitialData");
const getMetadata = require("./utils/getMetadata");
const getLineValues = require("./utils/getLineValues");
const getInputData = require("./utils/getInputData");
const insertTransactions = require("./utils/insertTransactions");

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

async function readLog() {
  try {
    // Get all lines from the log file
    const lines = await getInputData();

    console.log("Inicia conexão com o banco de dados");
    // await createDatabase();
    await client.connect();
    await createMetadadoTable(client);
    await insertInitialData();
    await getMetadata();

    // Get all values from the log file
    const {
      transactions,
      startTransactions,
      startCheckpoints,
      endCheckpoints,
      commits,
    } = getLineValues(lines);

    // Finds wich lines to undo
    const whatToUndo = transactionsToUndo(
      transactions,
      commits,
      startTransactions,
      startCheckpoints,
      endCheckpoints
    );

    // Insert the values in the database
    await insertTransactions(transactions.reverse(), whatToUndo);

    // Log the metadata
    await getMetadata();
  } catch (err) {
    console.log(err);
  }
}

readLog();
