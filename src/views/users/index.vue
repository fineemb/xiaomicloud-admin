<!--
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : f
 * @Date          : 2020-03-03 22:31:33
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-03-04 22:23:33
 -->
<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list.filter(data => !filter || data.miid.toLowerCase().includes(filter.toLowerCase())|| data.name.toLowerCase().includes(filter.toLowerCase()))"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-main>
            <el-table
              border
              stripe
              :data="props.row.devices"
            >
              <el-table-column
                prop="did"
                label="DID"
                width="200"
              />
              <el-table-column
                prop="name"
                label="名称"
                width="200"
                align="center"
              />
              <el-table-column
                prop="type"
                label="类型"
                width="200"
                align="center"
              />
            </el-table>
          </el-main>
        </template>
      </el-table-column>
      <el-table-column label="小米账号" width="200" align="center" sortable prop="miid">
        <template slot-scope="scope">
          {{ scope.row.miid }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="200" prop="username" sortable align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备数量" width="100" prop="devices" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.devices.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" width="160" prop="permission" align="center">
        <template slot-scope="scope">
          <el-dropdown trigger="click" @command="changePermission">
            <el-button type="info" size="mini" plain>
              {{ scope.row.permission }} <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a" icon="el-icon-user-solid">管理员</el-dropdown-item>
              <el-dropdown-item command="b" icon="el-icon-user">vip1</el-dropdown-item>
              <el-dropdown-item command="c" icon="el-icon-user">vip2</el-dropdown-item>
              <el-dropdown-item command="d" icon="el-icon-user">vip3</el-dropdown-item>
              <el-dropdown-item command="e" icon="el-icon-user">vip4</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="filter"
            size="mini"
            :s="scope"
            placeholder="输入关键字搜索"
            clearable
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="showDevices(scope.$index, scope.row)"
          >设备</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/users'

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
      listLoading: true,
      filter: '',
      getRowKeys(row) {
        return row.id
      },
      expands: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    showDevices(index, row) {
      console.log(index, row)
      if (this.expands[0] === row.id) {
        this.expands = []
      } else {
        this.expands = [row.id]
      }
    },
    changePermission(command) {
      this.$message('click on item ' + command)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该用户( ' + row.name + ' ), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里写删除接口
        this.$message({
          message: '成功将 ' + row.name + ' 删除',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

