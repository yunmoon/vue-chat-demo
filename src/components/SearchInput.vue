<template>
    <div class="search-input">
        <input type="text" v-model="val" placeholder="搜索">
        <i class="iconfont" v-if="!val">&#xe698;</i>
        <i class="iconfont close" @click="close" v-else>&#xe61f;</i>
    </div>
</template>
<script>
    export default {
      props: ['value'],
      data () {
        return {
          val: this.value
        }
      },
      methods: {
        close () {
          this.val = ''
        }
      },
      watch: {
        value () {
          this.val = this.value
        },
        val () {
          this.$emit('input', this.val)
        }
      }
    }
</script>
<style scoped lang="scss">
    .search-input {
        background-color: #E1E1E1;
        width: 200px;
        display: flex;
        margin: 0 auto 10px auto;
        padding: 5px 10px;
        input{
            border: none;
            outline: none;
            background-color: #E1E1E1;
            flex: 1;
        }
        .close {
            cursor: pointer;
        }
    }
</style>
