<!--
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : s
 * @Date          : 2020-03-05 23:19:59
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-10 14:54:08
 -->
<template>
  <div class="dashboard-container">
    <div>{{ name }}, 欢迎您!</div>
    <div v-if="roles.indexOf('admin') != -1">你的权限目前是: <span v-for="role in roles" :key="role">{{ role }}</span></div>
    <div>你的账号有效期： <span>{{info.expiredDate ? parseTime(info.expiredDate) : "长期有效"}}</span></div>
    <div v-if="config && config.pushbearKey"> 
      <div>你的企业微信授权地址： <span>https://wechat.jtsh.top/api/v1/cmd/wechat/{{config.userName}}/{{config.pushbearKey}}</span></div>
      <div>你的pushbear详情访问地址： <span>https://wechat.jtsh.top/cmd/{{config.userName}}/{{config.pushbearKey}}</span></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {parseTime} from '@/utils'
import clip from '@/utils/clipboard'

export default {
  name: 'Dashboard',
  data() {
    return {
      code: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'info',
      'config'
    ])
  },
  methods: {
    configDevice(text, event) {
      clip(text, event)
    },
    parseTime: parseTime
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
