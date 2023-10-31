const metadado = require("../logFiles/metadado.json");
const client = require("../database/db");

async function insertInitialData() {
  try {
    // Encontra o tamanho da tabela de metadado que iremos inserir
    // de acordo com o arquivo inicial
    let size = metadado.table.id.length;

    const insertvalues = "INSERT INTO metadado (id, A, B) VALUES ($1, $2, $3)";

    // Para cada valor é montado uma query e enviado para o banco de dados
    for (let i = 0; i < size; i++) {
      let values = [
        metadado.table.id[i],
        metadado.table.a[i],
        metadado.table.b[i],
      ];

      await client.query(insertvalues, values).catch((err) => console.log(err));
    }
    console.log("Inserido com sucesso");
  } catch (err) {
    console.log(err);
  }
}

module.exports = insertInitialData;
