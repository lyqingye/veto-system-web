<template>
  <div>
    <el-container>
      <el-header
        style="vertical-align: middle;
    line-height: 60px;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 0px 0px rgba(232, 232, 232, 1);"
      >
        <el-row>
          <div style="vertical-align: middle;float: left;">
            <img class="logo" src="https://www.wjx.cn/images/commonImgPC/logo@2x.png">
            投票系统
          </div>
          <div style="float: right;margin-top: 10px;">
            <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                <el-row>
                  <el-col :span="12">
                    <el-avatar shape="square" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" />
                  </el-col>
                  <el-col :span="12">
                    <div style="float: right;margin-left: 2px;">
                      <span><i class="el-icon-caret-bottom">lyqingye</i></span>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link to="/home">
                  <el-dropdown-item>
                    Home
                  </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided @click.native="logout">
                  <span style="display:block;">Log Out</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>

      </el-header>

      <el-container style="margin-top: 48px;">
        <el-aside width="300px" style="margin-left: 10%;">

          <el-card class="box-card" style="margin-top: 23px;">
            <div slot="header" class="clearfix">
              <span>可选组件</span>

            </div>
            <div>
              <el-radio>单选框</el-radio>
              <el-button size="mini" style="float: right;padding: 2px 4px;" @click="addSubject('single')">+</el-button>
            </div>
            <el-divider />
            <div>
              <el-checkbox :checked="true">多选框</el-checkbox>
              <el-button size="mini" style="float: right;padding: 2px 4px;" @click="addSubject('multiple')">+</el-button>
            </div>

          </el-card>

          <el-card class="box-card" style="margin-top: 30px;">
            <div slot="header" class="clearfix">
              <span>属性编辑</span>
            </div>
            <div>
              <el-form v-if="edittingSubject != null" ref="form" size="mini">
                <el-form-item label="标题">
                  <el-input v-model="edittingSubject.title" size="mini" />
                </el-form-item>

                <el-form-item label="必填">
                  <el-checkbox v-model="edittingSubject.required" />

                </el-form-item>
                <el-form-item label="选项">
                  <br>
                  <el-row v-for="(option,index) in edittingSubject.options" :key="index" style="margin-top: 10px;">
                    <el-input v-model="option.title" style="width: 75%;" />
                    <el-button
                      style="padding: 1px;float: right;margin-top: 6px;margin-left: 5px;"
                      type="danger"
                      icon="el-icon-minus"
                      size="small"
                      circle
                      @click="deleteOption(index,option)"
                    />
                    <el-button
                      style="padding: 1px;float: right;margin-top: 6px;margin-right: 5px;"
                      type="success"
                      icon="el-icon-plus"
                      size="small"
                      circle
                      @click="addOption"
                    />
                  </el-row>

                </el-form-item>
              </el-form>
            </div>

          </el-card>
        </el-aside>
        <el-main style="margin-left: 48px; margin-right: 10%;padding: 0px;">

          <el-row style="margin-bottom: 20px;">
            <div style="float: left;">
              <h2>问卷预览</h2>
            </div>
          </el-row>
          <el-row v-if="vetoForm != null" style="margin-bottom: 20px;">
            <el-col style="width: 99%;">
              <el-header style="box-shadow: none">
                <div style="text-align: center;width: 100%;line-height: 30px;">
                  <h2>{{ vetoForm.title }}</h2>
                </div>
                <p style="line-height: 20px;">{{ vetoForm.description }}</p>
              </el-header>

              <el-main v-if="vetoForm.subjects !== null && vetoForm.subjects.length != 0">
                <el-divider />

                <el-row v-for="(subject,index) in vetoForm.subjects" :key="index" :class="index === edittingSubjectIndex ? 'subject-editting' : null">
                  <div>
                    <h4>
                      <span v-if="subject.required" style="color: red;">*</span>
                      {{ index + 1 }}. {{ subject.title }}
                    </h4>
                  </div>
                  <div style="float: right">
                    <el-button size="mini" :disabled="edittingSubjectIndex != index || index === 0" @click="moveSubjectToLast(index)">⬆
                      上移</el-button>
                    <el-button
                      size="mini"
                      :disabled="edittingSubjectIndex != index || index === vetoForm.subjects.length - 1"
                      @click="moveSubjectToNext(index)"
                    >⬇ 下移</el-button>
                    <el-button size="mini" @click="editSubject(index,subject)">编辑</el-button>
                    <el-button size="mini" :disabled="edittingSubjectIndex != index" @click="deleteSubject(index,subject)">删除</el-button>
                  </div>
                  <el-checkbox-group v-if="subject.selectType === 'multiple'" v-model="multipleData">
                    <el-checkbox v-for="(option,opIndex) in subject.options" :key="opIndex" :label="opIndex">{{ option.title }}</el-checkbox>
                  </el-checkbox-group>

                  <el-radio-group v-if="subject.selectType === 'single'">
                    <el-radio v-for="(option,opIndex) in subject.options" :key="opIndex" :label="opIndex">{{ option.title }}</el-radio>
                  </el-radio-group>
                </el-row>
              </el-main>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer style="text-align: right; margin-top: 0%;box-shadow: none;">
        <el-button type="primary" @click="saveForm">保存问卷</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import {
  createVetoForm,
  deleteVetoForm,
  getEditVetoFormDetail,
  getVetoList,
  pulishVetoForm,
  getPublicVetoFormDetail,
  saveVetoForm,
  veto
} from '@/api/veto'

