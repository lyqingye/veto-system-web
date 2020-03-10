<template>
  <div>
    <el-container>
      <el-header style="vertical-align: middle;
    line-height: 60px;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 0px 0px rgba(232, 232, 232, 1);">
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
              <el-button @click="addSubject('single')" size="mini" style="float: right;padding: 2px 4px;">+</el-button>
            </div>
            <el-divider></el-divider>
            <div>
              <el-checkbox :checked="true">多选框</el-checkbox>
              <el-button @click="addSubject('multiple')" size="mini" style="float: right;padding: 2px 4px;">+</el-button>
            </div>

          </el-card>

          <el-card class="box-card" style="margin-top: 30px;">
            <div slot="header" class="clearfix">
              <span>属性编辑</span>
            </div>
            <div>
              <el-form ref="form" size="mini" v-if="edittingSubject != null" >
                <el-form-item label="标题">
                  <el-input size="mini" v-model="edittingSubject.title"></el-input>
                </el-form-item>

                <el-form-item label="必填">
                  <el-checkbox v-model="edittingSubject.required"></el-checkbox>

                </el-form-item>
                <el-form-item label="选项" >
                  <br>
                  <el-row style="margin-top: 10px;" v-for="(option,index) in edittingSubject.options">
                    <el-input style="width: 75%;" v-model="option.title"></el-input>
                    <el-button @click="deleteOption(index,option)" style="padding: 1px;float: right;margin-top: 6px;margin-left: 5px;" type="danger" icon="el-icon-minus"
                      size="small" circle></el-button>
                    <el-button @click="addOption" style="padding: 1px;float: right;margin-top: 6px;margin-right: 5px;" type="success" icon="el-icon-plus"
                      size="small" circle></el-button>
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
          <el-row style="margin-bottom: 20px;">
            <el-col style="width: 99%;">
              <el-header>
                <div style="text-align: center;width: 100%;">
                  <h2>{{vetoForm.title}}</h2>
                </div>
                <p>{{vetoForm.description}}</p>
              </el-header>
              <el-main>
                <el-divider></el-divider>

                <el-row v-for="(subject,index) in vetoForm.subjects" :class="index === edittingSubjectIndex ? 'subject-editting' : null">
                  <div><h4>
                  <span v-if="subject.required" style="color: red;">*</span>
                  {{index + 1}}. {{subject.title}}
                  </h4>
                  </div>
                  <div style="float: right;width: ;">
                    <el-button @click="moveSubjectToLast(index)" size="mini" :disabled="edittingSubjectIndex != index || index === 0">⬆ 上移</el-button>
                    <el-button @click="moveSubjectToNext(index)" size="mini" :disabled="edittingSubjectIndex != index || index === vetoForm.subjects.length - 1">⬇ 下移</el-button>
                    <el-button size="mini" @click="editSubject(index,subject)">编辑</el-button>
                    <el-button size="mini" @click="deleteSubject(index,subject)" :disabled="edittingSubjectIndex != index">删除</el-button>
                  </div>
                   <el-checkbox-group v-model="subject.answer" v-if="subject.selectType === 'multiple'"
                   @change="subjectAlert(subject)">
                       <el-checkbox :label="opIndex" v-for="(option,opIndex) in subject.options">{{option.title}}</el-checkbox>
                   </el-checkbox-group>

                    <el-radio-group v-model="subject.answer" v-if="subject.selectType === 'single'"
                    @change="subjectAlert(subject)">
                       <el-radio :label="opIndex" v-for="(option,opIndex) in subject.options">{{option.title}}</el-radio>
                    </el-radio-group>
                </el-row>
              </el-main>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer style="text-align: right; margin-top: 0%;">
        <el-button type="primary" >保存问卷</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        vetoForm: {
          vetoId: 1,
          title: '标题',
          description: '描述',
          subjects: [
            {
              id: 1,
              title: '性别',
              selectType: 'single',
              required: false,
              options: [
                {
                  id: 1,
                  title: '男'
                },
                {
                  id: 2,
                  title: '女'
                },
              ],
              answer: null
            }
          ]
        },
        edittingSubjectIndex: null,
        edittingSubject: null
      }
    },
    methods: {
      addSubject: function (selectType) {
        this.vetoForm.subjects.push({
          id: null,
          title: '',
          selectType: selectType,
          required: false,
          options: [
            {
              id: null,
              title: null
            }
          ],
          answer: selectType === 'single' ? null : []
        })
        let index = this.vetoForm.subjects.length - 1
        this.editSubject(index,this.vetoForm.subjects[index])
      },

      editSubject: function (index,subject) {
        if(this.edittingSubjectIndex === index) {
          this.edittingSubject = null
          this.edittingSubjectIndex = null
          return
        }
        this.edittingSubjectIndex = index
        this.edittingSubject = subject
      },

      deleteSubject: function (index,subject) {
        if(this.edittingSubjectIndex === index) {
          this.edittingSubjectIndex = this.edittingSubject = null
          return
        }
        let newSubjects = []
        this.vetoForm.subjects.forEach((sub,i) => {
          if(index != i) {
            newSubjects.push(sub)
          }
        })
        this.vetoForm.subjects = newSubjects
      },

      moveSubjectToLast: function (index) {
        if(this.edittingSubjectIndex == index) {
          let curr = this.vetoForm.subjects[index]
          this.vetoForm.subjects[index] = this.vetoForm.subjects[index - 1]
          this.vetoForm.subjects[index - 1] = curr
          this.edittingSubject = curr
          this.edittingSubjectIndex = index - 1
        }
      },

      moveSubjectToNext: function (index) {
        if(this.edittingSubjectIndex == index) {
          let curr = this.vetoForm.subjects[index]
          this.vetoForm.subjects[index] = this.vetoForm.subjects[index + 1]
          this.vetoForm.subjects[index + 1] = curr
          this.edittingSubject = curr
          this.edittingSubjectIndex = index + 1
        }
      },

      deleteOption: function (index,option) {
        let newOptions = []
        this.edittingSubject.options.forEach((op,i) => {
          if(index != i) {
            newOptions.push(op)
          }
        })
        this.edittingSubject.options = newOptions
      },

      addOption: function () {
        this.edittingSubject.options.push({
          title: ''
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
