<template>
  <div>
    <div v-if="config['show']">
      <div class="inverst-background"></div>
      <div class="fi_dialog">
        <div class="header">
          <h4><strong>{{config['title']}}</strong></h4>
        </div>
        <div class="body">
          <p>{{config['message']}}</p>
        </div>
        <div class="footer">
          <button type="button" class="fi-btn" v-for="(button, index) in config['buttons']" :key="index" @click="button['action']">{{button['text']}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fi_dialog',
  data(){
    return {
    }
  },
  props: {
    config: {
      default: {
        show: true,
        title: 'Dialog',
        message: 'Message content',
        buttons: [
          {
            text: 'OK',
            action: () => {
              return true;
            }
          }
        ]
      },
      type: Object
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.inverst-background {
  top: 0px;
  left: 0px;
  z-index: 999999999999999999999999999999999999999999998;
  position: fixed;
  background: black;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
  .fi_dialog {
    border-radius: 2px;
    top: 50%;
    margin-top: -60px;
    left: 50%;
    margin-left: -150px;
    position: fixed;
    z-index: 999999999999999999999999999999999999999999999;
    background: white;
    border: 1px lightgrey solid;
    -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
	   -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
	        box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
    padding: 0.5rem;
    width: 300px;
    min-height: 120px;
  }
  .header, .body {
    text-align: left;
  }
  .footer{
    text-align: right;
  }
  .fi-btn{
      margin-left: 5px;
      background: #C72B2C;
      color: white;
      border: 1px #C72B2C solid;
      border-radius: 3px;
      width: 5rem;
      font-size: 1rem;
  }
</style>
