<template>
    <div class="container">
        <div v-if="showSignaturePad">
            <div class="fi-inverst-signature-background" @click="cancleSignature()"></div>
            <div class="fi-signature-dialog">
                <div class="fi-signature-header">
                    <h5>ລາຍເຊັນລູກຄ້າ</h5>
                </div>
                <div class="fi-signature-body">
                    <VueSignaturePad
                        width="100%"
                        height="230px"
                        saveType="image/svg+xml"
                        class='signature-pad'
                        ref="signaturePad"
                        :options="{ penColor: 'blue', maxWidth: '0.6' }"
                        />
                </div>
                <div class="fi-signature-footer">
                    <span class="no-signature" v-if="checkSignatureError">(ບໍ່ມີລາຍເຊັນ)</span>
                    <button type="button" class="fi-btn-signature-cancle" @click="cancleSignature()">ຍົກເລີກ</button>
                    <button type="button" class="fi-btn-signature-clear" @click="clearSignature()">ລ້າງ</button>
                    <button type="button" class="fi-btn-signature-ok"  @click="saveSignature()">ຕົກລົງ</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div id="fomular_panel">
                    <div id="fomular">
                        <h5><strong>ວິທີຄິດໄລ່ດອກເບ້ຍ</strong></h5>
                        <h5><strong class="fomular">IA = DA x FI x (DY/360)</strong></h5>
                        <hr style="margin: 5px;">
                        <div class="text-left">
                            <h5><strong>ຄວາມໝາຍ</strong></h5>
                        </div>
                        <div class="fi-body text-left">
                            <table>
                                <tbody>
                                    <tr>
                                        <th class="fi-title"><h6>IA: </h6></th>
                                        <td> <h6><strong>ດອກເບ້ຍທີ່ຈະໄດ້ຮັບ</strong></h6> </td>
                                    </tr>
                                    <tr>
                                        <th class="fi-title"><h6>DA: </h6></th>
                                        <td> <h6><strong> ຈຳນວນເງິນຝາກ</strong></h6> </td>
                                    </tr>
                                    <tr>
                                        <th class="fi-title"><h6>FI: </h6></th>
                                        <td> <h6><strong> ອັດຕາດອກເບ້ຍຍືດຍຸ່ນ</strong></h6> </td>
                                    </tr>
                                    <tr>
                                        <th class="fi-title"><h6>DY: </h6></th>
                                        <td> <h6><strong> ຈຳນວນວັນຝາກ</strong></h6> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr style="margin: 5px;">
                            <div class="text-left">
                                <h5><strong>ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ</strong></h5>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th class="fi-title"><h6>DA = </h6></th>
                                        <td> <h6><strong> {{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{getDepositAmount().toLocaleString()}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}</strong></h6> </td>
                                    </tr>
                                    <tr>
                                        <th class="fi-title"><h6>DY = </h6></th>
                                        <td> <h6><strong> {{customer_info['deposit_age']['typeName']?customer_info['deposit_age']['typeName']:'0 ເດືອນ'}} x 30 ວັນ = </strong> <strong>{{customer_info['deposit_age']['totalDays']?customer_info['deposit_age']['totalDays']:'0'}} ວັນ</strong></h6> </td>
                                    </tr>
                                    <tr>
                                        <th class="fi-title"><h6>FI = </h6></th>
                                        <td> <h6><strong> {{customer_info['customer_interest']}}%</strong></h6> </td>
                                    </tr>
                                </tbody>
                            </table>
                        <h5><strong class="fomular">IA = DA x FI x (DY/360)</strong></h5>
                            <h5><strong>IR = {{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{getEarningPerYear()}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}</strong></h5>
                        </div>
                    </div>
                    <img class="img-fomular" src="@/assets/flexible_interest/images/img0.svg" alt="Image logo">
                    <!-- <div>
                        <button class="fi-btn-signature" @click="openSignatureDialog()">ລາຍເຊັນລູກຄ້າ</button>
                    </div> -->
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <img class="img-background" src="@/assets/flexible_interest/images/img1.svg" alt="Image logo">
                        <strong class="no">1</strong>
                        <strong class="title">ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ *</strong>
                        <span class="arrow1">&#8250;</span>
                        <span class="arrow2">&#8250;</span>
                        <input type="text" class="fi-input" placeholder="ຈຳນວນເງິນ" v-model="customer_info['deposit_amount']" required @keyup="validateCustomerDepositAmount()" @change="changeDepositAmountValue()">
                        <div class="error-message" v-if="error_validation['deposit_amount'].length > 0">
                            <span class="danger" v-for="(error, index) in error_validation['deposit_amount']" :key="index">{{error}} </span>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <img class="img-background" src="@/assets/flexible_interest/images/img2.svg" alt="Image logo">
                        <strong class="no">2</strong>
                        <strong class="title">ສະກຸນເງິນ *</strong>
                        <span class="arrow1">&#8250;</span>
                        <span class="arrow2">&#8250;</span>
                        <select id="currency" v-model="customer_info['currency']['currencyId']" required @change="changeCurrencyValue">
                            <option class="opt1" value="" style="color: #D3D3D3;">ເລືອກສະກຸນເງິນ</option>
                            <option v-for="(currency, index) in currencies" :key="index" :value="currency['currencyId']">{{currency['currencyNameLa']}} ({{currency['currencyCode']}})</option>
                        </select>
                        <div class="error-message" v-if="error_validation['currency'].length > 0">
                            <span class="danger" v-for="(error, index) in error_validation['currency']" :key="index">{{error}} </span>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <img class="img-background" src="@/assets/flexible_interest/images/img3.svg" alt="Image logo">
                        <strong class="no">3</strong>
                        <strong class="title">ໄລຍະຝາກ *</strong>
                        <span class="arrow1">&#8250;</span>
                        <span class="arrow2">&#8250;</span>
                        <!--  onfocus="this.size=5;" onblur='this.size=1;' onchange='this.size=1; this.blur();' -->
                        <select id="withdraw_age" v-model="customer_info['deposit_age']['typeId']" required @change="changeDepositAge">
                            <option value="" style="color: #D3D3D3;">ເລືອກໄລຍະຝາກເງິນ</option>
                            <option v-for="(depositType, index) in depositTypes" :key="index" :value="depositType['typeId']">{{depositType['typeName']}}</option>
                        </select>
                        <div class="error-message" v-if="error_validation['deposit_age'].length > 0">
                            <span class="danger" v-for="(error, index) in error_validation['deposit_age']" :key="index">{{error}} </span>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <img class="img-background" src="@/assets/flexible_interest/images/img4.svg" alt="Image logo">
                        <strong class="no">4</strong>
                        <strong class="title">ທາງເລືອກດອກເບ້ຍ *</strong>
                        <span class="arrow1">&#8250;</span>
                        <span class="arrow2">&#8250;</span>
                        <!--  onfocus="this.size=5;" onblur='this.size=1;' onchange='this.size=1; this.blur();' -->
                        <!-- <select id="interest" v-model="customer_info['aclass']" required @change="validateInterestChosen">
                            <option value="" style="color: #D3D3D3;">ເລືອກໄລຍະຮັບດອກເບ້ຍ</option>
                            <option v-for="(aclass, index) in aclasses" :key="index" :value="aclass['accountClass']">{{aclass['descriptionLao']}}</option>
                        </select> -->
                        <div class="text-right fi-dropdown-panel" @mouseleave="unhoverDropdownPanel()">
                            <span class="fi-dropdown-icon" @click="(aclasses.length>0)?show=!show:show=false">&#9660;</span>
                            <input type="text" placeholder="ເລືອກໄລຍະຮັບດອກເບ້ຍ" v-model="customer_info['aclass']['descriptionLao']" required readonly @click="(aclasses.length>0)?show=!show:show=false">
                            <ul v-show="show" id="interest" class="text-left fi-dropdown" @mouseover="hoverDropdownPanel()">
                                <li class="fi-placehoder" @click="aclassSelection({})">ເລືອກໄລຍະຮັບດອກເບ້ຍ</li>
                                <li v-for="(aclass, index) in aclasses" :key="index" :class="hover?'':dropdownAcive(aclass)" @click="aclassSelection(aclass)">{{aclass['descriptionLao']}}</li>
                            </ul>
                        </div>
                        <div class="error-message" v-if="error_validation['aclass'].length > 0">
                            <span class="danger" v-for="(error, index) in error_validation['aclass']" :key="index">{{error}} </span>
                        </div>
                    </div>
                    <div  class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <img class="img-background" src="@/assets/flexible_interest/images/img5.svg" alt="Image logo">
                        <strong class="no">5</strong>
                        <strong class="title">ອັດຕາດອກເບ້ຍປົກກະຕິ</strong>
                        <span class="arrow1">&#8250;</span>
                        <span class="arrow2">&#8250;</span>
                        <span class="show text-right">{{Number(customer_info['normal_interest']).toLocaleString(undefined,{'minimumFractionDigits':1,'maximumFractionDigits':3})}}%</span>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <img class="img-background" src="@/assets/flexible_interest/images/img6.svg" alt="Image logo">
                        <strong class="no">6</strong>
                        <strong class="title">ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ/ປີ</strong>
                        <span class="arrow1">&#8250;</span>
                        <span class="arrow2">&#8250;</span>
                        <span class="show text-right">{{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{Number(customer_info['earning_general_interest']).toLocaleString(undefined,{'minimumFractionDigits':1,'maximumFractionDigits':3})}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}</span>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12" v-if="toggleMaxFlexible">
                            <img class="img-background" src="@/assets/flexible_interest/images/img7.svg" alt="Image logo">
                            <strong class="no" :class="'c'+(num + 0)" @click="setHideShowMaxFlexible(6, false)">{{num + 0}}</strong>
                            <strong class="title">ອັດຕາດອກເບ້ຍຍືດຍຸ່ນສູງສຸດ</strong>
                            <span class="arrow1">&#8250;</span>
                            <span class="arrow2">&#8250;</span>
                            <span class="show text-right">{{customer_info['max_flexible']}}%</span>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <img class="img-background" src="@/assets/flexible_interest/images/img7.svg" alt="Image logo">
                        <strong class="no" :class="'c'+(num + 1)" @click="setHideShowMaxFlexible(7, true)">{{num + 1}}</strong>
                        <strong class="title">ອັດຕາດອກເບ້ຍຍືດຍຸ່ນ(%) *</strong>
                        <span class="arrow1">&#8250;</span>
                        <span class="arrow2">&#8250;</span>
                        <input type="number" min="0" class="fi-input" placeholder="ດອກເບ້ຍຍືດຍຸ່ນ" v-model="customer_info['customer_interest']" required @keyup="validateCustomerInterest()" step="0.01">
                        <div class="fi-exceeded text-right" v-if="toggleMaxFlexible">
                            <span class="danger" v-if="getExceededOutFlexible()">(ຍືດຍຸ່ນນອກກອບ: {{getExceededOutFlexible()}}%)</span>
                            <span class="success" v-if="getExceededInFlexible()">(ຍືດຍຸ່ນໃນກອບ: {{getExceededInFlexible()}}%)</span>
                        </div>
                        <div class="error-message" v-if="error_validation['customer_interest'].length > 0">
                            <span class="danger" v-for="(error, index) in error_validation['customer_interest']" :key="index">{{error}} </span>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12" >
                        <img class="img-background" src="@/assets/flexible_interest/images/img8.svg" alt="Image logo">
                        <strong class="no">{{num + 2}}</strong>
                        <strong class="title">ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ</strong>
                        <span class="arrow1">&#8250;</span>
                        <span class="arrow2">&#8250;</span>
                        <span class="show text-right">{{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{getEarningPerYear()}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}</span>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div id="fi-fomular">
                            <h5><strong>ວິທີຄິດໄລ່ດອກເບ້ຍ</strong></h5>
                            <h5><strong class="fomular">IR = AM x IP x (DA/360)</strong></h5>
                                <hr>
                            <div class="text-left">
                                <h5><strong>ຄວາມໝາຍ</strong></h5>
                            </div>
                            <div class="fi-body text-left">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th class="fi-title"><h6>IR: </h6></th>
                                            <td> <h6><strong>ດອກເບ້ຍທີ່ຈະໄດ້ຮັບ</strong></h6> </td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title"><h6>AM: </h6></th>
                                            <td> <h6><strong> ຈຳນວນເງິນຝາກ</strong></h6> </td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title"><h6>IP: </h6></th>
                                            <td> <h6><strong> ອັດຕາດອກເບ້ຍຍືດຍຸ່ນ</strong></h6> </td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title"><h6>DA: </h6></th>
                                            <td> <h6><strong> ຈຳນວນວັນຝາກ</strong></h6> </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr>
                                <div class="text-left">
                                    <h5><strong>ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ</strong></h5>
                                </div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th class="fi-title"><h6>AM= </h6></th>
                                            <td> <h6><strong>{{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{getDepositAmount().toLocaleString()}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}</strong></h6> </td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title"><h6>IP= </h6></th>
                                            <td> <h6><strong> {{customer_info['customer_interest']}}%</strong></h6> </td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title"><h6>DA= </h6></th>
                                            <td> <h6><strong>{{customer_info['deposit_age']['typeName']?customer_info['deposit_age']['typeName']:'0 ເດືອນ'}} x 30 ວັນ = </strong> <strong>{{customer_info['deposit_age']['totalDays']?customer_info['deposit_age']['totalDays']:'0'}} ວັນ</strong></h6> </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h5><strong class="fomular">IR = AM x IP x (DA/360)</strong></h5>
                                <h5><strong>IR = {{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{getEarningPerYear()}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}</strong></h5>
                            </div>
                        </div>
                        <div>
                            <button class="fi-btn-signature" @click="openSignatureDialog()">ລາຍເຊັນລູກຄ້າ</button>
                        </div>
                    </div>
                    <img v-if="customer_signature" :src="customer_signature" alt="Customer Signature">
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
import axios from 'axios';
import address from '@/helper/server_address.js'

import Vue from 'vue';
import VueSignaturePad from 'vue-signature-pad';

Vue.use(VueSignaturePad);

import ds from '@/helper/ds.js'

export default {
  name: 'flexible_interest',
  data(){
      return {
          show: false,
          hover: false,
          showSignaturePad: false,
          customer_signature: '',
          checkSignatureError: false,
          num: 7,
          toggleMaxFlexible: true,
          checkLimitedFlexible: false,
          currencies: [],
          depositTypes: [],
          aclasses: [],
          customer_info: this.$store.getters['flexible_interest_module/requirement'],
          error_validation: {
            currency: [],
            customer_interest: [],
            deposit_amount: [],
            aclass: [],
            deposit_age: []
          },
      }
  },
  created() {
    if(window.sessionStorage.getItem('actionProgress')){
      var stepAction = JSON.parse(window.sessionStorage.getItem('actionProgress'));
      if(!stepAction[2]['active']){
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
        ds.rpc.make('/bcel/chat/api/flexible/interest/info', { }, ( error, result ) => {
            if(result){
                this.currencies = result['currencies'];
                this.depositTypes = result['depositTypes'];
            }
        });
      }
    } else {
        this.$root.$emit("resetDefault");
        this.$router.push({
            path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'
        })
    }
  },
  mounted(){
    this.getAClasses();
  },
  methods: {
    changeDepositAmountValue(){
    //       if(!this.customer_info['deposit_amount']){
    //         this.customer_info['currency'] = {
    //             currencyId: ""
    //         }
    //         this.customer_info['deposit_age'] = {
    //             typeId: ""
    //         },
    //         this.customer_info['aclass'] = {
    //             descriptionLao: ''
    //         },
    //         this.aclasses = [];
    //     }
        this.getMaxFlexibleInterest()
      },
      validateCustomerDepositAmount(){
            if(this.customer_info['deposit_amount'].trim()){
                if(this.error_validation['deposit_amount'].indexOf('ເງິນຝາກຫ້າມວ່າງ') >= 0) {
                    this.error_validation['deposit_amount'].splice(this.error_validation['deposit_amount'].indexOf('ເງິນຝາກຫ້າມວ່າງ'));
                }
                var floating = this.customer_info['deposit_amount'].trim().split(',')
                var amount = floating[0].replace(/\./g,'');
                if(isNaN(amount) || isNaN((floating.length == 2)? (floating[1])?floating[1]:0:0) || (floating.length > 2)){
                    if(this.error_validation['deposit_amount'].indexOf('ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ') < 0){
                        this.error_validation['deposit_amount'].push('ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ');
                    }
                    return false;
                } else if(this.error_validation['deposit_amount'].indexOf('ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ') >= 0) {
                    this.error_validation['deposit_amount'].splice(this.error_validation['deposit_amount'].indexOf('ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ'));
                }
                var amount = parseFloat(floating[0].replace(/\./g, ''))
                this.customer_info['deposit_amount'] = Number(amount).toLocaleString().replace(/,/g, '.');
                this.customer_info['deposit_amount'] += (floating.length == 2)?',' + floating[1]:'';
            } else {
                if(this.error_validation['deposit_amount'].indexOf('ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ') >= 0) {
                    this.error_validation['deposit_amount'].splice(this.error_validation['deposit_amount'].indexOf('ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ'));
                }
                if(this.error_validation['deposit_amount'].indexOf('ເງິນຝາກຫ້າມວ່າງ') < 0){
                    this.error_validation['deposit_amount'].push('ເງິນຝາກຫ້າມວ່າງ');
                }
                return false;
            }
            return true;
      },
      getDepositAmount(){
            if(this.customer_info['deposit_amount'].trim()){
                
                var floating = this.customer_info['deposit_amount'].trim().split(',')
                var amount = floating[0].replace(/\./g,'');
                if(isNaN(amount) || isNaN((floating.length == 2)? (floating[1])?floating[1]:0:0) || (floating.length > 2)){
                    return 0;
                }
                var amount = parseFloat(floating[0].replace(/\./g, ''))
                return Number.parseFloat(amount);
            } else {
                return 0;
            }
      },
      changeCurrencyValue(){
          if(this.customer_info['currency']['currencyId'].trim()){
              for(var i = 0; i < this.currencies.length; i++){
                  if(this.currencies[i]['currencyId'] == this.customer_info['currency']['currencyId'].trim() ){
                      for(var key in this.currencies[i]) { 
                        this.customer_info['currency'][key] = this.currencies[i][key];
                       }
                      break;
                  }
              }
          }
          this.validateCurrency();
          this.getMaxFlexibleInterest();
          this.getGeneralInterest();
      },
      validateCurrency(){
          if(!this.customer_info['currency']['currencyId'].trim()){
              if(this.error_validation['currency'].length == 0){
                  this.error_validation['currency'].push('ເລືອກສະກຸນເງິນ');
              }
              return false;
          }  else if(this.error_validation['currency'].length > 0) {
              this.error_validation['currency'].pop();
          }
          return true;
      },
      aclassSelection(aclass){
        this.customer_info['aclass'] = aclass;
        this.validateAClass();
        this.getGeneralInterest();
        this.show = false;
      },
      dropdownAcive(aclass){
          if(this.customer_info['aclass']['accountClass']){
              if(this.customer_info['aclass']['accountClass'] == aclass['accountClass']){
                  return "fi-dropdown-active";
              }
          }
          return "";
      },
      validateAClass(){
          if(!this.customer_info['aclass']['accountClass']){
              if(this.error_validation['aclass'].length == 0){
                this.error_validation['aclass'].push('ເລືອກໄລຍະຮັບດອກເບ້ຍ');
              }
              return false;
          } else if(this.error_validation['aclass'].length > 0) {
              this.error_validation['aclass'].pop();
          }
          return true;
      },
      getGeneralInterest(){
          if(this.validateCustomerDepositAmount() && this.validateCurrency() && this.validateDepositAge() && this.customer_info['aclass']['accountClass']){
            // ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_info['currency']['currencyCode'].trim(), acClass: this.customer_info['aclass']['accountClass']}, ( error, result ) => {
            //     if(error){
            //         this.customer_info['normal_interest'] = 0;
            //     } else{
            //         if(result){
            //             this.customer_info['normal_interest'] = result['interest'];
            //         } else {
            //             this.customer_info['normal_interest'] = 0;
            //         }
            //     }
            //     console.log(error)
            //     this.customer_info['customer_interest'] = this.customer_info['normal_interest'].toString();
            // });
            //console.log(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_info['aclass']['accountClass']+'/'+this.customer_info['currency']['currencyCode'].trim()+'/0000')
            axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_info['aclass']['accountClass']+'/'+this.customer_info['currency']['currencyCode'].trim()+'/0000')
            .then((res) => {
                this.customer_info['normal_interest'] = res['data']['data']['interest'];
                this.customer_info['customer_interest'] = this.customer_info['normal_interest'].toString();
            })
            .catch((error) =>  {
                this.customer_info['normal_interest'] = '0';
                this.customer_info['customer_interest'] = this.customer_info['normal_interest'].toString();
            })
          } else{
              this.customer_info['normal_interest'] = 0;
                this.customer_info['customer_interest'] = "0";
          }
      },
      getEarningPerYear(){
          if(this.customer_info['deposit_amount'] && this.customer_info['currency']['currencyCode'] && this.customer_info['deposit_age']['typeId']){
            this.customer_info['earning_general_interest'] = this.getDepositAmount() * (this.customer_info['normal_interest'] / 100) * (this.customer_info['deposit_age']['totalDays'] / 360);
            this.customer_info['earning_customer_interest'] = this.getDepositAmount() * (this.customer_info['customer_interest'] / 100) * (this.customer_info['deposit_age']['totalDays'] / 360);
            return Number((this.customer_info['earning_customer_interest']).toString()).toLocaleString(undefined,{'minimumFractionDigits':1,'maximumFractionDigits':3})
          } else {
            return 0;
          }
      },
      changeDepositAge(){
          if(this.customer_info['deposit_age']['typeId'].trim()){
              for(var i=0; i < this.depositTypes.length; i++){
                  if(this.depositTypes[i]['typeId'] == this.customer_info['deposit_age']['typeId'].trim()){
                      this.customer_info['deposit_age']['typeName'] = this.depositTypes[i]['typeName'];
                      this.customer_info['deposit_age']['totalDays'] = this.depositTypes[i]['totalDays'];
                      break;
                  }
              }
          }
          this.getAClasses();
          this.customer_info['aclass'] = '';
          this.validateDepositAge();
          this.getMaxFlexibleInterest();
            this.getGeneralInterest();
      },
      getAClasses(){
          if(this.customer_info['deposit_age']['typeId'].trim()){
            ds.rpc.make('/bcel/chat/api/flexible/interest/aclass', { depositAge:  this.customer_info['deposit_age']['typeId'].trim(), customerType: this.customer_info['type']}, ( error, result ) => {
                if(error){
                    this.aclasses = [];
                } else{
                    this.aclasses = result;
                }
            });
          } else {
              this.aclasses = [];
          }
      },
      getMaxFlexibleInterest(){
          if(this.validateCustomerDepositAmount() && this.validateCurrency() && this.validateDepositAge()){
            ds.rpc.make('/bcel/chat/api/flexible/interest/max/flexible', { 
                currencyId:  this.customer_info['currency']['currencyId'].trim(), 
                customerDeposit: this.customer_info['deposit_amount'].trim().replace(/\./g,''),
                depositTypeId: this.customer_info['deposit_age']['typeId'].trim()
            }, ( error, result ) => {
                if(error){
                    this.customer_info['max_flexible'] = 0;
                    this.customer_info['flexible_interest_id'] = '';
                } else{
                    if(result['maxFlexible']) {
                        this.customer_info['max_flexible'] = result['maxFlexible'];
                        this.customer_info['flexible_interest_id'] = result['flexibleInterestId'];
                    } else {
                        this.customer_info['max_flexible'] = 0;
                        this.customer_info['flexible_interest_id'] = '';
                    }
                }
                this.$store.commit('flexible_interest_module/changeMaxFlexible', { max: this.customer_info['max_flexible'] });
                //this.getGeneralInterest();
            });
          }
      },
      validateDepositAge(){
          if(!this.customer_info['deposit_age']['typeId'].trim()){
              if(this.error_validation['deposit_age'].length == 0){
                this.error_validation['deposit_age'].push('ເລືອກໄລຍະຝາກເງິນ');
              }
              return false;
          } else if(this.error_validation['deposit_age'].length > 0) {
              this.error_validation['deposit_age'].pop();
          }
          return true;
      },
      validateCustomerInterest(){
            /*if(this.customer_info['customer_interest'].trim()){
                if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຫ້າມວ່າງ') >= 0) {
                    this.error_validation['customer_interest'].splice(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຫ້າມວ່າງ'));
                }
                var floating = this.customer_info['customer_interest'].trim().split(',')
                var amount = floating[0].replace(/\./g,'');
                if(isNaN(amount) || isNaN((floating.length == 2)? (floating[1])?floating[1]:0:0) || (floating.length > 2)){
                    if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ') < 0){
                        this.error_validation['customer_interest'].push('ດອກເບ້ຍຍືດຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ');
                    }
                    return false;
                } else if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ') >= 0) {
                    this.error_validation['customer_interest'].splice(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ'));
                }
                var amount = parseFloat(floating[0].replace(/\./g, ''))
                this.customer_info['customer_interest'] = Number(amount).toLocaleString().replace(/,/g, '.');
                this.customer_info['customer_interest'] += (floating.length == 2)?',' + floating[1]:'';
            } else {
                if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ') >= 0) {
                    this.error_validation['customer_interest'].splice(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ'));
                }
                if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຫ້າມວ່າງ') < 0) {
                    this.error_validation['customer_interest'].push('ດອກເບ້ຍຍືດຍຸ່ນຫ້າມວ່າງ');
                }
                return false;
            }*/
            if(isNaN(this.customer_info['customer_interest'].trim())){
                    if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ') < 0){
                        this.error_validation['customer_interest'].push('ດອກເບ້ຍຍືດຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ');
                    }
                    this.getExceededOutFlexible();
                    return false;
            } else if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ') >= 0) {
                this.error_validation['customer_interest'].splice(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ'));
            }
            return true;
      },
      hoverDropdownPanel(){
          this.hover = true;
      },
      unhoverDropdownPanel(){
          this.hover = false;
          this.show = false;
      },
      setHideShowMaxFlexible(number, check){
          this.num = number;
          this.toggleMaxFlexible = check;
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
      openSignatureDialog(){
          this.showSignaturePad = true;
      },
      cancleSignature(){
        this.$refs.signaturePad.clearSignature();
        this.$refs.signaturePad.clearCacheImages();
        this.customer_signature = '';
        this.showSignaturePad = false;
        this.checkSignatureError = false;
      },
      clearSignature(){
          this.$refs.signaturePad.clearSignature();
      },
      saveSignature(){
          this.customer_signature = this.$refs.signaturePad.saveSignature()['data'];
          if(this.customer_signature){
              this.showSignaturePad = false;
              this.checkSignatureError = false;
          } else {
              this.checkSignatureError = true;
          }
      },
      doNext(){
          if(this.validateCustomerDepositAmount() && this.validateCurrency() && this.validateAClass() && this.validateDepositAge() && this.validateCustomerInterest()){
            this.customer_info['customer_signature'] = this.customer_signature;
            this.$store.commit('flexible_interest_module/addCustomerRequirement', { info: this.customer_info });
            window.sessionStorage.setItem('requirement', JSON.stringify(this.customer_info));
            this.$store.commit('flexible_interest_module/addProgressActionActive', { index: 2, key:'active-after', val: 'stepper-active-after' });
            this.$store.commit('flexible_interest_module/addProgressActionActive', { index: 3, key:'active', val: 'stepper-active' });
            window.sessionStorage.setItem('actionProgress', JSON.stringify(this.$store.getters['flexible_interest_module/action_active']));
            this.$router.push({
                path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/document/attach'
            });
          } else {
              this.validateCustomerDepositAmount();
              this.validateCurrency();
              this.validateAClass();
              this.validateDepositAge();
              this.validateCustomerInterest();
          }
      },
    backwardProgress(){
        this.$router.push({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/product'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
    font-family: Phetsarath_OT;
}
.signature-pad{
    -webkit-box-shadow: inset -2px 2px 13px -1px rgba(0,0,0,0.52);
    -moz-box-shadow: inset -2px 2px 13px -1px rgba(0,0,0,0.52);
    box-shadow: inset -2px 2px 13px -1px rgba(0,0,0,0.52);
    margin-bottom: 3px;
    color: blue;
}
.no-signature{
    font-size: 14px;
    color: #EE3024;
}
.fi-toggle{
    position: absolute;
    left: 0px;
    top: 10px;
    cursor: pointer;
    width: auto;
}
span.fi-dropdown-icon{
    position: absolute;
    font-size: 8px;
    top: 13px;
    right: 3px;
    cursor: pointer;
}
div#fomular_panel{
    position: relative;
}
div#fomular{
    top: 50%;
    margin-top: -210px;
    left: 30px;
    position: absolute;
    color: white;
}
div#fi-fomular{
    visibility: hidden;
    display: none;
}
img{
    width: 100%;
    padding-top: 5px;
}
div.fi-exceeded{
    position: absolute;
    width: 100%;
    top: -15px;
    right: 18px;
}
.success{
    font-size: 12px;
    color: #20A816;
}
.danger{
    font-size: 12px;
    color: red;
    
}
.danger:before, .success:before{
    content: '* ';
}

.fi-inverst-signature-background {
  top: 0px;
  left: 0px;
  z-index: 999999999999999999999999999999999999999999998;
  position: fixed;
  background: black;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.fi-signature-dialog {
    position: fixed;
    border-radius: 2px;
    top: 50%;
    margin-top: -150px;
    left: 50%;
    margin-left: -150px;
    color: rgb(165, 164, 164);
    z-index: 999999999999999999999999999999999999999999999;
    background: white; //linear-gradient(to bottom right, rgba(243, 195, 189, 0.918) 10%, rgb(202, 86, 94) 200%);
    border: 1px lightgrey solid;
    -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
        -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
            box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
    padding: 5px;
    width: 300px;
    height: 300px;
}
.fi-signature-header, .fi-signature-body {
    text-align: left;
}
.fi-signature-footer{
    text-align: right;
}
.fi-btn-signature-ok{
    margin-left: 5px;
    background: #20A816;
    color: white;
    border: none;
    border-radius: 3px;
    width: 5rem;
    font-size: 1rem;
}
.fi-btn-signature-clear{
    margin-left: 5px;
    background: rgb(250, 127, 123);
    color: white;
    border: none;
    border-radius: 3px;
    width: 5rem;
    font-size: 1rem;
}
.fi-btn-signature-cancle{
    margin-left: 5px;
    background: #EE3024;
    color: white;
    border: none;
    border-radius: 3px;
    width: 5rem;
    font-size: 1rem;
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
.fi-btn-signature{
    margin-top: 5px;
    margin-bottom: 10px;
    background: #C72B2C;
    color: white;
    border: 1px #C72B2C solid;
    border-radius: 3px;
    width: 100%;
    font-size: 1.2rem;
    padding: 3px;
}
.fi-btn-next:hover{
    background: #A42C35;
}
div.error-message {
    position: absolute;
    left: 12%;
    top: 54px;
}
.interest-title{
    font-size: 3rem;
}
.c7{
    cursor: pointer;
}
.c7:hover {
    color: #EE3024;
}
strong.no{
    position: absolute;
    left: 5%;
    top: 10%;
    color: white;
    font-size: 40px;
}
strong.title {
    position: absolute;
    left: 12%;
    top: 14%;
    color: white;
    font-size: 30px;
}
span.arrow1{
    position: absolute;
    left: 55%;
    color: white;
    font-size: 60px;
    margin-top: -14px;
}
span.arrow2{
    position: absolute;
    left: 56.5%;
    color: white;
    font-size: 45px;
    margin-top: -1px;
}

input.fi-input, select, span.show, div.fi-dropdown-panel{
    position: absolute;
    color: white;
    right: 18px;
    top: 15px;
    width: 38%;
    background: transparent;
    border: none;
    font-size: 22px;
    padding-right: 5px;
}
div.fi-dropdown-panel{
    z-index: 2;
}
select, div.fi-dropdown-panel>input {
    cursor: pointer;
}
div.fi-dropdown-panel>input{
    color: white;
    width: 100%;
    background: transparent;
    border: none;
    font-size: 22px;
    padding-right: 5px;
}
ul.fi-dropdown{
    border: 0.3px rgb(126, 188, 250) solid;
    color: white;
    height: 150px;
    overflow-y: auto;
    overflow-x: auto;
    padding: 0px;
}
ul.fi-dropdown>li{
    padding-left: 5px;
    padding-right: 5px;
}
ul.fi-dropdown>li:hover, ul.fi-dropdown>li:active{
    background: #1E90FF;
    cursor: context-menu;
}
.fi-dropdown-active{
    background: #1E90FF;
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

input:focus, select:focus, button:focus{
    outline: none;
}

select>option, ul.fi-dropdown {
    font-size: 18px;
}

select#currency option {
  background: #A73334;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
select#withdraw_age option {
  background: #C1262E;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
/*select#withdraw_age{
  z-index: 8;
}
select#interest{
  z-index: 7;
}*/
ul#interest {
  background: #C72B2C;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
ul>li.fi-placehoder{
  color: #D3D3D3;
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
        top: 16%;
        color: white;
        font-size: 30px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 15%;
        color: white;
        font-size: 27px;
    }
    span.arrow1{
        position: absolute;
        left: 55%;
        color: white;
        font-size: 55px;
        margin-top: -11px;
    }
    span.arrow2{
        position: absolute;
        left: 56.5%;
        color: white;
        font-size: 40px;
        margin-top: 0px;
    }
    input.fi-input, div.fi-dropdown-panel, select, span.show{
        top: 13px;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 22px;
    }
}
@media only screen and (max-width: 1400px) {
  strong.no{
        position: absolute;
        left: 5%;
        top: 16%;
        color: white;
        font-size: 30px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 15%;
        color: white;
        font-size: 25px;
    }
    span.arrow1{
        position: absolute;
        left: 55%;
        color: white;
        font-size: 55px;
        margin-top: -12px;
    }
    span.arrow2{
        position: absolute;
        left: 56.5%;
        color: white;
        font-size: 40px;
        margin-top: -1px;
    }
    input.fi-input, div.fi-dropdown-panel, select, span.show{
        top: 13px;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 20px;
    }
    select>option, ul.fi-dropdown>li {
        font-size: 16px;
    }

    div.error-message {
        position: absolute;
        left: 12%;
        top: 50px;
    }
    div#fomular{
        margin-top: -200px;
    }
    h5{
        font-size: 18px;
    }
    h6 {
        font-size: 14px;
    }
}
@media only screen and (max-width: 1300px) {
  strong.no{
        position: absolute;
        left: 5%;
        top: 16%;
        color: white;
        font-size: 27px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 15%;
        color: white;
        font-size: 22px;
    }
    span.arrow1{
        position: absolute;
        left: 55%;
        color: white;
        font-size: 50px;
        margin-top: -12px;
    }
    span.arrow2{
        position: absolute;
        left: 56.5%;
        color: white;
        font-size: 35.5px;
        margin-top: -1px;
    }
    input.fi-input, select, span.show{
        top: 13px;
    }
    div.fi-dropdown-panel{
        top: 9px;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 18px;
    }
    select>option, ul.fi-dropdown>li {
        font-size: 16px;
    }
    div.error-message {
        position: absolute;
        left: 12%;
        top: 45px;
    }
    div#fomular{
        margin-top: -190px;
    }
    h5{
        font-size: 16px;
    }
    h6 {
        font-size: 14px;
    }
}
@media only screen and (max-width: 1200px) {
  strong.no{
        position: absolute;
        left: 5%;
        top: 16%;
        color: white;
        font-size: 27px;
    }
    div.error-message {
        position: absolute;
        left: 12%;
        top: 44px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 15%;
        color: white;
        font-size: 22px;
    }
    span.arrow1{
        position: absolute;
        left: 55%;
        color: white;
        font-size: 50px;
        margin-top: -13px;
    }
    span.arrow2{
        position: absolute;
        left: 56.7%;
        color: white;
        font-size: 35px;
        margin-top: -1px;
    }
    input.fi-input, select, span.show{
        top: 11px;
    }
    div.fi-dropdown-panel{
        top: 8px;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 18px;
    }
    select>option, ul.fi-dropdown>li {
        font-size: 16px;
    }
    div.error-message {
        position: absolute;
        left: 12%;
        top: 42px;
    }
    div#fomular{
        margin-top: -180px;
    }
    h5{
        font-size: 14px;
    }
    h6 {
        font-size: 12px;
    }
}

@media only screen and (max-width: 1120px) {
  strong.no{
        position: absolute;
        left: 5.5%;
        top: 17%;
        color: white;
        font-size: 22px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 15%;
        color: white;
        font-size: 20px;
    }
    span.arrow1{
        position: absolute;
        left: 55%;
        color: white;
        font-size: 45px;
        margin-top: -10px;
    }
    span.arrow2{
        position: absolute;
        left: 56.7%;
        color: white;
        font-size: 30px;
        margin-top: 1px;
    }
    
    input.fi-input, select, span.show{
        top: 11px;
    }
    div.fi-dropdown-panel{
        top: 7px;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 17px;
    }
    select>option, ul.fi-dropdown>li {
        font-size: 15px;
    }
    div.error-message {
        position: absolute;
        left: 12%;
        top: 38px;
    }
    div#fomular{
        margin-top: -170px;
    }
    h5{
        font-size: 13px;
    }
    h6 {
        font-size: 11px;
    }
}

@media only screen and (max-width: 992px) {
  strong.no{
        position: absolute;
        left: 5%;
        top: 19%;
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
        top: 15%;
        color: white;
        font-size: 26px;
    }
    span.arrow1{
        position: absolute;
        left: 53%;
        color: white;
        font-size: 55px;
        margin-top: -12px;
    }
    span.arrow2{
        position: absolute;
        left: 54.5%;
        color: white;
        font-size: 40px;
        margin-top: 0px;
    }
    input.fi-input, div.fi-dropdown-panel, select, span.show{
        top: 12px;
        width: 41%;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 22px;
    }
    select>option, ul.fi-dropdown>li {
        font-size: 18px;
    }
    .interest-title{
        font-size: 2.5rem;
    }
    div#fomular_panel{
        visibility: hidden;
        display: none;
    }
    div#fi-fomular{
        visibility: inherit;
        display: block;
        background: #A42C35;
        color: #fff;
        padding: 5px;
        margin-top: 5px;
        border-radius: 5px 0px 0px 0px;
    }
    h5{
        font-size: 22px;
    }
    h6 {
        font-size: 18px;
    }
}
@media only screen and (max-width: 890px) {
  strong.no{
        position: absolute;
        left: 5%;
        top: 19%;
        color: white;
        font-size: 25px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 15%;
        color: white;
        font-size: 25px;
    }
    span.arrow1{
        position: absolute;
        left: 53%;
        color: white;
        font-size: 50px;
        margin-top: -12px;
    }
    span.arrow2{
        position: absolute;
        left: 54.5%;
        color: white;
        font-size: 35px;
        margin-top: 0px;
    }
    
    input.fi-input, div.fi-dropdown-panel, select, span.show{
        top: 10px;
        width: 40%;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 20px;
    }
    select>option, ul.fi-dropdown>li {
        font-size: 16px;
    }

    img.img-fomular{
        display: none;
    }
}
@media only screen and (max-width: 767px) {
  strong.no{
        position: absolute;
        left: 5.5%;
        top: 14%;
        color: white;
        font-size: 22px;
    }
    div.error-message {
        position: absolute;
        left: 12%;
        top: 35px;
    }
    .danger, .success{
        font-size: 11px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 15%;
        color: white;
        font-size: 20px;
    }
    span.arrow1{
        position: absolute;
        left: 54%;
        color: white;
        font-size: 40px;
        margin-top: -10px;
    }
    span.arrow2{
        position: absolute;
        left: 55.5%;
        color: white;
        font-size: 30px;
        margin-top: -2px;
    }
    input.fi-input, select, span.show{
        top: 9px;
        width: 38%;
    }
    div.fi-dropdown-panel{
        top: 5px;
        width: 38%;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 16px;
    }
    select>option, ul.fi-dropdown>li {
        font-size: 14px;
    }
    
    img.img-fomular{
        display: none;
    }
}
@media only screen and (max-width: 620px) {
  strong.no{
        position: absolute;
        left: 6%;
        top: 22%;
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
        top: 20%;
        color: white;
        font-size: 17px;
    }
    span.arrow1{
        position: absolute;
        left: 47%;
        color: white;
        font-size: 30px;
        margin-top: -3px;
    }
    span.arrow2{
        position: absolute;
        left: 48.5%;
        color: white;
        font-size: 20px;
        margin-top: 6px;
    }
    input.fi-input, select, span.show{
        top: 9px;
        width: 46%;
    }
    div.fi-dropdown-panel{
        top: 5px;
        width: 46%;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 16px;
    }
    select>option, ul.fi-dropdown>li {
        font-size: 14px;
    }
    ul.fi-dropdown{
        padding-top: 2px;
    }
    img.img-fomular{
        display: none;
    }
    .interest-title{
        font-size: 2rem;
    }
}

@media only screen and (max-width: 500px) {
  strong.no{
        position: absolute;
        left: 6.5%;
        top: 22%;
        color: white;
        font-size: 18px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 20%;
        color: white;
        font-size: 15px;
    }
    div.fi-exceeded{
        top: -13px;
    }
    span.arrow1{
        position: absolute;
        left: 52%;
        color: white;
        font-size: 30px;
        margin-top: -6px;
    }
    span.arrow2{
        position: absolute;
        left: 53.5%;
        color: white;
        font-size: 20px;
        margin-top: 3px;
    }
    
    input.fi-input, select, span.show{
        top: 8px;
        width: 40%;
    }
    div.fi-dropdown-panel{
        top: 0px;
        width: 40%;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 14px;
    }
    select>option, ul.fi-dropdown>li {
        font-size: 12px;
    }
    ul.fi-dropdown{
        padding-top: 2px;
    }
    
    img.img-fomular{
        display: none;
    }
}

@media only screen and (max-width: 400px) {
  strong.no{
        position: absolute;
        left: 7%;
        top: 20%;
        color: white;
        font-size: 15px;
    }
    strong.title {
        position: absolute;
        left: 13%;
        top: 20%;
        color: white;
        font-size: 12px;
    }
    span.arrow1{
        position: absolute;
        left: 52%;
        color: white;
        font-size: 30px;
        margin-top: -9px;
    }
    span.arrow2{
        position: absolute;
        left: 54%;
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }
    
    input.fi-input, select, span.show{
        top: 5px;
        width: 38%;
    }
    div.fi-dropdown-panel{
        top: -3px;
        width: 38%;
    }
    input.fi-input, div.fi-dropdown-panel>input, select, span.show{
        font-size: 12px;
    }
    select>option, ul.fi-dropdown>li {
        font-size: 10px;
    }
    ul.fi-dropdown{
        padding-top: 2px;
    }

    img.img-fomular{
        display: none;
    }
}

</style>

