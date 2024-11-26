// Importando o módulo mysql2
const mysql = require('mysql2');

// Criando a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Substitua com o seu usuário do MySQL
  password: 'cofggcvf', // Substitua com sua senha do MySQL
  database: 'sistema_mentoria' // Substitua com o nome do seu banco de dados
});

// Teste de conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    process.exit(1);  // Encerra o processo se não conectar ao banco
  }
  console.log('Conexão com o banco de dados estabelecida.');
});
