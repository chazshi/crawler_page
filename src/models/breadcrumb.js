
// import * as infosService from '../services/getinfos'

export default {

    namespace: 'breadcrumb',
  
    state: {
        breadcrumb: ['主页', '招标信息', '今日']
    },
  
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
      },
    
      effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
          yield put({ type: 'save' });
        },
      },
    
      reducers: {
        save(state, action) {
          return { ...state, ...action.payload };
        },

      },
  
  };
  