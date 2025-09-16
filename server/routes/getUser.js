const db = require('../db.js');

const getUser = (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT  FROM users WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(results[0]);
  });
};

module.exports = getUser;