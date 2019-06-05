<template>
    <div class="container">
        <fi_dialog :config="fi_config"/>
        <div v-if="showComment">
            <div class="fi-inverst-edit-background"></div>
            <div class="fi-edit-dialog">
                <div class="fi-edit-header">
                    <h5>ສະແດງຄຳຄິດເຫັນຕອບຄືນ</h5>
                </div>
                <div class="fi-edit-body">
                    <textarea required v-model="editComment" rows="3"></textarea>
                    <small class="REJECTED" v-if="errorMessage">* {{errorMessage}}</small>
                </div>
                <div class="fi-edit-footer">
                    <button type="button" class="fi-btn-edit-cancle" @click="cancleCommentDialog()">ຍົກເລີກ</button>
                    <button type="button" class="fi-btn-edit-ok" @click="saveNewData()">ຕົກລົງ</button>
                </div>
            </div>
        </div>
        <div class="row hide-on-print-mode">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <h2><strong>Edit</strong></h2>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left">
                <div class="fi-edit-content" style="color: rgba(247, 82, 6, 0.959);">
                    <strong class="fi-topic" style="color: rgba(247, 82, 6, 0.959);">ຄຳແນະນຳການແກ້ໄຂຂໍ້ມູນ</strong>
                    <hr class="margin-space">
                    <div class="fi-response-edit-body text-left" v-for="(edit, index) in editResponse" :key="index">
                        <div class="text-left">
                            <div>
                                <strong style="border-bottom: 1px gray solid; font-size: 18px;">{{edit['requestUserName']}}: </strong>
                            </div>
                            <div style="margin-top:-1px; font-size: 12px; color: #908C84;">
                                <small>
                                    {{edit['position']}} {{edit['divisionName']}} {{edit['departmentName']}}
                                </small>
                            </div>
                        </div>
                        <div>
                            &nbsp&nbsp&nbsp&nbsp <span>{{edit['comments']}}</span>
                        </div>
                        <div class="text-right">
                            <small>{{getFormatDate(edit['date'] + ' ' + edit['time'])}}</small>
                        </div>
                        <hr class="margin-space">
                    </div>
                </div>
                <div class="fi-card">
                    <strong class="fi-topic">ຂໍ້ມູນສ່່ວນຕົວຂອງລູກຄ້າ</strong>
                    <hr>
                    <div>
                        <div class="row">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-12 text-left">
                                        <strong class="fi-title">ປະເພດລູກຄ້າ</strong>
                                    </div>
                                    <div class="col-4 text-left">
                                        <!-- <input type="radio" value="TAI" v-model="customer_info['type']"> ບູກຄົນ -->
                                        <label class="fi-container">
                                            <span class="fi-radio-text">ບູກຄົນ</span>
                                            <input type="radio" name="radio" value="TAI" v-model="customer_info['customerType']" @change="validateType">
                                            <span class="fi-checkmark"></span>
                                        </label>
                                    </div>
                                    <div  class="col-4 text-center">
                                        <!-- <input type="radio" value="TCO" v-model="customer_info['type']"> ນິຕິບູກຄົນ -->
                                        <label class="fi-container">
                                            <span class="fi-radio-text">ນິຕິບູກຄົນ</span>
                                            <input type="radio" name="radio" value="TCO" v-model="customer_info['customerType']" @change="validateType">
                                            <span class="fi-checkmark"></span>
                                        </label>
                                    </div>
                                    <div  class="col-4 text-right">
                                        <!-- <input type="radio" value="TPO" v-model="customer_info['type']">ອົງກອນລັດ -->
                                        <label class="fi-container">
                                            <span class="fi-radio-text">ອົງກອນລັດ</span>
                                            <input type="radio" name="radio" value="TPO" v-model="customer_info['customerType']" @change="validateType">
                                            <span class="fi-checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                <strong>ຊື່ລູກຄ້າ:</strong>
                                <br>
                                <input type="text" required v-model="customer_info['customerName']" @change="validateName">
                                <div class="error-message" v-if="error_validation['name'].length > 0"><!--   -->
                                    <span class="danger" v-for="(error, index) in error_validation['name']" :key="index">{{error}}</span>
                                </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                <strong>ເບີໂທ:</strong>
                                <br>
                                <input type="text" required v-model="customer_info['customerTel']" @change="validateTel">
                                <div class="error-message" v-if="error_validation['tel'].length > 0">
                                    <span class="danger" v-for="(error, index) in error_validation['tel']" :key="index">. {{error}}</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <strong>ອາຊີບ:</strong>
                                <br>
                                <input type="text" required v-model="customer_info['customerOccupation']" @change="validateOccupation">
                                <div class="error-message" v-if="error_validation['occupation'].length > 0">
                                    <span class="danger" v-for="(error, index) in error_validation['occupation']" :key="index">. {{error}}</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <strong>ບັນຊີທະນາຄານ:</strong>
                                <div v-if="!customer_info['bankAccounts']">...............................</div>
                                <div class="fi-account-group" v-for="(account, index) in customer_info['bankAccounts']" :key="index">
                                    <div class="fi-account-title">
                                        <span>Account {{index + 1}}:</span>
                                    </div>
                                    <!-- v-if="customer_info['bank_accounts'].length > 1" @click="deleteAccount(index)" -->
                                    <strong class="delIcon" v-if="customer_info['bankAccounts'].length > 1" @click="deleteAccount(index, account)">x</strong>
                                    <div class="row">
                                        <div  class="col-12 col-sm-12 col-md-6 col-lg-6">
                                            <span class="fi-input-title">ເລກບັນຊີ:</span>
                                            <br>
                                            <input class="fi-account-input" type="text" placeholder="ເລກບັນຊີ" required v-model="account['accountNo']" @change="validateAccountNo(index)">

                                        </div>
                                        <div  class="col-12 col-sm-12 col-md-6 col-lg-6">
                                            <span class="fi-input-title">ອະທິບາຍເພີ່ມເຕີມ:</span>
                                            <br>
                                            <input class="fi-account-input" type="text" required placeholder="ອະທິບາຍເພີ່ມເຕີມ" v-model="account['description']">

                                        </div>
                                    </div>
                                    <div v-if="error_validation['bank_accounts'].length > 0">
                                        <div class="" v-if="error_validation['bank_accounts'][index]['acc_no'].length > 0">
                                            <span class="fi-account-valid" v-for="(error, index) in error_validation['bank_accounts'][index]['acc_no']" :key="index">(* {{error}}) </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="fi-add-pannel text-right"><span class="fi-add" @click="addAccount()">+</span></div>
                            </div>
                            <div class="col-12">
                                <strong class="fi-title">ຂໍ້ມູນອື່ນໆ: </strong> 
                                <br/>
                                <textarea required v-model="customer_info['customerDetail']" rows="4"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fi-card">
                    <strong class="fi-topic">ຂໍ້ມູນເງິນຝາກຂອງລູກຄ້າ</strong>
                    <hr>
                    <div class="row">
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <strong>ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ:</strong>
                            <br>
                            <input type="text" required v-model="customer_info['depositAmount']" @keyup="validateCustomerDepositAmount()" @change="changeDepositAmountValue()">
                            <div class="error-message" v-if="error_validation['deposit_amount'].length > 0">
                                <span class="danger" v-for="(error, index) in error_validation['deposit_amount']" :key="index">{{error}} </span>
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <strong>ສະກຸນເງິນ:</strong>
                            <br>
                            <select id="currency" required v-model="customer_info['currencyId']" @change="changeCurrencyValue">
                                <option class="opt1" value="" style="color: #D3D3D3;">ເລືອກສະກຸນເງິນ</option>
                                <option v-for="(currency, index) in currencies" :key="index" :value="currency['currencyId']">{{currency['currencyNameLa']}} ({{currency['currencyCode']}})</option>
                            </select>
                            <div class="error-message" v-if="error_validation['currency'].length > 0">
                                <span class="danger" v-for="(error, index) in error_validation['currency']" :key="index">{{error}} </span>
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <strong>ໄລຍະຝາກ:</strong>
                            <br>
                            <select id="withdraw_age" v-model="customer_info['depositType']" required @change="changeDepositAge">
                                <option value="" style="color: #D3D3D3;">ເລືອກໄລຍະຝາກເງິນ</option>
                                <option v-for="(depositType, index) in depositTypes" :key="index" :value="depositType['typeId']">{{depositType['typeName']}}</option>
                            </select>
                            <div class="error-message" v-if="error_validation['deposit_age'].length > 0">
                                <span class="danger" v-for="(error, index) in error_validation['deposit_age']" :key="index">{{error}} </span>
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <strong>ທາງເລືອກດອກເບ້ຍ:</strong>
                            <br>
                            <div class="text-right fi-dropdown-panel" @mouseleave="unhoverDropdownPanel()">
                                <span class="fi-dropdown-icon" @click="(aclasses.length>0)?show=!show:show=false">&#9660;</span>
                                <input type="text" :class="customer_info['interestChosen']?'fi-valid': 'fi-invalid'" v-model="customer_info['interestChosen']" required placeholder="ເລືອກໄລຍະຮັບດອກເບ້ຍ" readonly @click="(aclasses.length>0)?show=!show:show=false">
                                <!--  -->
                                <ul v-show="show" id="interest" class="text-left fi-dropdown" @mouseover="hoverDropdownPanel()">
                                    <li class="fi-placehoder" @click="aclassSelection({})">ເລືອກໄລຍະຮັບດອກເບ້ຍ</li>
                                    <li v-for="(aclass, index) in aclasses" :key="index" :class="hover?'':dropdownAcive(aclass)" @click="aclassSelection(aclass)">{{aclass['descriptionLao']}}</li>
                                </ul>
                                <div class="error-message" v-if="error_validation['aclass'].length > 0">
                                    <span class="danger" v-for="(error, index) in error_validation['aclass']" :key="index">{{error}} </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <strong>ອັດຕາດອກເບ້ຍປົກກະຕິ:</strong>
                            <br>
                            <div class="_valid">{{customer_info['normalInterest']}}%</div>
                            
                        </div>
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <strong>ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ/ປີ:</strong>
                            <br>
                            <div class="_valid">{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('normalInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}</div>
                            
                        </div>
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <strong>ດອກເບ້ຍຍືດຍຸ່ນສູງສຸດ:</strong>
                            <br>
                            <div class="_valid">{{customer_info['interestFlexible']}}%</div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <strong>ອັດຕາດອກເບ້ຍທີ່ລູກຄ້າຕ້ອງການ:</strong>
                            <br>
                            <input type="number" required v-model="customer_info['customerInterest']" step="0.01">
                            <span style="color: red; font-size: 12px;" v-if="getExceededOutFlexible()"> (ຍືດຍຸນນອກກອບ:​ {{getExceededOutFlexible()}}%)</span>
                            <span style="color: #20A816; font-size: 12px;" v-if="getExceededInFlexible()"> (ຍືດຍຸນໃນກອບ:​ {{getExceededInFlexible()}}%)</span>
                        </div>
                        <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                            <strong>ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ:</strong>
                            <br>
                            <div class="_valid">{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('customerInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}</div>
                        </div>
                        
                    </div>
                </div>
                <div class="fi-card">
                    <strong class="fi-topic">ຄຳຄິດເຫັນຂອງພະນັກງານ ແລະ ເອກະສານຕິດຄັດຂອງລູກຄ້າ</strong>
                    <hr>
                    <div>
                        <div class="row">
                            <div class="col-12">
                                <strong class="fi-title">ຄຳຄິດເຫັນຂອງພະນັກງານ: </strong> 
                                <br/>
                                <textarea required v-model="customer_info['staffNote']" rows="4" @change="validateStaffNote"></textarea>
                                <div class="error-message" v-if="error_validation['staff_note'].length > 0">
                                    <span class="danger" v-for="(error, index) in error_validation['staff_note']" :key="index">{{error}} </span>
                                </div>
                            </div>
                            <div class="col-12">
                                <strong class="fi-title">ເອກະສານປະກອບຂອງລູກຄ້າ: </strong> 
                                <br/>
                                <textarea required v-model="customer_info['documents']" rows="4"></textarea>
                                <br/>
                                <strong class="fi-title">ຟາຍລ໌ເອກະສານ</strong> <strong class="fi-title">: </strong> 
                                <input type="file" multiple accept="image/jpg, image/jpeg, image/png, application/pdf, application/msword, application/vnd.ms-excel" required @change="getDocumentFiles($event)">
                                <ul class="fi-text">
                                    <li v-for="(new_file, new_index) in new_files" :key="'new' + new_index">{{new_file['name']}} <span class="closeIcon" @click="removeFile(new_index)"> x</span></li>
                                    <li v-for="(file, index) in document_files" :key="index"><a :href="'http://localhost:8081' + file['docUrl']" target="_blank" rel="noopener noreferrer">{{file['docName']}} </a> <span class="closeIcon" @click="deleleFile(index, file)"> x</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="text-left">
                    <small> ໂດຍ: {{customer_info['createUserName']}} {{customer_info['createUserDivision']}} {{customer_info['createUserDepartment']}} {{customer_info['createUserBranch']}}</small>
                    <small> ({{getFormatDate(customer_info['createDate'] + ' ' + customer_info['createTime'])}})</small>
                     
                </div>
            </div> 
            <div class="col-3 col-sm-3 col-md-6 col-lg-6 col-xl-6 text-left">
                <button class="fi-btn-next" type="button" @click="backRouter()">&#8592;</button>
            </div>
            <div class="col-9 col-sm-9 col-md-6 col-lg-6 col-xl-6 text-right">
                    <button class="fi-btn-next" type="button" @click="showCommentDialog()">ບັນທືກ</button>
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
import fi_dialog from '@/components/flexible-interest/fi_dialog.vue'
//import fi_edit from '@/components/flexible-interest/edit.vue'
export default {
  name: 'edit_flexible',
  components: {
    fi_dialog,
  },
  data(){
      return {
        show: false,
        hover: false,
        showLoading: true,
        showProducts: false,
        showComment: false,
        editComment: '',
        errorMessage: '',
        customer_info: this.$store.getters['flexible_interest_module/customer_detail'],
        document_files: [],
        new_files: [],
        editResponse: [],
        products: this.$store.getters['flexible_interest_module/customer_detail']['products'],
        currencies: [],
        depositTypes: [],
        aclasses: [],
        error_validation: {
            type: [],
            name: [],
            tel: [],
            occupation: [],
            acc_no: [],
            bank_accounts: [],
            more_info: [],
            currency: [],
            customer_interest: [],
            deposit_amount: [],
            aclass: [],
            deposit_age: [],
            staff_note: []
          },
        fi_config: {
            show: false,
            title: 'Confirm',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'Cancle',
                    action: () => {
                        // console.log("Cancle")
                        this.fi_config['show'] = false;
                    }
                },
                {
                    text: 'OK',
                    action: () => {
                        // console.log('OK');
                        this.fi_config['show'] = false;
                    }
                }
            ]
        }
      }
  },
  created() {
      //console.log(this.customer_info);
    ds.rpc.make('/bcel/chat/api/flexible/interest/info', { }, ( error, result ) => {
        this.currencies = result['currencies'];
        this.depositTypes = result['depositTypes'];
    });
  },
  mounted(){
    if(!this.customer_info['requirementId']){
        ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/by/id', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
            if(result)
            {
                //console.log(result);
                this.customer_info = result;
                this.customer_info['depositAmount'] = this.customer_info['depositAmount'].toLocaleString().replace(/,/g, '.')
                if(this.checkTrueEditData()) {
                    this.getAClasses();
                    axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_info['accountClass']+'/'+this.customer_info['currencyCode']+'/'+this.customer_info['requirementId'])
                    .then((res) => {
                        this.customer_info['normalInterest'] = res['data']['data']['interest'];
                    })
                    .catch((error) =>  {
                        this.customer_info['normalInterest'] = '0';
                    })
                    for(var i=0; i<this.customer_info['bankAccounts'].length; i++) {
                        this.error_validation['bank_accounts'].push({
                            acc_no: [],
                            desc: []
                        });
                    }
                } else {
                    this.backRouter();
                }
            } else {
                this.backRouter();
            }
        });
    } else {
        this.customer_info['depositAmount'] = this.customer_info['depositAmount'].toLocaleString().replace(/,/g, '.');
        if(this.checkTrueEditData()) {
            for(var i=0; i<this.customer_info['bankAccounts'].length; i++) {
                this.error_validation['bank_accounts'].push({
                    acc_no: [],
                    desc: []
                });
            }
            //console.log(this.customer_info)
            this.getAClasses();
        } else {
            this.backRouter();
        }
    }
    this.getRelationData();
  },
  destroyed(){
      window.sessionStorage.removeItem('edit_info');
  },
  methods: {
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
      checkTrueEditData(){
          return (this.customer_info['createUser'] == this.$store.getters['flexible_interest_module/user']) && (this.customer_info['editCount'] > 0);
      },
      validateAccounts(){
          // console.log(this.customer_info['bankAccounts'])
          var compare = true;
          for(var i=0; i < this.customer_info['bankAccounts'].length; i++){
               var result = this.validateAccountNo(i);
               compare = compare && result;
          }
          return compare;
      },
      validateAccountNo(i){
          // console.log(i)
            if(!this.customer_info['bankAccounts'][i]['accountNo'].trim()) {
                if(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ') >= 0) {
                    this.error_validation['bank_accounts'][i]['acc_no'].splice(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ'));
                }
                if(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ') >= 0){
                    this.error_validation['bank_accounts'][i]['acc_no'].splice(this.error_validation['bank_accounts'][i]['acc_no'].indexOf('ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ'));
                }
                return true;
            }

            if(isNaN(this.customer_info['bankAccounts'][i]['accountNo'].trim())){
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
            
            if(this.customer_info['bankAccounts'][i]['accountNo'].trim().length != 18){
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
      addAccount(){
        this.customer_info['bankAccounts'].push({id:"0", accountNo: '', description: '', requirementId:this.customer_info['requirementId']});
        this.error_validation['bank_accounts'].push({
            acc_no: [],
            desc: []
        });
      },
      deleteAccount(i, account){
          if(account['id'] == 0) {
              this.customer_info['bankAccounts'].splice(i, 1);
              this.error_validation['bank_accounts'].splice(i, 1);
          } else {
            ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/delete/bank/account', { _id:  account['id']}, ( error, result ) => {
                if(result){
                    this.customer_info['bankAccounts'].splice(i, 1);
                    this.error_validation['bank_accounts'].splice(i, 1);
                } else {
                    this.fi_config = {
                        show: true,
                        title: 'Delete',
                        message: 'ລົບບັນຊີທະນາຄານລົ້ມເຫຼວ',
                        buttons: [
                            {
                                text: 'ຕົກລົງ',
                                action: () => {
                                    this.fi_config['show'] = false;
                                }
                            }
                        ]
                    }
                }
            });
          }
      },
      validateType(){
          if(!this.customer_info['customerType'].trim()){
              if(this.error_validation['type'].length == 0){
                  this.error_validation['type'].push('ເລືອກປະເພດລູກຄ້າ');
              }
              return false;
          }  else if(this.error_validation['type'].length > 0) {
              this.error_validation['type'].pop();
          }
          this.getAClasses();
          this.aclassSelection({});
          return true;
      },
    validateStaffNote(){
        if(!this.customer_info['staffNote'].trim()){
            if(this.error_validation['staff_note'].length == 0){
            this.error_validation['staff_note'].push('ຄຳຄິດເຫັນຂອງພະນັກງານຫ້າມວ່າງ');
            }
            return false;
        } else if(this.error_validation['staff_note'].length > 0) {
            this.error_validation['staff_note'].pop();
        }
        return true;
    },
    validateAClass(){
        if(!this.customer_info['accountClass']){
            if(this.error_validation['aclass'].length == 0){
            this.error_validation['aclass'].push('ເລືອກໄລຍະຮັບດອກເບ້ຍ');
            }
            return false;
        } else if(this.error_validation['aclass'].length > 0) {
            this.error_validation['aclass'].pop();
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
    getDocumentFiles($event){
        this.new_files = [];
        var files = $event['target']['files'];
        for(var i = 0; i < files.length; i++){
            this.new_files.push(files[i]);
        }
    },
    removeFile(i){
        this.new_files.splice(i, 1);
    },
    deleleFile(i,doc){
        ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/delete/document', doc, ( error, result ) => {
            if(result) {
                this.document_files.splice(i, 1);
            }else {
                this.fi_config = {
                        show: true,
                        title: 'Delete',
                        message: 'ລົບຟາຍລ໌ເອກະສານລົ້ມເຫຼວ',
                        buttons: [
                            {
                                text: 'ຕົກລົງ',
                                action: () => {
                                    this.fi_config['show'] = false;
                                }
                            }
                        ]
                    }
            }
        });
    },
    dropdownAcive(aclass){
          if(this.customer_info['accountClass']){
              if(this.customer_info['accountClass'] == aclass['accountClass']){
                  return "fi-dropdown-active";
              }
          }
          return "";
      },
    changeCurrencyValue(){
        if(this.customer_info['currencyId'].trim()){
            for(var i = 0; i < this.currencies.length; i++){
                if(this.currencies[i]['currencyId'] == this.customer_info['currencyId'].trim() ){
                    for(var key in this.currencies[i]) { 
                        this.customer_info[key] = this.currencies[i][key];
                    }
                    break;
                }
            }
        }
         this.validateCurrency();
         this.getMaxFlexibleInterest();
         this.getGeneralInterest();
    },
    changeDepositAge(){
        if(this.customer_info['depositType'].trim()){
            for(var i=0; i < this.depositTypes.length; i++){
                if(this.depositTypes[i]['typeId'] == this.customer_info['depositType'].trim()){
                    this.customer_info['depositTypeName'] = this.depositTypes[i]['typeName'];
                    this.customer_info['depositTotalDays'] = this.depositTypes[i]['totalDays'];
                    break;
                }
            }
        }
        this.customer_info['accountClass'] = '';
        this.customer_info['interestChosen'] = '';
        this.getAClasses();
        this.validateDepositAge();
        this.getMaxFlexibleInterest();
        this.getGeneralInterest();
      },
    validateCurrency(){
          // console.log('In')
          if(!this.customer_info['currencyId'].trim()){
              if(this.error_validation['currency'].length == 0){
                  this.error_validation['currency'].push('ເລືອກສະກຸນເງິນ');
              }
              return false;
          }  else if(this.error_validation['currency'].length > 0) {
              this.error_validation['currency'].pop();
          }
          return true;
      },
    getMaxFlexibleInterest(){
        if(this.validateCustomerDepositAmount() && this.validateCurrency() && this.validateDepositAge()){
            ds.rpc.make('/bcel/chat/api/flexible/interest/max/flexible', { 
                currencyId:  this.customer_info['currencyId'].trim(), 
                customerDeposit: this.customer_info['depositAmount'].trim().replace(/\./g,''),
                depositTypeId: this.customer_info['depositType'].trim()
            }, ( error, result ) => {
                // console.log(result)
                if(error){
                    this.customer_info['interestFlexible'] = 0;
                    this.customer_info['interestFlexibleId'] = '';
                } else{
                    if(result['maxFlexible']) {
                        this.customer_info['interestFlexible'] = result['maxFlexible'];
                        this.customer_info['interestFlexibleId'] = result['flexibleInterestId'];
                    } else {
                        this.customer_info['interestFlexible'] = 0;
                        this.customer_info['interestFlexibleId'] = '';
                    }
                }
            });
        }
    },
    changeDepositAmountValue(){
        this.getMaxFlexibleInterest()
      },
    validateCustomerDepositAmount(){
        if(this.customer_info['depositAmount'].trim()){
            if(this.error_validation['deposit_amount'].indexOf('ເງິນຝາກຫ້າມວ່າງ') >= 0) {
                this.error_validation['deposit_amount'].splice(this.error_validation['deposit_amount'].indexOf('ເງິນຝາກຫ້າມວ່າງ'));
            }
            var floating = this.customer_info['depositAmount'].trim().split(',')
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
            this.customer_info['depositAmount'] = Number(amount).toLocaleString().replace(/,/g, '.');
            this.customer_info['depositAmount'] += (floating.length == 2)?',' + floating[1]:'';
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
    validateCurrency(){
          if(!this.customer_info['currencyId'].trim()){
              if(this.error_validation['currency'].length == 0){
                  this.error_validation['currency'].push('ເລືອກສະກຸນເງິນ');
              }
              return false;
          }  else if(this.error_validation['currency'].length > 0) {
              this.error_validation['currency'].pop();
          }
          return true;
      },
      validateDepositAge(){
          if(!this.customer_info['depositType'].trim()){
              if(this.error_validation['deposit_age'].length == 0){
                this.error_validation['deposit_age'].push('ເລືອກໄລຍະຝາກເງິນ');
              }
              return false;
          } else if(this.error_validation['deposit_age'].length > 0) {
              this.error_validation['deposit_age'].pop();
          }
          return true;
      },
      validateName(){
          if(!this.customer_info['customerName'].trim()){
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
          if(!this.customer_info['customerOccupation'].trim()){
              if(this.error_validation['occupation'].length == 0){
                this.error_validation['occupation'].push('ອາຊີບລູກຄ້າຫ້າມວ່າງ');
              }
              return false;
          } else if(this.error_validation['occupation'].length > 0) {
              this.error_validation['occupation'].pop();
          }
          return true;
      },
      validateTel(){
          if(!this.customer_info['customerTel'].trim()){
              if(this.error_validation['tel'].length == 0){
                  this.error_validation['tel'].push('ເບີໂທລະສັບຫ້າມວ່າງ');
              }
              return false;
          }  else if(this.error_validation['tel'].length > 0) {
              this.error_validation['tel'].pop();
          }
          return true;
      },
    getGeneralInterest(){
          if(this.validateCustomerDepositAmount() && this.validateCurrency() && this.validateDepositAge() && this.customer_info['accountClass']){
             ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_info['currencyCode'].trim(), acClass: this.customer_info['accountClass'], }, ( error, result ) => {
                if(error){
                    this.customer_info['normalInterest'] = 0;
                } else{
                    if(result){
                        this.customer_info['normalInterest'] = result['interest'];
                    } else {
                        this.customer_info['normalInterest'] = 0;
                    }
                }
                //this.customer_info['customerInterest'] = this.customer_info['normalInterest'].toString();
            });
          } else{
              this.customer_info['normalInterest'] = 0;
                //this.customer_info['customerInterest'] = "0";
          }
      },
    getAClasses(){
        if(this.customer_info['depositType'].trim()){
            ds.rpc.make('/bcel/chat/api/flexible/interest/aclass', { depositAge:  this.customer_info['depositType'].trim(), customerType: this.customer_info['customerType']}, ( error, result ) => {
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
      getEarningPerYear(key){
        if(this.customer_info['depositAmount']){
            var amount1 = this.customer_info['depositAmount'].toString().replace(/\./g,'');
            var amountFloat = amount1.replace(/,/g,'.');
            if(!isNaN(amountFloat) && this.customer_info['currencyCode'] && this.customer_info['depositType']){
                var interest = amountFloat * (this.customer_info[key] / 100) * (this.customer_info['depositTotalDays'] / 360);
                return interest.toLocaleString(undefined,{'minimumFractionDigits':1,'maximumFractionDigits':3})
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    },
    aclassSelection(aclass){
        if(aclass['accountClass']){
            this.customer_info['accountClass'] = aclass['accountClass'];
            this.customer_info['interestChosen'] = aclass['descriptionLao'];
        } else {
             this.customer_info['accountClass'] = '';
            this.customer_info['interestChosen'] = '';
        }
        this.validateAClass();
        this.getGeneralInterest();
        this.show = false;
      },
      backRouter() {
          this.$router.back();
      },
      getExceededOutFlexible() {
          try{
              var customer_interest = parseFloat(this.customer_info['customerInterest']);
            var max_interest = parseFloat(this.customer_info['normalInterest']) + parseFloat(this.customer_info['interestFlexible']);
            if((customer_interest > max_interest) && (this.customer_info['normalInterest'] > 0)){
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
            var customer_interest = parseFloat(this.customer_info['customerInterest']);
            var normal_interest = parseFloat(this.customer_info['normalInterest']);
            var max_interest = normal_interest + parseFloat(this.customer_info['interestFlexible']);
            if((customer_interest <= max_interest) && (customer_interest > normal_interest) && (this.customer_info['normalInterest'] > 0) && (this.customer_info['interestFlexible'] > 0)){
                return (customer_interest - normal_interest).toLocaleString();
            } else {
                return 0
            }
          } catch(e) {
              return 0;
          }
      },
    cancleCommentDialog(){
        this.editComment = '';
        this.errorMessage = '';
        this.showComment = false;
    },
    showCommentDialog(){
        var validate = (
              this.validateName() && 
              this.validateOccupation() && 
              this.validateTel() &&  
              this.validateAccounts() && 
              this.validateCustomerDepositAmount() &&
              this.validateCurrency() &&
              this.validateDepositAge() && 
              this.validateAClass() &&
              this.validateStaffNote()
            )
        if(validate) {
            this.showComment = true;
        } else {
            this.validateName(); 
              this.validateOccupation(); 
              this.validateTel();
              this.validateAccounts(); 
              this.validateCustomerDepositAmount();
              this.validateCurrency();
              this.validateDepositAge(); 
              this.validateAClass();
              this.validateStaffNote()
        }
    },
      getRelationData(){
        ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/document/attach', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
            if(result){
                this.document_files = result;
                this.new_files = [];
            }
        });
        ds.rpc.make('/bcel/api/flexible/interest/edit/notification', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
            if(result) {
                this.editResponse = result;
            }
        });
      },
      saveNewData(){
        /*var validate = (
            this.validateName() && 
            this.validateOccupation() && 
            this.validateTel() &&  
            this.validateAccounts() && 
            this.validateCustomerDepositAmount() &&
            this.validateCurrency() &&
            this.validateDepositAge() && 
            this.validateAClass() &&
            this.validateStaffNote()
        )
        if(validate) {
            this.fi_config = {
                show: true,
                title: 'Confirm',
                message: 'ບັນທືກຂໍ້ມູນແທ້ບໍ',
                buttons: [
                    {
                        text: 'ຍົກເລີກ',
                        action: () => {
                            this.fi_config['show'] = false;
                        }
                    }, 
                    {
                        text: 'ຕົກລົງ',
                        action: () => {
                            this.fi_config['show'] = false;
                            if(this.new_files.length > 0){
                                const formData = new FormData();
                                for(var i = 0; i < this.new_files.length; i++){
                                    formData.append('files',this.new_files[i]);
                                }
                                axios.post(address['serverIp'] + '/bcel/api/flexible/interest/file/upload',
                                    formData
                                ,{
                                    headers: {
                                        'content-type': 'multipart/form-data'
                                    }
                                }).then((response) => {
                                    var requestData = {};
                                    Object.assign(requestData, this.customer_info);
                                    requestData['files'] = response['data']['data'];
                                    requestData['user'] = this.$store.getters['flexible_interest_module/user'];
                                    this.updateRequirement(requestData);
                                }).catch((error) => {
                                    this.fi_config = {
                                        show: true,
                                        title: 'Upload',
                                        message: 'ອັບໂຫຼດຟາຍລ໌ເອກະສານລົ້ມເຫຼວ',
                                        buttons: [
                                            {
                                                text: 'ຕົກລົງ',
                                                action: () => {
                                                    this.fi_config['show'] = false;
                                                }
                                            }
                                        ]
                                    }
                                });
                            } else {
                                this.customer_info['files'] = [];
                                this.customer_info['user'] = this.$store.getters['flexible_interest_module/user'];
                                this.updateRequirement(this.customer_info);
                            }
                        }
                    }
                ]
            }
        } else {
            this.validateName(); 
              this.validateOccupation(); 
              this.validateTel();
              this.validateAccounts(); 
              this.validateCustomerDepositAmount();
              this.validateCurrency();
              this.validateDepositAge(); 
              this.validateAClass();
              this.validateStaffNote()
        }*/
        if(this.editComment.trim()){
            this.customer_info['editComment'] = this.editComment.trim();
            this.showComment = false;
            // this.fi_config['show'] = false;
            if(this.new_files.length > 0){
                const formData = new FormData();
                for(var i = 0; i < this.new_files.length; i++){
                    formData.append('files',this.new_files[i]);
                }
                axios.post(address['serverIp'] + '/bcel/api/flexible/interest/file/upload',
                    formData
                ,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }).then((response) => {
                    var requestData = {};
                    Object.assign(requestData, this.customer_info);
                    requestData['files'] = response['data']['data'];
                    requestData['user'] = this.$store.getters['flexible_interest_module/user'];
                    this.updateRequirement(requestData);
                }).catch((error) => {
                    this.fi_config = {
                        show: true,
                        title: 'Upload',
                        message: 'ອັບໂຫຼດຟາຍລ໌ເອກະສານລົ້ມເຫຼວ',
                        buttons: [
                            {
                                text: 'ຕົກລົງ',
                                action: () => {
                                    this.fi_config['show'] = false;
                                }
                            }
                        ]
                    }
                });
            } else {
                this.customer_info['files'] = [];
                this.customer_info['user'] = this.$store.getters['flexible_interest_module/user'];
                this.updateRequirement(this.customer_info);
            }
        } else {
            this.errorMessage = 'ຄຳຄິດເຫັນຕອບຄືນຫ້າມວ່າງ'
        }
      },
    updateRequirement(data){
        ds.rpc.make("/bcel/chat/api/flexible/interest/customer/requirement/update", data,(error, result) => {
            if(result){
                if(this.new_files.length > 0){
                    this.getDocumentAttach();
                }
                this.fi_config = {
                    show: true,
                    title: 'Update',
                    message: 'ບັນທືກຂໍ້ມູນສຳເລັດແລ້ວ',
                    buttons: [
                        {
                            text: 'ຕົກລົງ',
                            action: () => {
                                this.backRouter();
                                this.fi_config['show'] = false;
                            }
                        }
                    ]
                }
            } else {
                this.fi_config = {
                    show: true,
                    title: 'Update',
                    message: 'ບັນທືກຂໍ້ມູນລົ້ມເຫຼວ',
                    buttons: [
                        {
                            text: 'ຕົກລົງ',
                            action: () => {
                                this.fi_config['show'] = false;
                            }
                        }
                    ]
                }
            }
        });
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
.fi-account-valid{
    color: red;
    font-size: 10px;
}
.fi-account-group{
    position: relative;
    border: 0.1px rgb(250, 176, 176) solid;
    padding: 0px 10px 5px 10px;
    margin-top: 5px;
    margin-bottom: 10px;
}
.fi-account-title {
    margin-top: -10px;
    background: white;
    width: 75px;
    font-size: 15px;
}
.fi-account-input, .fi-input-title {
    font-size: 13px;
}
.margin-space{
    margin: 1px;
}
.fi-response-edit-body{
    position: relative;
}
.fi-inverst-edit-background {
  top: 0px;
  left: 0px;
  z-index: 999999999999999999999999999999999999999999998;
  position: fixed;
  background: black;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.fi-edit-dialog {
    border-radius: 2px;
    top: 50%;
    margin-top: -100px;
    left: 50%;
    margin-left: -150px;
    position: fixed;
    color: rgb(165, 164, 164);
    z-index: 999999999999999999999999999999999999999999999;
    background: white; //linear-gradient(to bottom right, rgba(243, 195, 189, 0.918) 10%, rgb(202, 86, 94) 200%);
    border: 1px lightgrey solid;
    -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
        -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
            box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
    padding: 5px;
    width: 300px;
    min-height: 120px;
}
.fi-edit-header, .fi-edit-body {
    text-align: left;
}
.fi-edit-footer{
    text-align: right;
}
.fi-btn-edit-ok{
    margin-left: 5px;
    background: #20A816;
    color: white;
    border: none;
    border-radius: 3px;
    width: 5rem;
    font-size: 1rem;
}
.fi-btn-edit-cancle{
    margin-left: 5px;
    background: rgb(250, 127, 123);
    color: white;
    border: none;
    border-radius: 3px;
    width: 5rem;
    font-size: 1rem;
}

.delIcon{
    cursor: pointer;
    position: absolute;
    font-size: 14px;
    color: red;
    right: 3px;
    top: -3px;
}
.delIcon:hover{
    color: rgb(255, 115, 0);
}
.fi-add-pannel{
    margin-top: -18px;
    margin-right: -7px;
}
.fi-add {
    cursor: pointer;
    color: rgb(139, 139, 139);
    font-size: 25px;
    font-weight: bold;
}
.fi-add:hover{
    color: rgb(211, 209, 209);
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
  top: 3px;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: rgb(134, 134, 134);
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.fi-container:hover input ~ .fi-checkmark {
  background-color: rgb(192, 190, 190);
}

/* When the radio button is checked, add a blue background */
.fi-container input:checked ~ .fi-checkmark {
  background-color: rgb(192, 190, 190);
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
 	top: 3px;
	left: 3px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #20A816;
}
.closeIcon{
    cursor: pointer;
    color: red;
}
.danger{
    font-size: 12px;
    color: red;
}
strong, th, td {
    color: rgb(88, 88, 88);
}
.fi-expand {
    cursor: pointer;
}
.fi-expand:hover {
    color: rgb(189, 192, 194);
}
.PENDING{
    color: #FB8C00;
    font-weight: bold;
    font-family: Helvetica;
    text-shadow: 0 1px 0 white, 0 2px 0 white, 0 3px 0 #FB8C00, 0 4px 0 #FB8C00;
}
.REJECTED{
    color: red;
}
.APPROVED{
    color: rgb(9, 192, 9);
}
img{
    width: 100%;
    padding-top: 5px;
}
.fi-topic {
    font-size: 25px;
}
.fi-title {
    font-size: 18px;
    padding-right: 10px;
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
.fi-btn-cancle {
    background: white; 
    border: 1px #C72B2C solid;
    border-radius: 3px;
    width: 8rem;
    font-size: 1.2rem;
    color: #C72B2C; 
}
.fi-btn-cancle:hover{
    color: #A42C35;
    border: 2px #A42C35 solid;
}
.fi-card{
    padding: 1rem;
    border: 1px lightgrey solid;
    -webkit-box-shadow: -2px 3px 14px -7px rgba(0,0,0,0.52);
    -moz-box-shadow: -2px 3px 14px -7px rgba(0,0,0,0.52);
    box-shadow: -2px 3px 14px -7px rgba(0,0,0,0.52);
    -webkit-transition: box-shadow 0.5s;  /*For Safari 3.1 to 6.0 */
    transition: box-shadow 0.5s;
    background: white;
}
// .fi-card:hover{
//     border: 1px lightgrey solid;
//     -webkit-box-shadow: 0.5px 0.5px 0.5px 1px lightgrey;
// 	   -moz-box-shadow: 0.5px 0.5px 0.5px 1px lightgrey;
// 	        box-shadow: 0.5px 0.5px 0.5px 1px lightgrey;
//     padding: 1rem;

// }
.fi-edit-content{
    padding: 0.5rem;
    border: 1px lightgrey solid;
    -webkit-box-shadow: inset 1px 1px 6px 0px rgb(247, 187, 159);
    -moz-box-shadow: inset 1px 1px 6px 0px rgb(247, 187, 159);
    box-shadow: inset 1px 1px 6px 0px rgb(247, 187, 159);
    transition: box-shadow 0.5s;
    background: white;
}
strong{
    color: gray;
}
input:not([type='file']), textarea, select{
    width: 100%;
    padding-left: 1px;
    background: transparent;
    color: rgb(66, 64, 64);
    border: none;
    padding-right: 5px;
}
._valid{
    width: 100%;
}
input:focus, textarea:focus, button:focus, select:focus{
    outline: none;
}
select:invalid {
  color: #D3D3D3;
}
input:not([type='file']):invalid, textarea:invalid, select:invalid, .fi-invalid {
    border-bottom: 2px rgba(197, 196, 196, 0.849) dotted;
}
input:focus, input:not([type='file']):valid, .fi-valid, textarea:focus, textarea:valid, select:valid, ._valid{
    border-bottom: 2px rgba(248, 204, 201, 0.849) dotted;
}
input.fi-account-input:invalid{
    border-bottom: 1px rgba(197, 196, 196, 0.849) dotted;
}
input.fi-account-input:focus, input.fi-account-input:valid{
    border-bottom: 1px rgba(248, 204, 201, 0.849) dotted;
}
select option {
  color: rgb(66, 64, 64);
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
.product-name{
  color: rgb(173, 173, 173);
}
.interest-title{
    font-size: 3rem;
}
input[type="file"]{
    font-size: 12px;
    color: #C72B2C;
}

div.fi-dropdown-panel{
    z-index: 2;
}
select, div.fi-dropdown-panel>input {
    cursor: pointer;
}
// div.fi-dropdown-panel>input{
//     color: white;
//     width: 100%;
//     background: transparent;
//     border: none;
//     padding-right: 5px;
// }
ul.fi-dropdown{
    width: 95%;
    position: absolute;
    border: 2px rgb(126, 188, 250) solid;
    color: rgb(66, 64, 64);
    background: white;
    height: 150px;
    overflow-y: auto;
    overflow-x: auto;
    padding: 0px;
    z-index: 2;
}
ul.fi-dropdown>li{
    padding-left: 5px;
    padding-right: 5px;
}
ul.fi-dropdown>li:hover, ul.fi-dropdown>li:active{
    background: #1E90FF;
    cursor: context-menu;
}
ul>li.fi-placehoder{
  color: #D3D3D3;
}
.fi-dropdown-active{
    background: #1E90FF;
}

span.fi-dropdown-icon{
    position: absolute;
    font-size: 9px;
    top: 30px;
    right: 17px;
    cursor: pointer;
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

@media only screen and (max-width: 767px) {
    h2{ 
        font-size: 23px;
    }
  .fi-topic{
      font-size: 20px;
  }
}
@media only screen and (max-width: 500px) {
    .fi-btn-next, .fi-btn-cancle{
        font-size: 16px;
        width: 6rem;
    }
}

@media print {
  .hide-on-print-mode {
    display: none;
  }
}

</style>