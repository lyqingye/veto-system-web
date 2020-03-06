<template>
  <div>
    <el-container>
      <el-header>
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
                    <el-avatar size="50" shape="square" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"></el-avatar>
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
          <el-button style="width: 245px;height: 60px; border: none;" icon="el-icon-edit" type="primary">创建问卷</el-button>
        </el-aside>
        <el-main style="margin-left: 48px; margin-right: 10%;padding: 0px;">

          <el-row style="margin-bottom: 20px;">
            <div style="float: left;">
              <h2>问卷列表</h2>
            </div>
            <div style="float: right;margin-top: 10px;">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="">
                  <el-input placeholder="问卷" />
                </el-form-item>

                <el-form-item>
                  <el-button icon="el-icon-search">搜索</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-row>
          <el-row style="margin-bottom: 20px;">
            <el-col style="width: 99%;">

              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>投票标题</span>

                  <span style="float: right;margin-right: 5px;">
                    <el-tag type="info"><i class="el-icon-time" />
                      <span style="margin-left: 5px">2019-04-09 11:21:31</span>
                    </el-tag>
                  </span>
                  <span style="float: right;margin-right: 5px;">
                    <el-tag type="info">
                      <span style="margin-left: 5px">答卷人数:13131</span>
                    </el-tag>
                  </span>

                  <span style="float: right;margin-right: 5px;">
                    <el-tag type="info">
                      <span style="margin-left: 5px">ID:13131</span>
                    </el-tag>
                  </span>

                </div>
                <el-row style="float: right;margin-bottom: 16px;">
                  <el-button size="mini" icon="el-icon-share">分享</el-button>
                  <el-button size="mini" icon="el-icon-edit">编辑</el-button>
                  <el-button size="mini" icon="el-icon-upload">发布</el-button>
                  <el-button size="mini" icon="el-icon-check">分析</el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                </el-row>
              </el-card>
            </el-col>
          </el-row>

          <el-row style="margin-bottom: 20px;">
            <el-col style="width: 99%;">

              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>投票标题</span>

                  <span style="float: right;margin-right: 5px;">
                    <el-tag type="info"><i class="el-icon-time" />
                      <span style="margin-left: 5px">2019-04-09 11:21:31</span>
                    </el-tag>
                  </span>
                  <span style="float: right;margin-right: 5px;">
                    <el-tag type="info">
                      <span style="margin-left: 5px">答卷人数:13131</span>
                    </el-tag>
                  </span>

                  <span style="float: right;margin-right: 5px;">
                    <el-tag type="info">
                      <span style="margin-left: 5px">ID:13131</span>
                    </el-tag>
                  </span>

                </div>
                <el-row style="float: right;margin-bottom: 16px;">
                  <el-button size="mini" icon="el-icon-share">分享</el-button>
                  <el-button size="mini" icon="el-icon-edit">编辑</el-button>
                  <el-button size="mini" icon="el-icon-upload">发布</el-button>
                  <el-button size="mini" icon="el-icon-check">分析</el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                </el-row>
              </el-card>
            </el-col>
          </el-row>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
</script>

<style>
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
