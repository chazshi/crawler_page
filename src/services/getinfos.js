import request from '../utils/request';
// import { func } from 'prop-types';

export function getinfos(options) {
  var requesturi = '/infos';
  if(options) {
    requesturi += ("?date=" + options);

  } else {
    
  }

  var requestParameter = {}
  // console.log(requesturi)
  return request(requesturi, requestParameter);
  // return request('/infos/', requestParameter);
}

export function getcitys(options) {
  var requestParameter = {}
  return request('/infos/citys', requestParameter);
}