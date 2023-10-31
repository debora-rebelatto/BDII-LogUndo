# :notebook: BD II - Trabalho Prático de Log

O termo "undo" em um log de banco de dados se refere a um registro ou um mecanismo que permite desfazer as operações de uma transação registrada no log. Em sistemas de gerenciamento de banco de dados (DBMS), o "undo" desempenha um papel fundamental na garantia da consistência e da durabilidade das transações.

1. **Transações e Atomicidade**: Em um DBMS, as transações são unidades lógicas de trabalho que consistem em uma série de operações, como inserções, atualizações e exclusões de dados. A propriedade ACID (Atomicidade, Consistência, Isolamento e Durabilidade) garante que as transações sejam executadas de forma segura, mesmo em caso de falhas no sistema.

2. **Undo Log**: Para garantir a atomicidade e a consistência das transações, os DBMS mantêm um registro chamado "undo log" (ou "log de desfazer"). Este log registra todas as modificações feitas no banco de dados como parte de uma transação. Essas modificações são registradas de forma reversa, o que significa que as ações necessárias para desfazer as alterações são registradas no log em ordem inversa. Isso permite que o sistema reverta as operações de uma transação se ocorrer uma falha.

3. **Rollback**: Se uma transação não for concluída devido a uma falha ou erro, o sistema de banco de dados usa as informações no "undo log" para reverter as modificações que a transação havia feito até o ponto da falha. Isso é conhecido como um "rollback", e ele assegura que o banco de dados retorne a um estado consistente e estável.

4. **Isolamento e Recuperação**: O "undo" também desempenha um papel importante na propriedade de Isolamento (a segunda letra do acrônimo ACID). Garante que outras transações em execução no banco de dados não vejam as modificações de uma transação que ainda não foi confirmada (commit). Isso permite que as transações ocorram isoladamente e não interfiram umas nas outras.

Portanto, o "undo" em um log de banco de dados é uma parte crucial para garantir a consistência, a atomicidade e a capacidade de recuperação das transações em sistemas de gerenciamento de banco de dados.

## [:paperclip: Descrição da tarefa](https://docs.google.com/document/d/12ExZiKP9j_zXwnjbZfGA74m5fSXff2ErAOLCdfs0ye0/edit)

Objetivo: implementar o mecanismo de log Undo com checkpoint usando o SGBD
Funcionamento:
O código, que poderá utilizar qualquer linguagem de programação, deverá ser capaz de ler o arquivo de log (entradaLog) e o arquivo de Metadado e validar as informações no banco de dados através do modelo UNDO.
O código receberá como entrada o arquivo de metadados (dados salvos) e os dados da tabela que irá operar no banco de dados.
Exemplo de tabela do banco de dados:

<table>
  <tr>
    <th>ID</th>
    <th>A</th>
    <th>B</th>
  </tr>
  <tr>
    <td>1</td>
    <td>20</td>
    <td>55</td>
  </tr>
  <tr>
    <td>2</td>
    <td>20</td>
    <td>30</td>
  </tr>
</table>

Arquivo de Metadado (json):

```json
{
  "INITIAL": {
    "id": [1, 2],
    "A": [20, 20],
    "B": [55, 30]
  }
}
```

Arquivo de log no formato <transação, “id da tupla”,”coluna”, “valor antigo”, “valor novo”>. Exemplo:

Arquivo de Log:

```bash
<start T1>
<T1,1, A,20>
<start T2>
<commit T1>
<START CKPT(T2)>
<T2,2, B,20>
<commit T2>
<END CKPT>
<start T3>
<start T4>
<T4,1, B,55>
```

Saída:
“Transação T3 realizou UNDO”
“Transação T4 realizou UNDO”

Imprima as variáveis, exemplo:

```json
{
  "table": {
    "A": [500,20],
    "B": [20,30]
  }
} * 500 e 30 são os novos valores

```

## Detalhes

Funções a serem implementadas:

- [x] Carregar o banco de dados com a tabela antes de executar o código do log (para zerar as configurações e dados parciais). Notem que a tabela pode ter um número diferente de colunas e linhas.
- [x] Carregar o arquivo de log;
- [x] Verifique quais transações devem realizar UNDO. Imprimir o nome das transações que irão sofrer Undo.
- [x] Checar quais valores estão salvos nas tabelas (com o select) e atualizar valores inconsistentes (update);
- [x] Reportar quais dados foram atualizados;
- [x] Seguir o fluxo de execução conforme o método de UNDO, conforme visto em aula;

## :floppy_disk: Instalação

```bash
git clone https://github.com/debora-rebelatto/BDII-Log
cd BDII-Log
npm i
```

## :electric_plug: Conectando ao Banco de Dados

O Node-Postgres é um cliente PostgreSQL para Node.js. Ele é escrito em JavaScript e pode ser usado com o Node.js ou com o navegador. Para mais informações, acesse [aqui](https://node-postgres.com/).

## :computer: Executando

```bash
node src/index.js
```

ou, para atualização constante, instale o nodemon

```bash
npm i -g nodemon
```

e rode o seguinte comando no terminal:

```bash
nodemon
```

## :wrench: Configuração

Crie o Banco de Dados no postgres.

```sql
CREATE DATABASE bdlog;
```

## Desenvolvimento

Durante o desenvolvimento foi utilizado o banco de dados PostgreSQL, que pode ser baixado [aqui](https://www.postgresql.org/download/).
Para fazer as alterações, foi utilizado o NodePostgres, que pode ser encontrado [aqui](https://node-postgres.com/).
