import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params
  })
}

export function getConfig(params) {
  return request({
    url: '/admin/user/config',
    method: 'get',
    params
  })
}


export function editConfig(data) {
  return request({
    url: '/admin/user/editConfig',
    method: 'post',
    data
  })
}

//editExpire
export function editExpire(data) {
  return request({
    url: '/admin/user/editExpire',
    method: 'post',
    data
  })
}
