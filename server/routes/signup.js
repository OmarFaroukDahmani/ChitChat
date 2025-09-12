const bcrypt = require('bcrypt');
const db = require('../db.js'); 

const signUp = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const checkSql = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(checkSql, [username, email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)";
      db.query(insertSql, [name, username, email, hashedPassword], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = signUp;
