<template>
  <div style="margin-left: 10%;margin-right:10%;">
    <el-header>
      <div style="text-align: center;width: 100%;">
        <h2>大学生就业问卷调查表</h2>
      </div>

      <p>感谢您在百忙之中参与我们的调查，问卷按照真实情况填写即可，没有正确答案。 本次调查只用于统计和分析，不会泄露你的信息，请您放心。谢谢配合</p>

    </el-header>
    <el-main>
      <el-divider></el-divider>
      <el-row>
        <div><h4>1. 性别</h4> </div>
        <el-table
            :data="tableData"
            style="width: 100%"
            >
            <el-table-column
              prop="date"
              label="选项名"

              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="票数"

              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="占比"
              width="200px"
              >
              <el-progress percentage="50"></el-progress>
            </el-table-column>
          </el-table>

      </el-row>
      <el-row>
        <div><h4>2. 多选</h4>
        </div>
         <el-checkbox-group v-model="checkList">
             <el-checkbox label="复选框 A"></el-checkbox>
             <el-checkbox label="复选框 B"></el-checkbox>
             <el-checkbox label="复选框 C"></el-checkbox>
         </el-checkbox-group>
      </el-row>
    </el-main>

    <el-footer style="text-align: right; margin-top: 10%;">
      <el-button type="primary">提交问卷</el-button>
    </el-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      radio: true,
      checkList: [],
tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods: {

    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style>

</style>
