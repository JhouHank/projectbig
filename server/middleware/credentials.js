// 匯入白名單
const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        // 把header中的Access-Control-Allow-Credentials設定為true
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials