<template>
    <div class="container">
        <div v-if="showChooseUser">
            <div class="fi-inverst-edit-background"></div>
            <div class="fi-edit-dialog">
                <div class="fi-edit-header">
                    <h5>ເລືອກຄະນະອະນຸມັດ</h5>
                    <div class="fi-check-all">
                      <label class="fi-checkbox-container" title="ເລືອກທັງໝົດ">
                        <input type="checkbox" v-model="chooseAll" @change="changeCheckAll">
                        <span class="fi-checkbox-mark"></span>
                      </label>
                    </div>
                </div>
                <div class="fi-edit-body">
                  <div class="fi-dropdown-panel">
                    <ul id="interest" class="text-left fi-dropdown">
                        <li v-for="(user, index) in recieveUserList" :key="index">
                          <label class="fi-checkbox-container">{{user['fullName']}}
                            <input type="checkbox" v-model="selectedUser" :value="user['userId']" @change="addOrRemoveUser">
                            <span class="fi-checkbox-mark"></span>
                          </label>
                        </li>
                    </ul>
                  </div>
                  <small class="danger" v-if="errorMessage">* {{errorMessage}}</small>
                </div>
                <div class="fi-edit-footer">
                    <button type="button" class="fi-btn-edit-cancle" @click="cancleSendApproveRequest()">ຍົກເລີກ</button>
                    <button type="button" class="fi-btn-edit-ok" @click="sendApproveRequest()">ຕົກລົງ</button>
                </div>
            </div>
        </div>
        <fi_dialog :config="fi_config"/>
        <fi_approve_dialog :config="approve_config"/>
        <div class="row hide-on-print-mode">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left">
                <div class="fi-card">
                    <strong class="fi-topic">ຂໍ້ມູນສ່່ວນຕົວຂອງລູກຄ້າ</strong>
                    <div class="fi-box">
                        <div class="row">
                            <div class="col-12">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th class="fi-title">ຊື່ລູກຄ້າ:</th>
                                            <td>{{customer_info['name']}}</td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ເບີໂທ:</th>
                                            <td>{{customer_info['tel']}}</td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ອາຊີບ:</th>
                                            <td>{{customer_info['occupation']}}</td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ເລກບັນຊີທະນາຄານ:</th>
                                            <td>
                                              <span v-if="!customer_info['bank_accounts'].length">................</span>
                                              <span v-for="(account, index) in customer_info['bank_accounts']" :key="index">
                                                  - {{account['acc_no']}}{{account['desc']?':':''}}
                                                  <small v-if="account['desc']"> {{account['desc']}}</small>
                                                  <br>
                                              </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-12">
                                <strong class="fi-title">ຂໍ້ມູນອື່ນໆ: </strong> 
                                <br/>
                                <span>&nbsp&nbsp&nbsp&nbsp </span>
                                <span>{{customer_info['more_info']}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fi-card">
                    <div class="row">
                        <div class="col-12">
                            <strong class="fi-topic">ຂໍ້ມູນເງິນຝາກຂອງລູກຄ້າ</strong>
                        </div>
                        <div class="col-12">
                            <div class="fi-box">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th class="fi-title">ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ:</th>
                                            <td>{{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['deposit_amount']}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}</td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ສະກຸນເງິນ:</th>
                                            <td>{{customer_info['currency']['currencyNameLa']}} ({{customer_info['currency']['currencyCode']}})</td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ໄລຍະຝາກ:</th>
                                            <td>{{customer_info['deposit_age']['typeName']}}</td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ທາງເລືອກດອກເບ້ຍ:</th>
                                            <td>{{customer_info['aclass']['descriptionLao']}}</td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ອັດຕາດອກເບ້ຍປົກກະຕິ:</th>
                                            <td>{{customer_info['normal_interest']}}% 
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ/ປີ:</th>
                                            <td>{{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['earning_general_interest'].toLocaleString(undefined,{'minimumFractionDigits':1,'maximumFractionDigits':3})}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ດອກເບ້ຍຍືດຍຸ່ນສູງສຸດ:</th>
                                            <td>{{customer_info['max_flexible']}}% 
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ອັດຕາດອກເບ້ຍທີ່ລູກຄ້າຕ້ອງການ:</th>
                                            <td>
                                                {{customer_info['customer_interest']}}% 
                                                <span style="color: red;" v-if="getExceededOutFlexible()"> (ຍືດຍຸນນອກກອບ:​ {{getExceededOutFlexible()}}%)</span>
                                                <span style="color: #20A816;" v-if="getExceededInFlexible()"> (ຍືດຍຸນໃນກອບ:​ {{getExceededInFlexible()}}%)</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ:</th>
                                            <td>{{(customer_info['currency']['currencyCode'] == 'USD')?customer_info['currency']['currencyUnit']:''}}{{customer_info['earning_customer_interest'].toLocaleString(undefined,{'minimumFractionDigits':1,'maximumFractionDigits':3})}}{{(customer_info['currency']['currencyCode'] != 'USD')?customer_info['currency']['currencyUnit']:''}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fi-card">
                    <strong class="fi-topic">ຄຳຄິດເຫັນຂອງພະນັກງານ ແລະ ເອກະສານຕິດຄັດຂອງລູກຄ້າ</strong>
                    <div class="fi-box">
                        <div class="row">
                            <div class="col-12">
                                <strong class="fi-title">ຄຳຄິດເຫັນຂອງພະນັກງານ: </strong> 
                                <br/>
                                <span>&nbsp&nbsp&nbsp&nbsp </span>
                                <span class="fi-text">{{customer_info['staff_note']}}</span>
                            </div>
                            <div class="col-12">
                                <strong class="fi-title">ເອກະສານປະກອບຂອງລູກຄ້າ: </strong> 
                                <br/>
                                <span>&nbsp&nbsp&nbsp&nbsp </span>
                                <span class="fi-text">{{customer_info['documents']}}</span>
                                <br/>
                                <strong class="fi-title">ຟາຍລ໌ເອກະສານ</strong> <strong class="fi-title" style="color: red;" v-if="checkDocumentFiles()">*</strong> <strong class="fi-title">: </strong> 
                                <input type="file" multiple accept="image/jpg, image/jpeg, image/png, application/pdf, application/msword, application/vnd.ms-excel" required @change="getDocumentFiles($event)">
                                <ul class="fi-text">
                                    <li style="color: red;" v-if="checkDocumentFiles()">[ ເລືອກຟາຍລ໌ເອກະສານປະກອບ <span style="font-size: 12px;">(ເລືອກໄດ້ຫຼາຍຟາຍລ໌)</span> ]</li>
                                    <li v-for="(file, index) in customer_info['document_files']" :key="index">{{file['name']}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fi-card">
                  <strong class="fi-topic fi-expand" @click="showProducts = !showProducts">&#9660; ຜະລິດຕະພັນທີ່ລູກຄ້າໃຊ້ບໍລິການຢູ່ ທຄຕລ</strong>
                  <hr>
                  <div  v-if="showProducts">
                    <div class="fi-account" v-for="(product, index) in products" :key="index">
                      <div class="fi-account-detail text-left">
                        <!-- <label style="width: 10px; height: 10px; border-radius: 50%; background: gray; margin-bottom: 2px;"></label> -->
                        <h4 class="fi-account-title">
                          <label style="width: 10px; height: 10px; border-radius: 50%; background: gray; margin-bottom: 2px;"></label> 
                          ເລກບັນຊີ: <strong>{{product['acc_no']}}</strong>
                        </h4>
                        <small v-if="product['desc']">&nbsp&nbsp&nbsp&nbsp {{product['desc']}}</small>
                      </div>
                      <div class="products" :class="'product'+(index+1)">
                        <div class="text-left" v-html="products[index]['list_html']"> </div>
                        <hr>
                      </div>
                      <hr>
                    </div>
                  </div>
                  
                </div>
            </div> 
            <div class="col-12" v-if="customer_info['customer_signature']">
              <div class="row justify-content-end">
                <div class="col-4 col-sm-3 col-lg-2 text-center">
                  <strong>ລາຍເຊັນລູກຄ້າ</strong>
                  <img :src="customer_info['customer_signature']" alt="Signature" width="30">
                </div>
              </div>
            </div>
            <div class="col-6 text-left">
                <button class="fi-btn-next" type="button" @click="backwardProgress()">&#8592;</button>
            </div>
            <div class="col-6 text-right">
                    <button class="fi-btn-next" type="button" @click="requestApprove()">ຂໍອະນຸມັດ</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ds from '@/helper/ds.js'
import address from '@/helper/server_address.js'
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/flexible_interest/fonts/phetsarath_font.css'
import fi_dialog from '@/components/flexible-interest/fi_dialog.vue'
import fi_approve_dialog from '@/components/flexible-interest/fi_approve_dialog.vue'
export default {
  name: 'document_attach',
  components: {
    fi_dialog,
    fi_approve_dialog
  },
  data(){
      return {
        showProducts: false,
        showChooseUser: false,
        chooseAll: false,
        selectedUser: [],
        errorMessage: '',
        customer_info: this.$store.getters['flexible_interest_module/requirement'],
        products:  this.$store.getters['flexible_interest_module/requirement']['bank_accounts'],
        recieveUserList: [],
        approve_config: {
            show: false,
            okEvt: () => {
                this.approve_config['show'] = false;
            },
            cancleEvt: () => {
                this.approve_config['show'] = false;
            }
        },
        fi_config: {
            show: false,
            title: 'Confirm',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'Cancle',
                    action: () => {
                        console.log("Cancle")
                        this.fi_config['show'] = false;
                    }
                },
                {
                    text: 'OK',
                    action: () => {
                        console.log('OK');
                        this.fi_config['show'] = false;
                    }
                }
            ]
        }
      }
  },
  created() {
    //console.log(this.products)
    // for(var i = 0; i < this.products.length; i++){
    //   this.showProducts.push(false)
    // }
    if(window.sessionStorage.getItem('actionProgress')){
      var stepAction = JSON.parse(window.sessionStorage.getItem('actionProgress'));
      if(!stepAction[4]['active']){
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
      // recieveUserList
      ds.rpc.make('/bcel/api/flexible/interest/recieve/users', { userId: this.$store.getters['flexible_interest_module/user']}, ( error, result ) => {
        if(result)
        {
          this.recieveUserList = result;
        }
      });
  },
  methods: {
    backwardProgress(){
        this.$router.push({
          path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/document/attach'
        })
    },
    addOrRemoveUser(){
      if(this.recieveUserList.length > 0){
        this.errorMessage = ''
      } else {
        this.errorMessage = 'ເລືອກຄະນະອະນຸມັດຢ່າງໜ້ອຍ 1 ທ່ານ'
      }
      if(this.selectedUser.length == this.recieveUserList.length) {
        this.chooseAll = true;
      } else {
        this.chooseAll = false;
      }
    },
    changeCheckAll(){
      if(this.chooseAll){
        this.selectedUser = [];
        for(var i=0; i<this.recieveUserList.length; i++){
          this.selectedUser.push(this.recieveUserList[i]['userId'])
        }
        this.errorMessage = ''
      } else {
        this.errorMessage = 'ເລືອກຄະນະອະນຸມັດຢ່າງໜ້ອຍ 1 ທ່ານ'
        this.selectedUser = [];
      }
    },
      hideShow(i){
        this.showProducts[i] = !this.showProducts[i];
      },
      getDocumentFiles($event){
          this.customer_info['document_files'] = $event['target']['files'];
      },
      checkDocumentFiles(){
          if((this.customer_info['document_files'].length <= 0) && (this.customer_info['documents'].trim()))
            return true;
          else 
            return false;
      },
      validateDocumentFiles(){
          if(this.customer_info['document_files'].length <= 0){
              return false;
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
      sendApproveRequest(){
        if(this.selectedUser.length > 0) {
          this.approve_config['show'] = false;
          this.showChooseUser = false;
          this.fi_config = {
            show: true,
            title: 'ຢືນຢັນ',
            message: 'ສົ່ງຂໍອະນຸມັດແທ້ບໍ?',
            buttons: [
                {
                    text: 'ຍົກເລີກ',
                    action: () => {
                      this.chooseAll = false;
                      this.selectedUser = []
                      this.fi_config['show'] = false;
                      this.approve_config['show'] = true;
                    }
                },
                {
                    text: 'ຕົກລົງ',
                    action: () => {
                        this.fi_config['show'] = false;
                        this.customer_info['recieve_users'] = this.selectedUser;
                        if(this.customer_info['document_files'].length > 0){
                            const formData = new FormData();
                            for(var i = 0; i < this.customer_info['document_files'].length; i++){
                                formData.append('files',this.customer_info['document_files'][i]);
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
                                requestData['document_files'] = response['data']['data'];
                                requestData['user'] = this.$store.getters['flexible_interest_module/user'];
                                ds.rpc.make("/bcel/chat/api/flexible/interest/customer/requirement/insert", requestData,(error, result) => {
                                    this.approve_config['show'] = false;
                                    if(result){
                                        if(result['success']){
                                            this.customer_info['referenceId'] = (result['reference_id'] != 'NO') ? result['reference_id'] : undefined;
                                            window.sessionStorage.setItem('requirement', JSON.stringify(this.customer_info));
                                            this.fi_config = {
                                                show: true,
                                                title: 'Successfully',
                                                message: result['message'],
                                                buttons: [
                                                    {
                                                        text: 'OK',
                                                        action: () => {
                                                            this.fi_config['show'] = false;
                                                            this.selectedUser = [];
                                                            this.$router.push({path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'});
                                                        }
                                                    }
                                                ]
                                            }
                                            this.$root.$emit("resetDefault");
                                        } else {
                                            this.fi_config = {
                                                show: true,
                                                title: 'Error',
                                                message: result['message'],
                                                buttons: [
                                                    {
                                                        text: 'OK',
                                                        action: () => {
                                                            this.fi_config['show'] = false;
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    } else {
                                        this.fi_config = {
                                            show: true,
                                            title: 'Error',
                                            message: "ເກີດຂໍ້ຜິດພາດໃນຂະນະສົ່ງສົ່ງຂໍ້ມູນ",
                                            buttons: [
                                                {
                                                    text: 'OK',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                })
                            }).catch((error) => {
                                this.approve_config['show'] = false;
                                this.fi_config = {
                                    show: true,
                                    title: 'Error',
                                    message: 'ເກີດຂໍ້ຜິດພາດໃນຂະນະອັບໂຫຼດຟາຍລ໌',
                                    buttons: [
                                        {
                                            text: 'OK',
                                            action: () => {
                                                this.fi_config['show'] = false;
                                            }
                                        }
                                    ]
                                }
                            })
                        } else {
                            var requestData = {};
                            Object.assign(requestData, this.customer_info);
                            requestData['document_files'] = [];
                            requestData['user'] = this.$store.getters['flexible_interest_module/user'];
                            ds.rpc.make("/bcel/chat/api/flexible/interest/customer/requirement/insert", requestData,(error, result) => {
                                this.approve_config['show'] = false;
                                if(result){
                                    if(result['success']){
                                        this.customer_info['referenceId'] = (result['reference_id'] != 'NO') ? result['reference_id'] : undefined;
                                        window.sessionStorage.setItem('requirement', JSON.stringify(this.customer_info));
                                        this.fi_config = {
                                            show: true,
                                            title: 'Successfully',
                                            message: result['message'],
                                            buttons: [
                                                {
                                                    text: 'OK',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                        this.selectedUser = [];
                                                        this.$router.push({path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'});
                                                    }
                                                }
                                            ]
                                        }
                                        this.$root.$emit("resetDefault");
                                    } else {
                                        this.fi_config = {
                                            show: true,
                                            title: 'Error',
                                            message: result['message'],
                                            buttons: [
                                                {
                                                    text: 'OK',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                } else {
                                    this.fi_config = {
                                        show: true,
                                        title: 'Error',
                                        message: "ເກີດຂໍ້ຜິດພາດໃນຂະນະສົ່ງສົ່ງຂໍ້ມູນ",
                                        buttons: [
                                            {
                                                text: 'OK',
                                                action: () => {
                                                    this.fi_config['show'] = false;
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                        }
                        
                    } 
                }
            ]
          }
        } else {
          this.errorMessage = 'ເລືອກຄະນະອະນຸມັດຢ່າງໜ້ອຍ 1 ທ່ານ'
        }
      },
      cancleSendApproveRequest(){
        this.selectedUser = [];
        this.errorMessage = '';
        this.chooseAll = false;
        this.approve_config['show'] = true;
        this.showChooseUser = false;
      },
      cancleCustomerRequirment(){
          this.fi_config = {
                show: true,
                title: 'Confirm',
                message: 'ຢຶນຢັນ?',
                buttons: [
                    {
                        text: 'ຍົກເລີກ',
                        action: () => {
                            console.log("ບໍ່")
                            this.fi_config['show'] = false;
                        }
                    },
                    {
                        text: 'ຕົກລົງ',
                        action: () => {
                            console.log("ຍົກເລີກ")
                            this.$root.$emit("resetDefault");
                            this.$router.push({
                                path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'
                            });
                            this.fi_config['show'] = false;
                        }
                    }
                ]
            }
        
      },
      requestApprove(){
        this.approve_config = {
            show: true,
            cancleEvt: () => {
                this.cancleCustomerRequirment();
            },
            okEvt: () => {
              this.approve_config['show'] = false;
              this.showChooseUser = true;
            }
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
    padding-top: 5px;
}
.fi-topic {
    font-size: 25px;
}
.fi-title {
    padding-right: 10px;
}
.fi-expand {
    cursor: pointer;
}
.fi-account-title {
  padding: 0px;
  margin: 0px;
}
.danger{
    font-size: 12px;
    color: red;
}
.fi-expand:hover {
    color: rgb(169, 169, 170);
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
    margin-right: 10px;
}
.fi-btn-cancle:hover{
    color: #A42C35;
    border: 2px #A42C35 solid;
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

div.fi-dropdown-panel{
    position: relative;
    background: transparent;
    border: none;
}
ul.fi-dropdown{
    border: 0.3px rgb(126, 188, 250) solid;
    color: rgb(46, 46, 46);
    height: 120px;
    overflow-y: auto;
    overflow-x: auto;
    padding: 0px;
}
ul.fi-dropdown>li{
    padding-left: 5px;
    padding-right: 5px;
}
ul.fi-dropdown>li:hover, ul.fi-dropdown>li:active{
    background: rgb(248, 184, 184);
    cursor: context-menu;
}
.fi-dropdown-active{
    background: rgb(248, 184, 184);
}

/* Checkbox */
.fi-check-all{
  position: absolute;
  top: 5px;
  right: 5px;
}
.fi-checkbox-container {
  display: block;
  position: relative;
  width: 100%;
  padding-left: 30px;
  margin-bottom: 0px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.fi-checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.fi-checkbox-mark {
  position: absolute;
  top: 1px;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

.fi-checkbox-container:hover input ~ .fi-checkbox-mark {
  background-color: rgb(245, 97, 97);
}

.fi-checkbox-container input:checked ~ .fi-checkbox-mark {
  background-color: #C72B2C;
}

.fi-checkbox-mark:after {
  content: "";
  position: absolute;
  display: none;
}

.fi-checkbox-container input:checked ~ .fi-checkbox-mark:after {
  display: block;
}

.fi-checkbox-container .fi-checkbox-mark:after {
  left: 10px;
  top: 5px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
/* Checkbox */

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

.fi-card{
    border: 1px lightgrey solid;
    -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
	   -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
	        box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
    padding: 1rem;
    -webkit-transition: box-shadow 0.5s; /* For Safari 3.1 to 6.0 */
    transition: box-shadow 0.5s;
    background: white
}
.fi-card:hover{
    border: 1px lightgrey solid;
    -webkit-box-shadow: 0.5px 0.5px 0.5px 1px #C72B2C;
	   -moz-box-shadow: 0.5px 0.5px 0.5px 1px #C72B2C;
	        box-shadow: 0.5px 0.5px 0.5px 1px #C72B2C;
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

@media only screen and (max-width: 767px) {
  .fi-topic{
      font-size: 20px;
  }
}
@media only screen and (max-width: 500px) {
    .fi-btn-next, .fi-btn-cancle{
        font-size: 16px;
        width: 5rem;
    }
    .fi-btn-next{
        margin-left: 10px
    }
    .fi-account-title{
      font-size: 20px;
    }
    th, td{
      font-size: 14px;
    }
}
@media only screen and (max-width: 400px) {
    .fi-account-title{
      font-size: 16px;
    }
}

@media print {
  .hide-on-print-mode {
    display: none;
  }
}

</style>