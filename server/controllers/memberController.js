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
    // console.log(req.body.isEmailChanged);
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
    // 先確認是否有更改Email
    // if(!req.body.isEmailChanged){
    //     // 沒有更改 直接更改資料
        
    // } else {
    //     // 有更改，先判斷是否有相同email
    //     await myDBconn.query('select email from users where email = ?',[email],async function(err, results){
    //         if(err){
    //             console.log("SQL指令執行錯誤=====");
    //             console.log(err);
    //             return res.status(500).json({ 'message': err.message });
    //         } else if (results.length > 0){
    //             // 有找到相同的email，代表已經有這個帳號了，拒絕更改
    //             return res.sendStatus(409);
    //         } else {
    //             // 沒找到相同email，接受更改
    //             await myDBconn.query('UPDATE users SET name = ?, email = ?, roles = ? WHERE _id = ?',
    //             [name, email, roles, _id],
    //             async function(err, data){
    //                 if(err){
    //                     console.log("SQL指令執行錯誤=====");
    //                     console.log(err);
    //                     return res.sendStatus(400);
    //                 } else {
    //                     // 執行成功
    //                     res.status(201).json({ 'success': `${name} 更改成功` });
    //                 }
    //             })
    //         }
    //     });
    // }
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

