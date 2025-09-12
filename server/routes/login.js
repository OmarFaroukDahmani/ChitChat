const bcrypt = require('bcrypt');
const db = require('../db.js'); 


const login = async (req, res) => {
  const { userid, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(sql, [userid, userid], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  });
};

module.exports = login;
