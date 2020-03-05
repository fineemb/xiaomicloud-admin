/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : s
 * @Date          : 2020-03-03 22:04:12
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-05 12:19:06
 */
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/devices/list',
    method: 'get',
    params
  })
}

export function addDevice(data) {
  return request({
    url: '/vue-admin-template/devices/add',
    method: 'post',
    data
  })
}

export function delDevice(data) {
  return request({
    url: '/vue-admin-template/devices/del',
    method: 'post',
    data
  })
}

export function upDataDevice(data) {
  return request({
    url: '/vue-admin-template/devices/updata',
    method: 'post',
    data
  })
}

