<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <div style="vertical-align: middle;float: left;">
            <img class="logo" src="https://img95.699pic.com/xsj/0t/x8/64.jpg!/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast">
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
                      <span><i class="el-icon-caret-bottom">{{ name }}</i></span>
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
                <el-dropdown-item divided @click.native="profileForm.isShow = true">
                  <span style="display:block;">Profile</span>
                </el-dropdown-item>
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
          <el-button style="width: 245px;height: 60px; border: none;" icon="el-icon-edit" type="primary" @click="newVetoForm.isShow = true">创建问卷</el-button>
        </el-aside>
        <el-main style="margin-left: 48px; margin-right: 10%;padding: 0px;">

          <el-row style="margin-bottom: 20px;">
            <div style="float: left;">
              <h2>问卷列表</h2>
            </div>
            <div style="float: right;margin-top: 10px;">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="">
                  <el-input v-model="keyword" placeholder="问卷" />
                </el-form-item>

                <el-form-item>
                  <el-button icon="el-icon-search" @click="search">搜索</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-row>
          <el-row v-for="veto in vetoList" :key="veto.vetoId" style="margin-bottom: 20px;">
            <el-col style="width: 99%;">

              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ veto.title }}</span>

                  <span style="float: right;margin-right: 5px;">
                    <el-tag v-if="veto.isPublic" type="success">
                      <span style="margin-left: 5px">已发布</span>
                    </el-tag>
                    <el-tag v-if="!veto.isPublic" type="info">
                      <span style="margin-left: 5px">未发布</span>
                    </el-tag>
                  </span>

                  <span style="float: right;margin-right: 5px;">
                    <el-tag type="info"><i class="el-icon-time" />
                      <span style="margin-left: 5px">{{ veto.createTime }}</span>
                    </el-tag>
                  </span>
                  <span style="float: right;margin-right: 5px;">
                    <el-tag type="info">
                      <span style="margin-left: 5px">投票人数：{{ veto.vetoCount }}</span>
                    </el-tag>
                  </span>

                  <span style="float: right;margin-right: 5px;">
                    <el-tag type="info">
                      <span style="margin-left: 5px">ID:{{ veto.vetoId }}</span>
                    </el-tag>
                  </span>
                </div>
                <el-row style="float: right;margin-bottom: 16px;">
                  <el-button size="mini" :disabled="!veto.isPublic" icon="el-icon-share" @click="shareUrl(veto)">分享</el-button>
                  <el-button size="mini" icon="el-icon-edit" :disabled="veto.isPublic" @click="editVetoForm(veto)">编辑</el-button>
                  <el-button size="mini" icon="el-icon-upload" :disabled="veto.isPublic" @click="publishVeto(veto)">发布</el-button>
                  <el-button size="mini" icon="el-icon-check" :disabled="!veto.isPublic" @click="statisticVetoForm(veto)">分析</el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteVeto(veto)">删除</el-button>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog title="创建问卷" modal :visible.sync="newVetoForm.isShow" width="25%">
      <el-form>
        <el-form-item label="问卷标题">
          <el-input v-model="newVetoForm.formData.title" />
        </el-form-item>

        <el-form-item label="问卷描述">
          <el-input v-model="newVetoForm.formData.description" type="textarea" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newVetoForm.isShow = false">取 消</el-button>
        <el-button type="primary" @click="createVetoForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改个人信息" modal :visible.sync="profileForm.isShow" width="25%">
      <el-tabs value="password">
        <!-- <el-tab-pane label="头像修改" name="activity">
            <el-form>
              <el-form-item>

                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"

                  :on-remove="handleRemove"
                  :class="{hide:hideUpload}"
                  :on-change="handleChange"
                >
                  <i class="el-icon-plus" />
                </el-upload>

              </el-form-item>

              <el-form-item>
                <el-button type="primary">更新</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane> -->
        <el-tab-pane label="密码修改" name="password">
          <el-form>

            <el-form-item label="旧密码">
              <el-input v-model.trim="profileForm.changePasswordData.oldPassword" type="password" />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model.trim="profileForm.changePasswordData.newPassword" type="password" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="changeLoginPassword">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

    </el-dialog>
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

import { changeLoginPassword } from '@/api/user'
export default {
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      keyword: '',
      vetoList: null,
      newVetoForm: {
        isShow: false,
        formData: {
          title: null,
          description: null
        }
      },
      profileForm: {
        isShow: false,
        changePasswordData: {
          oldPassword: null,
          newPassword: null
        },
        changeAvatarData: {
          avatar: null
        }
      },
      hideUpload: false,
      limitCount: 1

    }
  },
  created() {
    this.getVetoList()
  },
  methods: {
    getVetoList: function() {
      getVetoList(this.keyword).then(resp => {
        if (resp.status === 0) {
          this.vetoList = resp.data
        } else {
          this.$message(resp.message)
        }
      })
    },
    search() {
      this.getVetoList()
    },
    publishVeto(data) {
      this.$confirm('你确定要发布 ' + data.title + ' 问卷吗？', '警告', {
        confirmButtonText: '发布',
        cancelButtonText: '取消'
      }).then(() => {
        pulishVetoForm(data.vetoId).then(resp => {
          if (resp.status === 0) {
            this.$message({
              message: '发布成功',
              type: 'success'
            })
            this.search()
          } else {
            this.$message({
              message: '发布失败',
              type: 'error'
            })
          }
        })
      }).catch(() => {
        // not do anything
      })
    },
    createVetoForm() {
      createVetoForm(this.newVetoForm.formData).then(resp => {
        if (resp.status === 0) {
          this.$message('创建成功')
        } else {
          this.$message('创建失败')
        }
        this.newVetoForm.isShow = false
        this.search()
      })
    },
    deleteVeto(data) {
      this.$confirm('你确定要删除 ' + data.title + ' 问卷吗？', '警告', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        deleteVetoForm(data.vetoId).then(resp => {
          if (resp.status === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.search()
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        })
      }).catch(() => {
        // not do anything
      })
    },
    editVetoForm(data) {
      console.log(data)
      this.$router.push({
        path: `/design/${data.vetoId}`,
        params: {
          vetoId: data.vetoId
        }
      })
    },
    statisticVetoForm(data) {
      this.$router.push({
        path: `/statistic/${data.vetoId}`,
        params: {
          vetoId: data.vetoId
        }
      })
    },
    shareUrl(data) {
      this.$router.push({
        path: `/veto/${data.vetoId}`,
        params: {
          vetoId: data.vetoId
        }
      })
    },
    changeLoginPassword() {
      changeLoginPassword(this.profileForm.changePasswordData).then(resp => {
        if (resp.status === 0) {
          this.$message({
            message: '更新成功, 请注销后重新登录',
            type: 'success'
          })
          this.profileForm.isShow = false
        } else {
          this.$message({
            message: '更新失败',
            type: 'error'
          })
        }
      })
    },
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount
    },

    handleChange(file, fileList) {
      file = file.raw

      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        const fd = new FormData()
        fd.append('file', file)
        // 预览本地图
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
          this.updateData.avatar = event.target.result
        }
      }
      this.hideUpload = fileList.length >= this.limitCount
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style>
  .hide .el-upload--picture-card {
      display: none;
  }
  .el-header,
  .el-footer {
    vertical-align: middle;
    line-height: 60px;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 0px 0px rgba(232, 232, 232, 1);
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
