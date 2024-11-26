const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const router = express.Router();

// Rota de cadastro para mentores
router.post('/cadastro-mentor', async (req, res) => {
  const { name, email, password, specialty } = req.body;

  if (!name || !email || !password || !specialty) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO mentors (name, email, password, specialty) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, specialty],
      (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: 'Erro ao cadastrar mentor.' });
        }
        res.status(201).json({ message: 'Cadastro de mentor realizado com sucesso!' });
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota de cadastro para mentorados
router.post('/cadastro-mentorado', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO mentees (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: 'Erro ao cadastrar mentorado.' });
        }
        res.status(201).json({ message: 'Cadastro de mentorado realizado com sucesso!' });
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota de login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios!' });
  }

  db.query('SELECT * FROM mentors WHERE email = ? UNION SELECT * FROM mentees WHERE email = ?', [email, email], async (err, results) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    res.status(200).json({ message: 'Login realizado com sucesso!' });
  });
});

module.exports = router;
