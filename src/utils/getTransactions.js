function getTransactions(lineLowerCaseSliced) {
  const slicedArray = lineLowerCaseSliced.replace(/\s/g, "").split(",");

  const transactionId = slicedArray[0];
  const tupleId = slicedArray[1];
  const columnName = slicedArray[2];
  const oldValue = slicedArray[3];

  return {
    transactionId,
    tupleId,
    columnName,
    oldValue,
  };
}

module.exports = getTransactions;
