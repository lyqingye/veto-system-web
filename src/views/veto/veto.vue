<template>
  <div style="margin-left: 10%;margin-right:10%;" v-if="vetoForm != null">
    <el-header style="box-shadow: none;">
      <div style="text-align: center;width: 100%;line-height: 30px;">
        <h2>{{ vetoForm.title }}</h2>
      </div>

      <p style="line-height: 20px;">{{ vetoForm.description }}</p>

    </el-header>
    <el-main>
      <el-divider />

      <el-row v-for="(subject,index) in vetoForm.subjects">
        <div><h4>
          <span v-if="subject.required" style="color: red;">*</span>
          {{ index + 1 }}. {{ subject.title }}
          <span v-if="subject.emptyAlert" style="color: red;float: right;">(该选项为必填)</span></h4>
        </div>
        <el-checkbox-group
          v-if="subject.selectType === 'multiple'"
          v-model="subject.answer"
          @change="subjectAlert(subject)"
        >
          <el-checkbox v-for="option in subject.options" :label="option.id">{{ option.title }}</el-checkbox>
        </el-checkbox-group>

        <el-radio-group
          v-if="subject.selectType === 'single'"
          v-model="subject.answer"
          @change="subjectAlert(subject)"
        >
          <el-radio v-for="option in subject.options" :label="option.id">{{ option.title }}</el-radio>
        </el-radio-group>
      </el-row>
    </el-main>

    <el-footer style="text-align: right; margin-top: 10%;box-shadow: none;">
      <el-button type="primary" @click="submit">提交问卷</el-button>
    </el-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createVetoForm, deleteVetoForm, getEditVetoFormDetail, getVetoList, pulishVetoForm, getPublicVetoFormDetail, saveVetoForm, veto } from '@/api/veto'
export default {
  data() {
    return {
      vetoForm: null
    }
  },
  mounted() {
    getPublicVetoFormDetail(this.$route.params.vetoId).then(resp => {
      if (resp.status === 0) {
        this.vetoForm = resp.data
        this.vetoForm.subjects.forEach((subject) => {
          subject.answer = JSON.parse(subject.answer)
        })
      } else {
        this.$message(resp.message)
      }
    })
  },
  methods: {
    subjectAlert: function(subject) {
      if (subject.selectType === 'single') {
        if (subject.required) {
          subject.emptyAlert = false
        }
      }
      if (subject.selectType === 'multiple') {
        if (subject.required) {
          if (subject.answer.length === 0) {
            subject.emptyAlert = true
          } else {
            subject.emptyAlert = false
          }
        }
      }
    },

    vetoFormRequireCheck: function() {
      let result = true
      this.vetoForm.subjects.forEach((subject, index) => {
        if (subject.required) {
          if (subject.selectType === 'single') {
            if (subject.answer == null) {
              subject.emptyAlert = true
              result = false
            }
          }
          if (subject.selectType === 'multiple') {
            if (subject.answer.length === 0) {
              subject.emptyAlert = true
              result = false
            }
          }
        }
      })
      console.log(result)
      return result
    },

    submit: function() {
      if (!this.vetoFormRequireCheck()) {
        this.$message('你还有未填写的选项，请继续填写')
        return
      }
      var submitData = {
        vetoId: this.vetoForm.vetoId,
        answers: []
      }
      this.vetoForm.subjects.forEach((subject, index) => {
        const subjectAnswer = {
          id: subject.id,
          answer: []
        }

        if (subject.selectType === 'single' && subject.answer != null) {
          subjectAnswer.answer.push(subject.answer)
        }
        if (subject.selectType === 'multiple') {
          subjectAnswer.answer = subject.answer
        }
        submitData.answers.push(subjectAnswer)
      })
      veto(submitData).then(resp => {
        if (resp.status === 0) {
          this.$message('投票成功')
        } else {
          this.$message(resp.message)
        }
      })
      console.log(submitData)
    },

    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style>

</style>
