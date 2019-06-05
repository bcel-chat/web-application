<template>
    <div class="container">
      <div class="row">
        <!-- <div class="col-md-12">
            <h1><strong class="interest-title">ປະຫວັດການໃຊ້ບໍລິການຢູ່ ທຄຕລ</strong></h1>
        </div> -->
        <div class="col-12 col-md-12 col-lg-12 col-xl-12" v-if="products.length">
            <div class="fi-account" v-for="(product, index) in products" :key="index">
              <div class="fi-account-detail text-left">
                <h3 class="fi-account-title"><label style="width: 10px; height: 10px; border-radius: 50%; background: gray; margin-bottom: 2px;"></label> ເລກບັນຊີ: <strong>{{product['acc_no']}}</strong></h3>
                <small v-if="product['desc']">&nbsp&nbsp&nbsp&nbsp {{product['desc']}}</small>
              </div>
              <div class="products" :class="'product'+(index+1)" v-if="!showLoading">
                <div class="text-left" v-html="products[index]['list_html']"> </div>
                <!-- cute code is here -->
                <hr>
              </div>
              <div class="fi-box" v-else>
                <div class="fi-loading text-center">
                  <img class="img-loader-out" src="@/assets/flexible_interest/images/loader.gif" alt="Loader">
                </div>
              </div>
            </div>
        </div>
        <div class="col-12 col-md-12 col-lg-12 col-xl-12" v-else>
          <div class="fi-not-found text-center">
            <h5><strong>ບໍ່ມີປະຫວັດໃຊ້ບໍລິການ</strong></h5>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left">
          <button class="fi-btn-next" type="button" @click="backwardProgress()">&#8592;</button>
        </div>
        <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">
          <button class="fi-btn-next" type="button" @click="doNext()">ຕໍ່ໄປ</button>
        </div>
      </div>
  </div>
</template>

