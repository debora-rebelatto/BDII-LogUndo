function transactionsToUndo(
  transactions,
  commits,
  startTransitions,
  startCheckpoints,
  endCheckpoints
) {
  const test = transactions.filter((transaction) => {
    const transactionId = transaction.transactionId;
    const isInCommit = commits.some(
      (commit) => commit.commmitId === transactionId
    );

    const isInStartTransition = startTransitions.some(
      (startTransition) => startTransition.start === transactionId
    );

    const isInStartCheckpoint = startCheckpoints.some(
      (startCheckpoint) => startCheckpoint.start === transactionId
    );
    const isInEndCheckpoint = endCheckpoints.some(
      (endCheckpoint) => endCheckpoint.end
    );
    console.log(transaction.transactionId);

    if (isInCommit) {
      return;
    }

    if (isInStartCheckpoint && isInEndCheckpoint) {
      return;
    }

    if (
      (!isInCommit && !isInStartTransition && !isInStartCheckpoint) ||
      (isInStartTransition && !isInEndCheckpoint) ||
      (isInStartCheckpoint && !isInEndCheckpoint)
    ) {
      console.log("return id");
      return transactionId;
    }
  });
  return test;
}

module.exports = transactionsToUndo;
