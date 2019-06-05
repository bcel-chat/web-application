<template>
    <div class="fi-main-report">
        <router-link v-if="checkLeader()" to="/flexible/leader/approve" class="fi-link-back"><i class="fa fa-arrow-left"></i></router-link>
        <ul class="nav nav-tabs justify-content-center hide-on-print-mode fi-main-tab-style">
            <li class="nav-item">
                <a class="nav-link PENDING" href="javascript:event" :class="tabActive[0]" @click="changeActiveLeader(0)"><strong class="fi-tab-title">PENDING</strong></a>
            </li>
            <li class="nav-item">
                <a class="nav-link APPROVED" href="javascript:event" :class="tabActive[1]" @click="changeActiveLeader(1)"><strong class="fi-tab-title">APPROVED</strong></a>
            </li>
            <li class="nav-item">
                <a class="nav-link REJECTED" href="javascript:event" :class="tabActive[2]" @click="changeActiveLeader(2)"><strong class="fi-tab-title">REJECTED</strong></a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link PENDING" href="javascript:event" v-if="!checkLeader()" @click="logout()"><strong class="fi-tab-title">LOGOUT</strong></a>
            </li> -->
        </ul>
        <div>
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'main_report',
  data(){
      return {
          toggle: false,
          tabActive: [
              'active',
              '',
              ''
          ]
      }
  },
  mounted(){
      if(this.$router['history']['current']['name'] == "report_approved_all") {
          this.tabActive = [
              '',
              'active',
              ''
          ]
      } else if(this.$router['history']['current']['name'] == "report_rejected_all") {
          this.tabActive = [
              '',
              '',
              'active'
          ]
      }
  },
  methods: {
    checkLeader(){
        var userPermission = sessionStorage.getItem('permission');
        if(userPermission == 'true') {
            return true;
        } else {
            return false;
        }
    },
    changeActiveLeader(i){
        this.tabActive[i] = 'active';
        for(var j = 0; j < this.tabActive.length; j++){
            if(j != i){
                this.tabActive[j] = '';
            }
        }
        if (i == 1) {
            this.$router.push({
                path: sessionStorage.getItem('flexible_root_router')+'/flexible/report/approve/all'
            });
        }   else if (i == 2) {
            this.$router.push({
                path: sessionStorage.getItem('flexible_root_router')+'/flexible/report/reject/all'
            });
        } else {
            this.$router.push({
                path: sessionStorage.getItem('flexible_root_router')+'/flexible/report/pending/all'
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
.test{
    width: 75%;
}
.fi-main-report{
    position: relative;
}
.fi-link-back{
    position: absolute;
    top: 20px;
    left: 10px;
    background: white;
    border: none;
}
.fi-link-back:hover{
    color: #EE3024;
}
.PENDING{
    color: rgb(250, 150, 0);
    // font-weight: bold;
    // font-family: Helvetica;
    // text-shadow: 0 1px 0 white, 0 2px 0 white, 0 3px 0 rgb(250, 150, 0), 0 4px 0 rgb(250, 150, 0);
}
.fi-main-tab-style{
    //background: rgb(132, 196, 233);
}
.REJECTED{
    color: #F34E4E;
}
.APPROVED{
    color: #20A816;
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
#big-divice{
    display: block;
}
#small-divice{
    display: none;
}

@media only screen and (max-width: 1250px) {
    .stepper-progressbar li{
        font-size: 22px;
    }
}

@media only screen and (max-width: 1120px) {
    .stepper-progressbar li{
        font-size: 20px;
    }
    .stepper-progressbar li:before {
    /*CSS for creating steper block before the li item*/
        height:40px;
        width:40px; 
        line-height: 40px; 
    }
    .stepper-progressbar li:after {
    /*CSS for creating horizontal line*/
        top: 20px; 
    }
}

@media only screen and (max-width: 992px) {
    .test{
        width: 100%;
    }
    .stepper-progressbar li{
        font-size: 18px;
    }
    .stepper {
        left: -3.5%;
    }
    .fi-tab-title {
        font-size: 22px;
    }
}
@media only screen and (max-width: 890px) {
    
}
@media only screen and (max-width: 767px) {
  .stepper-progressbar li{
        font-size: 14px;
    }
    .stepper-progressbar li:before {
    /*CSS for creating steper block before the li item*/
        height:30px;
        width:30px; 
        line-height: 26px; 
    }
    .stepper-progressbar li:after {
    /*CSS for creating horizontal line*/
        top: 15px; 
    }
    .fi-tab-title {
        font-size: 20px;
    }
    .fi-link-back{
        top: 14px;
    }
}
@media only screen and (max-width: 620px) {
  .stepper-progressbar li{
        font-size: 12px;
    }
    .fi-tab-title {
        font-size: 18px;
    }
    div.fi-title{
        font-size: 12px;
    }
    .fi-percent {
        font-size: 16px;
    }
    .fi-link-back{
        top: 12px;
    }
}

@media only screen and (max-width: 500px) {
    .stepper {
        left: -7%;
    }
    .fi-tab-title {
        font-size: 16px;
    }
    #big-divice{
        display: none;
    }
    #small-divice{
        display: block;
    }
    .fi-link-back{
        top: 10px;
    }
}

@media only screen and (max-width: 400px) {

    .fi-tab-title {
        font-size: 11px;
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
      