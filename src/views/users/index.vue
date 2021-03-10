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
      :data="list"
      :row-key="getRowKeys"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column  width="80" label="id" prop="id" sortable align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        width="200"
        prop="username"
        sortable
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="权限"
        width="160"
        prop="permission"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isAdmin == 1 ? "管理员" : "普通用户" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="注册日期"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createdAt | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="有效期"
        width="250"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.expiredDate">长期</span>
          <el-date-picker
            v-if="scope.row.expiredDate"
            v-model="scope.row.expiredDate"
            type="datetime"
            @change="handleDateChange(scope.row)"
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
    </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handlePushbear(scope.row)" type="text" size="small">pushbear</el-button>
        <el-button @click="handleDateChange2(scope.row, 1)" type="text" size="small">有效期1年</el-button>
        <el-button @click="handleDateChange2(scope.row, 3)" type="text" size="small">有效期3年</el-button>
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </template>
    </el-table-column>
    </el-table>
    
    <div class="user-pagination">
      <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
      </el-pagination>
    </div>

    <el-dialog title="编辑配置" :visible.sync="dialogFormVisible">
      <el-form :model="userConfig">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userConfig.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="pushbearKey" :label-width="formLabelWidth">
          <el-input v-model="userConfig.pushbearKey" autocomplete="off">
            <el-button slot="append"  type="primary" @click="randomKey" icon="el-icon-refresh"/>
          </el-input>
          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userConfigCancel">取 消</el-button>
        <el-button type="primary" @click="userConfigSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getConfig, editConfig, editExpire } from "@/api/users";
const dayjs = require('dayjs')

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
    formatDate(time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  },
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      list: [],
      total: 0,
      listLoading: true,
      filter: "",
      getRowKeys(row) {
        return row.id;
      },
      userConfig: {
        userId: '',
        userName: '',
        pushbearKey: ''
      },
      expands: [],
      pickerOptions: {
          shortcuts: [{
            text: '一年',
            onClick(picker) {
              const date = new Date()
              date.setFullYear(date.getFullYear() + 1)
              picker.$emit('pick', date);
            }
          }, {
            text: '两年',
            onClick(picker) {
              const date = new Date();
              date.setFullYear(date.getFullYear() + 2)
              picker.$emit('pick', date);
            }
          }, {
            text: '三年',
            onClick(picker) {
              const date = new Date();
              date.setFullYear(date.getFullYear() + 3)
              picker.$emit('pick', date);
            }
          }, {
            text: '过期',
            onClick(picker) {
              const date = new Date('2020-01-01');
              // date.setFullYear(date.getFullYear() + 3)
              picker.$emit('pick', date);
            }
          }]
        }
    };
  },
  created() {
    this.fetchData(1, 20);
  },
  methods: {
    fetchData(page, pageSize) {
      this.listLoading = true;
      getList({page, pageSize}).then((response) => {
        // console.log(response);
        this.list = response.data.rows;
        this.total = response.data.count
        this.listLoading = false;
      });
    },
    handleCurrentChange(page) {
      this.fetchData(page, 20);
    },
    handleDateChange(row) {
      this.$confirm(
        "此操作将用户有效期设置为( " + this.formatDate(row.expiredDate) + " ), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const param = {
            id :row.id,
            expiredDate: this.formatDate(row.expiredDate) 
          }
            editExpire(param).then((response) => {
              this.$message({
                message: "更新成功",
                type: "success",
              });
          })
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消设置",
          });
        });
    },
    handleDateChange2(row, type) {
      const date = new Date()
      date.setFullYear(date.getFullYear() + type)
      const param = {
            id :row.id,
            expiredDate: this.formatDate(date)
          }
      editExpire(param).then((response) => {
          this.$message({
            message: "更新成功",
            type: "success",
          });
      })

    },  
    formatDate(time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm(
        "此操作将永久删除该用户( " + row.name + " ), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // 这里写删除接口
          this.$message({
            message: "成功将 " + row.name + " 删除",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handlePushbear(row) {
      this.listLoading = true
      getConfig({userId: row.id}).then((response) => {
        this.listLoading = false
        this.dialogFormVisible = true
        this.userConfig.userId = row.id
        this.userConfig.userName = row.name
        if (response.data) {
          this.userConfig.pushbearKey = response.data.pushbearKey
        }
        
      })

    },
    userConfigCancel() {
      this.dialogFormVisible = false
      this.userConfig.userId = ''
      this.userConfig.pushbearKey = ''
      this.userConfig.userName = ''

    },
    userConfigSubmit() {
      if (!this.userConfig.pushbearKey) {
        this.$message({
            type: "info",
            message: "pushbearKey 不能为空",
          });
        return
      }

      const param = Object.assign(this.userConfig)

      editConfig(param).then((response) => {
        this.userConfigCancel()
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      })
    },
    randomKey () {
      const e = 6
      const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"
      const a = t.length
      let n = ""
      for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
      this.userConfig.pushbearKey = this.userConfig.userName + n;
    }

  }
};
</script>

<style scoped>
.user-pagination {
  margin-top: 16px;
  margin-bottom: 24px;
  text-align: center;
}

</style>

