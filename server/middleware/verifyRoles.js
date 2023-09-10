// verifyRoles 函式是一個高階函式，它接受一組允許的角色作爲參數，然後返回一個中間件函式。
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // 檢查請求對象 req 是否具有 roles 屬性。如果沒有，它會回傳401，表示未授權。
        if (!req?.roles) return res.sendStatus(401);
        // 將允許的角色列表複製到一個新的陣列 rolesArray 中，以便後續的比較。
        // 使用 map 函式遍歷請求中的角色陣列，並對每個角色檢查是否在 rolesArray 中。
        // 如果有任何一個角色在允許的角色列表中，那麼 result 變數將包含 true 值，否則將包含 false 值。
        
        // 使用 find 函式來搜尋 result 陣列中是否有 true 值。
        // 如果找到了，表示至少有一個角色在允許的角色列表中，中間件將請求 next() 將控制權傳遞給下一個中間件或路由處理程序。
        const result = req.roles === 3;
        // 如果沒有找到 true 值，將回傳401，表示未授權。
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles


// // verifyRoles 函式是一個高階函式，它接受一組允許的角色作爲參數，然後返回一個中間件函式。
// const verifyRoles = (...allowedRoles) => {
//     return (req, res, next) => {
//         // 檢查請求對象 req 是否具有 roles 屬性。如果沒有，它會回傳401，表示未授權。
//         if (!req?.roles) return res.sendStatus(401);
//         // 將允許的角色列表複製到一個新的陣列 rolesArray 中，以便後續的比較。
//         const rolesArray = [...allowedRoles];
//         // 使用 map 函式遍歷請求中的角色陣列，並對每個角色檢查是否在 rolesArray 中。
//         // 如果有任何一個角色在允許的角色列表中，那麼 result 變數將包含 true 值，否則將包含 false 值。
        
//         // 使用 find 函式來搜尋 result 陣列中是否有 true 值。
//         // 如果找到了，表示至少有一個角色在允許的角色列表中，中間件將請求 next() 將控制權傳遞給下一個中間件或路由處理程序。
//         const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
//         // 如果沒有找到 true 值，將回傳401，表示未授權。
//         if (!result) return res.sendStatus(401);
//         next();
//     }
// }

// module.exports = verifyRoles
