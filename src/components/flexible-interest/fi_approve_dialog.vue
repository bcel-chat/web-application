<template>
  <div>
    <div v-if="config['show']">
      <div class="show-on-print-mode" id="divPrint">
        <img class="img-header" src="@/assets/flexible_interest/images/bcel_header.png" alt="header">
        <h2 class="text-center"><strong>ອະນຸມັດດອກເບ້ຍຍືດຍຸ່ນ</strong></h2>
        <div class="table-responsive">          
          <table class="table tb-big">
              <thead class="text-center">
                  <tr>
                      <th >ຊື່ລູກຄ້າ</th>
                      <th >ຂໍ້ມູນສ່ວນຕົວ</th>
                      <th >ປະຫວັດການໃຊ້ບໍລິການຢູ່ ທຄຕລ</th>
                      <th >ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ</th>
                      <th >ສະກຸນເງິນ</th>
                      <th >ໄລຍະຝາກ</th>
                      <th >ທາງເລືອກດອກເບ້ຍ</th>
                      <th >% ແລະ ດອກເບ້ຍປົກກະຕິ</th>
                      <th >% ດອກເບ້ຍຍືດຍຸ່ນສູງສຸດ</th>
                      <th >% ແລະ ດອກເບ້ຍທີ່ຕ້ອງການ</th>
                  </tr>
              </thead>
              <tbody class="text-left">
                  <tr>
                      <td>{{customer_info['name']}}</td>
                      <td class="fi-text-more">ເບີໂທ: {{customer_info['tel']}} <br>ອາຊີບ: {{customer_info['occupation']}} <br>ຂໍ້ມູນອື່ນ: {{customer_info['more_info']}}</td>
                      <td class="fi-text-more">
                        <span v-for="(account, index) in accounts" :key="index">
                          - ເລກບັນຊີ {{account['acc_no']}} {{account['list']?'ໃຊ້ຜະລິດຕະພັນ ' + account['list']:' ບໍ່ໃຊ້ຜະລິດຕະພັນໃດ'}}.
                          <br>
                        </span>
                      </td>
                      <td>{{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['deposit_amount']?customer_info['deposit_amount'].toLocaleString(undefined,{'maximumFractionDigits':3}).replace(/,/g,'.'):0}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}</td>
                      <td>{{customer_info['currency']['currencyNameLa']}} ({{customer_info['currency']['currencyCode']}})</td>
                      <td>{{customer_info['deposit_age']['typeName']}}</td>
                      <td>{{customer_info['aclass']['descriptionLao']}}</td>
                      <td>
                        {{customer_info['normal_interest']}}%
                        <hr>
                        {{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['earning_general_interest'].toLocaleString(undefined,{'minimumFractionDigits':0,'maximumFractionDigits':3})}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}
                      </td>
                      <td>{{customer_info['max_flexible']}}% </td>
                      <td>
                        <span :class="getExceededInFlexible()?'APPROVED':getExceededOutFlexible()?'REJECTED':''">{{customer_info['customer_interest']}}%</span> 
                        <hr>
                        {{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['earning_customer_interest'].toLocaleString(undefined,{'minimumFractionDigits':0,'maximumFractionDigits':3})}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}
                      </td>
                  </tr>
                  <tr>
                      <td class="fi-tr-status text-center" colspan="10">
                          <strong>ຕາຕະລາງປຽບທຽບສ່ວນຕ່າງລະຫວ່າງລາຍຈ່າຍດອກເບ້ຍ ແລະ ລາຍຮັບດອກເບ້ຍເງິນກູ້</strong>
                      </td>
                  </tr>
                  <tr>
                      <td colspan="6">
                          <h5 class="text-center"><strong>ທັດສະນະ ແລະ ຄຳເຫັນ</strong></h5>
                          <div class="text-left">
                            <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?currenUser['departmentName']: currenUser['branchName']}}</strong>
                            <br>
                            <p>{{customer_info['staff_note']}}</p>
                            <p style="padding: 5px;">&nbsp</p>
                          </div>
                      </td>
                      <td class="text-center" colspan="4">
                          <h5><strong>ຊື່ຜູ້ຂໍອະນຸມັດ</strong></h5>
                          <div>
                            <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?currenUser['departmentName']: currenUser['branchName']}}</strong>
                            <p><span>{{currenUser['fullName']}}</span></p>
                            <p style="padding: 5px;">&nbsp</p>
                          </div>
                          <div v-if="customer_info['customer_signature']">
                            <strong>ລາຍເຊັນລູກຄ້າ</strong>
                            <br>
                            <span>{{customer_info['name']}}</span>
                            <br>
                            <img :src="customer_info['customer_signature']" alt="Signature" width="100">
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
      <div class="hide-on-print-mode">
        <div class="inverst-background" @click="exitDialog()"></div>
        <div class="fi-scroll-y">
          <div class="fi_report_approve_dialog">
            <div class="header">
              <span class="fi-print" @click="printFlexibleInterest()">&#x1f5b6;</span>
              <span class="closeIcon" @click="exitDialog()">x</span>
              <h2><strong>ອະນຸມັດດອກເບ້ຍຍືດຍຸ່ນ</strong></h2>
            </div>
            <div class="body">
              <div class="container">
                <div class="row">
                  <div class="col-12 col-sm-12 col-md-12" id="table_small">
                    <div class="row">
                      <div class="col-12">
                        <table class="tb-small">
                          <tbody>
                              <tr>
                                  <!-- <th>ຊື່ລູກຄ້າ: </th> -->
                                  <td class="col-first">
                                    <strong>ຊື່ລູກຄ້າ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                      {{customer_info['name']}}
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <!-- <th>ຂໍ້ມູນສ່ວນຕົວ: </th> -->
                                  <td>
                                    <strong>ຂໍ້ມູນສ່ວນຕົວ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="fi-text-more text-left">
                                    - ເບີໂທ: ເບີໂທ: {{customer_info['tel']}} <br>- ອາຊີບ: {{customer_info['occupation']}} <br>- ຂໍ້ມູນອື່ນໆ: {{customer_info['more_info']}}                                      
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <!-- <th>ປະຫວັດການໃຊ້ບໍລິການຢູ່ ທຄຕລ: </th> -->
                                  <td>
                                    <strong>ປະຫວັດການໃຊ້ບໍລິການຢູ່ ທຄຕລ:</strong>
                                    <hr style="margin: 1px;">
                                    <div class="fi-text-more text-left">
                                      <span v-for="(account, index) in accounts" :key="index">
                                        - ເລກບັນຊີ {{account['acc_no']}} {{account['list']?'ໃຊ້ຜະລິດຕະພັນ ' + account['list']:' ບໍ່ໃຊ້ຜະລິດຕະພັນໃດ'}}.
                                        <br>
                                      </span>
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <!-- <th>ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ: </th> -->
                                  <td>
                                    <strong>ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                    {{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['deposit_amount']}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <!-- <th>ສະກຸນເງິນ: </th> -->
                                  <td>
                                    <strong>ສະກຸນເງິນ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                    {{customer_info['currency']['currencyNameLa']}} ({{customer_info['currency']['currencyCode']}})
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <!-- <th>ໄລຍະຝາກ: </th> -->
                                  <td>
                                    <strong>ໄລຍະຝາກ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                    {{customer_info['deposit_age']['typeName']}}
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <!-- <th>ທາງເລືອກດອກເບ້ຍ: </th> -->
                                  <td>
                                    <strong>ທາງເລືອກດອກເບ້ຍ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                    {{customer_info['aclass']['descriptionLao']}}                                      
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <!-- <th>% ແລະ ດອກເບ້ຍປົກກະຕິ: </th> -->
                                  <td>
                                    <strong>% ແລະ ດອກເບ້ຍປົກກະຕິ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                    {{customer_info['normal_interest']}}% = {{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['earning_general_interest'].toLocaleString(undefined,{'minimumFractionDigits':0,'maximumFractionDigits':3})}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <!-- <th>% ດອກເບ້ຍຍືດຍຸ່ນສູງສຸດ: </th> -->
                                  <td>
                                    <strong>% ດອກເບ້ຍຍືດຍຸ່ນສູງສຸດ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                    {{customer_info['max_flexible']}}%                                      
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <!-- <th>% ແລະ ດອກເບ້ຍທີ່ຕ້ອງການ: </th> -->
                                  <td>
                                    <strong>% ແລະ ດອກເບ້ຍທີ່ຕ້ອງການ:</strong>
                                  <hr style="margin: 1px;"> 
                                  <div class="text-right">
                                    <span :class="getExceededInFlexible()?'APPROVED':getExceededOutFlexible()?'REJECTED':''">{{customer_info['customer_interest']}}%</span> 
                                    = 
                                    {{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['earning_customer_interest'].toLocaleString(undefined,{'minimumFractionDigits':0,'maximumFractionDigits':3})}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}
                                  </div>
                                  </td>
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="col-12">
                        <div>
                          <h5 class="text-center"><strong>ທັດສະນະ ແລະ ຄຳເຫັນຂອງຜູ້ຂໍອະນຸມັດ</strong></h5>
                          <div class="text-left">
                            <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?currenUser['departmentName']: currenUser['branchName']}} ({{currenUser['fullName']}})</strong>
                            <br>
                            <textarea placeholder="ປະກອບຄຳຄິດຄຳເຫັນ" v-model="customer_info['staff_note']" @change="validateComment" rows="2"></textarea>
                          </div>
                          <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment'].length > 0">
                              <span class="danger" v-for="(error, index) in error_validation['comment']" :key="index">{{error}} </span>
                          </div>
                          <div class="text-right" v-if="customer_info['customer_signature']">
                            <label class="text-center">
                              <strong>ລາຍເຊັນລູກຄ້າ</strong>
                              <br>
                               <span>{{customer_info['name']}}</span>
                              <br>
                              <img :src="customer_info['customer_signature']" alt="Signature" width="100">
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-12 col-md-12" id="table_big">
                      <div class="table-responsive">          
                          <table class="table tb-big">
                              <thead class="text-center">
                                  <tr>
                                      <th>ຊື່ລູກຄ້າ</th>
                                      <th>ຂໍ້ມູນສ່ວນຕົວ</th>
                                      <th>ປະຫວັດການໃຊ້ບໍລິການຢູ່ ທຄຕລ</th>
                                      <th>ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ</th>
                                      <th>ສະກຸນເງິນ</th>
                                      <th>ໄລຍະຝາກ</th>
                                      <th>ທາງເລືອກດອກເບ້ຍ</th>
                                      <th >% ແລະ ດອກເບ້ຍປົກກະຕິ</th>
                                      <th >% ດອກເບ້ຍຍືດຍຸ່ນສູງສຸດ</th>
                                      <th >% ແລະ ດອກເບ້ຍທີ່ຕ້ອງການ</th>
                                  </tr>
                              </thead>
                              <tbody class="text-left">
                                <tr>
                                    <td>{{customer_info['name']}}</td>
                                    <td class="fi-text-more">ເບີໂທ: {{customer_info['tel']}} <br>ອາຊີບ: {{customer_info['occupation']}} <br>ຂໍ້ມູນອື່ນ: {{customer_info['more_info']}}</td>
                                    <td class="fi-text-more">
                                      <span v-for="(account, index) in accounts" :key="index">
                                        - ເລກບັນຊີ {{account['acc_no']}} {{account['list']?'ໃຊ້ຜະລິດຕະພັນ ' + account['list']:' ບໍ່ໃຊ້ຜະລິດຕະພັນໃດ'}}.
                                        <br>
                                      </span>
                                    </td>
                                    <td>{{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['deposit_amount']?customer_info['deposit_amount'].toLocaleString(undefined,{'maximumFractionDigits':3}).replace(/,/g,'.'):0}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}</td>
                                    <td>{{customer_info['currency']['currencyNameLa']}} ({{customer_info['currency']['currencyCode']}})</td>
                                    <td>{{customer_info['deposit_age']['typeName']}}</td>
                                    <td>{{customer_info['aclass']['descriptionLao']}}</td>
                                    <td>
                                      {{customer_info['normal_interest']}}%
                                      <hr>
                                      {{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['earning_general_interest'].toLocaleString(undefined,{'minimumFractionDigits':0,'maximumFractionDigits':3})}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}
                                    </td>
                                    <td>{{customer_info['max_flexible']}}% </td>
                                    <td>
                                      <span :class="getExceededInFlexible()?'APPROVED':getExceededOutFlexible()?'REJECTED':''">{{customer_info['customer_interest']}}%</span> 
                                      <hr>
                                      {{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['earning_customer_interest'].toLocaleString(undefined,{'minimumFractionDigits':0,'maximumFractionDigits':3})}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}
                                    </td>
                                </tr>
                                  <tr>
                                      <td class="text-center" colspan="10">
                                          <strong>ຕາຕະລາງປຽບທຽບສ່ວນຕ່າງລະຫວ່າງລາຍຈ່າຍດອກເບ້ຍ ແລະ ລາຍຮັບດອກເບ້ຍເງິນກູ້</strong>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td colspan="6">
                                        <h5 class="text-center"><strong>ທັດສະນະ ແລະ ຄຳເຫັນຂອງຜູ້ຂໍອະນຸມັດ</strong></h5>
                                        <div class="text-left">
                                          <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?currenUser['departmentName']: currenUser['branchName']}}</strong>
                                          <br>
                                          <textarea placeholder="ປະກອບຄຳຄິດຄຳເຫັນ" v-model="customer_info['staff_note']" @change="validateComment" rows="2"></textarea>
                                        </div>
                                        <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment'].length > 0">
                                            <span class="danger" v-for="(error, index) in error_validation['comment']" :key="index">{{error}} </span>
                                        </div>
                                      </td>
                                      <td class="text-center" colspan="4">
                                        <h5><strong>ຊື່ຜູ້ຂໍອະນຸມັດ</strong></h5>
                                        <div>
                                          <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?currenUser['departmentName']: currenUser['branchName']}}</strong>
                                          <p><span class="new-signature">{{currenUser['fullName']}}</span></p>
                                        </div>
                                        <div class="text-center" v-if="customer_info['customer_signature']">
                                          <strong>ລາຍເຊັນລູກຄ້າ</strong>
                                          <br>
                                          <span class="new-signature">{{customer_info['name']}}</span>
                                          <br>
                                          <img :src="customer_info['customer_signature']" alt="Signature" width="100">
                                        </div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  
                  <div class="col-6 text-left">
                        <button class="fi-btn-next cancle spacing" type="button" @click="config['cancleEvt']"><i class="fa fa-trash"></i> ລ້າງ</button> 
                  </div>
                  <div class="col-6 text-right">
                        <button class="fi-btn-next success" type="button" @click="requestApprove()">&#9993; ຂໍອະນຸມັດ</button>
                  </div>
                </div>
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
export default {
  name: 'fi_approve_dialog',
  data(){
    return {
      customer_info: this.$store.getters['flexible_interest_module/requirement'],
      accounts: this.$store.getters['flexible_interest_module/requirement']['bank_accounts'],
      currenUser: {},
      error_validation:{
        comment: []
      }
    }
  },
  props: {
    config: {
      default: {
        show: true,
        okEvt: () => {
          this.config['show'] = false;
        },
        cancleEvt: () => {
          this.config['show'] = false;
        }
      },
      type: Object
    }
  },
  mounted(){
    ds.rpc.make('/bcel/api/flexible/interest/current/user', { userId: this.$store.getters['flexible_interest_module/user']}, ( error, result ) => {
      if(result)
      {
        this.currenUser = result;
      }
    });
  },
  methods: {
    validateComment(){
        if(!this.customer_info['staff_note'].trim()){
            if(this.error_validation['comment'].length == 0){
              this.error_validation['comment'].push('ຄຳຄິດເຫັນຂອງທ່ານຫ້າມວ່າງ');
            }
            return false;
        } else if(this.error_validation['comment'].length > 0) {
            this.error_validation['comment'].pop();
        }
        return true;
    },
    getExceededOutFlexible() {
        try{
            var customer_interest = parseFloat(this.customer_info['customer_interest']);
          var max_interest = parseFloat(this.customer_info['normal_interest']) + parseFloat(this.customer_info['max_flexible']);
          if(customer_interest > max_interest){
              return (customer_interest - max_interest).toLocaleString();
          } else {
              return 0
          }
        } catch(e) {
            return 0;
        }
    },
    getExceededInFlexible() {
        try{
          var customer_interest = parseFloat(this.customer_info['customer_interest']);
          var normal_interest = parseFloat(this.customer_info['normal_interest']);
          var max_interest = normal_interest + parseFloat(this.customer_info['max_flexible']);
          if((customer_interest <= max_interest) && (customer_interest > normal_interest)){
              return (customer_interest - normal_interest).toLocaleString();
          } else {
              return 0
          }
        } catch(e) {
            return 0;
        }
    },
    exitDialog(){
      this.config['show'] = false;
    },
    requestApprove(){
        if(this.validateComment()){
          this.config['okEvt']();
        }
    },
    printFlexibleInterest(){
      $.print("#divPrint");
      //window.print();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
    font-family: Phetsarath_OT;
}
.img-header{
  width: 100%;
  margin-bottom: 10px;
}
table.tb-big, table.tb-big td {
    border: 1px #DEE2E6 solid;
}
table.tb-small {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
table.tb-small{
  width: 100%; 
  margin-bottom: 10px;
}
.show-on-print-mode{
  visibility: hidden;
}
table.tb-small, table.tb-small tr{
  border: none;
}
table.tb-small{
  width: 100%; 
  background:  linear-gradient(to bottom right, rgb(243, 182, 174) 10%, rgba(233, 111, 95, 0.918) 100%);
  margin-bottom: 10px;
  border-radius: 10px;
}
table.tb-small th, table.tb-small td {
  padding: 5px;
  border-bottom: 2px rgb(242, 243, 245) solid;
}
table.tb-small td.col-first{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
table.tb-small td.col-last{
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: none;
}
// table.tb-small tr{
//   border-bottom: 2px rgb(242, 243, 245) solid;
// }
// table.tb-small>tbody>tr>th {
//   background: rgb(243, 182, 174)
// }
// table.tb-small>tbody>tr>td {
//   background: rgb(243, 182, 174);
// }
.fi-print {
  position: absolute;
  cursor: pointer;
  top: 5px;
  right: 30px;
  color: rgb(247, 147, 147);
  font-weight: bold;
}
.REJECTED{
    color: #F34E4E;
}
.APPROVED{
    color: #20A816;
}
.fi-print:hover {
  color: red;
}
.closeIcon{
  position: absolute;
  cursor: pointer;
  top: 3px;
  right: 10px;
  color: red;
  font-weight: bold;
}
.closeIcon:hover{
  color: #C72B2C;
}
.danger{
    font-size: 12px;
    color: red;
}
.danger:before{
    content: '* ';
}
span.signature, p.signature {    
    border-bottom: 1px dotted #000;
}
span.new-signature {
  border-bottom: 2px dotted #C72B2C;
}
.spacing{
  margin-right: 10px;
  margin-left: 10px;
}
.fi-btn-next{
    margin-top: 5px;
    margin-bottom: 10px;
    color: white;
    border: none;
    border-radius: 3px;
    width: 8rem;
    font-size: 1.2rem;
}
.success{
  background: #20A816;
}
.success:hover{
    background: rgb(20, 104, 14);
}
.cancle {
  background: #DC4D39;
}
.cancle:hover {
  background: #A42C35;
}
button:focus{
    outline: none;
}
.inverst-background {
  top: 0px;
  left: 0px;
  z-index: 9999999999999999999999999999998;
  position: fixed;
  background: black;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
textarea{
    width: 100%;
    background: transparent;
    border: none;
    padding-left: 5px;
    padding-right: 5px;
    border-bottom: 2px dotted #C72B2C;
}
textarea:focus{
    outline: none;
}
.fi-scroll-y{
  position: fixed;
  z-index: 9999999999999999999999999999999;
  top: 10px;
  left: 15%;
  width: 70%;
  height: 100%;
  overflow-y: auto;
}
.fi_report_approve_dialog {
  background: white;
  border: 1px lightgrey solid;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
    -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
        box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
  padding: 0.5rem;
}
.body {
  text-align: left;
}
.footer{
  text-align: right;
}

::-webkit-scrollbar {
  width: 5px;
}

 
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}


::-webkit-scrollbar-thumb {
  background: #888; 
}

 
::-webkit-scrollbar-thumb:hover {
  background: #A42C35; 
}
/*th{
  color: white;
  background: #EA6153;
  border-right: 1px #EA6153 solid;
}*/
#table_big{
  display: block;
}
#table_small{
  display: none;
}


.fi-text-more {
  font-size: 12px;
}

@media only screen and (max-width: 1350px) {
    .fi-scroll-y{
      width: 80%;
      left: 10%;
    }
    #table_big{
      display: none;
    }
    #table_small{
      display: block;
    }
    .PENDING{
      color: white;
      font-weight: bold;
      font-family: Helvetica;
      text-shadow: 0 1px 0 rgb(250, 150, 0), 0 2px 0 rgb(250, 150, 0), 0 3px 0 rgb(250, 150, 0), 0 4px 0 white;
    }
}


@media only screen and (max-width: 900px) {
  
    .fi-scroll-y{
      top: 10px;
      left: 1%;
      width: 98%;
    }
    .fi-btn{
        width: 7.7rem;
    }
}
@media only screen and (max-width: 500px) {
  .fi-scroll-y{
    top: 5px;
  }
  h2{
    font-size: 25px;
  }
  .fi-btn{
      width: 6rem;
      font-size: 18px;
  }
}
@media only screen and (max-width: 400px) {
    h2{
      font-size: 25px;
    }
  .fi-btn{
      font-size: 14px;
      width: 5rem;
  }
  h4{
    font-size: 20px;
  }
}
@media print {
  .show-on-print-mode{
    visibility: initial;
  }
  .hide-on-print-mode {
    display: none;
  }
}
</style>