export default {
  data() {
    return {
      vetoForm: null,
      edittingSubjectIndex: null,
      edittingSubject: null,
      singleData: null,
      multipleData: []
    }
  },
  created() {
    getEditVetoFormDetail(this.$route.params.vetoId).then(resp => {
      if (resp.status === 0) {
        this.vetoForm = resp.data
      } else {
        this.$message(resp.message)
      }
    })
  },
  methods: {
    addSubject: function(selectType) {
      this.vetoForm.subjects.push({
        id: null,
        title: '',
        selectType: selectType,
        required: false,
        emptyAlert: false,
        options: [{
          id: null,
          title: ''
        }],
        answer: selectType === 'single' ? 'null' : '[]'
      })

      const index = this.vetoForm.subjects.length - 1
      this.editSubject(index, this.vetoForm.subjects[index])
    },

    editSubject: function(index, subject) {
      if (this.edittingSubjectIndex === index) {
        this.edittingSubject = null
        this.edittingSubjectIndex = null
        return
      }
      this.edittingSubjectIndex = index
      this.edittingSubject = subject
    },

    deleteSubject: function(index, subject) {
      if (this.edittingSubjectIndex === index) {
        this.edittingSubjectIndex = this.edittingSubject = null
      }
      const newSubjects = []
      this.vetoForm.subjects.forEach((sub, i) => {
        if (index !== i) {
          newSubjects.push(sub)
        }
      })
      this.vetoForm.subjects = newSubjects
    },

    moveSubjectToLast: function(index) {
      if (this.edittingSubjectIndex === index) {
        const curr = this.vetoForm.subjects[index]
        this.vetoForm.subjects[index] = this.vetoForm.subjects[index - 1]
        this.vetoForm.subjects[index - 1] = curr
        this.edittingSubject = curr
        this.edittingSubjectIndex = index - 1
      }
    },

    moveSubjectToNext: function(index) {
      if (this.edittingSubjectIndex === index) {
        const curr = this.vetoForm.subjects[index]
        this.vetoForm.subjects[index] = this.vetoForm.subjects[index + 1]
        this.vetoForm.subjects[index + 1] = curr
        this.edittingSubject = curr
        this.edittingSubjectIndex = index + 1
      }
    },

    deleteOption: function(index, option) {
      const newOptions = []
      this.edittingSubject.options.forEach((op, i) => {
        if (index !== i) {
          newOptions.push(op)
        }
      })
      this.edittingSubject.options = newOptions
    },

    addOption: function() {
      this.edittingSubject.options.push({
        title: ''
      })
    },

    saveForm: function() {
      saveVetoForm(this.vetoForm).then(resp => {
        if (resp.status === 0) {
          this.$message('保存成功')
        } else {
          this.$message('保存失败')
        }
      })
    },

    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style>
  .subject-editting {
    border: #409EFF 1px solid;
    padding: 5px;
  }

  .el-header .logo {
    float: left;
    margin-top: 14px;
    height: 32px;
    line-height: 32px;
    margin-right: 10px;
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
  }
</style>
