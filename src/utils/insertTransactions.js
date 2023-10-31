const client = require("../database/db");

async function insertTransactions(transactions, whatToUndo) {
  console.log("Iniciando inserção dos dados");
  // console.log(whatToUndo);
  await transactions.forEach(async (transaction) => {
    try {
      if (whatToUndo !== undefined) {
        let isUndo = whatToUndo.some((undo) => {
          undo.transactionId === transaction.transactionId;
        });
        if (isUndo) return;
      }

      // Creates a query to insert the data
      const query = `UPDATE "metadado" SET "${transaction.columnName}" = $1 WHERE "id" = $2`;

      await client
        .query(query, [transaction.oldValue, transaction.tupleId])
        .then((res) => console.log("Inserido dados"))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = insertTransactions;
