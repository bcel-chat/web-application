<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <div class="fi-group">
                    <div class="row">
                        <div class="col-12 text-left">
                            <strong class="fi-title">ປະເພດລູກຄ້າ *</strong>
                        </div>
                        <div class="col-4 text-left">
                            <!-- <input type="radio" value="TAI" v-model="customer_info['type']"> ບູກຄົນ -->
                            <label class="fi-container">
                                <span class="fi-radio-text">ບູກຄົນ</span>
                                <input type="radio" name="radio" value="TAI" v-model="customer_info['type']" @change="validateType">
                                <span class="fi-checkmark"></span>
                            </label>
                        </div>
                        <div  class="col-4 text-center">
                            <!-- <input type="radio" value="TCO" v-model="customer_info['type']"> ນິຕິບູກຄົນ -->
                            <label class="fi-container">
                                <span class="fi-radio-text">ນິຕິບູກຄົນ</span>
                                <input type="radio" name="radio" value="TCO" v-model="customer_info['type']" @change="validateType">
                                <span class="fi-checkmark"></span>
                            </label>
                        </div>
                        <div  class="col-4 text-right">
                            <!-- <input type="radio" value="TPO" v-model="customer_info['type']">ອົງກອນລັດ -->
                            <label class="fi-container">
                                <span class="fi-radio-text">ອົງກອນລັດ</span>
                                <input type="radio" name="radio" value="TPO" v-model="customer_info['type']" @change="validateType">
                                <span class="fi-checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="fi-padding-left text-left" v-if="error_validation['type'].length > 0">
                    <span class="danger" v-for="(error, index) in error_validation['type']" :key="index">{{error}}</span>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <img class="img-background" src="@/assets/flexible_interest/images/img1.svg" alt="Image logo">
                <strong class="no">1</strong>
                <strong class="title">ຊື່ ແລະ ນາມສະກຸນ *</strong>
                <span class="arrow1">&#8250;</span>
                <span class="arrow2">&#8250;</span>
                <input type="text" class="fi-input" placeholder="ຊື່ ແລະ ນາມສະກຸນລູກຄ້າ" v-model="customer_info['name']" required @change="validateName">
                <div class="error-message" v-if="error_validation['name'].length > 0">
                    <span class="danger" v-for="(error, index) in error_validation['name']" :key="index">{{error}}</span>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <img class="img-background" src="@/assets/flexible_interest/images/img2.svg" alt="Image logo">
                <strong class="no">2</strong>
                <strong class="title">ເບີໂທ *</strong>
                <span class="arrow1">&#8250;</span>
                <span class="arrow2">&#8250;</span>
                <input type="text" class="fi-input" placeholder="ເບີໂທລະສັບ" v-model="customer_info['tel']" required @change="validateTel">
                <div class="error-message" v-if="error_validation['tel'].length > 0">
                    <span class="danger" v-for="(error, index) in error_validation['tel']" :key="index">. {{error}}</span>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <img class="img-background" src="@/assets/flexible_interest/images/img3.svg" alt="Image logo">
                <strong class="no">3</strong>
                <strong class="title">ອາຊີບ *</strong>
                <span class="arrow1">&#8250;</span>
                <span class="arrow2">&#8250;</span>
                <input type="text" class="fi-input" placeholder="ອາຊີບລູກຄ້າ" v-model="customer_info['occupation']" required @change="validateOccupation">
                <div class="error-message" v-if="error_validation['occupation'].length > 0">
                    <span class="danger" v-for="(error, index) in error_validation['occupation']" :key="index">. {{error}}</span>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <div class="fi-account-group">
                    <img class="img-background" src="@/assets/flexible_interest/images/img4.svg" alt="Image logo">
                    <strong class="no">4</strong>
                    <strong class="title">ບັນຊີທະນາຄານ</strong>
                    <span class="arrow1">&#8250;</span>
                    <span class="arrow2">&#8250;</span>
                    <div class="fi-account text-left" v-for="(account, index) in customer_info['bank_accounts']" :key="index" :class="getAccountMoreClass(index)">
                        <div class="fi-account-title">
                            <strong>Account {{index+1}}</strong>
                        </div>
                        <strong class="delIcon" v-if="customer_info['bank_accounts'].length > 1" @click="deleteAccount(index)">x</strong>
                        <div class="row">
                            <div class="col-12 col-sm-6 text-left">
                                <span>ເລກບັນຊີ</span>
                                <br>
                                <!-- @change="validateAccountNo" -->
                                <input class="fi-account-input" type="text" placeholder="ເລກບັນຊີທະນາຄານ" v-model="account['acc_no']" required @change="validateAccountNo(index)">
                            </div>
                            <div class="col-12 col-sm-6 text-left">
                                <span>ອະທິບາຍເພີ່ມເຕີມ</span>
                                <br>
                                <!-- @change="validateAccountNo" -->
                                <input class="fi-account-input" type="text" placeholder="ອະທິບາຍເພີ່ມເຕີມ" v-model="account['desc']" required>
                            </div>
                        </div>
                        <div v-if="error_validation['bank_accounts'].length > 0">
                            <div class="" v-if="error_validation['bank_accounts'][index]['acc_no'].length > 0">
                                <span class="fi-account-valid" v-for="(error, index) in error_validation['bank_accounts'][index]['acc_no']" :key="index">(* {{error}}) </span>
                            </div>
                        </div>
                    </div>
                    <div class="fi-add-pannel text-right">
                        <span class="fi-add" @click="addAccount()">+</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <div class="text-editor">
                    <img class="img-background" src="@/assets/flexible_interest/images/img5.svg" alt="Image logo">
                    <strong class="no">5</strong>
                    <strong class="title">ຂໍ້ມູນສ່ວນຕົວອື່ນໆ</strong>
                    <textarea id="more_detail" placeholder="ຂໍ້ມູນສ່ວນຕົວອື່ນໆ" v-model="customer_info['more_info']"></textarea>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-right">
                <button class="fi-btn-next" type="button" @click="doNext()">ຕໍ່ໄປ</button>
            </div>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/flexible_interest/fonts/phetsarath_font.css'

