import key from 'keymaster';

export default {

    namespace: 'count',
  
    // 默认state
    state: {
        record: 0,
        current: 0,
    },
  
    // 订阅一个数据源，然后根据条件dispatch需要的action。
    // 数据源可以是当前时间，服务器websocket，keyboard，geolocation变化，history路由变化等
    subscriptions: {
      keyboardWatcher({dispatch}) {
        key('⌘+up, ctrl+up', ()=>{dispatch({type: 'add'})});
      },
    },
  
    // 异步dispatch
    effects: {
        
      *add({ payload }, { call, put }) {  // eslint-disable-line
        yield call((timeout) => {
            return new Promise(resolve => {
                setTimeout(resolve, timeout);
            })
        }, 1000);
        yield put({ type: 'minus' });
        

      },

    },
    
    // 同步dispatch
    reducers: {
        add(state) {
            const newCurrent = state.current + 1;
            return {
                ...state,
                record: newCurrent > state.record? newCurrent:state.record,
                current: newCurrent,
            };
        },

        //问题: 减少是怎么减少到0就停止的？？？
        // 解决： 因为是同名reducers，加几个就减几个
        minus(state) {
            return {
                ...state,
                current: state.current - 1,
            };
        }
    },

};
  