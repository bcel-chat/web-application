<template>
  <div>
    <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 hide-on-print-mode">
            <div class="container">
                <div class="fi-stepper" id="big-divice">
                    <ul class="stepper-progressbar">
                        <li class="stepper-active" :class="getActiveClass(0)">ຂໍ້ມູນລູກຄ້າ</li>
                        <li :class="getActiveClass(1)">ປະຫວັດໃຊ້ບໍລິການ</li>
                        <li :class="getActiveClass(2)">ດອກເບ້ຍຍືດຍຸ່ນ</li>
                        <li :class="getActiveClass(3)">ຄຳຄິດຄຳເຫັນ</li>
                        <li :class="getActiveClass(4)">ຂໍອະນຸມັດ</li>
                    </ul>
                </div>
                <div class="fi-stepper" id="small-divice">
                    <ul class="stepper-progressbar">
                        <li class="stepper-active" :class="getActiveClass(0)"></li>
                        <li :class="getActiveClass(1)"></li>
                        <li :class="getActiveClass(2)"></li>
                        <li :class="getActiveClass(3)"></li>
                        <li :class="getActiveClass(4)"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="content">
                <router-view/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/flexible_interest/fonts/phetsarath_font.css'
export default {
  name: 'flexible_process',
  data(){
      return {
      }
  },
  mounted(){
  },
  methods: {
      getActiveClass(i){
          var cls1 = this.$store.getters['flexible_interest_module/action_active'][i]['active']?this.$store.getters['flexible_interest_module/action_active'][i]['active']:'';
          var cls2 = this.$store.getters['flexible_interest_module/action_active'][i]['active-after']?this.$store.getters['flexible_interest_module/action_active'][i]['active-after']:'';
          var cls = cls1 + ' ' + cls2;
          return cls.trim() ? cls.trim() : '';
      },
      maxFlex(){
          return this.$store.getters['flexible_interest_module/maxFlex']
      },
      getPermission(){
          return window.sessionStorage.getItem('permission') == 'true';
      },
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
.fi-stepper {
    width:100%;
    position: relative;
    left: -2.5%;
    z-index: 1;
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
    content:"";
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
