const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Rota para listar agendamentos do mentor
router.get('/:idMentor', (req, res) => {
    const idMentor = req.params.idMentor;

    const query = 'SELECT * FROM agendamentos WHERE id_mentor = ?';
    db.query(query, [idMentor], (err, results) => {
        if (err) {
            console.error('Erro ao buscar agendamentos:', err);
            return res.status(500).json({ message: 'Erro ao buscar agendamentos.' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
