<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12">
                <h2 class="text-left history"><strong>History</strong></h2>
                <label for="fi_search" class="fi-search">
                    <input id="fi_search" class="fi-search-input" required type="text" placeholder="ຄົ້ນຫາ" v-model="search_data" @change="searchTextChange">
                    <button type="button" class="fi-search-button" @click="doSearch()"><i class="fa fa-search" aria-hidden="true"></i></button>
                </label>
                <hr style="margin-top: 0px;">
            </div>
            <div class="col-12" v-if="!checkData()">
                <div class="fi-not-found"><Strong>ບໍມີຂໍ້ມູນ</Strong></div>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4" v-for="(history, index) in customer_requirement_history" :key="index">
                <div class="fi-card text-left" :class="'BACKGROUND-'+history['approveStatus']">
                    <div class="fi-card-title">
                        <h4><span style="font-size: 16px;">ລູກຄ້າ:</span><strong> {{history['customerName']}}</strong></h4>
                    </div>
                    <div class="fi-card-body">
                        <div class="fi-box">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>ຈຳນວນເງິນຝາກ: </th>
                                        <td>{{(history['currencyCode'] == 'USD')?history['currencyUnit']:''}}{{history['depositAmount']?history['depositAmount'].toLocaleString().replace(/,/g, '.'):'0'}}{{(history['currencyCode'] != 'USD')?history['currencyUnit']:''}}</td>
                                        
                                    </tr>
                                    <tr>
                                        <th>ສະກຸນເງິນ: </th>
                                        <td>{{history['currencyName']}} ({{history['currencyCode']}})</td>
                                    </tr>
                                    <tr>
                                        <th>ດອກເບ້ຍທີ່ຕ້ອງການ: </th>
                                        <td>
                                            {{history['customerInterest']}}%
                                            <span style="color: red;" v-if="getExceededOutFlexible(index) "> (ຍືດຍຸ່ນນອກກອບ:​ {{getExceededOutFlexible(index)}}%)</span>
                                            <span style="color: #20A816;" v-if="getExceededInFlexible(index)"> (ຍືດຍຸ່ນໃນກອບ:​ {{getExceededInFlexible(index)}}%)</span>
                                        </td>
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
                    <div class="fi-card-footer">
                        <div class="row">
                            <div class="col-7 text-left">
                                <small> {{getFormatDate(history['createDate'] + ' ' + history['createTime'])}} </small>
                            </div>
                            <div class="col-5 text-right">
                                <button class="fi-btn" :class="'fi-'+history['approveStatus']" type="button" @click="getCustomerRequirementDetail(history)">ລາຍລະອຽດ</button>
                            </div>
                        </div>
                    </div>
                </div>
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

