/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : f
 * @Date          : 2020-03-03 22:04:12
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-05 12:14:34
 */
import Mock from 'mockjs'

const data = Mock.mock({
  'items|20': [{
    did: '@string(24)',
    miid: '@string("number", 8)',
    'type|1': ['fine.light.light', 'fine.plug.dc1', 'fine.curtain.fv2', 'fine.curtain.fv1'],
    name: '@name',
    uid: '@name',
    display_time: '@datetime'
  }]
})

const newDevice = Mock.mock({
  data: {
    did: '@string(24)',
    miid: '@string("number", 8)',
    'type|1': ['fine.light.light', 'fine.plug.dc1', 'fine.curtain.fv2', 'fine.curtain.fv1'],
    name: '@name',
    uid: '@name',
    display_time: '@datetime'
  }
})

const delDevice = Mock.mock({
  data: {
    'msg|1': ['err', 'success']
  }
})

const upDevice = Mock.mock({
  data: {
    'msg|1': ['err', 'success']
  }
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
  },
  {
    url: '/vue-admin-template/devices/add',
    type: 'post',
    response: config => {
      const item = newDevice.data
      return {
        code: 20000,
        data: item
      }
    }
  },
  {
    url: '/vue-admin-template/devices/del',
    type: 'post',
    response: config => {
      const item = delDevice.data
      return {
        code: 20000,
        data: item
      }
    }
  },
  {
    url: '/vue-admin-template/devices/updata',
    type: 'post',
    response: config => {
      const item = upDevice.data
      return {
        code: 20000,
        data: item
      }
    }
  }
]
