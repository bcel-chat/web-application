<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['staff_note'].length > 0">
                <span class="danger" v-for="(error, index) in error_validation['staff_note']" :key="index">{{error}} </span>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <div class="text-editor text-editor1">
                    <img class="img-background" src="@/assets/flexible_interest/images/img4.svg" alt="Image logo">
                    <strong class="no">1</strong>
                    <strong class="title">ຄຳຄິດຄຳເຫັນຂອງພະນັກງານ</strong>
                    <textarea placeholder="ປະກອບຄຳຄິດຄຳເຫັນ" v-model="customer_info['staff_note']" @change="validateStaffNote"></textarea>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12  text-left" v-if="error_validation['documents'].length > 0">
                <span class="danger" v-for="(error, index) in error_validation['documents']" :key="index">{{error}} </span>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <div class="text-editor text-editor2 text-left">
                    <img class="img-background" src="@/assets/flexible_interest/images/img5.svg" alt="Image logo">
                    <strong class="no">2</strong>
                    <strong class="title">
                        ເອກະສານປະກອບຂອງລູກຄ້າ
                        <!-- <span class="text-note">(ສາມາດເລືອກໄດ້ຫຼາຍຟາຍພ້ອມກັນ)</span> -->
                    </strong>
                    <textarea placeholder="ເອກະສານຕິດຄັດຕ່າງໆ" v-model="customer_info['documents']"></textarea>
                    <!-- <input type="file" id="fileList" multiple accept="image/jpg, image/jpeg, image/png, application/pdf, application/msword, application/vnd.ms-excel" required @change="getDocumentFiles($event)"> 
                    <ul class="fi-text">
                        <li v-for="(file, index) in customer_info['document_files']" :key="index">{{file['name']}}</li>
                    </ul>-->
                </div>
            </div>
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
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/flexible_interest/fonts/phetsarath_font.css'
export default {
  name: 'document_attach',
  data(){
      return {
          customer_info: this.$store.getters['flexible_interest_module/requirement'],
          error_validation: {
              staff_note: [],
              documents: []
          }
      }
  },
  created() {
    if(window.sessionStorage.getItem('actionProgress')){
      var stepAction = JSON.parse(window.sessionStorage.getItem('actionProgress'));
      if(!stepAction[3]['active']){
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
      }
    } else {
        this.$root.$emit("resetDefault");
        this.$router.push({
            path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'
        })
    }
  },
  mounted(){
      console.log(this.customer_info)
  },
  methods: {
      validateStaffNote(){
          if(!this.customer_info['staff_note'].trim()){
              if(this.error_validation['staff_note'].length == 0){
                this.error_validation['staff_note'].push('ຄຳຄິດເຫັນຂອງພະນັກງານຫ້າມວ່າງ');
              }
              return false;
          } else if(this.error_validation['staff_note'].length > 0) {
              this.error_validation['staff_note'].pop();
          }
          return true;
      },
      validateDocuments(){
          if(!this.customer_info['documents'].trim()){
                // if(this.error_validation['documents'].indexOf('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ') >= 0) {
                //     this.error_validation['documents'].splice(this.error_validation['document_files'].indexOf('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ'));
                // }
                if(this.error_validation['documents'].indexOf('ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ') < 0){
                    this.error_validation['documents'].push('ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ');
                }
                return false;
          }  else if(this.error_validation['documents'].indexOf('ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ') >= 0) {
                this.error_validation['documents'].splice(this.error_validation['documents'].indexOf('ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ'));
          }
        //   if(this.customer_info['document_files'].length <= 0){
        //         if(this.error_validation['documents'].indexOf('ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ') >= 0) {
        //             this.error_validation['documents'].splice(this.error_validation['documents'].indexOf('ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ'));
        //         }
        //         if(this.error_validation['documents'].indexOf('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ') < 0){
        //             this.error_validation['documents'].push('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ');
        //         }
        //       return false;
        //   }  else if(this.error_validation['documents'].indexOf('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ') >= 0) {
        //       this.error_validation['documents'].splice(this.error_validation['documents'].indexOf('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ'));
        //   }
          return true;
      },
      getDocumentFiles($event){
          this.customer_info['document_files'] = $event['target']['files'];
          this.validateDocuments();
      },
      doNext(){
           if(this.validateStaffNote()){
                this.$store.commit('flexible_interest_module/addCustomerRequirement', { info: this.customer_info });
                window.sessionStorage.setItem('requirement', JSON.stringify(this.customer_info));
                this.$store.commit('flexible_interest_module/addProgressActionActive', { index: 3, key:'active-after', val: 'stepper-active-after' });
                this.$store.commit('flexible_interest_module/addProgressActionActive', { index: 4, key:'active', val: 'stepper-active' });
                window.sessionStorage.setItem('actionProgress', JSON.stringify(this.$store.getters['flexible_interest_module/action_active']));
                this.$router.push({
                    path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/interest/approve'
                });
          }  else {
              this.validateStaffNote();
              this.validateDocuments();
          }
      },
    backwardProgress(){
        this.$router.push({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/interest'
        })
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
    padding-top: 0px;
}
.danger{
    font-size: 12px;
    color: red;
}
.danger:before{
    content: '- ';
}
.fi-text {
    color: white;
}
.text-editor{
    margin-top: 5px; 
    border-radius: 30px 0px 0px 0px;
}
.text-editor1 {
    background: #C72B2C;
}
.text-editor2 {
    background: #d7262c;
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
.fi-btn-next:hover{
    background: #A42C35;
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
.text-note{
    font-size: 20px;
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
#fileList{
    margin: 5px 5px 5px 30px;
    color: white;
}
#fileList:invalid{
    opacity: 0.5;
}
input[type="text"], input[type="number"], select, span.show{
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
    strong.title {
        position: absolute;
        left: 14%;
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
    .text-note{
        font-size: 16px;
    }
}
/*@media only screen and (max-width: 890px) {
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
}*/
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
        top: 6px;
        color: white;
        font-size: 23px;
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
    .text-note{
        font-size: 14px;
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
        top: 9px;
        color: white;
        font-size: 20px;
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
}

@media only screen and (max-width: 500px) {
    .text-editor{
        border-radius: 10px 0px 0px 0px;
    }
    strong.no{
        position: absolute;
        left: 6.5%;
        top: 8px;
        color: white;
        font-size: 18px;
    }
    strong.title {
        position: absolute;
        left: 14%;
        top: 8px;
        color: white;
        font-size: 18px;
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
    .text-note{
        font-size: 12px;
    }
}

/*@media only screen and (max-width: 400px) {
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
}*/
</style>
