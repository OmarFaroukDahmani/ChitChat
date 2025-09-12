const db = require('../db.js'); 

const createPost = (req, res) => {
  const { userid, content } = req.body;

  const sql = 'INSERT INTO posts (user_id, content) VALUES (?, ?)';
  db.query(sql, [userid, content], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    res.status(201).json({
      message: "Post created",
      postId: results.insertId
    });
  });
};

module.exports = createPost;
