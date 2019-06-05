<template>
    <div class="fi-main-leader">
        <router-link to="/flexible/report/pending/all" class="fi-link-report"><i class="fa fa-line-chart"></i></router-link>
        <ul class="nav nav-tabs  mb-3 justify-content-center hide-on-print-mode">
            <li class="nav-item">
                <a class="nav-link PENDING" href="javascript:event" :class="tabActive[0]" @click="changeActiveLeader(0)"><strong class="fi-tab-title">PENDING</strong></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="javascript:event" :class="tabActive[1]" @click="changeActiveLeader(1)"><strong class="fi-tab-title">HISTORY</strong></a>
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
  name: 'main_leader',
  data(){
      return {
          toggle: false,
          tabActive: [
              'active',
              ''
          ]
      }
  },
  mounted(){
      if(this.$router['history']['current']['name'] == "leader_approve_history") {
          this.tabActive = [
              '',
              'active'
          ]
      }
  },
  methods: {
    changeActiveLeader(i){
        this.tabActive[i] = 'active';
        (i == 0) ? this.tabActive[1] = '': this.tabActive[0] = ''; 
        (i == 0) ? this.$router.push({
            path: sessionStorage.getItem('flexible_root_router')+'/flexible/leader/approve'
        }): this.$router.push({
            path: sessionStorage.getItem('flexible_root_router')+'/flexible/leader/approve/history'
        }); 
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
.fi-main-leader{
    position: relative;
}
.fi-link-report{
    position: absolute;
    top: 20px;
    right: 10px;
    background: white;
    border: none;
}
.fi-link-report:hover{
    color: #EE3024;
}
.PENDING{
    color: rgb(250, 150, 0);
    font-weight: bold;
    font-family: Helvetica;
    text-shadow: 0 1px 0 white, 0 2px 0 white, 0 3px 0 rgb(250, 150, 0), 0 4px 0 rgb(250, 150, 0);
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
    margin-top: 30px;
}
#big-divice{
    display: block;
}
#small-divice{
    display: none;
}
.stepper {
    width:100%;
    position: relative;
    left: -2.5%;
}
.stepper-progressbar {
    counter-reset: step; 
}
.stepper-progressbar li{
    list-style-type: none; 
    float: left; 
    width: 20%; 
    font-size: 25px;
    position:relative; 
    text-align: center;
    font-weight: 600;
}
.stepper-progressbar li:before {
 /*CSS for creating steper block before the li item*/
    cursor: pointer;
    content:counter(step); 
    counter-increment: step; 
    height:50px;
    width:50px; 
    line-height: 50px; 
    border: 3px solid #ddd; 
    display:block; 
    text-align: center;
    margin: 0 auto 10px auto; 
    border-radius: 50%; 
    background-color: white; 
}
.stepper-progressbar li:after {
 /*CSS for creating horizontal line*/
    content:'';
    position: absolute; 
    width:100%;
    height:2px;
    background-color: #ddd;
    top: 25px; 
    left: -50%; 
    z-index: -1; 
}
.stepper-progressbar li:first-child:after {
    content:none;
}
.stepper-progressbar li.stepper-active {
    color:#C72B2C;
}
.stepper-progressbar li.stepper-active:before {
    border-color:#C72B2C;
    background-color: #C72B2C; 
    color: white;
}
.stepper-progressbar li.stepper-active-after + li:after{
    background-color:#C72B2C; 
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
    .fi-link-report{
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
    .fi-link-report{
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
    .fi-link-report{
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
      