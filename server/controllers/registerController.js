const bcrypt = require("bcryptjs");
const myDBconn = require('../config/db');

const handleNewUser = async (req, res) => {
    // 解構賦值
    const { user, email, phone} = req.body;
    // 先確認有沒有相同的usename
    myDBconn.query('select user from member where user = ?',[user],async function(err, results){
        if(err){
            console.log("SQL指令執行錯誤=====");
            console.log(err);
            return res.status(500).json({ 'message': err.message });
        } else if (results.length > 0){
            // 有找到相同的user，代表已經有這個帳號了，所以要拒絕註冊
            return res.sendStatus(409);
        } else {
            //沒找到相同user，接受註冊
            req.body.pwd = await bcrypt.hash(req.body.pwd, 8); //加密
            myDBconn.query('ALTER TABLE member AUTO_INCREMENT = 1'); //讓ID從1開始
            myDBconn.query("insert into member (user, pwd, email, phone) values (?, ?, ?, ?)", 
                [user, req.body.pwd, email, phone],
                function (err, rows) {
                    if(err){
                        console.log("SQL指令執行錯誤=====");
                        console.log(err);
                    } else {
                        // console.log("SQL執行成功=====");
                        res.status(201).json({ 'success': `New user ${user} created!` });
                    }
                }
            )
        }
    });
}

module.exports = { handleNewUser };