import dva from 'dva';
import './index.css';

import createLoading from 'dva-loading';

import createHistory from 'history/createBrowserHistory';

// import dynamic from 'dva/dynamic';

// 1. Initialize
// const app = dva();
const app = dva({
    //默认hashHistory，
    // 问题:修改了build会显示空白，修改.webpackrc里的publicPath为/可以显示部分，但是public里面的静态文件不能被定位，显示c:/
    // 解决：放到nginx服务器里打开localhost就可以了
    history: createHistory(),   
    initialState : {},  // 默认state，优先于models里面的
    // 全局错误处理
    onError(err, dispatch) {
        console.error(err);
    },
});


const opts = {
    namespace: "loading"
}
// 2. Plugins
// app.use({});
app.use(createLoading(opts));

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/count').default);
app.model(require('./models/infos').default);
// 每次添加models都需要手动写这段代码。
// 如果需要自动引入，参考：https://blog.csdn.net/weixin_40792878/article/details/82051278

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


// const UserPageComponent = dynamic({
//     app,
//     models: () => [
//         import('./models/count'),
//     ],
//     component: () => import('./routes/UserPage'),
// })