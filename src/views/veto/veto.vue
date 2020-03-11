<template>
  <div style="margin-left: 10%;margin-right:10%;">
    <el-header>
      <div style="text-align: center;width: 100%;">
        <h2>{{ vetoForm.title }}</h2>
      </div>

      <p>{{ vetoForm.description }}</p>

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

    <el-footer style="text-align: right; margin-top: 10%;">
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
      vetoForm: {
        vetoId: 1,
        title: '大学生就业问卷调查表',
        description: '感谢您在百忙之中参与我们的调查',
        createTime: '2016-10-09',
        subjects: [
          {
            id: 1,
            title: '性别',
            selectType: 'single',
            required: false,
            emptyAlert: false,
            options: [
              {
                id: 1,
                title: '男'
              },
              {
                id: 2,
                title: '女'
              }
            ],
            answer: null
          },
          {
            id: 2,
            title: '多选测试',
            selectType: 'multiple',
            required: true,
            emptyAlert: false,
            options: [
              {
                id: 3,
                title: '男1'
              },
              {
                id: 4,
                title: '女1'
              }
            ],
            answer: []
          }
        ]
      }
    }
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
