<template>
    <div>
        <ul class="nav nav-tabs hide-on-print-mode tab-style">
            <li class="nav-item">
                <a class="nav-link tab-item-style" href="javascript:event"  :class="tabActive[0]" @click="changeActiveLeader(0)"><strong class="fi-tab-title">ທັງໝົດ</strong></a>
            </li>
            <li class="nav-item">
                <a class="nav-link tab-item-style" href="javascript:event" :class="tabActive[1]" @click="changeActiveLeader(1)"><strong class="fi-tab-title">ປະຈຳວັນ</strong></a>
            </li>
            <li class="nav-item">
                <a class="nav-link tab-item-style" href="javascript:event" :class="tabActive[2]" @click="changeActiveLeader(2)"><strong class="fi-tab-title">ປະຈຳເດືອນ</strong></a>
            </li>
            <li class="nav-item">
                <a class="nav-link tab-item-style" href="javascript:event" :class="tabActive[3]" @click="changeActiveLeader(3)"><strong class="fi-tab-title">ປະຈຳປີ</strong></a>
            </li>
        </ul>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>
<script>
export default {
  name: 'report_rejected',
  data(){
      return {
          toggle: false,
          tabActive: [
              'active',
              '',
              '',
              ''
          ]
      }
  },
  mounted(){
      if(this.$router['history']['current']['name'] == "report_rejected_dialy") {
          this.tabActive = [
              '',
              'active',
              '',
              ''
          ]
      } else if(this.$router['history']['current']['name'] == "report_rejected_monthly") {
          this.tabActive = [
              '',
              '',
              'active',
              ''
          ]
      } else if(this.$router['history']['current']['name'] == "report_rejected_yearly") {
          this.tabActive = [
              '',
              '',
              '',
              'active'
          ]
      }
  },
  methods: {
    changeActiveLeader(i){
        this.tabActive[i] = 'active';
        for(var j = 0; j < this.tabActive.length; j++){
            if(j != i){
                this.tabActive[j] = '';
            }
        }
        if (i == 1) {
            this.$router.push({name: 'report_rejected_dialy'});
        } else if (i == 2) {
            this.$router.push({name: 'report_rejected_monthly'});
        } else if (i == 3) {
            this.$router.push({name: 'report_rejected_yearly'});
        } else {
            this.$router.push({name: 'report_rejected_all'})
        }
    },
    logout(){
        window.sessionStorage.clear();
        this.$router.push({name:'login'});
    }
  },
}
</script>
<style lang="scss" scoped>
.tab-item-style{
    color: white;
}
.tab-style{
    background: #F34E4E;
}
</style>