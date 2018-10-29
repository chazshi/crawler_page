// import './mock/api'
// 这里的假数据都可以直接访问使用

const mock = {};
require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function(file) {
    Object.assign(mock, require('./mock/' + file))
})

export default mock;