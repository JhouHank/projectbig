const myDBconn = require('../config/db');

const handleProducts =  async (req, res) => {
    myDBconn.query('SELECT * FROM products',
    async function(err, data){
        if(err){
            console.log("SQL指令執行錯誤=====");
            console.log(err);
        } else if (data.length == 0){
            return res.json(0);
        } else if (data.length > 0){
            res.json(data);
        }
    })
}

module.exports = { handleProducts }