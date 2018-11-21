<template>
    <scroll class="message-wrapper" :data="messages" :pulldown="true" ref="chatScroll" @pulldown="getSessionMessages">
        <ul class="message-group">
            <li class="message-item" v-for="message in messages" :class="{'self': message.senderUserId == userId}">
                <p class="time">{{message.date}}</p>
                <div class="message-content">
                    <img :src="message.sendUser.avatarUri" alt="" class="avatar" />
                    <p class="name" v-if="message.conversationType === 2">{{message.sendUser.name}}</p>
                    <div class="content">
                        <div class="text">
                            <span v-if="message.messageType === messageTypes.TEXT_MESSAGE">{{message.content.content}}</span>
                            <img  v-if="message.messageType === messageTypes.IMAGE_MESSAGE" :src="message.content.content" alt="">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </scroll>
</template>
<script>
    import scroll from '@/components/Scroll'
    import ehsChatClient from 'ehs-chat-client'
    import {mapGetters} from 'vuex'
    export default {
      components: {
        scroll
      },
      props: ['newMessage'],
      computed: {
        ...mapGetters('user', {
          userId: 'userId'
        })
      },
      data () {
        return {
          lastmsgId: null,
          messages: [],
          messageTypes: ehsChatClient.messageContentTypes
        }
      },
      created () {
        const self = this
        if (this.$ehsChatClient.isConnected) {
          self.getSessionMessages(() => {
            setTimeout(() => {
              this.$refs['chatScroll'].scrollTo(0, this.$refs['chatScroll'].scroll.maxScrollY)
            }, 20)
          })
        } else {
          this.$ehsChatClient.socket.on('connect', () => {
            self.getSessionMessages(() => {
              setTimeout(() => {
                this.$refs['chatScroll'].scrollTo(0, this.$refs['chatScroll'].scroll.maxScrollY)
              }, 20)
            })
          })
        }
      },
      methods: {
        getSessionMessages (cb) {
          const self = this
          const sid = self.$route.params.id
          self.$ehsChatClient.getSessionMessages(sid, 10, self.lastmsgId).then(messages => {
            self.messages.unshift(...messages.reverse())
            self.lastmsgId = self.messages.length > 0 ? self.messages[0].msgId : null
            if (cb && cb instanceof Function) {
              cb()
            }
          })
        }
      },
      watch: {
        newMessage () {
          this.messages.push(this.newMessage)
          setTimeout(() => {
            this.$refs['chatScroll'].scrollTo(0, this.$refs['chatScroll'].scroll.maxScrollY)
          }, 20)
        },
        '$route.params.id' () {
          this.messages = []
          this.lastmsgId = null
          this.getSessionMessages(() => {
            setTimeout(() => {
              this.$refs['chatScroll'].scrollTo(0, this.$refs['chatScroll'].scroll.maxScrollY)
            }, 20)
          })
        }
      }
    }
</script>
<style scoped lang="scss">
    .message-wrapper {
        height: 380px;
        border-bottom: 1px #ddd solid;
        overflow: hidden;
        .message-group {
            padding: 10px;
            .message-item {
                .time{
                    padding: 10px 0;
                    text-align: center;
                    font-size: 14px;
                    color: #B2B2B2;
                }
                .message-content{
                    .avatar{
                        width: 36px;
                        height: 36px;
                        float: left;
                        border-radius: 3px;
                    }
                    .name {
                        font-size: 12px;
                        margin-left: 46px;
                    }
                    .content {
                        display: inline-block;
                        margin-left: 10px;
                        position: relative;
                        padding: 6px 10px;
                        max-width: 330px;
                        min-height: 36px;
                        line-height: 24px;
                        box-sizing: border-box;
                        font-size: 14px;
                        text-align: left;
                        word-break: break-all;
                        background-color: #fafafa;
                        border-radius: 4px;
                    }
                    .content:before {
                        content: " ";
                        position: absolute;
                        top: 12px;
                        right: 100%;
                        border: 6px solid transparent;
                        border-right-color: #fafafa;
                    }
                }
            }
            .message-item.self {
                .message-content{
                    text-align: right;
                    .avatar{
                        float: right;
                        margin-left: 10px;
                    }
                    .name {
                        display: none;
                    }
                    .content {
                        background-color: #b2e281;
                    }
                    .content:before {
                        right: -12px;
                        vertical-align: middle;
                        border-right-color: transparent;
                        border-left-color: #b2e281;
                    }
                }
            }
        }
    }
</style>
