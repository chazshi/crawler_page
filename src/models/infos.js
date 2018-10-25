
import * as infosService from '../services/getinfos'

export default {

    namespace: 'infos',
  
    state: {
        infosdata: [],
        citysdata: [],
        load: true,
        // citylist: []
        // payload: true
    },
  
    subscriptions: {
    //   setup({ dispatch, history }) {  // eslint-disable-line
    //   },
    },


    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        
        // console.log('infos/fetch');
        
        yield put({ type: 'loading', payload: true });

        let getparam = {};
        // infoslist
        

        const infosresponse = yield call(infosService.getinfos, getparam);

        const citysresponse = yield call(infosService.getcitys, getparam);
        // console.log(response)

        if(infosresponse && citysresponse){
            // console.log('get!')
            // console.log(infosresponse)
            // console.log(citysresponse)
            yield put({
                type: "save",
                payload: {
                    infosdata: infosresponse.data,
                    citysdata: citysresponse.data
                }
            })
            // console.log('save')
        }

        // console.log('loading')
        yield put({ type: 'loading', payload: false });
        // console.log('loading')
      },
    },
  
    reducers: {
      save(state, {payload}) {
        // if() {


        //     citylist.push(payload.data.city)

        // }
        return { ...state, infosdata: payload.infosdata, citysdata: payload.citysdata };
      },

      loading(state, {payload}) {
        //   console.log('payload and state: ')
        //   console.log(payload)
        //   console.log(state)
          return {
              ...state,
              load: payload
          }
      }
    },
  
  };
  