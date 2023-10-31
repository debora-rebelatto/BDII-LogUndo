const getLineId = require("./getLineId");
const getTransactions = require("./getTransactions");

// O nome é horrível, mas essa função é responsável por pegar os valores de cada linha
// do arquivo de entrada e armazenar em arrays. Esses arrays são usados para identificar
// que linhas devem ser desfeitas e quais devem ser mantidas.

// É verificado que linhas são:
// - Transações
// - Start
// - Checkpoints
// - Commits

function getLineValues(lines) {
  const transactions = [];
  const startTransactions = [];
  const startCheckpoints = [];
  const endCheckpoints = [];
  const commits = [];

  console.log("Iniciando leitura do arquivo de entrada");

  lines.forEach((line, index) => {
    if (line.trim() === "") return;
    const lineLowerCaseSliced = line.toLowerCase().slice(1, -1);
    const transactionPattern = /^t\d+,\d+, [a-z],\d+$/;
    const ckptRegex = /ckpt/g;

    if (transactionPattern.test(lineLowerCaseSliced)) {
      const transaction = getTransactions(lineLowerCaseSliced);
      transactions.push(transaction);
      return;
    }

    if (
      lineLowerCaseSliced.includes("start") &&
      !lineLowerCaseSliced.match(ckptRegex)
    ) {
      const startId = getLineId(lineLowerCaseSliced);
      startTransactions.push({ start: startId, index: index + 1 });
      return;
    }

    if (
      lineLowerCaseSliced.includes("start") &&
      lineLowerCaseSliced.match(ckptRegex)
    ) {
      let startId = lineLowerCaseSliced.split("(")[1].split(")")[0];
      startCheckpoints.push({ start: startId, index: index + 1 });
    }
    if (
      lineLowerCaseSliced.includes("ckpt") &&
      lineLowerCaseSliced.includes("end")
    ) {
      endCheckpoints.push({ end: true, index: index + 1 });
      return;
    }

    if (lineLowerCaseSliced.includes("commit")) {
      let commitId = getLineId(lineLowerCaseSliced);
      commits.push({ commmitId: commitId, index: index + 1 });
      return;
    }
  });

  return {
    transactions,
    startTransactions,
    startCheckpoints,
    endCheckpoints,
    commits,
  };
}

module.exports = getLineValues;
