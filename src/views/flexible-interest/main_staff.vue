<template>
    <div>
        <ul class="nav nav-tabs mb-0 justify-content-center tab-custom" style="margin-top: 0px; list-style: none">
            <li class="nav-item">
                <a class="nav-link" href="javascript:event" :class="tabActive[0]" @click="changeActiveStaff(0)"><strong class="fi-tab-title">PROGRESS</strong></a>
            </li>
            <li class="nav-item">
                <a class="nav-link PENDING" href="javascript:event" :class="tabActive[1]" @click="changeActiveStaff(1)"><strong class="fi-tab-title">PENDING</strong></a>
            </li>
            <li class="nav-item">
                <a class="nav-link APPROVED" href="javascript:event" :class="tabActive[2]" @click="changeActiveStaff(2)"><strong class="fi-tab-title">APPROVED</strong></a>
            </li>
            <li class="nav-item">
                <a class="nav-link REJECTED" href="javascript:event" :class="tabActive[3]" @click="changeActiveStaff(3)"><strong class="fi-tab-title">REJECTED</strong></a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link" href="javascript:event" style="color: orange" @click="logout()"><strong class="fi-tab-title">LOGOUT</strong></a>
            </li> -->
        </ul>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'main_staff',
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
      if(this.$router['history']['current']['name'] == "info") {
          this.tabActive = [
              'active',
              '',
              '',
              ''
          ]
      }else if(this.$router['history']['current']['name'] == "request_history_approve") {
          this.tabActive = [
              '',
              '',
              'active',
              ''
          ]
      } else if (this.$router['history']['current']['name'] == "request_history_pending") {
          this.tabActive = [
              '',
              'active',
              '',
              ''
          ]
      }  else if (this.$router['history']['current']['name'] == "request_history_reject") {
          this.tabActive = [
              '',
              '',
              '',
              'active'
          ]
      }
  },
  methods: {
    changeActiveStaff(i){
        this.tabActive[i] = 'active';
        for(var j = 0; j < this.tabActive.length; j++){
            if(j != i){
                this.tabActive[j] = '';
            }
        }
        //(i == 0) ? this.tabActive[1] = '': this.tabActive[0] = ''; 
        if(i == 0) { 
            if(window.sessionStorage.getItem('actionProgress')){
                var stepAction = JSON.parse(window.sessionStorage.getItem('actionProgress'));
                for(var i = 0; i < stepAction.length; i++){
                    if(!stepAction[i]['active-after']){
                        if(i==0){
                            this.$router.push({
                               path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'
                            });
                        } else if(i==1){
                            this.$router.push({
                                path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/product'
                            });
                        } else if(i==2){
                            this.$router.push({
                                path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/interest'
                            });
                        } else if(i==3){
                            this.$router.push({
                                path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/document/attach'
                            });
                        }  else if(i==4){
                            this.$router.push({
                                path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/interest/approve'
                            });
                        }
                        break;
                    }
                }
            } else {
                this.$root.$emit("resetDefault");
                this.$router.push({
                    path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'
                })
            }
        } else if (i == 1) {
            this.$router.push({
                 path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/request/history/pending'
            });
        } else if (i == 2) {
            this.$router.push({
                path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/request/history/approved'
            });
        }   else if (i == 3) {
            this.$router.push({
                path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/request/history/rejected'
            });
        } else {
            this.$root.$emit("resetDefault");
            this.$router.push({
                path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'
            })
        }
    },
    // logout(){
    //     window.sessionStorage.clear();
    //     this.$router.push({name:'login'});
    // }
  },
}
</script>

<style lang="scss" scoped>
* {
    font-family: Phetsarath_OT;
}
// .fi-tab-title{
//     font-family: 'Times New Roman'
// }

.tab-custom{
    height: 2.9rem;
    @media screen and (min-width: 760px) {
        height: 3.7rem;
    }
}

.PENDING{
    color: rgb(250, 150, 0);
    font-weight: bold;
    font-family: Helvetica;
    text-shadow: 0 1px 0 white, 0 2px 0 white, 0 3px 0 rgb(250, 150, 0), 0 4px 0 rgb(250, 150, 0);
}
.REJECTED{
    color: #F34E4E;
}
.APPROVED{
    color: #20A816;
}
.test{
    width: 75%;
}
div.max-flex{
    position: absolute;
    right: 0px;
    text-align: right;
}
div.max-flex>button{
    background: white;
    border: 0px white solid;
    color: #EE3024;
    font-size: 16px;
}
div.max-flex>button:hover{
    color: #A42C35;
}
div.max-flex>button:focus{
    outline: none;
}
.fi-percent {
    font-size: 20px;
}
.fi-tab-title {
    font-size: 25px;
}
.content{
    // margin-top: 30px;
    height: calc(100vh - 2.9rem);
    @media screen and (min-width: 760px) {
        height: calc(100vh - 3.7rem);
    }
    overflow-y: auto;
    overflow-x: hidden;
}

@media only screen and (max-width: 800px) {

    .fi-tab-title {
        font-size: 20px;
    }
}
@media only screen and (max-width: 700px) {
    .fi-tab-title {
        font-size: 14px;
    }
}

@media only screen and (max-width: 550px) {
    .fi-tab-title {
        font-size: 12px;
    }
}

@media only screen and (max-width: 400px) {

    .fi-tab-title {
        font-size: 8.7px;
    }
    div.fi-title{
        font-size: 10px;
    }
}
@media print {
  .hide-on-print-mode {
    display: none;
  }
}
</style>
      