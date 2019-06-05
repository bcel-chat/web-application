<template>
    <div class="container">
        <fi_dialog :config="fi_config"/>
        <fi_report_approve_dialog :config="config"/>
        <div class="row hide-on-print-mode">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <h2><strong>Detail</strong></h2>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left">
                <div class="fi-card">
                    <strong class="fi-topic">ຂໍ້ມູນສ່່ວນຕົວຂອງລູກຄ້າ</strong>
                    <hr>
                    <div>
                        <div class="row">
                            <div class="col-12">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th class="fi-title">ຊື່ລູກຄ້າ:</th>
                                            <td>{{customer_info['customerName']?customer_info['customerName']:'................'}} <small> ({{customer_info['customerTypeDesc']}})</small></td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ເບີໂທ:</th>
                                            <td>{{customer_info['customerTel']?customer_info['customerTel']:'................'}}</td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ອາຊີບ:</th>
                                            <td>{{customer_info['customerOccupation']?customer_info['customerOccupation']:'................'}}</td>
                                        </tr>
                                        <tr v-if="customer_info['bankAccounts']">
                                            <th class="fi-title">ເລກບັນຊີທະນາຄານ:</th>
                                            <td>
                                                <span v-if="!customer_info['bankAccounts'].length">................</span>
                                                <span v-for="(account, index) in customer_info['bankAccounts']" :key="index">
                                                    - {{account['accountNo']}}{{account['description']?':':''}}
                                                    <small v-if="account['description']"> {{account['description']}}</small>
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
                                <span>{{customer_info['customerDetail']?customer_info['customerDetail']:'............................................................'}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fi-card">
                    <strong class="fi-topic">ຂໍ້ມູນເງິນຝາກຂອງລູກຄ້າ</strong>
                    <hr>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th class="fi-title">ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ:</th>
                                    <td>{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{customer_info['depositAmount']?customer_info['depositAmount'].toLocaleString(undefined,{'maximumFractionDigits':3}).replace(/,/g,'.'):0}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}</td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ສະກຸນເງິນ:</th>
                                    <td v-if="customer_info['currencyName']">{{customer_info['currencyName']}} ({{customer_info['currencyCode']}})</td>
                                    <td v-else>................</td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ໄລຍະຝາກ:</th>
                                    <td>{{customer_info['depositTypeName']?customer_info['depositTypeName']:'................'}}</td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ທາງເລືອກດອກເບ້ຍ:</th>
                                    <td>{{customer_info['interestChosen']?customer_info['interestChosen']:'................'}}</td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ອັດຕາດອກເບ້ຍປົກກະຕິ:</th>
                                    <td>{{customer_info['normalInterest']?customer_info['normalInterest']:'0'}}% 
                                    </td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ/ປີ:</th>
                                    <td>{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('normalInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                    </td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ດອກເບ້ຍຍືດຍຸ່ນສູງສຸດ:</th>
                                    <td>{{customer_info['interestFlexible']?customer_info['interestFlexible']:'0'}}% 
                                    </td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ອັດຕາດອກເບ້ຍທີ່ລູກຄ້າຕ້ອງການ:</th>
                                    <td>
                                        {{customer_info['customerInterest']?customer_info['customerInterest']:'0'}}% 
                                        <span style="color: red;" v-if="getExceededOutFlexible()"> (ຍືດຍຸນນອກກອບ:​ {{getExceededOutFlexible()}}%)</span>
                                        <span style="color: #20A816;" v-if="getExceededInFlexible()"> (ຍືດຍຸນໃນກອບ:​ {{getExceededInFlexible()}}%)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ:</th>
                                    <td>{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('customerInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                                <span>&nbsp&nbsp&nbsp&nbsp </span>
                                <span class="fi-text">{{customer_info['staffNote']?customer_info['staffNote']:'........................................................'}}</span>
                            </div>
                            <div class="col-12">
                                <strong class="fi-title">ເອກະສານປະກອບຂອງລູກຄ້າ: </strong> 
                                <br/>
                                <span>&nbsp&nbsp&nbsp&nbsp </span>
                                <span class="fi-text">{{customer_info['documents']?customer_info['documents']:'........................................................'}}</span>
                                <br/>
                                <strong class="fi-title" v-if="document_files.length">ຟາຍລ໌ເອກະສານ:</strong> 
                                
                                    <div v-for="(file, index) in document_files" :key="index">
                                        {{index + 1}}. <a :href="'http://localhost:8081' + file['docUrl']" target="_blank" rel="noopener noreferrer"> {{file['docName']}}</a>
                                        <!-- <iframe :src="'http://localhost:8081' + file['docUrl']" frameborder="0" class="fi-iframe"></iframe> -->
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <h3><strong>ສະຖານະອະນຸມັດ: </strong> <strong :class="customer_info['approveStatus']">{{customer_info['approveStatus']}}</strong></h3>
                        <small v-if="customer_info['approveUserName']" :class="customer_info['approveStatus']">ໂດຍ: {{customer_info['approveUserName']}}</small>
                    </div>
                </div>
                <div class="fi-card">
                    <strong class="fi-topic fi-expand" @click="showProducts = !showProducts">&#9660; ຜະລິດຕະພັນທີ່ລູກຄ້າໃຊ້ບໍລິການຢູ່ ທຄຕລ</strong>
                    <hr>
                    <div  :class="hideAndShow(showProducts)" v-if="showProducts">
                        <div class="fi-account" v-for="(product, index) in products" :key="index">
                            <div class="fi-account-detail text-left">
                                <!-- <label style="width: 10px; height: 10px; border-radius: 50%; background: gray; margin-bottom: 2px;"></label> -->
                                <h4 class="fi-account-title">
                                <label style="width: 10px; height: 10px; border-radius: 50%; background: gray; margin-bottom: 2px;"></label> 
                                ເລກບັນຊີ: <strong>{{product['accountNo']}}</strong>
                                </h4>
                                <small v-if="product['description']">&nbsp&nbsp&nbsp&nbsp {{product['description']}}</small>
                            </div>
                            <div class="products" v-if="!showLoading" :class="'product'+(index+1)">
                                <div class="text-left" v-html="products[index]['list_html']"> </div>
                                <hr>
                            </div>
                            <div v-if="showLoading">
                                <div class="fi-loading text-center">
                                    <img class="img-loader-out" src="@/assets/flexible_interest/images/loader.gif" alt="Loader">
                                </div>
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
                    <button class="fi-btn-next" type="button" @click="openReportApproveDialog()">ການອະນຸມັດ</button>
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
import fi_report_approve_dialog from '@/components/flexible-interest/fi_report_approve_dialog.vue'
export default {
  name: 'document_attach',
  components: {
    fi_dialog,
    fi_report_approve_dialog
  },
  data(){
      return {
        showLoading: true,
        showProducts: false,
        customer_info: this.$store.getters['flexible_interest_module/customer_detail'],
        document_files: [],
        products: this.$store.getters['flexible_interest_module/customer_detail']['bankAccounts'],
        config: {
            show: false,
            sendEditEvt: () => {
                this.config['show'] = false;
            },
            sendRequestEvt: () => {
                this.config['show'] = false;
            },
            sendApproveEvt: () => {
                this.config['show'] = false;
            },
            rejectEvt: () => {
                this.config['show'] = false;
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
                        //console.log("Cancle")
                        this.fi_config['show'] = false;
                    }
                },
                {
                    text: 'OK',
                    action: () => {
                        //console.log('OK');
                        this.fi_config['show'] = false;
                    }
                }
            ]
        }
      }
  },
  created() {
      //console.log(this.customer_info)
  },
  mounted(){
    if(!this.customer_info['requirementId']){
        ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/by/id', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
            if(result)
            {
                this.customer_info = result;
                /*ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_info['currencyCode'], acClass: this.customer_info['accountClass']}, ( err, res ) => {
                    if(error){
                        this.customer_info['normalInterest'] = '0';
                    } else{
                        if(result){
                            this.customer_info['normalInterest'] = res['interest'];
                        } else {
                            this.customer_info['normalInterest'] = '0';
                        }
                    }
                });
                */
               //console.log(this.customer_info)
                this.getProducts();
                axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_info['accountClass']+'/'+this.customer_info['currencyCode']+'/'+this.customer_info['requirementId'])
                    .then((res) => {
                        this.customer_info['normalInterest'] = res['data']['data']['interest'];
                    })
                    .catch((error) =>  {
                        this.customer_info['normalInterest'] = '0';
                    })
            } else {
                this.backRouter();
            }
        });
    } else {
        this.getProducts();
    }
    ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/document/attach', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
        if(result){
            this.document_files = result;
        }
    });
  },
  destroyed(){
      window.sessionStorage.removeItem('history');
  },
  methods: {
    hideAndShow(check){
        if(check) {
            return 'show-products'
        } else {
            return 'hide-products'
        }
    },
    getProducts() {
        if(this.customer_info['bankAccounts'].length > 0) {
            var checkCompleted = 0;
            for(var i = 0; i < this.customer_info['bankAccounts'].length; i++){
                //console.log(i)
                axios.get(address['serverIp'] + '/bcel/api/flexible/interest/products/'+this.customer_info['bankAccounts'][i]['accountNo'].trim()+'/history/html')
                .then((res) => {
                    checkCompleted += 1;
                    var result = res['data']['data'];
                    for(var j = 0; j < this.customer_info['bankAccounts'].length; j++){
                        if(this.customer_info['bankAccounts'][j]['accountNo'].trim() == result['acc_no']){
                            var result = result['result'];
                            this.customer_info['bankAccounts'][j]['list_html'] = result.replace(/img\//g,'/img/').replace(/<\/h2>/g,'</h2>\n');
                            var productArr = this.customer_info['bankAccounts'][j]['list_html'].match(/<div class='product.*<\/h2>/g);
                            var productUsage = '';
                            for(var k=0; k < productArr.length; k++){
                                if(productArr[k].search("disabled")<0) {
                                    var product = productArr[k].split('h2')[1].slice(1, productArr[k].split('h2')[1].length - 2) +', ';
                                    productUsage += product;
                                }
                            }
                            this.customer_info['bankAccounts'][j]['list'] = productUsage.trim().slice(0, productUsage.length - 2);
                            //console.log(this.customer_info['bankAccounts'][j]['list']);
                        }
                    }
                    if(checkCompleted == this.customer_info['bankAccounts'].length){
                        this.showLoading = false;
                        this.products = this.customer_info['bankAccounts'];
                    }
                })
                .catch((error) => {
                    //console.log(error)
                    this.showLoading = false;
                });
            }
            /*ds.rpc.make('/bcel/api/flexible/interest/customer/product', { acc_no: this.customer_info['customerBankAcc'].trim() }, ( error, result ) => {
                if(result){
                this.products = JSON.parse(result);
                console.log(this.products)
                this.customer_info['products'] = this.products;
                this.showLoading = false;
                }
            });*/
        } else {
            this.showLoading = false;
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
          if(this.customer_info['depositAmount'] && this.customer_info['currencyCode'] && this.customer_info['depositType']){
            var interest = this.customer_info['depositAmount'] * (this.customer_info[key] / 100) * (this.customer_info['depositTotalDays'] / 360);
            return interest.toLocaleString(undefined,{'minimumFractionDigits':1,'maximumFractionDigits':3})
          } else {
            return 0;
          }
      },
      backRouter() {
          this.$router.back();
      },
      openReportApproveDialog(){
        this.config = {
            show: true,
            sendEditEvt: () => {
                this.config['show'] = false;
                this.fi_config = {
                    show: true,
                    title: 'ຢືນຢັນ',
                    message: 'ແນະນຳໃຫ້ພະນັກງານແກ້ໄຂລາຍການຄືນແທ້ບໍ?',
                    buttons: [
                        {
                            text: 'ຍົກເລີກ',
                            action: () => {
                                //console.log("Cancle")
                                this.fi_config['show'] = false;
                            }
                        },
                        {
                            text: 'ຕົກລົງ',
                            action: () => {
                                this.fi_config['show'] = false;
                                var comment = this.$store.getters['flexible_interest_module/commentEdit'];
                                this.$store.commit('flexible_interest_module/changeCommentEdit', { comment: "" });
                                ds.rpc.make('/bcel/chat/api/flexible/interest/create/response/edit/notification', {user: this.$store.getters['flexible_interest_module/user'], requirementId:  this.customer_info['requirementId'], comment: comment}, ( error, result ) => {
                                    if(error){
                                    } else{
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: result['message'],
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                        this.$root.$emit("reloadAllApprove");
                                    }
                                });
                            }
                        }
                    ]
                }
            },
            sendRequestEvt: () => {
                this.config['show'] = false;
                this.fi_config = {
                    show: true,
                    title: 'ຢືນຢັນ',
                    message: 'ຂໍອະນຸມັດລາຍການຕໍ່ແທ້ບໍ?',
                    buttons: [
                        {
                            text: 'ຍົກເລີກ',
                            action: () => {
                                //console.log("Cancle")
                                this.fi_config['show'] = false;
                            }
                        },
                        {
                            text: 'ຕົກລົງ',
                            action: () => {
                                this.fi_config['show'] = false;
                                var comment = this.$store.getters['flexible_interest_module/commentRequest'];
                                this.$store.commit('flexible_interest_module/changeCommentRequest', { comment: "" });
                                ds.rpc.make('/bcel/chat/api/flexible/interest/create/request/approve/notification', {user: this.$store.getters['flexible_interest_module/user'], requirementId:  this.customer_info['requirementId'], comment: comment}, ( error, result ) => {
                                    if(result){
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: result['message'],
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                        this.$root.$emit("reloadAllApprove");
                                    }
                                });
                            }
                        }
                    ]
                }
            },
            sendApproveEvt: () => {
                this.config['show'] = false;
                this.fi_config = {
                    show: true,
                    title: 'ຢືນຢັນ',
                    message: 'ອະນຸມັດລາຍການແທ້ບໍ?',
                    buttons: [
                        {
                            text: 'ຍົກເລີກ',
                            action: () => {
                                //console.log("Cancle")
                                this.fi_config['show'] = false;
                            }
                        },
                        {
                            text: 'ຕົກລົງ',
                            action: () => {
                                this.fi_config['show'] = false;
                                var comment = this.$store.getters['flexible_interest_module/commentApprove'];
                                //console.log(comment)
                                this.$store.commit('flexible_interest_module/changeCommentApprove', { comment: "" });
                                ds.rpc.make('/bcel/chat/api/flexible/interest/approve/customer/requirement', {user: this.$store.getters['flexible_interest_module/user'], requirementId:  this.customer_info['requirementId'], comment: comment}, ( error, result ) => {
                                    if(result){
                                        if(result['success']) {
                                            this.customer_info['approveStatus'] = 'APPROVED';
                                        }
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: result['message'],
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                        this.$root.$emit("reloadAllApprove");
                                    }
                                });
                            }
                        }
                    ]
                }
            },
            rejectEvt: () => {
                this.config['show'] = false;
                this.fi_config = {
                    show: true,
                    title: 'ຢືນຢັນ',
                    message: 'ປະຕິເສດລາຍການແທ້ບໍ?',
                    buttons: [
                        {
                            text: 'ຍົກເລີກ',
                            action: () => {
                                //console.log("Cancle")
                                this.fi_config['show'] = false;
                            }
                        },
                        {
                            text: 'ຕົກລົງ',
                            action: () => {
                                this.fi_config['show'] = false;
                                var comment = this.$store.getters['flexible_interest_module/commentApprove'];
                                this.$store.commit('flexible_interest_module/changeCommentApprove', { comment: "" });
                                ds.rpc.make('/bcel/chat/api/flexible/interest/reject/customer/requirement', {user: this.$store.getters['flexible_interest_module/user'], requirementId:  this.customer_info['requirementId'], comment: comment}, ( error, result ) => {
                                    if(result){
                                        if(result['success']) {
                                            this.customer_info['approveStatus'] = 'REJECTED';
                                        }
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: result['message'],
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                        this.$root.$emit("reloadAllApprove");
                                    }
                                });
                            }
                        }
                    ]
                }
            }
        }
      },
      getExceededOutFlexible() {
          try{
              var customer_interest = parseFloat(this.customer_info['customerInterest']);
            var max_interest = parseFloat(this.customer_info['normalInterest']) + parseFloat(this.customer_info['interestFlexible']);
            if((customer_interest > max_interest) && (this.customer_info['normalInterest'] > 0) && (this.customer_info['interestFlexible'] > 0)){
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
  }
}
</script>


<style lang="scss" scoped>
* {
    font-family: Phetsarath_OT;
}
img.img-loader-out {
  width: 50px;
  margin-bottom: 15px;
}
strong, th, td {
    color: rgb(88, 88, 88);
}
.fi-account-title {
  padding: 0px;
  margin: 0px;
}
.fi-expand {
    cursor: pointer;
}
.fi-expand:hover {
    color: rgb(189, 192, 194);
}
.PENDING{
    color: rgb(250, 150, 0);
    font-weight: bold;
    font-family: Helvetica;
    text-shadow: 0 1px 0 white, 0 2px 0 white, 0 3px 0 rgb(250, 150, 0), 0 4px 0 rgb(250, 150, 0);
}
.REJECTED{
    color: red;
}
.APPROVED{
    color: rgb(9, 192, 9);
}
.CANCLE {
    color: #C72B2C;
}
.fi-iframe{
    width: 100%;
    height: 500px;
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
.show-products {
    display: block;
}
.hide-products {
    display: none;
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