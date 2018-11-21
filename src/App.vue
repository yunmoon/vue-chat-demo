<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
  }
</script>
<style>
  body {
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-image: url(./assets/images/bg.png);
    background-size: cover;
  }
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, menu, nav, output, ruby, section, summary, time, mark, audio, video, input {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: normal;
    vertical-align: baseline;
  }
  @font-face {
    font-family: 'iconfont';  /* project id 873687 */
    src: url('//at.alicdn.com/t/font_873687_6panwro2app.eot');
    src: url('//at.alicdn.com/t/font_873687_6panwro2app.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_873687_6panwro2app.woff') format('woff'),
    url('//at.alicdn.com/t/font_873687_6panwro2app.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_873687_6panwro2app.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  li {
    list-style: none;
  }
</style>
