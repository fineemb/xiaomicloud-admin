/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : s
 * @Date          : 2020-03-03 22:04:12
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-09 21:03:04
 */
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/device/list',
    method: 'get',
    params
  })
}

export function addDevice(data) {
  return request({
    url: '/user/device/add',
    method: 'post',
    data
  })
}

export function delDevice(data) {
  return request({
    url: '/user/device/delete',
    method: 'post',
    data
  })
}

export function upDataDevice(data) {
  return request({
    url: '/user/device/update',
    method: 'post',
    data
  })
}

