/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : f
 * @Date          : 2020-03-03 22:04:12
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-05 11:04:18
 */
import Mock from 'mockjs'

const data = Mock.mock({
  'items|25': [{
    uid: '@id',
    miid: '@string("number", 8)',
    name: '@name',
    display_time: '@datetime',
    permission: '@integer(1, 6)',
    'devices|5': [{
      did: '@string(24)',
      'type|1': ['fine.light.light', 'fine.plug.dc1', 'fine.curtain.fv2', 'fine.curtain.fv1'],
      name: '@name'
    }]
  }]
})

export default [
  {
    url: '/vue-admin-template/users/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