export default {
  name: 'customer_info',
  data(){
      return {
          customer_info: this.$store.getters['flexible_interest_module/requirement'],
          error_validation: {
            type: [],
            name: [],
            tel: [],
            occupation: [],
            bank_accounts: [],
            more_info: []
          }
      }
  },
  created(){
    
  },
  mounted(){
    if(this.customer_info['bank_accounts'].length <= 0){
        this.addAccount();
    } else {
        for(var i=0; i < this.customer_info['bank_accounts'].length; i++){
            this.error_validation['bank_accounts'].push({
                acc_no: [],
                desc: []
            });
        }
    }
  },
  methods: {
      validateType(){
          if(!this.customer_info['type'].trim()){
              if(this.error_validation['type'].length == 0){
                  this.error_validation['type'].push('ເລືອກປະເພດລູກຄ້າ');
              }
              return false;
          }  else if(this.error_validation['type'].length > 0) {
              this.error_validation['type'].pop();
          }
          return true;
      },
      validateName(){
          if(!this.customer_info['name'].trim()){
              if(this.error_validation['name'].length == 0){
                  this.error_validation['name'].push('ຊື່ລູກຄ້າຫ້າມວ່າງ');
              }
              return false;
          }  else if(this.error_validation['name'].length > 0) {
              this.error_validation['name'].pop();
          }
          return true;
      },
      validateOccupation(){
          if(!this.customer_info['occupation'].trim()){
              if(this.error_validation['occupation'].length == 0){
                this.error_validation['occupation'].push('ອາຊີບລູກຄ້າຫ້າມວ່າງ');
              }
              return false;
          } else if(this.error_validation['occupation'].length > 0) {
              this.error_validation['occupation'].pop();
          }
          return true;
      },
      getAccountMoreClass(index){
          return (
              index == 0
            )? 
            (
                (
                    this.customer_info['bank_accounts'].length == 1
                )?
                    'fi-account' + (index + 1) + ' fi-account-last'
                : 
                    'fi-account' + (index + 1)
            ):
            (
                (
                    index == this.customer_info['bank_accounts'].length - 1
                )?
                    'fi-account-last'
                :
                    ''
            )
      },
      deleteAccount(i){
          this.customer_info['bank_accounts'].splice(i, 1);
          this.error_validation['bank_accounts'].splice(i, 1);
      },
      addAccount(){
           this.customer_info['bank_accounts'].push({acc_no: '', desc: ''});
           this.error_validation['bank_accounts'].push({
                    acc_no: [],
                    desc: []
                });
      },
      validateTel(){
        if(!this.customer_info['tel'].trim()){
            if(this.error_validation['tel'].length == 0){
                this.error_validation['tel'].push('ເບີໂທລະສັບຫ້າມວ່າງ');
            }
            return false;
        }  else if(this.error_validation['tel'].length > 0) {
            this.error_validation['tel'].pop();
        }
        if(isNaN(this.customer_info['tel'].trim())){
            if(this.error_validation['tel'].indexOf('ເບີໂທລະສັບຫ້າມວ່າງ') >= 0){
                this.error_validation['tel'].splice(this.error_validation['tel'].indexOf('ເບີໂທລະສັບຫ້າມວ່າງ'));
            }
            if(this.error_validation['tel'].indexOf('ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກ') < 0){
                this.error_validation['tel'].push('ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກ');
            }
            return false;
        } else if(this.error_validation['tel'].indexOf('ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກ') >= 0) {
            this.error_validation['tel'].splice(this.error_validation['tel'].indexOf('ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກ'));
        }
          return true;
      },
      validateAccountNo(i){
            if(!this.customer_info['bank_accounts'][i]['acc_no'].trim()) {
                if(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ') >= 0) {
                    this.error_validation['bank_accounts'][i]['acc_no'].splice(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ'));
                }
                if(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ') >= 0){
                    this.error_validation['bank_accounts'][i]['acc_no'].splice(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ'));
                }
                return true;
            }

            if(isNaN(this.customer_info['bank_accounts'][i]['acc_no'].trim())){
                if(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ') >= 0){
                    this.error_validation['bank_accounts'][i]['acc_no'].splice(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ'));
                }
                if(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ') < 0){
                    this.error_validation['bank_accounts'][i]['acc_no'].push('ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ');
                }
                return false;
            } else if(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ') >= 0) {
                this.error_validation['bank_accounts'][i]['acc_no'].splice(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ'));
            }
            
            if(this.customer_info['bank_accounts'][i]['acc_no'].trim().length != 18){
                if(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ') >= 0) {
                    this.error_validation['bank_accounts'][i]['acc_no'].splice(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ'));
                }
                if(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ') <0){
                    this.error_validation['bank_accounts'][i]['acc_no'].push('ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ');
                }
                return false;
            } else if(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ') >= 0){
                this.error_validation['bank_accounts'][i]['acc_no'].splice(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ'));
            }
          
            return true;
      },
      validateAccounts(){
          var compare = true;
          for(var i=0; i < this.customer_info['bank_accounts'].length; i++){
               var result = this.validateAccountNo(i);
               compare = compare && result;
          }
          return compare;
      },
      doNext(){
          if(this.validateType() && this.validateName() && this.validateOccupation() && this.validateAccounts()  && this.validateTel()){
                for(var i=0; i < this.customer_info['bank_accounts'].length; i++){
                    if(!this.customer_info['bank_accounts'][i]['acc_no']){
                        this.customer_info['bank_accounts'].splice(i, 1);
                    }
                }
                this.$store.commit('flexible_interest_module/addCustomerRequirement', { info: this.customer_info });
                window.sessionStorage.setItem('requirement', JSON.stringify(this.customer_info));
                this.$store.commit('flexible_interest_module/addProgressActionActive', { index: 0, key:'active-after', val: 'stepper-active-after' });
                this.$store.commit('flexible_interest_module/addProgressActionActive', { index: 1, key:'active', val: 'stepper-active' });
                window.sessionStorage.setItem('actionProgress', JSON.stringify(this.$store.getters['flexible_interest_module/action_active']));
                this.$router.push({
                    path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/product'
                });
          } else {
              this.validateType();
              this.validateName();
              this.validateOccupation();
              this.validateAccounts();
              this.validateTel();
          }
      }
  }
}
</script>

<style lang="scss" scoped>
* {
    font-family: Phetsarath_OT;
}
img{
    width: 100%;
    margin-top: 5px;
}
.danger{
    font-size: 12px;
    color: red;
}
.danger:before{
    content: '* ';
}
.text-editor{
    background: #D7262C;
    margin-top: 5px; 
    border-radius: 30px 0px 0px 0px;
}
.fi-account-group{
    background: #C72B2C;
    margin-top: 5px; 
    border-radius: 30px 0px 0px 0px;
    
}
.fi-account1{
    margin-top: -25px;
}
.fi-account {
    position: relative;
    margin-left: 10%;
    margin-right: 5px;
    color: white;
    border: 1px white solid;
    padding: 10px;
    margin-bottom: 15px;
}
.fi-account-last{
    margin-bottom: 0px;
}
.fi-account-title{
    font-size: 21px;
    margin-top: -26px;
    padding-left: 10px;
    margin-bottom: 5px;
}
.fi-account-title>strong {
    background: #C72B2C;
}
input.fi-account-input {
    width: 100%;
    padding-left: 1px;
    background: transparent;
    color: white;
    border: none;
    padding-right: 5px;
}
input.fi-account-input:invalid {
    border-bottom: 1px rgba(197, 196, 196, 0.849) dotted;
}
input.fi-account-input:focus, input.fi-account-input:valid{
    border-bottom: 2px rgba(247, 245, 245, 0.849) dotted;
}
.fi-account-valid{
    color: orange;
    font-size: 12px;
}
.fi-add {
    cursor: pointer;
    color: white;
    font-size: 25px;
    font-weight: bold;
    margin-right: 4px;
    margin-top: -15px;
}
.fi-add:hover{
    color: rgb(211, 209, 209);
}

.delIcon{
    cursor: pointer;
    position: absolute;
    color: orange;
    right: 3px;
    top: -3px;
}
.delIcon:hover{
    color: rgb(255, 115, 0);
}

.fi-group{
    border-top-left-radius: 20px; 
    border-top-right-radius: 20px; 
    background: linear-gradient(to bottom right, #D7262C 10%, #A42C35 100%);
    padding: 0px 10px 20px 10px;
}

.fi-container {
  display: inline;
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.fi-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.fi-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: rgb(238, 238, 238);
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.fi-container:hover input ~ .fi-checkmark {
  background-color: rgb(192, 190, 190);
}

/* When the radio button is checked, add a blue background */
.fi-container input:checked ~ .fi-checkmark {
  background-color: white;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.fi-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.fi-container input:checked ~ .fi-checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.fi-container .fi-checkmark:after {
 	top: 4px;
	left: 4px;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background: #20A816;
}

.fi-btn-next{
    margin-top: 5px;
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
    -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
	   -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
	        box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
    padding: 1rem;
    -webkit-transition: box-shadow 0.5s; /* For Safari 3.1 to 6.0 */
    transition: box-shadow 0.5s;
}
.fi-card:hover{
    border: 1px lightgrey solid;
    -webkit-box-shadow: 0.5px 0.5px 0.5px 2px #C72B2C;
	   -moz-box-shadow: 0.5px 0.5px 0.5px 2px #C72B2C;
	        box-shadow: 0.5px 0.5px 0.5px 2px #C72B2C;
    padding: 1rem;

}
.interest-title{
    font-size: 3rem;
}
div.error-message {
    position: absolute;
    left: 12%;
    top: 80px;
}
.fi-padding-left {
    padding-left: 11%;
}
strong.no{
    position: absolute;
    left: 4%;
    top: 12px;
    color: white;
    font-size: 50px;
}
strong.title {
    position: absolute;
    left: 13%;
    top: 16px;
    color: white;
    font-size: 40px;
}
strong.fi-title{
    color: white;
    font-size: 40px;
}
span.fi-radio-text{
    font-size: 25px;
    color: white;
}
span.arrow1{
    position: absolute;
    left: 40%;
    color: white;
    font-size: 80px;
    margin-top: -18px;
}
span.arrow2{
    position: absolute;
    left: 41.5%;
    color: white;
    font-size: 60px;
    margin-top: -2px;
}
textarea{
    color: white;
    right: 18px;
    top: 15px;
    width: 100%;
    height: 250px;
    background: transparent;
    border: none;
    font-size: 30px;
    padding-left: 50px;
    padding-right: 5px;
}
input.fi-input, select, span.show{
    position: absolute;
    color: white;
    right: 18px;
    top: 18px;
    width: 54%;
    background: transparent;
    border: none;
    font-size: 35px;
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
        left: 4%;
        top: 12px;
        color: white;
        font-size: 50px;
    }
    div.error-message {
        position: absolute;
        left: 12%;
        top: 80px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 16px;
        color: white;
        font-size: 40px;
    }
    span.arrow1{
        position: absolute;
        left: 40%;
        color: white;
        font-size: 80px;
        margin-top: -18px;
    }
    span.arrow2{
        position: absolute;
        left: 41.5%;
        color: white;
        font-size: 60px;
        margin-top: -2px;
    }
    textarea{
        font-size: 30px;
    }
    input.fi-input, select, span.show{
        top: 18px;
        font-size: 35px;
        width: 54%;
    }
}
@media only screen and (max-width: 1400px) {
  strong.no{
        position: absolute;
        left: 4.5%;
        top: 14px;
        color: white;
        font-size: 45px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 16px;
        color: white;
        font-size: 35px;
    }
    span.arrow1{
        position: absolute;
        left: 40%;
        color: white;
        font-size: 75px;
        margin-top: -18px;
    }
    span.arrow2{
        position: absolute;
        left: 41.5%;
        color: white;
        font-size: 55px;
        margin-top: -1px;
    }
    textarea{
        font-size: 30px;
    }
    input.fi-input, select, span.show{
        top: 16px;
        font-size: 32px;
        width: 54%;
    }
    
    strong.fi-title{
        font-size: 35px;
    }
    span.fi-radio-text{
        font-size: 23px;
    }
}
@media only screen and (max-width: 1300px) {
  strong.no{
        position: absolute;
        left: 4.5%;
        top: 14px;
        color: white;
        font-size: 45px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 14px;
        color: white;
        font-size: 35px;
    }
    span.arrow1{
        position: absolute;
        left: 40%;
        color: white;
        font-size: 75px;
        margin-top: -20px;
    }
    span.arrow2{
        position: absolute;
        left: 41.5%;
        color: white;
        font-size: 55px;
        margin-top: -3px;
    }
    textarea{
        font-size: 28px;
    }
    input.fi-input, select, span.show{
        top: 16px;
        font-size: 30px;
        width: 54%;
    }
}
@media only screen and (max-width: 1200px) {
    .text-editor{
        border-radius: 25px 0px 0px 0px;
    }
    strong.no{
        position: absolute;
        left: 4.5%;
        top: 14px;
        color: white;
        font-size: 40px;
    }
    div.error-message {
        position: absolute;
        left: 12%;
        top: 65px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 14px;
        color: white;
        font-size: 32px;
    }
    span.arrow1{
        position: absolute;
        left: 40%;
        color: white;
        font-size: 65px;
        margin-top: -16px;
    }
    span.arrow2{
        position: absolute;
        left: 41.5%;
        color: white;
        font-size: 45px;
        margin-top: 1px;
    }
    textarea{
        font-size: 25px;
    }
    input.fi-input, select, span.show{
        top: 16px;
        font-size: 27px;
        width: 54%;
    }
    /* Style the indicator (dot/circle) */
    .fi-checkmark {
        height: 18px;
        width: 18px;
    }
    .fi-container .fi-checkmark:after {
        top: 4px;
        left: 4px;
        width: 10px;
        height: 10px;
    }
    strong.fi-title{
        font-size: 32px;
    }
    span.fi-radio-text{
        font-size: 20px;
    }
    .fi-account1{
        margin-top: -20px;
    }
    .fi-account-group{
        border-radius: 20px 0px 0px 0px;
    }
}

@media only screen and (max-width: 1120px) {
  
    strong.no{
        position: absolute;
        left: 4.5%;
        top: 14px;
        color: white;
        font-size: 35px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 14px;
        color: white;
        font-size: 30px;
    }
    span.arrow1{
        position: absolute;
        left: 40%;
        color: white;
        font-size: 65px;
        margin-top: -16px;
    }
    span.arrow2{
        position: absolute;
        left: 41.5%;
        color: white;
        font-size: 45px;
        margin-top: 1px;
    }
    textarea{
        font-size: 22px;
    }
    input.fi-input, select, span.show{
        top: 16px;
        font-size: 25px;
        width: 54%;
    }
    strong.fi-title{
        font-size: 30px;
    }
    span.fi-radio-text{
        font-size: 20px;
    }
    .fi-account-group{
        border-radius: 15px 0px 0px 0px;
    }
}

@media only screen and (max-width: 992px) {
.text-editor{
        border-radius: 15px 0px 0px 0px;
    }
  strong.no{
        position: absolute;
        left: 5%;
        top: 10px;
        color: white;
        font-size: 30px;
    }
    div.error-message {
        position: absolute;
        left: 12%;
        top: 48px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 12px;
        color: white;
        font-size: 24px;
    }
    span.arrow1{
        position: absolute;
        left: 40%;
        color: white;
        font-size: 52px;
        margin-top: -10px;
    }
    span.arrow2{
        position: absolute;
        left: 41.5%;
        color: white;
        font-size: 37px;
        margin-top: 2px;
    }
    textarea{
        font-size: 22px;
    }
    input.fi-input, select, span.show{
        top: 12px;
        width: 53%;
        font-size: 24px;
    }
    .interest-title{
        font-size: 2.5rem;
    }

    .fi-container{
        padding-left: 18px;
    }
    /* Style the indicator (dot/circle) */
    .fi-checkmark {
        top: 2px;
        height: 16px;
        width: 16px;
    }
    .fi-container .fi-checkmark:after {
        top: 4px;
        left: 4px;
        width: 8px;
        height: 8px;
    }
    strong.fi-title{
        font-size: 24px;
    }
    span.fi-radio-text{
        font-size: 18px;
    }
    .fi-account1{
        margin-top: -15px;
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
    div.error-message {
        position: absolute;
        left: 12%;
        top: 35px;
    }
    .danger{
        font-size: 10px;
    }
    strong.title {
        position: absolute;
        left: 13%;
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
    
    input.fi-input, select, span.show{
        top: 9px;
        width: 52%;
        font-size: 18px;
    }
    .fi-account1{
        margin-top: -10px;
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
    div.error-message {
        position: static;
        left: 12%;
        width: 88%;
        margin-left: 12%;
        margin-top: -14px;
        text-align: left;
        margin-bottom: -7px;
    }
    strong.title {
        position: absolute;
        left: 13%;
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
    .fi-group{
        padding-bottom: 10px;
    }
    /* Style the indicator (dot/circle) */
    .fi-checkmark {
        top: 4px;
        height: 14px;
        width: 14px;
    }
    .fi-container .fi-checkmark:after {
        top: 3px;
        left: 3px;
        width: 8px;
        height: 8px;
    }
    strong.fi-title{
        font-size: 18px;
    }
    span.fi-radio-text{
        font-size: 14px;
    }
    .fi-account span, input.fi-account-input{
        font-size: 14px;
    }
    .fi-account-title{
        font-size: 16px;
        margin-top: -22px;
    }
    .fi-account1{
        margin-top: -5px;
    }
}

@media only screen and (max-width: 500px) {
    .text-editor{
        border-radius: 10px 0px 0px 0px;
    }
    
    .fi-account-group{
        border-radius: 10px 0px 0px 0px;
    }
    strong.no{
        position: absolute;
        left: 6.5%;
        top: 10px;
        color: white;
        font-size: 18px;
    }
    strong.title {
        position: absolute;
        left: 13%;
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
    input.fi-input, select, span.show{
        top: 8px;
        width: 54%;
        font-size: 14px;
    }
    strong.fi-title{
        font-size: 16px;
    }
    .fi-account-title{
        font-size: 14px;
        margin-top: -20px;
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
        left: 13%;
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
    input.fi-input, select, span.show{
        top: 7px;
        width: 49%;
        font-size: 12px;
    }
    input.fi-account-input, .fi-account span{
        font-size: 12px;
    }
}
@media only screen and (max-width: 350px) {
    /* Style the indicator (dot/circle) */
    .fi-checkmark {
        height: 12px;
        width: 12px;
    }
    .fi-container .fi-checkmark:after {
        top: 2px;
        left: 2px;
        width: 8px;
        height: 8px;
    }
    strong.fi-title{
        font-size: 18px;
    }
    span.fi-radio-text{
        font-size: 12px;
    }
}

</style>
