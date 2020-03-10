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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      'roles'
    ])
  },
  methods: {
    configDevice(text, event) {
      clip(text, event)
    }
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
