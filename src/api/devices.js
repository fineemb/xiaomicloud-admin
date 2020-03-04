/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : s
 * @Date          : 2020-03-03 22:04:12
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-03 23:50:46
 */
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/devices/list',
    method: 'get',
    params
  })
}
