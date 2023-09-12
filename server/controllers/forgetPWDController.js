// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const myDBconn = require('../config/db');
const dotenv = require("dotenv");
dotenv.config({ path:"../.env" });


const handleForgetPWD = async (req, res) => {
    const {user, email} = req.body;
    //先驗證帳號
    myDBconn.query('SELECT user,pwd,email FROM member WHERE user = ?', 
    [user],
    async function (err, data){
        if(err){
            console.log("SQL指令執行錯誤=====");
            console.log(err);
        } else if(data.length == 0) {
            return res.sendStatus(400);
        } else if(data.length > 0){
            const resetPWDToken = jwt.sign(
                { "user": user },
                process.env.RESET_TOKEN_SECRET,
                { expiresIn: '15min' }
            );
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
                }
            });
            
            var mailOptions = {
                from: 'hank57054@gmail.com',
                to: email,
                subject: '重置密碼',
                text: `http://localhost:3000/resetPWD/${user}/${resetPWDToken}`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log("Email發送失敗");
                    console.log(error);
                    return res.sendStatus(401);
                } else {
                    return res.json({
                        status:"驗證信傳送成功！"
                    });
                }
            });
        }
    })
}

module.exports = { handleForgetPWD };