const myDBconn = require('../config/db');

const handleMember = async (req, res) => {
    myDBconn.query('SELECT * FROM users', 
    async function(err, data){
        if(err){
            console.log("SQL指令執行錯誤=====");
            console.log(err);
        } else if (data.length == 0){
            return res.sendStatus(401);
        } else if (data.length > 0){
            res.json(data);
        }
    })
}

const handleEditMember = async (req, res) => {
    const {_id, name, roles} = req.body.editedMember;
    myDBconn.query('UPDATE users SET name = ?, roles = ? WHERE _id = ?',
        [name, roles, _id],
        async function(err, data){
            if(err){
                console.log("SQL指令執行錯誤=====");
                console.log(err);
                return res.sendStatus(400);
            } else {
                // 執行成功
                res.status(201).json({ 'success': `${name} 更改成功` });
            }
        })
}

const handleDeleteMember = async (req, res) => {
    console.log("刪除的:",req.body);
    // myDBconn.query('DELETE email FROM users where _id = ?', 
    // async function(err, data){
    //     if(err){
    //         console.log("SQL指令執行錯誤=====");
    //         console.log(err);
    //     } else if (data.length == 0){
    //         console.log(data.length);
    //         return res.sendStatus(401);
    //     } else if (data.length > 0){
    //         console.log("成功");
    //         res.json(data);
    //     }
    // })
}

module.exports = { handleMember, handleEditMember, handleDeleteMember };

