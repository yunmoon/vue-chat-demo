<template>
    <div class="login-page">
       <div class="form-item">
           <label class="label-text">appId</label>
           <input type="text" class="input" v-model="formData.appId">
       </div>
        <div class="form-item">
            <label class="label-text">userId</label>
            <input type="text" class="input" v-model="formData.userId">
        </div>
        <div class="form-item">
            <label class="label-text">token</label>
            <input type="text" class="input" v-model="formData.userToken">
        </div>
        <button class="full-btn" @click="onSubmit">确认</button>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
      data() {
        return {
          formData: {
            appId: '',
            userToken: '',
            userId: ''
          }
        }
      },
      methods: {
        onSubmit () {
          if (!this.formData.appId) {
            this.$layer.msg('请填写appId')
            return false
          }
          if (!this.formData.userId) {
            this.$layer.msg('请填写userId')
            return false
          }
          if (!this.formData.userToken) {
            this.$layer.msg('请填写token')
            return false
          }
          this.$store.commit('user/setUserToken', this.formData.userToken)
          this.$store.commit('user/setAppId', this.formData.appId)
          this.$store.commit('user/setUserId', this.formData.userId)
          Vue.prototype.$ehsChatClient = null
          this.$router.push({name: 'SessionList'})
        }
      }
    }
</script>
<style scoped lang="scss">
    .login-page{
        margin: 100px auto 0 auto;
        width: 400px;
        background-color: #fff;
        text-align: center;
        padding: 20px;
        .form-item{
            margin-bottom: 10px;
            .input{
                border: 1px #ddd solid;
                padding: 10px 5px 10px 15px;
                margin-left: 10px;
                color: #565656;
                width: 240px;
            }
            .input:focus{
                outline: none;
            }
        }
        .full-btn{
            width: 300px;
            margin-top: 20px;
            padding: 8px 0;
            cursor: pointer;
            border-radius: 4px;
            border-color: #4db3ff;
            color: #fff;
            background: #4db3ff;
        }
        .full-btn:focus,.full-btn:hover{
            outline: none;
        }
    }
</style>
