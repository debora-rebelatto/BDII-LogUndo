const client = require("../database/db");
const getMetadata = require("./getMetadata");

async function insertTransactions(transactions, whatToUndo) {
  await transactions.forEach(async (transaction) => {
    try {
      if (whatToUndo !== undefined) {
        let isUndo = whatToUndo.some((undo) => {
          undo.transactionId === transaction.transactionId;
        });
        if (isUndo) return;
      }

      const queryCurrentValue = `SELECT "${transaction.columnName}" FROM "metadado" WHERE "id" = $1`;
      const currentValue = await client
        .query(queryCurrentValue, [transaction.tupleId])
        .then((res) => res.rows[0])
        .catch((err) => console.log(err));

      // Creates a query to insert the data
      const query = `UPDATE "metadado" SET "${transaction.columnName}" = $1 WHERE "id" = $2`;

      await client.query(query, [transaction.oldValue, transaction.tupleId]);

      // logs some info
      console.log("====================================");
      console.log("Transação: ", transaction.transactionId);
      console.log("Tupla: ", transaction.tupleId);
      console.log("Coluna: ", transaction.columnName);
      console.log("Valor antigo: ", currentValue[transaction.columnName]);
      console.log("Valor novo: ", transaction.oldValue);
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = insertTransactions;
