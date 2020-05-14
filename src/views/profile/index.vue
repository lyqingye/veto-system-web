<template>
    
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <!-- <user-card :user="user" /> -->
        </el-col>

        <el-col :span="10" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="头像修改" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="密码修改" name="activity">
                <activity />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Activity from './components/Activity'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { Activity, Account },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        avatar: this.avatar
      }
    }
  }
}
</script>