export default {
  name: 'leader_approve_history',
  data(){
      return {
          customer_requirement_history: [],
          search_data: ''
      }
  },
  created(){
    this.getAllApprovedRejectedHistory();
  },
  mounted(){
      
  },
  methods: {
    searchTextChange(){
        if(!this.search_data.trim()){
            this.getAllApprovedRejectedHistory();
        }
    },
    doSearch(){
        if(this.search_data.trim()){
            this.getAllApprovedRejectedHistorySearch();
        }
    },
    getAllApprovedRejectedHistorySearch(){
        ds.rpc.make('/bcel/api/flexible/interest/leader/request/approve/history/search', { user:  this.$store.getters['flexible_interest_module/user'], searchData: this.search_data.trim()}, ( error, result ) => {
            if(error){
                this.aclasses = [];
            } else{
                this.customer_requirement_history = result;
                //console.log(result)
                this.normalInterest = [];
                for(var i=0; i<this.customer_requirement_history.length; i++){
                    /*ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_requirement_history[i]['currencyCode'], acClass: this.customer_requirement_history[i]['accountClass']}, ( err, res ) => {
                        
                        if(err){
                                this.normalInterest.push('0');
                        } else{
                            if(res){
                                this.normalInterest.push(res['interest']);
                            } else {
                                this.normalInterest.push('0');
                            }
                        }
                    });*/
                    axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_requirement_history[i]['accountClass']+'/'+this.customer_requirement_history[i]['currencyCode']+'/'+this.customer_requirement_history[i]['requirementId'])
                    .then((res) => {
                        for(var j=0; j<this.customer_requirement_history.length; j++){
                            if(res['data']['data']['requirementId'] == this.customer_requirement_history[j]['requirementId']){
                                this.customer_requirement_history[j]['normalInterest'] = res['data']['data']['interest'];
                                break;
                            }
                        }
                    })
                    .catch((error) =>  {
                        //this.normalInterest.push('0');
                    })
                }
            }
        });
    },
    getAllApprovedRejectedHistory(){
        ds.rpc.make('/bcel/api/flexible/interest/leader/request/approve/history', { user:  this.$store.getters['flexible_interest_module/user']}, ( error, result ) => {
            if(error){
                this.aclasses = [];
            } else{
                this.customer_requirement_history = result;
                //console.log(result)
                this.normalInterest = [];
                for(var i=0; i<this.customer_requirement_history.length; i++){
                    /*ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_requirement_history[i]['currencyCode'], acClass: this.customer_requirement_history[i]['accountClass']}, ( err, res ) => {
                        
                        if(err){
                                this.normalInterest.push('0');
                        } else{
                            if(res){
                                this.normalInterest.push(res['interest']);
                            } else {
                                this.normalInterest.push('0');
                            }
                        }
                    });*/
                    axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_requirement_history[i]['accountClass']+'/'+this.customer_requirement_history[i]['currencyCode']+'/'+this.customer_requirement_history[i]['requirementId'])
                    .then((res) => {
                        for(var j=0; j<this.customer_requirement_history.length; j++){
                            if(res['data']['data']['requirementId'] == this.customer_requirement_history[j]['requirementId']){
                                this.customer_requirement_history[j]['normalInterest'] = res['data']['data']['interest'];
                                break;
                            }
                        }
                    })
                    .catch((error) =>  {
                        //this.normalInterest.push('0');
                    })
                }
            }
        });
    },
    getFormatDate(date){
        var d = new Date(date);
        var day = d.getDate();
        var month = d.getMonth() +1;
        var year = d.getFullYear();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();

        return `${(day < 10)? '0'+day: day}/${(month < 10)? '0'+month: month}/${year} ${(hour < 10)? '0'+hour: hour}:${(minute < 10)? '0'+minute: minute}:${(second < 10)? '0'+second: second}`;
    },
    getCustomerRequirementDetail(history){
        this.$store.commit('flexible_interest_module/addRequestApproveDetail', { info: history });
        this.$router.push({path: sessionStorage.getItem('flexible_root_router')+'/flexible/customer/requirement/detail/' + btoa(history['requirementId'])})
    },
    checkData() {
        if(this.customer_requirement_history.length > 0) {
            return true;
        }
        return false;
    },
    getExceededOutFlexible(i) {
    
        try{
            var customer_interest = parseFloat(this.customer_requirement_history[i]['customerInterest']);
             var normal_interest = parseFloat(this.customer_requirement_history[i]['normalInterest']);
            var max_interest = normal_interest + parseFloat(this.customer_requirement_history[i]['interestFlexible']);
            if((customer_interest > max_interest) && (normal_interest < max_interest) && (normal_interest > 0)){
                return (customer_interest - max_interest).toLocaleString();
            } else {
                return 0
            }
        } catch(e) {
            return 0;
        }
    },
    getExceededInFlexible(i) {
        try{
            var customer_interest = parseFloat(this.customer_requirement_history[i]['customerInterest']);
            var normal_interest = parseFloat(this.customer_requirement_history[i]['normalInterest']);
            var max_interest = normal_interest + parseFloat(this.customer_requirement_history[i]['interestFlexible']);
            if((customer_interest <= max_interest) && (customer_interest > normal_interest) && (normal_interest < max_interest)){
                return (customer_interest - normal_interest).toLocaleString();
            } else {
                return 0
            }
        } catch(e) {
            return 0;
        }
    },
  }
}
</script>

