const db = require('../db.js')


const getProfile = (req ,res)=>{

    const {id} = req.params;

    const sql = 'SELECT * FROM posts WHERE user_id=?';

    db.query(sql , [id], (err, results)=>{
        if (err) return res.status(500).json({err : err.message});
        res.status(200).json(results);    
    })
}


module.exports = getProfile;