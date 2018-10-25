// # FIXME: 没引入进.roadhogrc.mock.js

export default {
    'GET /admin': { users: [{username: 'admin', password: '123', role: 'administrator'}] },
    'POST /admin': (req, res) => { res.end('admin!'); },
};