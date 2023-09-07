// 匯入JWT及.env 檔案中的環境變數
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const verifyJWT = (req, res, next) => {
    console.log("有進到verifyJWT");
    // 從HTTP請求的headers中提取 Authorization 標頭的值
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader);

    // 如果沒有提供 Authorization 標頭，則返回HTTP狀態碼401，表示未授權。
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    // 下面這行將JWT token從 Bearer token 字串中分割出來，並存儲在 token 變數中。
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            // 如果JWT無效，則返回HTTP狀態碼403，表示禁止訪問，即無效的token。
            if (err){
                return res.sendStatus(403); 
            } 
            // 如果JWT有效，將JWT中的用戶名存儲在 req.user 中，以供後續的路由處理程序使用
            req.user = decoded.user;
            req.roles = decoded.roles;
            next();
        }
    );
}

module.exports = verifyJWT

// 要存取某 API 時，若要身份驗證，則在 JWT 前面加上字串Bearer 再放到 HTTP 請求的 Header 中，
// 這個值就是 Bearer Token，至於為什麼要這樣做？ 
// HTTP 的認證「Authorization」方案有許多種格式，
// 而 Bearer 就是其中一種且被定義在 Header 中的驗證方案


// // 從HTTP請求的headers中提取 Authorization 標頭的值
// const authHeader = req.headers['Authorization'];
// // 如果沒有提供 Authorization 標頭，則返回HTTP狀態碼401，表示未授權。
// if (!authHeader) return res.sendStatus(401);
// console.log(authHeader); // Bearer token
// // 下面這行將JWT token從 Bearer token 字串中分割出來，並存儲在 token 變數中。
// const token = authHeader.split(' ')[1];
// jwt.verify(
//     token,
//     process.env.ACCESS_TOKEN_SECRET,
//     (err, decoded) => {
//         // 如果JWT無效，則返回HTTP狀態碼403，表示禁止訪問，即無效的token。
//         if (err){
//             return res.sendStatus(403); 
//         } 
//         // 如果JWT有效，將JWT中的用戶名存儲在 req.user 中，以供後續的路由處理程序使用
//         req.user = decoded.user;
//         next();
//     }
// );