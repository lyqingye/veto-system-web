<template>
  <div style="margin-left: 10%;margin-right:10%;">
    <el-header style="box-shadow: none;">
      <div style="text-align: center;width: 100%;line-height: 30px;">
        <h2>{{ statistic.title }}</h2>
      </div>

      <p style="line-height: 20px;">{{ statistic.description }}</p>

    </el-header>
    <el-main>
      <el-divider />
      <el-row v-for="(subject,index) in statistic.subjects">
        <div><h4>{{index + 1}}.{{subject.title}} </h4> </div>
        <el-table
          :data="subject.options"
          style="width: 100%"
        >
          <el-table-column
            prop="title"
            label="选项名"

            width="180"
          />
          <el-table-column
            prop="vetoCount"
            label="票数"

            width="180"
          />
          <el-table-column
            prop="proportion"
            label="占比"
            width="200px"
          >
          <template slot-scope="scope">
                  <el-progress :percentage="scope.row.proportion" />
          </template>
          </el-table-column>
        </el-table>

      </el-row>

    </el-main>

    <el-footer style="text-align: right; margin-top: 10%;box-shadow: none;">
      <el-button type="primary">提交问卷</el-button>
    </el-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getVetoFormStatistic } from '@/api/veto'
export default {
  data() {
    return {
      statistic: null,

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
  mounted() {
    getVetoFormStatistic(this.$route.params.vetoId).then(resp => {
      if (resp.status === 0) {
        this.statistic = resp.data
      } else {
        this.$message(resp.message)
      }
    })
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
