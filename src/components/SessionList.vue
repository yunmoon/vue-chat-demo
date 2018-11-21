<template>
    <div class="session-wrap">
        <search-input v-model="search" />
        <div class="session-group">
            <div class="session-item" @click="toDetail(session)" :class="{active: $route.name === 'SessionDetail' && $route.params.id == session.sid}" v-for="session in showSessions" :key="session.sid">
                <div class="user-avatar">
                    <img :src="session.avatar" alt="">
                    <span class="badge" v-if="session.unread">{{session.unread}}</span>
                </div>
                <div class="session-content">
                    <div class="title">
                        <p class="tc">{{session.title}}</p>
                        <p class="tt" v-if="session.lastMsg">{{session.lastMsg.date}}</p>
                    </div>
                    <p class="content" v-if="session.lastMsg">
                        <span v-if="session.lastMsg.messageType === messageTypes.TEXT_MESSAGE">{{session.lastMsg.content}}</span>
                        <span v-if="session.lastMsg.messageType === messageTypes.IMAGE_MESSAGE">[图片]</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import searchInput from '@/components/SearchInput'
    import ehsChatClient from 'ehs-chat-client'
    import {mapGetters} from 'vuex'
    export default {
      components: {
        searchInput
      },
      computed: {
        ...mapGetters('message', {
          sessions: 'sessionList'
        })
      },
      name: 'SessionList',
      props: {
        msg: String
      },
      data () {
        return {
          search: '',
          showSessions: [],
          messageTypes: ehsChatClient.messageContentTypes
        }
      },
      methods: {
        toDetail (session) {
          this.$router.push({ name: 'SessionDetail', params: { id: session.sid } })
        }
      },
      created () {
        this.$ehsChatClient.socket.on('message', (data) => {
          if (data.type === ehsChatClient.socketMessageTypes.USER_MESSAGE) {
            let session = this._.find(this.sessions, item => {
              return item.sid === data.data.sendSession.sid
            })
            if (session) {
              session.lastMsg.content = data.data.content.content
              session.lastMsg.date = data.data.date
              session.lastMsg.messageType = data.data.messageType
            } else {
              session = {
                avatar: data.data.sendSession.avatar,
                conversationType: data.data.conversationType,
                lastMsg: {
                  content: data.data.content.content,
                  date: data.data.date,
                  messageType: data.data.messageType
                },
                sid: data.data.sendSession.sid,
                targetId: data.data.targetId,
                title: data.data.sendSession.title,
                unread: 0
              }
              this.sessions.unshift(session)
            }
            if (this.$route.name === 'SessionDetail' && session.sid === this.$route.params.id) {
              session.unread = 0
            } else {
              session.unread = session.unread + 1
            }
            this.$store.commit('message/setSessionList', this.sessions)
          }
        })
      },
      watch: {
        search () {
          if (this.search) {
            this.showSessions = this.sessions.filter(item => {
              return item.title.indexOf(this.search) !== -1
            })
          } else {
            this.showSessions = this.sessions
          }
        },
        sessions (newVal, oldVal) {
          if (!this.search) {
            this.showSessions = newVal
          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .session-wrap{
        width: 240px;
        height: 590px;
        border-right: 1px #ddd solid;
        padding-top: 10px;
        .session-group {
            height: 553px;
            overflow-y: scroll;
            p {
                margin: 0;
            }
            .session-item {
                display: flex;
                padding: 15px 10px;
                border-bottom: 1px #eee solid;
                .user-avatar {
                    position: relative;
                    img {
                        width: 45px;
                        height: 45px;
                    }
                    .badge {
                        position: absolute;
                        top: -10px;
                        right: -10px;
                        background-color: #f56c6c;
                        border-radius: 10px;
                        color: #fff;
                        display: inline-block;
                        font-size: 12px;
                        height: 18px;
                        line-height: 18px;
                        padding: 0 6px;
                        text-align: center;
                        white-space: nowrap;
                        /*border: 1px solid #fff;*/
                    }
                }
                .session-content {
                    margin-left: 10px;
                    color: #B2B2B2;
                    font-size: 14px;
                    .title{
                        display: flex;
                        .tc {
                            color: #000000;
                            font-size: 16px;
                            width: 110px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .tt {
                        }
                    }
                    .content {
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        width: 180px;
                    }
                }
            }
            .session-item.active {
                background-color: #D8D8D8;
            }
        }
    }
</style>
