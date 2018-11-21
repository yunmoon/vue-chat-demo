<template>
  <div class="im">
    <div class="sidebar">
      <sidebar />
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SessionList from '@/components/SessionList.vue'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'home',
  components: {
    SessionList,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
  .im{
    margin: 20px auto;
    width: 860px;
    height: 600px;
    display: flex;
    display: -webkit-box;
    /*border: 1px #eee solid;*/
    .sidebar {
      width: 60px;
      background-color: #262626;
    }
    .main {
      background-color: #FDFDFD;
      flex: 1;
    }
  }
</style>
