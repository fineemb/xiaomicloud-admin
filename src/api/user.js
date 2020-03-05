/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : s
 * @Date          : 2020-03-03 22:04:12
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-05 12:23:57
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    // url: 'https://egg.frp.jtsh.top/api/v1/signin',
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