<style lang="scss" scoped>
* {
    font-family: Phetsarath_OT;
}
.PENDING{
    color: #A8890C;
    font-weight: bold;
    font-family: Helvetica;
    text-shadow: 0 1px 0 white, 0 2px 0 white, 0 3px 0 #A8890C, 0 4px 0 #A8890C;
}
.history{
    color: #E4CA81;
}

.fi-btn{
    background: white;
    border: 1px white solid;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
}
.fi-btn:hover{
    color: #C72B2C;
}
button:focus{
    outline: none;
}
.CANCLE {
    color: #C72B2C;
}
.fi-CANCLE{
    color: rgb(147, 209, 143);
}
.REJECTED,.fi-REJECTED{
    color: #F34E4E;
}
.APPROVED,.fi-APPROVED{
    color: #20A816;
}

.BACKGROUND-CANCLE{
    background: rgb(147, 209, 143);
}
.BACKGROUND-APPROVED {
    background: #20A816;
}
.BACKGROUND-REJECTED {
    background: #F34E4E;
}
.BACKGROUND-PENDING {
    background: #A8890C;
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

.fi-card{
    border: 1px lightgrey solid;
    border-radius: 10px;
    -webkit-box-shadow: -2px 3px 14px -7px rgba(0,0,0,0.52);
    -moz-box-shadow: -2px 3px 14px -7px rgba(0,0,0,0.52);
    box-shadow: -2px 3px 14px -7px rgba(0,0,0,0.52);
    -webkit-transition: box-shadow 0.5s; /* For Safari 3.1 to 6.0 */
    transition: box-shadow 0.5s;
    margin-bottom: 10px;
}
.fi-card:hover{
    -webkit-box-shadow: -2px 3px 20px -7px lightgray;
    -moz-box-shadow: -2px 3px 20px -7px lightgray;
    box-shadow: -2px 3px 20px -7px lightgray;
}
.fi-card-title {
    padding:  10px 5px 5px 5px;
    color: white;
}
.fi-box {
  -webkit-box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
    -moz-box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
        box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
  padding: 5px 5px 5px 5px;
  color: rgb(92, 91, 91);
  background: white;
}
.fi-card-footer {
    background: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 0px 5px 0px 5px;
}

/*Search Input*/
label.fi-search{
    position: absolute;
    top: 5px;
    right: 16px;
}
input.fi-search-input:not([type='file']){
    padding-left: 5px;
    background: white;
    color: rgb(66, 64, 64);
    border: none;
    padding-right: 5px;
}
input.fi-search-input:focus, button.fi-search-button:focus{
    outline: none;
}
button.fi-search-button{
    border: 1px rgb(247, 152, 145) solid;
    background: rgb(247, 152, 145);
    color: white;
}
button.fi-search-button:hover{
    border: 1px rgb(248, 102, 91) solid;
    background: rgb(248, 102, 91);
}
input.fi-search-input:not([type='file']):invalid {
    border: 1px rgba(197, 196, 196, 0.849) solid;
}
input.fi-search-input:focus, input:not([type='file']):valid{
    border: 1px rgba(248, 204, 201, 0.849) solid;
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

@media only screen and (max-width: 500px) {
    h3 {
        font-size: 23px;
    }
    h4 {
        font-size: 20px;
    }
    h2{
        font-size: 25px;
    }
    input.fi-search-input:not([type='file']){
        width: 150px;
        font-size: 14px;
    }
    button.fi-search-button{
        font-size: 14px;
    }
}
</style>