const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Troque pelo seu usuário do MySQL
    password: '', // Troque pela sua senha do MySQL
    database: 'sistema_mentoria'
});

// Rota para cadastrar mentor
app.post('/cadastro/mentor', async (req, res) => {
    const { nome, sobrenome, email, senha, cargo, categoria, biografia, habilidade } = req.body;
    const hashedSenha = await bcrypt.hash(senha, 10);

    const query = 'INSERT INTO mentores (nome, sobrenome, email, senha, cargo, categoria, biografia, habilidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, sobrenome, email, hashedSenha, cargo, categoria, biografia, habilidade], (err) => {
        if (err) return res.status(500).send('Erro no cadastro do mentor.');
        res.send('Mentor cadastrado com sucesso!');
    });
});

// Rota para cadastrar mentorado
app.post('/cadastro/mentorado', async (req, res) => {
    const { nome, sobrenome, email, senha } = req.body;
    const hashedSenha = await bcrypt.hash(senha, 10);

    const query = 'INSERT INTO mentorados (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, sobrenome, email, hashedSenha], (err) => {
        if (err) return res.status(500).send('Erro no cadastro do mentorado.');
        res.send('Mentorado cadastrado com sucesso!');
    });
});

// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM mentores WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send('Erro no login.');

        if (results.length > 0) {
            const mentor = results[0];
            if (await bcrypt.compare(senha, mentor.senha)) {
                return res.send('Login realizado com sucesso como mentor!');
            }
        }

        db.query('SELECT * FROM mentorados WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).send('Erro no login.');

            if (results.length > 0) {
                const mentorado = results[0];
                if (await bcrypt.compare(senha, mentorado.senha)) {
                    return res.send('Login realizado com sucesso como mentorado!');
                }
            }

            res.status(401).send('Credenciais inválidas.');
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
