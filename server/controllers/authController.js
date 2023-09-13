const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const myDBconn = require('../config/db');
const dotenv = require("dotenv");
dotenv.config({ path:"../.env" });

const handleLogin = async (req, res) => {
    // 解構賦值
    const { user, pwd } = req.body;
    // 檢查是否有提供使用者名稱和密碼，如果沒有，則回傳400。
    if (!user || !pwd){
        return res.status(400).json({ 'message': 'Username and password are required.' });
    } 
    // 在資料庫中尋找具有相同使用者名稱的用戶。
    myDBconn.query('SELECT user,pwd,refreshToken,roles FROM member WHERE user = ?', 
    [user],
    async function (err, data) {
        if(err){
            console.log("SQL指令執行錯誤=====");
            console.log(err);
        } else if (data.length == 0){
            // 如果找不到符合的user，則返回 401 Unauthorized。
            return res.sendStatus(401);
        } else if (data.length > 0){
            // 如果找到用戶，則使用bcrypt的compare函式來比對輸入的密碼和存儲在資料庫中的密碼是否相符。
            // response會回傳布林值
            bcrypt.compare(pwd.toString(), data[0].pwd, function(err, response){
                if(err){
                    return res.json({
                        message:"比對過程錯誤！"
                    });
                } else if (response){
                    // 比對成功
                    // 把資料庫中這個帳號的roles值提取出來，等一下放進accessToken
                    const roles = data[0].roles;
                    // 產生accessToken
                    const accessToken = jwt.sign(
                        { "user": user,"roles" : roles },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30s' }
                    );
                    // 產生refreshToken
                    const refreshToken = jwt.sign(
                        { "user": user },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '1hr' }
                    );
                    // 第一個參數為 Payload 用來儲存包含各種有關用戶或其他相關資訊的數據。
                    // 第二個參數為 Signature 是個字串型態的簽署金鑰，這是用於對 JWT 進行簽名的密鑰。簽名是一種保護 JWT 不被篡改的方式。
                    // 第三個參數為 Options 是一個包含額外選項的物件，用於定義 JWT 的一些屬性，例如expiresIn、header、audience等。
                    
                    // 將refreshToken寫進資料庫裡
                    myDBconn.query("UPDATE member SET refreshToken = ? WHERE user = ?"
                    ,[refreshToken, user]
                    , function(err, data){
                        if(err){
                            console.log("SQL指令執行錯誤=====");
                            console.log(err);
                        } else {
                            // 將refreshToken命名為jwt，並把jwt存入 HTTP Cookie 中，
                            // 然後返回 accessToken 給用戶端。
                            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                            return res.json({ accessToken, roles });
                            // httpOnly: true 這是一個 cookie 選項，設置為 true 表示該 cookie 只能透過 HTTP 請求存取，不能透過 JavaScript 來存取。
                            // sameSite: 'None'：這是另一個 cookie 選項，設置為 'None' 表示該 cookie 不受同源政策的限制，可以在跨站請求中傳遞。
                            // secure: true：這是一個 cookie 選項，當設置為 true 時，表示該 cookie 只能在 HTTPS 連接中傳遞
                            // maxAge: 設置了 cookie 的最大存活時間，以毫秒為單位。此例中 maxAge 被設置為 24 小時
                        }
                    });
                } else {
                    // 密碼比對錯誤
                    return res.sendStatus(400);
                }
            });
        }
    })
}
module.exports = { handleLogin };




//     // 如果找到用戶，它會使用 bcrypt 的 compare 函式來比對輸入的密碼和存儲在資料庫中的密碼是否相符。
//     const match = await bcrypt.compare(pwd, foundUser.password);
//     // 如果match了
//     if (match) {
//         // 產生accessToken
//         const accessToken = jwt.sign(
//             { "username": foundUser.username },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: '30s' }
//         );
//         // 產生refreshToken
//         const refreshToken = jwt.sign(
//             { "username": foundUser.username },
//             process.env.REFRESH_TOKEN_SECRET,
//             { expiresIn: '1d' }
//         );
//         // 將 refreshToken 存儲在當前用戶的資料中，然後將用戶資料寫回到 users.json 檔案中。
//         // refreshToken會被寫進資料庫裡
//         const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
//         const currentUser = { ...foundUser, refreshToken };
//         usersDB.setUsers([...otherUsers, currentUser]);
//         // 將更新後的使用者資料轉換為 JSON 格式，並寫入到 users.json 檔案中。
//         await fsPromises.writeFile(
//             path.join(__dirname, '..', 'model', 'users.json'),
//             JSON.stringify(usersDB.users)
//         );
//         // 將 refreshToken (注意！是將refreshToken命名為jwt)存入 HTTP Cookie 中，並返回 accessToken 給用戶端。
//         res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
//         res.json({ accessToken });
//     } else {
//         res.sendStatus(401);
//     }




// function (req, res) {
//     myDBconn.query('SELECT id,account,password FROM member WHERE account = ?', 
//         [req.body.account],
//         function (err, data) {
//             if(err){
//                 console.log("SQL指令執行錯誤=====");
//                 console.log(err);
//             } else if(data.length > 0){
//                 // console.log("SQL執行成功");
//                 // console.log("有這個帳號");
//                 bcrypt.compare(req.body.password.toString(), data[0].password, function(err, response){
//                     // console.log(err, response, data);
//                     if(err){
//                         return res.json({
//                             message:"錯誤！"
//                         });
//                     }
//                     if(response){
//                         const account = data[0].account;
//                         const token = jwt.sign({account}, "jwtSecretKey", {expiresIn:"1d"});
//                         res.cookie('token',token);
//                         return res.json({Login:true});
//                     }else{
//                         return res.json({
//                             message:"密碼錯誤！"
//                         });
//                     }
//                     // return res.json({Login:false});
//                 });
//             }else{
//                 // console.log("沒有這個帳號");
//                 return res.json({
//                     message:"沒有這個帳號！"
//                 });
//             }
//         }
//     )
// }