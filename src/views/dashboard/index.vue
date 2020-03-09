<!--
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : 
 * @Date          : 2020-03-05 23:19:59
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-08 00:26:07
 -->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您! {{ name }}</div>
    <div class="dashboard-text">你的权限目前是: <span v-for="role in roles" :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
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
