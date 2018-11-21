<template>
    <div class="message-send-wrap">
        <ul class="toolbars">
            <li>
                <i class="iconfont" @click="imageClickHandle">&#xe626;</i>
                <input class="upload-file" type="file" name="up_file" ref="file" @change="fileChangeHandle">
            </li>
        </ul>
        <textarea class="text" v-model="val" placeholder="按 Ctrl + Enter 发送" @keyup="onKeyup"></textarea>
    </div>
</template>
<script>
    import ehsChatClient from 'ehs-chat-client'
    export default {
      props: ['value'],
      data () {
        return {
          val: this.value
        }
      },
      methods: {
        onKeyup (e) {
          if (e.ctrlKey && e.keyCode === 13 && this.val.length) {
            this.$emit('send', {messageType: ehsChatClient.messageContentTypes.TEXT_MESSAGE, content: { content: this.val } })
            this.val = ''
          }
        },
        imageClickHandle () {
          this.$refs.file.click()
        },
        fileChangeHandle (file) {
          // const fileRequestId = new Date().getTime()
          const upFile = file.target.files[0]
          const formData = new FormData()
          if (upFile) {
            formData.append('up_file', upFile)
          }
          const content = {}
          this.$ehsChatClient.uploadFile({
            formData,
            onProgress (percent) {
                console.log(percent)
            }
          }).then(result => {
            content.fullUrl = result.data.data.fullUrl
            return this.dealImage(upFile)
          }).then(fileData => {
            content.content = fileData
            this.$emit('send', {messageType: ehsChatClient.messageContentTypes.IMAGE_MESSAGE, content })
          }).catch(error => {
            console.log(error)
          })
        },
        dealImage (file){
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
              const path = e.target.result
              const img = new Image()
              img.src = path
              img.onload = function(){
                //默认按比例压缩
                const scale = this.width / this.height;
                let w = 240, // this.width,
                  h = w / scale
                const quality = 0.95; // 默认图片质量为0.7
                //生成canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                // 创建属性节点
                canvas.setAttribute("width", w);
                canvas.setAttribute("height", h);
                ctx.drawImage(this,0, 0, img.width, img.height, 0, 0, w, h);
                // quality值越小，所绘制出的图像越模糊
                const base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                resolve(base64);
              }
              img.onerror = (e) => {
                reject(e)
              }
            }
            reader.onerror = (e) => {
              reject(e);
            }
          })
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
    .message-send-wrap {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 156px;
        .text {
            padding: 10px;
            border: none;
            outline: none;
            resize: none;
            width: 100%;
            height: 120px;
            box-sizing: border-box;
        }
        .toolbars{
            padding: 5px 10px;
            li{
                display: inline-block;
                margin-right: 10px;
                cursor: pointer;
                .upload-file{
                    display: none;
                }
                .iconfont {
                    color: #aaa;
                    font-size: 24px;
                }
            }
        }
    }
</style>
