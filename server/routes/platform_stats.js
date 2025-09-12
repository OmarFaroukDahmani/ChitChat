const db = require('../db.js'); 

const userStats = (req, res) => {
  const sql = `SELECT COUNT(*) AS userCount FROM users`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

module.exports = userStats;
