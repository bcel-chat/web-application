<template>
  <div class="main">
    <div class="content-wrapper">
      <template v-for="(item, index) in items">
        <div :key="index" class="item-container">
          <div class="icon-box">
            <img class="img-icon" :src="require(`@/assets/img/extendsion/${item.icon}`)" alt="">
          </div>
          <div class="name-box">
            <span>{{item.name}}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import server from '@/helper/server.js'
import axios from 'axios'
export default {
  data(){
    return {
      items: ""
    }
  },
  mounted(){
    axios.get(`${server.http.address}/chat_extendsion.json`).then(res=>{
      this.items = res.data
    })
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors.scss";

.main {
  width: 100%;
  height: 100vh;
}

.content-wrapper {
  padding: 1rem;
  height: auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(40%, 1fr));
  grid-gap: 10px;
}

.item-container {
  height: 12em;
  justify-self: stretch;
  box-shadow: 6px 6px 10px -10px rgba(000, 000, 000, 0.5);
  border-radius: 10px;
  border: solid 1px #ebebeb;
  transition: all 0.2s;
  cursor: pointer;
}

.item-container:hover {
  transform: translate(-5px, -5px);
  box-shadow: 6px 6px 20px -6px rgba(000, 000, 000, 0.5);
  &.name-box,
  span {
    text-shadow: 2px 2px 2px rgba(146, 11, 11, 0.2);
  }
}

.item-container:active {
  transform: translate(0px, 0px);
  box-shadow: 6px 6px 10px -10px rgba(000, 000, 000, 0.5);
  &.name-box,
  span {
    text-shadow: none;
    font-style: normal;
  }
}

.icon-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;
}

.item-container:nth-child(1) > .icon-box > i {
  font-size: 6rem;
  color: #41b883;
}
.item-container:nth-child(2) > .icon-box > i {
  font-size: 6rem;
  color: #6f41b8;
}
.item-container:nth-child(3) > .icon-box > i {
  font-size: 6rem;
  color: #b84179;
}
.item-container:nth-child(4) > .icon-box > i {
  font-size: 6rem;
  color: #4b4b4b;
}

.name-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40%;
}

.name-box {
  font-family: "Saysettha OT";
  font-weight: 700;
  color: $primary;
  font-size: .9rem;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media screen and (min-width: 360px){
    font-size: 1.2rem;
  }
}
.img-icon {
  width: 5rem;
}
</style>
