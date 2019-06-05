<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12" v-if="checkData()">
                <h3><strong>ປະຫວັດຂໍອະນຸມັດດອກເບ້ຍຍືດຍຸນ</strong></h3>
            </div>
            <div class="col-12" v-if="!checkData()">
                <div class="fi-not-found"><Strong>ບໍມີຂໍ້ມູນ</Strong></div>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4" v-for="(history, index) in customer_requirement_history" :key="index">
                <div class="fi-card text-left">
                    <div class="fi-card-title">
                        <h4><span style="font-size: 16px;">ລູກຄ້າ:</span><strong> {{history['customerName']}}</strong></h4>
                    </div>
                    <div class="fi-card-body">
                        <div class="fi-box">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>ຈຳນວນເງິນຝາກ: </th>
                                        <td>{{(history['currencyCode'] == 'USD')?history['currencyUnit']:''}}{{history['depositAmount']}}{{(history['currencyCode'] != 'USD')?history['currencyUnit']:''}}</td>
                                        
                                    </tr>
                                    <tr>
                                        <th>ສະກຸນເງິນ: </th>
                                        <td>{{history['currencyName']}} ({{history['currencyCode']}})</td>
                                    </tr>
                                    <tr>
                                        <th>ດອກເບ້ຍທີ່ຕ້ອງການ: </th>
                                        <td>{{history['customerInterest']}}%</td>
                                    </tr>
                                    <tr>
                                        <th>ໄລຍະຝາກ: </th>
                                        <td>{{history['depositTypeName']}}</td>
                                    </tr>
                                    <tr>
                                        <th>ອະນຸມັດ: </th>
                                        <td :class="history['approveStatus']">{{history['approveStatus']}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="fi-card-footer text-right">
                        <button class="fi-btn" type="button" @click="getCustomerRequirementDetail(history)">ລາຍລະອຽດ</button>
                    </div>
                </div>
            </div>
            <!-- <div class="col-12 col-sm-12 col-md-12">
                <div class="table-responsive">          
                    <table class="table text-left">
                        <thead>
                            <tr >
                                <th>ລຳດັບ</th>
                                <th>ຊື່ລູກຄ້າ</th>
                                <th>ເບີໂທ</th>
                                <th>ຈຳນວນເງິນຝາກ</th>
                                <th>ສະກຸນເງິນ</th>
                                <th>ດອກເບ້ຍທີ່ຕ້ອງການ</th>
                                <th>ໄລຍະຝາກ</th>
                                <th>ອະນຸມັດ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(history, index) in customer_requirement_history" :key="index" @click="getCustomerRequirementDetail(history)">
                                <td>{{index + 1}}</td>
                                <td>{{history['customerName']}}</td>
                                <td>{{history['customerTel']}}</td>
                                <td>{{(history['currencyCode'] == 'USD')?history['currencyUnit']:''}}{{history['depositAmount']}}{{(history['currencyCode'] != 'USD')?history['currencyUnit']:''}}</td>
                                <td>{{history['currencyName']}} ({{history['currencyCode']}})</td>
                                <td>{{history['customerInterest']}}%</td>
                                <td>{{history['depositTypeName']}}</td>
                                <td>{{history['approveStatus']}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> -->
        </div>
    </div>
</template>


<script>
import ds from '@/helpler/ds.js'
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/flexible_interest/fonts/phetsarath_font.css'

export default {
  name: 'response_edit_list',
  data(){
      return {
          customer_requirement_history: []
      }
  },
  created(){
    ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/by/staff', { staffUser:  "SOMCHANH"}, ( error, result ) => {
        if(error){
            this.aclasses = [];
        } else{
            this.customer_requirement_history = result;
        }
    });
  },
  mounted(){
      
  },
  methods: {
    getCustomerRequirementDetail(history){
        ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  history['currencyCode'], acClass: history['accountClass']}, ( error, result ) => {
            if(error){
                    history['normalInterest'] = 0;
            } else{
                if(result){
                    history['normalInterest'] = result['interest']
                } else {
                    history['normalInterest'] = 0;
                }
            }
            this.$store.commit('flexible_interest_module/addRequestApproveDetail', { info: history });
            this.$router.push({path: '/flexible/customer/requirement/detail'})
        });
    },
    checkData() {
        if(this.customer_requirement_history.length > 0) {
            return true;
        }
        return false;
    }
  }
}
</script>

<style lang="scss" scoped>
* {
    font-family: Phetsarath_OT;
}
.PENDING{
    color: #FB8C00;
    font-weight: bold;
    font-family: Helvetica;
    text-shadow: 0 1px 0 white, 0 2px 0 white;
}
.REJECTED{
    color: red;
}
.APPROVED{
    color: rgb(20, 224, 20);
}

.fi-not-found>strong{
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    padding: 10px;
    color: #ccc;
    font-size: 25px;
    font-weight: bold;
}
table.table, table.table>tbody>tr {
    border: 1px black solid;
}
table.table>tbody>tr>th{
  border-top: 1px black solid;
}
table.table>tbody>tr {
  cursor: pointer;
}
table.table>tbody>tr>td{
  padding: 4px;
}
table.table>tbody>tr:hover {
  background: #F15E54;
  color: white;
}
.fi-btn{
    background: #C72B2C;
    color: white;
    border: 1px #C72B2C solid;
    border-radius: 3px;
    font-size: 1rem;
}
.fi-btn:hover{
    background: #A42C35;
}
button:focus{
    outline: none;
}

.fi-card{
    border: 0.3px lightgrey solid;
    -webkit-box-shadow: 0.5px 0.5px 0.5px 0.1px #C72B2C;
	   -moz-box-shadow: 0.5px 0.5px 0.5px 0.1px #C72B2C;
	        box-shadow: 0.5px 0.5px 0.5px 0.1px #C72B2C;
    padding: 5px;
    -webkit-transition: box-shadow 0.5s; /* For Safari 3.1 to 6.0 */
    transition: box-shadow 0.5s;
    margin-bottom: 10px;
    background: #C72B2C;
    color: white;
}
.fi-card:hover{
    border: 1px lightgrey solid;
    -webkit-box-shadow: 0.5px 0.5px 0.5px 1.5px #C72B2C;
	   -moz-box-shadow: 0.5px 0.5px 0.5px 1.5px #C72B2C;
	        box-shadow: 0.5px 0.5px 0.5px 1.5px #C72B2C;

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
  color: black;
}
</style>