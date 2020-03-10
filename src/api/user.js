/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : s
 * @Date          : 2020-03-05 23:19:59
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-10 17:47:15
 */
import request from '@/utils/request'

export function login(data) {
  const res = request({
    url: '/signin',
    method: 'post',
    data
  })
  // console.log(res)
  return res
}
export function register(data) {
  const res = request({
    url: '/register',
    method: 'post',
    data
  })
  // console.log(res)
  return res
}

export function addCode(data) {
  const res = request({
    url: '/admin/inviteCode/random10',
    method: 'post',
    data
  })
  // console.log(res)
  return res
}

export function getCode(token) {
  return request({
    url: '/admin/inviteCode/list',
    method: 'get'
  })
}

export function updatePass(data) {
  const res = request({
    url: '/user/updatePass',
    method: 'post',
    data
  })
  // console.log(res)
  return res
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
