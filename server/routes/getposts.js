const db = require('../db.js')


const getPosts = (req ,res)=>{

    const sql = 'SELECT * FROM posts';

    db.query(sql , (err, results)=>{
        if (err) return res.status(500).json({err : err.message});
        res.status(200).json(results);    
    })
}


module.exports = getPosts;