// ???
const jwt = require('jsonwebtoken');
const myDBconn = require('../config/db');
const dotenv = require("dotenv");
dotenv.config({ path:"../.env" });

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    // 如果在 Cookie 中找不到 jwt(也就是refreshToken)，則返回 401 狀態碼，表示未經授權。
    if (!cookies?.jwt){
        return res.sendStatus(401);
    } 
    // 如果找到了refreshToken，接著在資料庫中尋找具有相同refreshToken的用戶。
    const refreshToken = cookies.jwt;
    myDBconn.query('SELECT user,refreshtoken FROM member WHERE refreshToken = ?', 
            [cookies.jwt],function(err, data){
                if(err){
                    console.log("SQL指令執行錯誤=====");
                    console.log(err);
                } else if(data.length = 0){
                    // 如果找不到對應的用戶，則返回 403 狀態碼，表示禁止訪問（Forbidden）
                    return res.sendStatus(403);
                } else if(data.length > 0){
                    // 如果找到了用戶，接著使用 jwt.verify 函式來驗證refreshToken的有效性。

                    // 第一個參數為你的 API Token 也就是 JWT 而變數 token 是由 article.controller.js 中傳過來的，
                    // 第二個參數為 Signature(簽署密碼)，為字串型態，記得要與當時登入時所簽署的密碼一樣否則會出問題，
                    // 第三個參數為 function callback 也就是回傳結果，其中 err 為錯誤訊息、decoded 為 JWT 解密後儲存的資料，
                    jwt.verify(
                        refreshToken,
                        process.env.REFRESH_TOKEN_SECRET,
                        (err, decoded) => {
                            // 如果錯誤，或是解密出的user與資料庫中的user不相符，則返回403狀態碼
                            if (err || data[0].user !== decoded.user){
                                return res.sendStatus(403);
                            } 
                            // 如果refreshToken驗證成功，並且解密出的user與資料庫中的user相符，
                            // 則會生成一個新的accessToken，並將其返回給用戶端。
                            const accessToken = jwt.sign(
                                { "user": decoded.user },
                                process.env.ACCESS_TOKEN_SECRET,
                                { expiresIn: '10s' }
                            );
                            console.log("refresh Access Token");
                            // 將生成的 accessToken 回傳給用戶端
                            res.json({ accessToken })
                        }
                    );
                }
            }
        )
}
    
module.exports = { handleRefreshToken }


// 有三個參數，
// 第一個參數為你的 API Token 也就是 JWT 而變數 token 是由 article.controller.js 中傳過來的，
// 第二個參數為 Signature(簽署密碼)，為字串型態，記得要與當時登入時所簽署的密碼一樣否則會出問題，
// 第三個參數為 function callback 也就是回傳結果，其中 err 為錯誤訊息、payload 為 JWT 解密後儲存的資料，
// 還記得當時候是把用戶姓名、信箱跟用戶 id 一同寫進去 payload 中並使用 Object.assign() 加密產生 JWT。

// 利用 jwt.verify() 解密驗證後會 callback 一個錯誤 err 與 payload



// // 如果找到了refreshToken，接著它在 usersDB.users 中尋找具有相同refreshToken的用戶。
// const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
// // 如果找不到對應的用戶，則返回 403 狀態碼，表示禁止訪問（Forbidden）
// if (!foundUser) return res.sendStatus(403);
// // 如果找到了用戶，接著使用 jwt.verify 函式來驗證refreshToken的有效性。
// // 這個函式會嘗試解析refreshToken，並使用指定的密鑰（process.env.REFRESH_TOKEN_SECRET）來驗證簽名
// jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     (err, decoded) => {
//         // 如果錯誤，或是解析出的用戶名稱與 foundUser 中的用戶名稱不相符，則返回 403 狀態碼
//         if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
//         // 如果refreshToken驗證成功，並且解析出的用戶名稱與 foundUser 中的用戶名稱相符，
//         // 則它會生成一個新的accessToken，並將其返回給用戶端。
//         const accessToken = jwt.sign(
//             { "username": decoded.username },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: '30s' }
//         );
//         // 將生成的 accessToken 回傳給用戶端
//         res.json({ accessToken })
//     }
// );