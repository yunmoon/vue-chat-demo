<template>
    <div class="content">
        <session-list />
        <router-view />
    </div>
</template>
<script>
    import sessionList from '@/components/SessionList'
    export default {
      components: {
        sessionList
      },
      data () {
        return {}
      },
      created () {
        const self = this
        this.$ehsChatClient.onError = (error) => {
          console.log(error)
        }
        this.$ehsChatClient.onConnected = () => {
          self.$ehsChatClient.getMessageSessions().then(sessions => {
            self.$store.commit('message/setSessionList', sessions)
          })
        }
        this.$ehsChatClient.init()
      }
    }
</script>
<style lang="scss" scoped>
    .content{
        display: flex;
    }
</style>
