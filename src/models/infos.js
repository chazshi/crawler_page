
import * as infosService from '../services/getinfos'

export default {

    namespace: 'infos',
  
    state: {
        infosdata: [],
        citysdata: [],
        load: true,
        // citylist: []
        // payload: true

        breadcrumb: ['主页', '招标信息', '今日信息'],
        breadcrumbId: 1,
    },
  
    subscriptions: {
    //   setup({ dispatch, history }) {  // eslint-disable-line
    //   },
    },


    effects: {
      *fetch({ payload, dateparam }, { call, put }) {  // eslint-disable-line
        
        
        
        yield put({ type: 'loading', payload: true });

        // infoslist
        // console.dir(dateparam)


        if(dateparam) {
            
            // (`/infos?datelimit=${dateparam}&_limit=${PAGE_SIZE}`);
        } else {
        }

        // getparam = this.state.breadcrumbId;

        

        const infosresponse = yield call(infosService.getinfos, dateparam);

        const citysresponse = yield call(infosService.getcitys);
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
      },

      breadcrumb(state, {payload}) {
        return {
            ...state,
            ...payload
        }
      }


    },

  
  };
  