<script>
import ds from '@/helper/ds.js'
import address from '@/helper/server_address.js'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/flexible_interest/fonts/phetsarath_font.css'
import { constants } from 'crypto';
export default {
  name: 'customer_product',
  data(){
      return {
          showLoading: true,
          customer_info: this.$store.getters['flexible_interest_module/requirement'],
          products: this.$store.getters['flexible_interest_module/requirement']['bank_accounts']
      }
  },
  created() {
    
  },
  mounted(){
    if(window.sessionStorage.getItem('actionProgress')){
      var stepAction = JSON.parse(window.sessionStorage.getItem('actionProgress'));
      if(!stepAction[1]['active']){
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
        if(this.products.length > 0) {
          var checkCompleted = 0;
          for(var i = 0; i < this.products.length; i++){
            /*axios.get(address['serverIp'] +'/bcel/api/flexible/interest/products/'+this.products[i]['acc_no'].trim()+'/history')
            .then((res) => {
            //console.log(res['data']['data'])
                checkCompleted += 1;
                var result = res['data']['data'];
                for(var j = 0; j < this.products.length; j++){
                  if(this.products[j]['acc_no'].trim() == result['acc_no']){
                    try {
                      this.products[j]['list'] = JSON.parse(result['result']);
                    } catch (error) {
                      this.products[j]['list'] = {}
                    }
                  }
                }
                if(checkCompleted == this.products.length){
                  this.showLoading = false;
                }
            })
            .catch((error) => {
              console.log(error)
              this.showLoading = false;
            });*/
            axios.get(address['serverIp'] +'/bcel/api/flexible/interest/products/'+this.products[i]['acc_no'].trim()+'/history/html')
            .then((res) => {
            //console.log(res['data']['data'])
                checkCompleted += 1;
                var result = res['data']['data'];
                for(var j = 0; j < this.products.length; j++){
                  if(this.products[j]['acc_no'].trim() == result['acc_no']){
                    var result = result['result'];
                    this.products[j]['list_html'] = result.replace(/img\//g,'/img/').replace(/<\/h2>/g,'</h2>\n');
                    var productArr = this.products[j]['list_html'].match(/<div class='product.*<\/h2>/g);
                    var productUsage = '';
                    for(var k=0; k < productArr.length; k++){
                        if(productArr[k].search("disabled")<0) {
                            var product = productArr[k].split('h2')[1].slice(1, productArr[k].split('h2')[1].length - 2) +', ';
                            productUsage += product;
                        }
                    }
                    this.products[j]['list'] = productUsage.trim().slice(0, productUsage.length - 2);
                    //console.log(this.products[j]['list'])
                  }
                }
                if(checkCompleted == this.products.length){
                  this.showLoading = false;
                }
            })
            .catch((error) => {
              //console.log(error)
              this.showLoading = false;
            });
            // ds.rpc.make('/bcel/api/flexible/interest/customer/product', { acc_no: this.products[i]['acc_no'].trim() }, ( error, result ) => {
            //   if(result){
            //     console.log(result)
            //     this.products = JSON.parse(result);
            //     console.log(this.products)
            //     this.customer_info['products'] = this.products;
            //     this.showLoading = false;
            //   }
            // });
          }
        } else {
          this.showLoading = false;
        }
      }
    } else {
        this.$root.$emit("resetDefault");
        this.$router.push({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'
        })
    }
  },
  methods: {
    getCheckResponse(index){
      if(this.products[index]['list']){
        //console.log(true)
        return true;
      } else {
        //console.log(false)
        return false;
      }
    },
    doNext(){
        this.$store.commit('flexible_interest_module/addCustomerRequirement', { info: this.customer_info });
        window.sessionStorage.setItem('requirement', JSON.stringify(this.customer_info));
        this.$store.commit('flexible_interest_module/addProgressActionActive', { index: 1, key:'active-after', val: 'stepper-active-after' });
        this.$store.commit('flexible_interest_module/addProgressActionActive', { index: 2, key:'active', val: 'stepper-active' });
        window.sessionStorage.setItem('actionProgress', JSON.stringify(this.$store.getters['flexible_interest_module/action_active']));
        this.$router.push({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/interest'
        });
    },
    backwardProgress(){
        this.$router.push({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
    font-family: Phetsarath_OT;
}

img.img-loader {
  width: 50px;
  margin-bottom: 15px;
}
img.img-loader-out {
  margin-top: 15px;
  width: 80px;
  margin-bottom: 15px;
}
.fi-not-found{
  position: relative;
  padding-top: 246px;
  background: rgb(240, 239, 239);
  color: #D3D3D3;
  width: 100%;
  height: 500px;
  margin-bottom: 5px;
}
.fi-account{
  margin-top: 20px;
}
.fi-account-title {
  padding: 0px;
  margin: 0px;
}
.fi-btn-next{
    margin-bottom: 10px;
    background: #C72B2C;
    color: white;
    border: 1px #C72B2C solid;
    border-radius: 3px;
    width: 8rem;
    font-size: 1.2rem;
}
.fi-btn-next:hover{
    background: #A42C35;
}
.fi-card{
    border: 1px lightgrey solid;
    -webkit-box-shadow: 0.1px 0.1px 0.1px 0.1px #C72B2C;
	   -moz-box-shadow: 0.1px 0.1px 0.1px 0.1px #C72B2C;
	        box-shadow: 0.1px 0.1px 0.1px 0.1px #C72B2C;
    padding: 1rem;
    -webkit-transition: box-shadow 0.5s; /* For Safari 3.1 to 6.0 */
    transition: box-shadow 0.5s;
    margin: 5px;
    background: white;
}
.fi-card:hover{
    border: 1px lightgrey solid;
    -webkit-box-shadow: 0.5px 0.1px 0.5px 0.5px #C72B2C;
	   -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
	        box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
    padding: 1rem;

}
.fi-box {
  border: 1px lightgrey solid;
  -webkit-box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
    -moz-box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
        box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
  padding: 0px 5px 0px 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  background: rgb(240, 239, 239);
  border-radius: 4px;
}
.productpicture {
  max-width: 150px;
}
.product-name{
  color: rgb(173, 173, 173);
}
.interest-title{
    font-size: 3rem;
}
strong.no{
    position: absolute;
    left: 5%;
    top: 10px;
    color: white;
    font-size: 40px;
}
strong.title {
    position: absolute;
    left: 14%;
    top: 10px;
    color: white;
    font-size: 30px;
}
span.arrow1{
    position: absolute;
    left: 45%;
    color: white;
    font-size: 60px;
    margin-top: -14px;
}
span.arrow2{
    position: absolute;
    left: 46.5%;
    color: white;
    font-size: 45px;
    margin-top: -1px;
}
textarea{
    color: white;
    right: 18px;
    top: 15px;
    width: 100%;
    height: 150px;
    background: transparent;
    border: none;
    font-size: 22px;
    padding-left: 30px;
    padding-right: 5px;
}
input, select, span.show{
    position: absolute;
    color: white;
    right: 18px;
    top: 15px;
    width: 48%;
    background: transparent;
    border: none;
    font-size: 22px;
    padding-right: 5px;
}
input:focus, select:focus, textarea:focus, button:focus{
    outline: none;
}
select#currency option {
  margin: 40px;
  background: #A73334;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
select#deposit option {
  margin: 40px;
  background: #C1262E;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
select#interest option {
  margin: 40px;
  background: #C72B2C;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}

select:invalid {
  color: #D3D3D3;
}

::placeholder {
  color: #D3D3D3;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: #D3D3D3;
}

::-ms-input-placeholder { /* Microsoft Edge */
 color: #D3D3D3;
}
@media only screen and (max-width: 1500px) {
  strong.no{
        position: absolute;
        left: 5%;
        top: 14px;
        color: white;
        font-size: 30px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 12px;
        color: white;
        font-size: 27px;
    }
    span.arrow1{
        position: absolute;
        left: 41%;
        color: white;
        font-size: 55px;
        margin-top: -11px;
    }
    span.arrow2{
        position: absolute;
        left: 42.5%;
        color: white;
        font-size: 40px;
        margin-top: 0px;
    }
    textarea{
        font-size: 22px;
    }
    input, select, span.show{
        top: 13px;
        font-size: 22px;
        width: 52%;
    }
}
@media only screen and (max-width: 1400px) {
  strong.no{
        position: absolute;
        left: 5%;
        top: 12px;
        color: white;
        font-size: 30px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 12px;
        color: white;
        font-size: 25px;
    }
    span.arrow1{
        position: absolute;
        left: 41%;
        color: white;
        font-size: 55px;
        margin-top: -12px;
    }
    span.arrow2{
        position: absolute;
        left: 42.5%;
        color: white;
        font-size: 40px;
        margin-top: -1px;
    }
    textarea{
        font-size: 20px;
    }
    input, select, span.show{
        top: 13px;
        font-size: 20px;
        width: 52%;
    }
}
@media only screen and (max-width: 1300px) {
  strong.no{
        position: absolute;
        left: 5.5%;
        top: 12px;
        color: white;
        font-size: 27px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 12px;
        color: white;
        font-size: 22px;
    }
    span.arrow1{
        position: absolute;
        left: 41%;
        color: white;
        font-size: 50px;
        margin-top: -12px;
    }
    span.arrow2{
        position: absolute;
        left: 42.5%;
        color: white;
        font-size: 35.5px;
        margin-top: -1px;
    }
    textarea{
        font-size: 18px;
    }
    input, select, span.show{
        top: 13px;
        font-size: 18px;
        width: 52%;
    }
}
@media only screen and (max-width: 1200px) {
  strong.no{
        position: absolute;
        left: 5.5%;
        top: 10px;
        color: white;
        font-size: 27px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 10px;
        color: white;
        font-size: 22px;
    }
    span.arrow1{
        position: absolute;
        left: 41%;
        color: white;
        font-size: 50px;
        margin-top: -13px;
    }
    span.arrow2{
        position: absolute;
        left: 42.7%;
        color: white;
        font-size: 35px;
        margin-top: -1px;
    }
    textarea{
        font-size: 18px;
    }
    input, select, span.show{
        top: 11px;
        font-size: 18px;
        width: 52%;
    }
}

@media only screen and (max-width: 1120px) {
  strong.no{
        position: absolute;
        left: 5.5%;
        top: 10px;
        color: white;
        font-size: 22px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 10px;
        color: white;
        font-size: 20px;
    }
    span.arrow1{
        position: absolute;
        left: 41%;
        color: white;
        font-size: 45px;
        margin-top: -10px;
    }
    span.arrow2{
        position: absolute;
        left: 42.7%;
        color: white;
        font-size: 30px;
        margin-top: 1px;
    }
    textarea{
        font-size: 17px;
    }
    input, select, span.show{
        top: 11px;
        font-size: 17px;
        width: 52%;
    }
}

@media only screen and (max-width: 992px) {
  strong.no{
        position: absolute;
        left: 5%;
        top: 8px;
        color: white;
        font-size: 30px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 8px;
        color: white;
        font-size: 24px;
    }
    span.arrow1{
        position: absolute;
        left: 43%;
        color: white;
        font-size: 52px;
        margin-top: -16px;
    }
    span.arrow2{
        position: absolute;
        left: 44.5%;
        color: white;
        font-size: 37px;
        margin-top: -5px;
    }
    textarea{
        font-size: 20px;
    }
    input, select, span.show{
        top: 10px;
        width: 50%;
        font-size: 20px;
    }
    .interest-title{
        font-size: 2.5rem;
    }
}
@media only screen and (max-width: 890px) {
  strong.no{
        position: absolute;
        left: 5%;
        top: 8px;
        color: white;
        font-size: 25px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 8px;
        color: white;
        font-size: 22px;
    }
    span.arrow1{
        position: absolute;
        left: 43%;
        color: white;
        font-size: 50px;
        margin-top: -13px;
    }
    span.arrow2{
        position: absolute;
        left: 44.5%;
        color: white;
        font-size: 35px;
        margin-top: -1px;
    }
    textarea{
        font-size: 20px;
    }
    input, select, span.show{
        top: 10px;
        width: 50%;
        font-size: 20px;
    }
}
@media only screen and (max-width: 767px) {
  strong.no{
        position: absolute;
        left: 5.5%;
        top: 9px;
        color: white;
        font-size: 25px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 9px;
        color: white;
        font-size: 20px;
    }
    span.arrow1{
        position: absolute;
        left: 41%;
        color: white;
        font-size: 40px;
        margin-top: -8px;
    }
    span.arrow2{
        position: absolute;
        left: 42.5%;
        color: white;
        font-size: 30px;
        margin-top: 0px;
    }
    textarea{
        font-size: 18px;
    }
    input, select, span.show{
        top: 9px;
        width: 52%;
        font-size: 18px;
    }
}
@media only screen and (max-width: 620px) {
  strong.no{
        position: absolute;
        left: 6%;
        top: 12px;
        color: white;
        font-size: 20px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 12px;
        color: white;
        font-size: 16px;
    }
    span.arrow1{
        position: absolute;
        left: 38%;
        color: white;
        font-size: 30px;
        margin-top: -3px;
    }
    span.arrow2{
        position: absolute;
        left: 39%;
        color: white;
        font-size: 20px;
        margin-top: 6px;
    }
    textarea{
        font-size: 16px;
    }
    input, select, span.show{
        top: 9px;
        width: 56%;
        font-size: 16px;
    }
    .interest-title{
        font-size: 2rem;
    }
}

@media only screen and (max-width: 500px) {
  strong.no{
        position: absolute;
        left: 6.5%;
        top: 10px;
        color: white;
        font-size: 18px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 10px;
        color: white;
        font-size: 14px;
    }
    span.arrow1{
        position: absolute;
        left: 38%;
        color: white;
        font-size: 30px;
        margin-top: -6px;
    }
    span.arrow2{
        position: absolute;
        left: 39%;
        color: white;
        font-size: 20px;
        margin-top: 3px;
    }
    textarea{
        font-size: 14px;
    }
    input, select, span.show{
        top: 8px;
        width: 54%;
        font-size: 14px;
    }
    .fi-account-title{
      font-size: 25px;
    }
}

@media only screen and (max-width: 400px) {
  strong.no{
        position: absolute;
        left: 7%;
        top: 8px;
        color: white;
        font-size: 15px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 8px;
        color: white;
        font-size: 12px;
    }
    span.arrow1{
        position: absolute;
        left: 41%;
        color: white;
        font-size: 25px;
        margin-top: -4px;
    }
    span.arrow2{
        position: absolute;
        left: 42.5%;
        color: white;
        font-size: 15px;
        margin-top: 5px;
    }
    textarea{
        font-size: 12px;
    }
    input, select, span.show{
        top: 7px;
        width: 49%;
        font-size: 12px;
    }
    .fi-account-title{
      
    }
    .fi-account-title{
      font-size: 20px;
    }
}
</style>
