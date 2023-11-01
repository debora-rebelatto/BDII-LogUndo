const express = require("express");
const client = require("./database/db");

const transactionsToUndo = require("./utils/transactionsToUndo");
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
    console.log("Inicia conexão com o banco de dados");
    await client.connect();

    const lines = await getInputData();
    await createMetadadoTable();
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

    await insertTransactions(transactions.reverse(), whatToUndo);
  } catch (err) {
    console.log(err);
  }
}

readLog();
