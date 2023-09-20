const myDBconn = require('../config/db');

const handleProducts = async (req, res) => {
    myDBconn.query('SELECT * FROM products',
    async function(err, data){
        if(err){
            console.log("SQL指令執行錯誤=====");
            console.log(err);
        } else if (data.length == 0){
            return res.json(0);
        } else if (data.length > 0){
            res.json(data);
        }
    })
}

const handleEditProducts = async (req, res) => {
    const {_id, name, slug, category, price, countInStock} = req.body.editedProducts;
    myDBconn.query('UPDATE products SET name = ?, slug = ?,category = ?,price = ?,countInStock = ? WHERE _id = ?',
        [name, slug, category, price, countInStock, _id],
        async function(err, data){
            if(err){
                console.log("SQL指令執行錯誤=====");
                console.log(err);
                return res.sendStatus(400);
            } else {
                // 執行成功
                res.status(201).json({ 'success': `${name} 更改成功` });
            }
        })

}

const handleOnSaleProducts = async (req, res) => {
    const {name, _id, onSale} = req.body.editedProducts;
    myDBconn.query('UPDATE products SET onSale = ? WHERE _id = ?',
        [onSale, _id],
        async function(err, data){
            if(err){
                console.log("SQL指令執行錯誤=====");
                console.log(err);
                return res.sendStatus(400);
            } else {
                // 執行成功
                res.status(201).json({ 'success': `${name} 更改成功` });
            }
        })

}

module.exports = { handleProducts,handleEditProducts,handleOnSaleProducts }