import './mock/api'
// 这里的假数据都可以直接访问使用
export default {
    'GET /api': { users: [{username: 'users', password: '123', role: 'administrator'}] },
    'POST /api': (req, res) => { res.end('users!'); },
};
