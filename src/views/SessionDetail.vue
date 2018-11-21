<template>
    <div class="session-detail">
        <div class="header">
            <p>{{session.title}}</p>
        </div>
        <chat-detail :new-message="newMessage" />
        <send-message @send="sendHandle"/>
    </div>
</template>
<script>
    import chatDetail from '@/components/ChatDetail'
    import sendMessage from '@/components/SendMessage'
    import {mapGetters} from 'vuex'
    import ehsChatClient from 'ehs-chat-client'
    export default {
      components: {
        chatDetail,
        sendMessage
      },
      computed: {
        ...mapGetters('message', {
          sessions: 'sessionList'
        }),
        ...mapGetters('user', {
          userId: 'userId'
        })
      },
      data () {
        return {
          message: '',
          session: {
            title: ''
          },
          newMessage: null
        }
      },
      created () {
        const self = this
        if (this.$ehsChatClient.isConnected) {
          self.setSessionRead()
        } else {
          this.$ehsChatClient.socket.on('connect', () => {
            self.setSessionRead()
          })
        }
        this.$ehsChatClient.socket.on('message', (data) => {
          if (data.type === ehsChatClient.socketMessageTypes.USER_MESSAGE && data.data.sendSession.sid === self.$route.params.id) {
            self.newMessage = data.data
          }
        })
      },
      methods: {
        sendHandle (data) {
          if (!data.content.content) {
            this.$layer.msg('消息内容不能为空')
            return false
          }
          if (!this.session) {
            console.error('发送失败')
            return false
          }
          const messageObject = {
            senderUserId: this.userId,
            targetId: this.session.targetId,
            content: data.content,
            messageType: data.messageType
          }
          this.sendMessage(this.session.conversationType, messageObject)
          this.message = ''
        },
        setSessionRead () {
          const self = this
          self.$ehsChatClient.setMessageSessionRead(self.$route.params.id).then(() => {
            const session = self._.find(self.sessions, (item) => {
              return item.sid === self.$route.params.id
            })
            if (session) {
              self.session = session
              session.unread = 0
              // self.$store.commit('message/setSessionList', this.sessions)
            }
          }).catch(error => {
            self.$layer.msg(error.message)
          })
        },
        sendMessage (type, message) {
          if (this.$ehsChatClient.isConnected) {
            let func = 'sendPrivateMessage'
            if (type === ehsChatClient.conversationTypes.GROUP) {
              func = 'sendGroupMessage'
            }
            this.$ehsChatClient[func](message).then(res => {
              this.newMessage = res
              const session = this._.find(this.sessions, (item) => {
                return item.sid === this.$route.params.id
              })
              session.lastMsg.content = res.content.content
              session.lastMsg.date = res.date
              session.lastMsg.messageType = res.messageType
              this.$store.commit('message/setSessionList', this.sessions)
            }).catch(error => {
              // console.log(error)
              this.$layer.msg(error.message)
            })
          } else {
            console.error('socket 未连接')
          }
        }
      },
      beforeDestroy () {
        this.setSessionRead()
      },
      watch: {
        'sessions'(newVal, oldVal) {
          if (oldVal.length === 0 && newVal.length !== 0) {
            const session = this._.find(this.sessions, (item) => {
              return item.sid === this.$route.params.id
            })
            this.session = session
          }
        },
        '$route.params.id' () {
          this.setSessionRead()
        }
      }
    }
</script>
<style scoped lang="scss">
    .session-detail{
        flex: 1;
        background-color: #F2F2F2;
        position: relative;
        .header {
            border-bottom: 1px #ddd solid;
            p {
                margin: 20px 10px 20px 10px;
            }
        }
    }
</style>
