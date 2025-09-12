const db = require('../db.js'); 

const deletePost = (req, res) => {
    
  const { id } = req.params;

  const sql = 'DELETE FROM posts WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  });
};

module.exports = deletePost;
