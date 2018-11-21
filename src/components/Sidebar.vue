<template>
    <div class="navbar">
        <header>
            <img src="https://han960619.github.io/Vue-chat/static/images/小姨妈.jpg" class="avatar" />
        </header>
        <div class="icon-group">
            <router-link :to="{name: 'SessionList'}" class="icon" :class="{active: messageActive}"><i class="iconfont">&#xe625;</i></router-link>
            <a href="" class="icon" :class="{active: friendActive}"><i class="iconfont">&#xe666;</i></a>
        </div>
    </div>
</template>
<script>
    export default {
      computed: {
        messageActive () {
          return ['SessionList', 'SessionDetail'].indexOf(this.$route.name) !== -1
        },
        friendActive () {
          return ['1'].indexOf(this.$route.name) !== -1
        }
      }
    }
</script>
<style scoped lang="scss">
    header {
        text-align: center;
        margin-top: 20px;
        img{
            width: 40px;
            height: 40px;
        }
    }
    .icon-group{
        .icon {
            display: block;
            text-align: center;
            margin-top: 30px;
            color: #adaeaf;
            opacity: .8;
            cursor: pointer;
            text-decoration: none;
            i {
                font-size: 22px;
            }
        }
        .icon.active {
            color: #00dc41;
        }
    }
</style>
