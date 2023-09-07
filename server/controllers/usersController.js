// const User = require('../model/User');
const myDBconn = require('../config/db');

const getAllUsers = async (req, res) => {
    console.log(req);
    // 找全部用戶
    // const users = await User.find();
    myDBconn.query('select user from member',async function(err, results){
        if(err){
            console.log("SQL指令執行錯誤=====");
            console.log(err);
            return res.status(204).json({ 'message': 'No users found' });
        } else if (results.length == 0){
            // 如果沒找到用戶，回傳204
            return res.status(204).json({ 'message': 'No users found' });
        } else if (results.length > 0){
            // 把全部用戶回傳
            let users = []
            for(let i=0;i<results.length;i++){
                users.push(results[i].user);
            }
            res.json(users);
        }
    })
}
// const getAllUsers = async (req, res) => {
//     const users = await User.find();
//     if (!users) return res.status(204).json({ 'message': 'No users found' });
//     res.json(users);
// }

// const deleteUser = async (req, res) => {
//     if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
//     const user = await User.findOne({ _id: req.body.id }).exec();
//     if (!user) {
//         return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
//     }
//     const result = await user.deleteOne({ _id: req.body.id });
//     res.json(result);
// }

// const getUser = async (req, res) => {
//     if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
//     const user = await User.findOne({ _id: req.params.id }).exec();
//     if (!user) {
//         return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
//     }
//     res.json(user);
// }

module.exports = {
    getAllUsers,
    // deleteUser,
    // getUser
}