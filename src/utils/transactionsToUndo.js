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
      return transactionId;
    }
  });
  return test;
}

module.exports = transactionsToUndo;
