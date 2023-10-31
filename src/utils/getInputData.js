const fs = require("fs").promises;

async function getInputData() {
  console.log("========= Inicia leitura de log =========");

  const data = await fs.readFile("./src/logFiles/entradaLog.txt", {
    encoding: "utf8",
  });
  let lines = data.split(/\r?\n/);
  return lines.reverse();
}

module.exports = getInputData;
