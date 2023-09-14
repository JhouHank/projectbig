const bcrypt = require("bcryptjs");
const myDBconn = require('../config/db');

const handleChangePWD = async (req, res) => {
    // 先確認有沒有相同的user
    myDBconn.query('select user,pwd from member where user = ?',[req.body.webUser],async function(err, results){
        if(err){
            console.log("SQL指令執行錯誤=====");
            console.log(err);
            return res.status(500).json({ 'message': err.message });
        } else if (results.length == 0){
            // 如果找不到符合的用戶，則返回 401 Unauthorized。
            return res.sendStatus(401);
        } else if(results.length > 0){
            // 有找到相同user，先比對帳號與驗證帳號是否一樣
            if(req.body.webUser !== req.body.user){
                // 如果不一樣，則返回 401 Unauthorized。
                return res.sendStatus(401);
            }
            // 有找到相同user，再比對舊密碼跟資料庫中的密碼是否相同
            bcrypt.compare(req.body.pwd.toString(), results[0].pwd,async function(err, response){
                if(err){
                    return res.json({
                        message:"比對過程錯誤！"
                    });
                } else if(req.body.pwd === req.body.newPwd){
                    // 新舊密碼一樣，回傳400
                    return res.sendStatus(400);
                } else if (response){
                    // 比對成功，將新密碼加密
                    req.body.newPwd = await bcrypt.hash(req.body.newPwd, 8); 
                    // 將新密碼寫進資料庫裡
                    myDBconn.query("UPDATE member SET pwd = ? WHERE user = ?"
                    ,[req.body.newPwd, req.body.user]
                    , function(err, data){
                        if(err){
                            console.log("SQL指令執行錯誤=====");
                            console.log(err);
                        } else {
                            // 執行成功
                            res.status(201).json({ 'success': `${req.body.user} new password!` });
                        }
                    });
                } else {
                    // 比對失敗，回傳401
                    return res.sendStatus(401);
                }
            });
        }
    });
}

module.exports = { handleChangePWD };