// verifyRoles 函式是一個高階函式，它接受一組允許的角色作爲參數，然後返回一箇中間件函式。
const verifyRoles = (...allowedRoles) => {
    console.log("有進到verifyRoles");
    return (req, res, next) => {
        // 檢查請求對象 req 是否具有 roles 屬性。如果沒有，它會立即返回401狀態碼，表示未授權。
        if (!req?.roles) return res.sendStatus(401);
        // 將允許的角色列表複製到rolesArray 中，以便后续的比较。
        const rolesArray = [...allowedRoles];
        // 使用 map 函数遍历请求中的角色数组，并对每个角色检查是否在 rolesArray 中。
        // 如果有任何一个角色在允许的角色列表中，那么 result 变量将包含 true 值，否则将包含 false 值。
        // 使用 find 函数来查找 result 数组中是否有 true 值。如果找到了，表示至少有一个角色在允许的角色列表中
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        // 如果没有找到 true 值，中间件将再次返回401状态码，表示未授权。
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles
