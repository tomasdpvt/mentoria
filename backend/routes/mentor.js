const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Rota para criar o perfil do mentor
router.post('/criar-perfil', (req, res) => {
    const { nome, especialidade, biografia, contato_email, contato_linkedin } = req.body;

    if (!nome || !especialidade || !biografia || !contato_email) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const query = 'INSERT INTO mentores (nome, especialidade, biografia, contato_email, contato_linkedin) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nome, especialidade, biografia, contato_email, contato_linkedin], (err, result) => {
        if (err) {
            console.error('Erro ao salvar o perfil do mentor:', err);
            return res.status(500).json({ message: 'Erro ao salvar o perfil.' });
        }
        res.status(201).json({ message: 'Perfil do mentor criado com sucesso!' });
    });
});

module.exports = router;
