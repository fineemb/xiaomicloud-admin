/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : s
 * @Date          : 2020-03-03 22:04:12
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-07 23:31:10
 */
import request from '@/utils/request'

export function getTypeList(params) {
  return request({
    url: '/admin/deviceType/list',
    method: 'get',
    params
  })
}

export function addType(data) {
  return request({
    url: '/admin/deviceType/add',
    method: 'post',
    data
  })
}

export function delType(data) {
  return request({
    url: '/admin/deviceType/delete',
    method: 'post',
    data
  })
}

export function upDataType(data) {
  return request({
    url: '/admin/deviceType/update',
    method: 'post',
    data
  })
}

