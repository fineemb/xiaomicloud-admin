<!--
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   :  f
 * @Date          : 2020-03-03 22:04:12
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-10 17:46:04
 -->
<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-circle-plus" class="add-button" @click="addCode"> 生成邀请码 </el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邀请码" width="500">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>

      <el-table-column align="left" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-document-copy"
            size="mini"
            @click="copyCode(scope.row, $event)"
          >复制</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addCode, getCode } from '@/api/user'
import clip from '@/utils/clipboard'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      typelist: null,
      listLoading: true,
      typename: '',
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '请输入一个名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择一个正确的设备类型', trigger: 'change' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCode().then(response => {
        const items = response.data.items
        this.list = items
        this.listLoading = false
      }).catch((e) => {
        this.listLoading = false
      })
    },
    copyCode(row, event) {
      clip(row.code, event)
    },
    addCode() {
      this.listLoading = true
      addCode(this.passForm).then(response => {
        getCode({}).then(response => {
          const items = response.data.items
          this.list = items
          this.listLoading = false
        }).catch((e) => {
          this.listLoading = false
        })
        this.listLoading = false
        this.$message('已生成新的注册码!')
      })
    }
  }
}
</script>
<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.filter-container {
    padding-bottom: 10px;
    display: flex;
}
.filter-container .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
    margin-right: 5px;
}
.el-input {
  width: 300px;
}
.add-button {
    margin-bottom: 10px;
}
</style>
