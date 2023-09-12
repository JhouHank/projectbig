const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const myDBconn = require('../config/db');
const dotenv = require("dotenv");
dotenv.config({ path:"../.env" });

const handleResetPWD = (req, res) => {
    const { user, resetPWDToken } = req.body;
    console.log();
    jwt.verify(
        resetPWDToken,
        process.env.RESET_TOKEN_SECRET,
        async (err, decoded) => {
            if (err){
                // 如果token比對失敗，則返回403狀態碼
                return res.sendStatus(403);
            } else {
                //如果正確，進資料庫改密碼
                req.body.pwd = await bcrypt.hash(req.body.pwd, 8); //要加await
                myDBconn.query("UPDATE member SET pwd = ? WHERE user = ?"
                ,[req.body.pwd, user]
                , function(err, data){
                    if(err){
                        console.log("SQL指令執行錯誤=====");
                        console.log(err);
                    } else {
                        // 執行成功
                        res.status(201).json({ 'success': `${user} reset password!` });
                    }
                });
            }
            
        }
    );
}
    
module.exports = { handleResetPWD }
