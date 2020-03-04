/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : f
 * @Date          : 2020-03-03 22:04:12
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-04 15:19:45
 */
import Mock from 'mockjs'

const data = Mock.mock({
  'items|20': [{
    did: '@string(24)',
    miid: '@string("number", 8)',
    'type|1': ['fine.light.light', 'fine.plug.dc1', 'fine.curtain.fv2', 'fine.curtain.fv1'],
    name: '@name',
    userid: '@name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/vue-admin-template/devices/list',
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
