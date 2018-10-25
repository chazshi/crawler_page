import request from '../utils/request';
// import { func } from 'prop-types';

export function getinfos() {
  return request('/infos');
}

export function getcitys() {

  return request('/infos/citys');
}