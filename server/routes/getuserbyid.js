const db = require('../db.js')

const getUsers = (req, res) => {
  const sql = 'SELECT id, username FROM users'

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err.message)
      return res.status(500).json({ error: 'Failed to retrieve users.' })
    }

    return res.status(200).json(results) 
  })
}

module.exports = getUsers
