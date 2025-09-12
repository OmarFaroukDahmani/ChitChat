const db = require('../db.js');

const editPost = (req, res) => {
  const { id } = req.params;        
  const { content } = req.body;   

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  const sql = 'UPDATE posts SET content = ? WHERE id = ?';
  db.query(sql, [content, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully" });
  });
};

module.exports = editPost;
