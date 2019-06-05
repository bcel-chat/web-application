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
                      <td>{{customer_info['customerName']}}</td>
                      <td class="fi-text-more">ເບີໂທ: {{customer_info['customerTel']}} <br/>ອາຊີບ: {{customer_info['customerOccupation']}} <br/>ຂໍ້ມູນອື່ນໆ: {{customer_info['customerDetail']}}</td>
                      <td class="fi-text-more">
                        <span v-for="(account, index) in products" :key="index">
                          - ເລກບັນຊີ {{account['accountNo']}} {{account['list']?'ໃຊ້ຜະລິດຕະພັນ ' + account['list']:' ບໍ່ໃຊ້ຜະລິດຕະພັນໃດ'}}.
                          <br>
                        </span>
                      </td>
                      <td>{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{customer_info['depositAmount']?customer_info['depositAmount'].toLocaleString(undefined,{'maximumFractionDigits':3}).replace(/,/g,'.'):0}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}</td>
                      <td>{{customer_info['currencyName']}} ({{customer_info['currencyCode']}})</td>
                      <td>{{customer_info['depositTypeName']}}</td>
                      <td>{{customer_info['interestChosen']}}</td>
                      <td>
                        {{customer_info['normalInterest']}}% 
                        <hr>
                        {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('normalInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                      </td>
                      <td>{{customer_info['interestFlexible']}}% </td>
                      <td>
                        <span :class="getExceededInFlexible()?'APPROVED':getExceededOutFlexible()?'REJECTED':''">{{customer_info['customerInterest']}}%</span>  
                        <hr>
                        {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('customerInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                      </td>
                  </tr>
                  <tr>
                      <td class="fi-tr-status text-center" colspan="10">
                          <!-- <strong>ຕາຕະລາງປຽບທຽບສ່ວນຕ່າງລະຫວ່າງລາຍຈ່າຍດອກເບ້ຍ ແລະ ລາຍຮັບດອກເບ້ຍເງິນກູ້</strong> -->
                          <h4><strong>ສະຖານະອະນຸມັດ: </strong> <strong :class="customer_info['approveStatus']">{{customer_info['approveStatus']}}</strong></h4>
                      </td>
                  </tr>
                  <tr>
                      <td colspan="6">
                          <h5 class="text-center"><strong>ທັດສະນະ ແລະ ຄຳເຫັນ</strong></h5>
                          <div class="text-left" v-for="(staff, index) in requestUsers" :key="index">
                              <div v-if="notEditShow(staff['type'])">
                                <strong :class="(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">* {{staff['position']}} {{staff['divisionName']?staff['divisionName']: staff['departmentName']?((staff['departmentId'] != '07')?staff['departmentName']:''): staff['branchName']}}</strong>
                                <p :class="(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''"> &nbsp &nbsp &nbsp &nbsp {{staff['comments']}}</p>
                                <p>&nbsp</p>
                              </div>
                          </div>
                      </td>
                      <td class="text-center" colspan="4">
                          <h5><strong>ຊື່ພະນັກງານ ແລະ ຜູ້ອະນຸມັດແຕ່ລະຂັ້ນ</strong></h5>
                          <div v-for="(staff, index) in requestUsers" :key="index">
                            <div v-if="notEditShow(staff['type'])">
                              <strong :class="(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">{{staff['position']}} {{staff['divisionName']?staff['divisionName']: staff['departmentName']?((staff['departmentId'] != '07')?staff['departmentName']:''): staff['branchName']}}</strong>
                              <p><span :class="(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">{{staff['requestUserName']}}</span></p>
                              <p style="padding: 5px;">&nbsp</p>
                            </div>
                          </div>
                          <div class="text-center" v-if="customer_info['signature']">
                            <strong>ລາຍເຊັນລູກຄ້າ</strong>
                            <br>
                            <span>{{customer_info['customerName']}}</span>
                            <br>
                            <img :src="customer_info['signature']" alt="Signature" width="100">
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
      <div class="hide-on-print-mode">
        <div class="inverst-background"></div>
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
                                  <td class="col-first">
                                    <strong>ຊື່ລູກຄ້າ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                      {{customer_info['customerName']}}
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ຂໍ້ມູນສ່ວນຕົວ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="fi-text-more text-left">
                                    - ເບີໂທ: {{customer_info['customerTel']}} <br/>- ອາຊີບ: {{customer_info['customerOccupation']}} <br/>- ຂໍ້ມູນອື່ນໆ: {{customer_info['customerDetail']}}                                      
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>ປະຫວັດການໃຊ້ບໍລິການຢູ່ ທຄຕລ:</strong>
                                  <hr style="margin: 1px;">
                                  <div class="fi-text-more text-left">
                                    <span v-for="(account, index) in products" :key="index">
                                      - ເລກບັນຊີ {{account['accountNo']}} {{account['list']?'ໃຊ້ຜະລິດຕະພັນ ' + account['list']:' ບໍ່ໃຊ້ຜະລິດຕະພັນໃດ'}}.
                                      <br>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                    {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{customer_info['depositAmount']?customer_info['depositAmount'].toLocaleString(undefined,{'maximumFractionDigits':3}).replace(/,/g,'.'):0}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}                                      
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ສະກຸນເງິນ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                      {{customer_info['currencyName']}} ({{customer_info['currencyCode']}})
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ໄລຍະຝາກ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                      {{customer_info['depositTypeName']}}
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ທາງເລືອກດອກເບ້ຍ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                      {{customer_info['interestChosen']}}
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>% ແລະ ດອກເບ້ຍປົກກະຕິ:</strong>
                                  <hr style="margin: 1px;"> 
                                  <div class="text-right">
                                  {{customer_info['normalInterest']}}% = {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('normalInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}                                    
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>% ດອກເບ້ຍຍືດຍຸ່ນສູງສຸດ:</strong>
                                  <hr style="margin: 1px;"> 
                                  <div class="text-right">
                                    {{customer_info['interestFlexible']}}%
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>% ແລະ ດອກເບ້ຍທີ່ຕ້ອງການ:</strong>
                                  <hr style="margin: 1px;"> 
                                  <div class="text-right">
                                    <span :class="getExceededInFlexible()?'APPROVED':getExceededOutFlexible()?'REJECTED':''">{{customer_info['customerInterest']}}%</span>  
                                    =
                                    {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('normalInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                  </div>
                                </td>
                              </tr>
                              <tr class="text-center">
                                  <td class="col-last"><h4><strong>ສະຖານະອະນຸມັດ: </strong> <strong :class="customer_info['approveStatus']">{{customer_info['approveStatus']}}</strong></h4> </td>
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="col-12">
                        <div v-if="check_response_edit">
                          <h5 class="text-center"><strong>ຄຳຄິດເຫັນຂອງ{{currenUser['position']}}</strong></h5>
                          <div class="text-left">
                            <strong>{{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}} ({{currenUser['fullName']}})</strong>
                            <br>
                            <textarea placeholder="ຄຳແນະນຳພະນັກງານ" v-model="comment_edit" @change="validateCommentEdit" rows="2"></textarea>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_edit'].length > 0">
                              <span class="danger" v-for="(error, index) in error_validation['comment_edit']" :key="index">{{error}} </span>
                            </div>
                          </div>
                        </div>
                        <div v-if="check_approve">
                          <h5 class="text-center"><strong>ທັດສະນະ ແລະ ຄຳເຫັນຂອງຜູ້ອະນຸມັດ</strong></h5>
                          <div class="text-left">
                            <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}} ({{currenUser['fullName']}})</strong>
                            <br>
                            <textarea placeholder="ປະກອບຄຳຄິດຄຳເຫັນ" v-model="comment_approve" @change="validateCommentApprove" rows="2"></textarea>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_approve'].length > 0">
                              <span class="danger" v-for="(error, index) in error_validation['comment_approve']" :key="index">{{error}} </span>
                            </div>
                          </div>
                        </div>
                        <div v-if="!check_approve && !check_response_edit">
                          <h5><strong>ທັດສະນະ ແລະ ຄຳເຫັນ</strong></h5>
                          <div class="text-left" v-for="(staff, index) in requestUsers" :key="index">
                              <strong :class="(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">* {{staff['position']}} {{staff['divisionName']?staff['divisionName']: staff['departmentName']?((staff['departmentId'] != '07')?staff['departmentName']:''): staff['branchName']}} ({{staff['requestUserName']}})</strong>
                              <p class="signature" :class="(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">&nbsp&nbsp&nbsp&nbsp{{staff['comments']}}</p>
                          </div>
                          <div class="text-left" v-if="check_request_approve">
                            <strong>* {{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}} ({{currenUser['fullName']}})</strong>
                            <br>
                            <textarea placeholder="ປະກອບຄຳຄິດຄຳເຫັນ" v-model="comment_request" @change="validateCommentRequest" rows="2"></textarea>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_request'].length > 0">
                              <span class="danger" v-for="(error, index) in error_validation['comment_request']" :key="index">{{error}} </span>
                            </div>
                          </div>
                          <div class="text-right"  v-if="customer_info['signature']">
                            <label class="text-center">
                              <strong>ລາຍເຊັນລູກຄ້າ</strong>
                              <br>
                              <span class="signature">{{customer_info['customerName']}}</span>
                              <br>
                              <img :src="customer_info['signature']" alt="Signature" width="100">
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
                                      <td>{{customer_info['customerName']}}</td>
                                      <td class="fi-text-more">ເບີໂທ: {{customer_info['customerTel']}} <br/>ອາຊີບ: {{customer_info['customerOccupation']}} <br/>ຂໍ້ມູນອື່ນໆ: {{customer_info['customerDetail']}}</td>
                                      <td class="fi-text-more">
                                        <span v-for="(account, index) in products" :key="index">
                                          - ເລກບັນຊີ {{account['accountNo']}} {{account['list']?'ໃຊ້ຜະລິດຕະພັນ ' + account['list']:' ບໍ່ໃຊ້ຜະລິດຕະພັນໃດ'}}.
                                          <br>
                                        </span>
                                      </td>
                                      <td>{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{customer_info['depositAmount']?customer_info['depositAmount'].toLocaleString(undefined,{'maximumFractionDigits':3}).replace(/,/g,'.'):0}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}</td>
                                      <td>{{customer_info['currencyName']}} ({{customer_info['currencyCode']}})</td>
                                      <td>{{customer_info['depositTypeName']}}</td>
                                      <td>{{customer_info['interestChosen']}}</td>
                                      <td>
                                        {{customer_info['normalInterest']}}% 
                                        <hr>
                                        {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('normalInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                      </td>
                                      <td>{{customer_info['interestFlexible']}}% </td>
                                      <td>
                                        <span :class="getExceededInFlexible()?'APPROVED':getExceededOutFlexible()?'REJECTED':''">{{customer_info['customerInterest']}}%</span> 
                                        <hr>
                                        {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('customerInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="fi-tr-status text-center" colspan="10">
                                          <!-- <strong>ຕາຕະລາງປຽບທຽບສ່ວນຕ່າງລະຫວ່າງລາຍຈ່າຍດອກເບ້ຍ ແລະ ລາຍຮັບດອກເບ້ຍເງິນກູ້</strong> -->
                                          <h4><strong>ສະຖານະອະນຸມັດ: </strong> <strong :class="customer_info['approveStatus']">{{customer_info['approveStatus']}}</strong></h4>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td colspan="6" v-if="check_response_edit">
                                        <h5 class="text-center"><strong>ຄຳຄິດເຫັນຂອງ{{currenUser['position']}}</strong></h5>
                                        <div class="text-left">
                                          <strong>{{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                          <br>
                                          <textarea placeholder="ຄຳແນະນຳພະນັກງານ" v-model="comment_edit" @change="validateCommentEdit" rows="2"></textarea>
                                          <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_edit'].length > 0">
                                            <span class="danger" v-for="(error, index) in error_validation['comment_edit']" :key="index">{{error}} </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td colspan="6" v-if="check_approve">
                                        <h5 class="text-center"><strong>ທັດສະນະ ແລະ ຄຳເຫັນຂອງຜູ້ອະນຸມັດ</strong></h5>
                                        <div class="text-left">
                                          <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                          <br>
                                          <textarea placeholder="ປະກອບຄຳຄິດຄຳເຫັນ" v-model="comment_approve" @change="validateCommentApprove" rows="2"></textarea>
                                          <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_approve'].length > 0">
                                            <span class="danger" v-for="(error, index) in error_validation['comment_approve']" :key="index">{{error}} </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td colspan="6" v-if="!check_approve && !check_response_edit">
                                          <h5 class="text-center"><strong>ທັດສະນະ ແລະ ຄຳເຫັນ</strong></h5>
                                          <div class="text-left" v-if="check_request_approve">
                                            <strong>* {{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                            <br>
                                            <textarea placeholder="ປະກອບຄຳຄິດຄຳເຫັນ" v-model="comment_request" @change="validateCommentRequest" rows="2"></textarea>
                                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_request'].length > 0">
                                              <span class="danger" v-for="(error, index) in error_validation['comment_request']" :key="index">{{error}} </span>
                                            </div>
                                          </div>
                                          <div class="text-left" v-for="(staff, index) in requestUsers" :key="index">
                                              <strong :class="(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">* {{staff['position']}} {{staff['divisionName']?staff['divisionName']: staff['departmentName']?((staff['departmentId'] != '07')?staff['departmentName']:''): staff['branchName']}}</strong>
                                              <p class="signature" :class="(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''"> &nbsp &nbsp &nbsp &nbsp {{staff['comments']}}</p>
                                          </div>
                                      </td>
                                      <td class="text-center" colspan="4" v-if="check_approve">
                                        <h5><strong>ຊື່ຜູ້ອະນຸມັດ</strong></h5>
                                        <div>
                                          <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                          <p><span class="new-signature">{{currenUser['fullName']}}</span></p>
                                        </div>
                                      </td>
                                      <td class="text-center" colspan="4" v-if="check_response_edit">
                                        <h5><strong>ຊື່{{currenUser['position']}}</strong></h5>
                                        <div>
                                          <strong>{{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                          <p><span class="new-signature">{{currenUser['fullName']}}</span></p>
                                        </div>
                                      </td>
                                      <td class="text-center" colspan="4" v-if="!check_approve && !check_response_edit">
                                          <h5><strong>ຊື່ພະນັກງານ ແລະ ຜູ້ອະນຸມັດແຕ່ລະຂັ້ນ</strong></h5>
                                          <div v-if="check_request_approve">
                                            <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                            <p><span class="new-signature">{{currenUser['fullName']}}</span></p>
                                          </div>
                                          <div v-for="(staff, index) in requestUsers" :key="index">
                                              <strong :class="(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">{{staff['position']}} {{staff['divisionName']?staff['divisionName']: staff['departmentName']?((staff['departmentId'] != '07')?staff['departmentName']:''): staff['branchName']}}</strong>
                                              <p><span class="signature" :class="(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">{{staff['requestUserName']}}</span></p>
                                          </div>
                                          <div class="text-center"  v-if="customer_info['signature']">
                                            <strong>ລາຍເຊັນລູກຄ້າ</strong>
                                            <br>
                                            <span class="signature">{{customer_info['customerName']}}</span>
                                            <br>
                                            <img :src="customer_info['signature']" alt="Signature" width="100">
                                          </div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <!-- <div class="col-12 text-right">
                    <h3>ສະຖານະອະນຸມັດ: <strong>{{customer_info['approveStatus']}}</strong></h3>
                  </div> -->
                  <div class="col-12 hide-on-print-mode" v-if="!check_approve && !check_request_approve && !check_response_edit">
                      <div class="row">
                          <div class="col-12 text-right" v-if="disableLeaderApproveButton">
                              <button class="fi-btn edit" :class="!check_top_header?'spacing':''" type="button" @click="check_response_edit = !check_response_edit">&#9998; ແກ້ໄຂຄືນ</button>
                              <button class="fi-btn spacing request" type="button" v-if="check_top_header" @click="check_request_approve = !check_request_approve">&#9993; ຂໍອະນຸມັດ</button> 
                              <button class="fi-btn success" type="button" v-if="canApprove()" @click="check_approve = !check_approve">&#9745; ອະນຸມັດ</button>
                          </div>
                          <div class="col-12 text-right" v-if="!disableLeaderApproveButton">
                            <h6><strong :class="approve_permission['style']" v-if="approve_permission['message']">* {{approve_permission['message']}}</strong></h6>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 hide-on-print-mode" v-if="check_request_approve">
                      <div class="row" v-if="disableLeaderApproveButton">
                          <div class="col-12 text-right">
                              <button class="fi-btn cancle spacing" type="button" @click="check_request_approve = false">&#10006; ຍົກເລີກ</button> 
                              <button class="fi-btn request" type="button" @click="sendRequest()">&#9745; ຕົກລົງ</button>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 hide-on-print-mode" v-if="check_approve">
                      <div class="row" v-if="disableLeaderApproveButton && canApprove()">
                          <div class="col-12 text-right">
                              <button class="fi-btn cancle" type="button" @click="check_approve = false">&#10006; ຍົກເລີກ</button> 
                              <button class="fi-btn reject spacing" type="button" @click="rejectRequirement()">&#33; ປະຕິເສດ</button>
                              <button class="fi-btn success" type="button" @click="sendApprove()">&#9745; ຕົກລົງ</button>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 hide-on-print-mode" v-if="check_response_edit">
                      <div class="row" v-if="disableLeaderApproveButton">
                          <div class="col-12 text-right">
                              <button class="fi-btn cancle spacing" type="button" @click="check_response_edit = false">&#10006; ຍົກເລີກ</button> 
                              <button class="fi-btn edit" type="button" @click="sendEdit()">&#9745; ຕົກລົງ</button>
                          </div>
                      </div>
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
import ds from '@/helper/ds.js';
import address from '@/helper/server_address.js'
import axios from 'axios';
export default {
  name: 'fi_report_approve_dialog',
  data(){
    return {
      disableLeaderApproveButton: false,
      customer_info: this.$store.getters['flexible_interest_module/customer_detail'],
      requestUsers: [],
      products: [],
      currenUser: {},
      approve_permission: {},
      check_top_header: false,
      check_approve: false,
      check_request_approve: false,
      check_response_edit: false,
      comment_request: "",
      comment_edit: "",
      comment_approve: "",
      error_validation:{
        comment_request: [],
        comment_edit: [],
        comment_approve: []
      }
    }
  },
  props: {
    config: {
      default: {
        show: true,
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
      type: Object
    }
  },
  created(){
    this.$root.$on('reloadAllApprove', () => {
      ds.rpc.make('/bcel/api/flexible/interest/approve/notification', { requirementId:  this.customer_info['requirementId']}, ( error, result ) => {
          if(result) {
            this.requestUsers = result;
          }
      });
      ds.rpc.make('/bcel/api/flexible/interest/approve/same/lavel/permission', {userId: this.$store.getters['flexible_interest_module/user'], requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
          if(!error) {
            this.disableLeaderApproveButton = result['permission'];
            this.check_top_header = result['topApprove'] ;
            this.approve_permission = result ;
            if(this.disableLeaderApproveButton) {
              ds.rpc.make('/bcel/api/flexible/interest/current/user', { userId: this.$store.getters['flexible_interest_module/user']}, ( error, result ) => {
                if(result)
                {
                  this.currenUser = result;
                }
              });
            } else {
              this.currenUser = {};
            }
          }
      });
    });
    if(!this.customer_info['requirementId']){
        ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/by/id', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
            if(result)
            {
                this.customer_info = result;
                this.$root.$emit("reloadAllApprove");
                this.getProductInfo();
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
                });*/
                axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_info['accountClass']+'/'+this.customer_info['currencyCode']+'/'+this.customer_info['requirementId'])
                    .then((res) => {
                        this.customer_info['normalInterest'] = res['data']['data']['interest'];
                    })
                    .catch((error) =>  {
                        this.customer_info['normalInterest'] = '0';
                    })
            }
        });
    } else {
      this.$root.$emit("reloadAllApprove");
      //console.log(this.customer_info)
      if(this.customer_info['bankAccounts'].length > 0) {
        this.getProductInfo();
      }
    }
  },
  mounted(){
  },
  methods: {
    getProductInfo(){
      this.products = [];
      for(var i = 0; i < this.customer_info['bankAccounts'].length; i++){
        axios.get(address['serverIp'] + '/bcel/api/flexible/interest/products/'+this.customer_info['bankAccounts'][i]['accountNo'].trim()+'/history/html')
        .then((res) => {
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
                  this.products.push(this.customer_info['bankAccounts'][j]);
                  //console.log(this.products)
                }
            }
        })
        .catch(() => {
        });
      }
      
      /*ds.rpc.make('/bcel/api/flexible/interest/customer/product', { acc_no: this.customer_info['customerBankAcc'].trim() }, ( error, result ) => {
        if(result){
          var products = JSON.parse(result);
          this.customer_info['products'] = products;
          var productStr = "";
          for(var key in products){
            if(products[key]){
              if(products[key].constructor === Array){
                if(products[key].length > 0){
                  productStr += key + ", ";
                }
              } else if(products[key].constructor === Object) {
                var j = 0;
                for(var k in products[key]){
                  j++;
                }
                if(j > 0){
                  productStr += key + ", ";
                }
              } else {
                productStr += key + ", ";
              }
            }
          }
          this.customer_info['productStr'] = productStr.slice(0, productStr.length - 1);
        }
        console.log(error)
      });*/
    },
    validateCommentRequest(){
      //console.log("change work")
        if(!this.comment_request.trim()){
            if(this.error_validation['comment_request'].length == 0){
              this.error_validation['comment_request'].push('ປະກອບຄຳຄິດເຫັນຂອງທ່ານ');
            }
            return false;
        } else if(this.error_validation['comment_request'].length > 0) {
            this.error_validation['comment_request'].pop();
        }
        return true;
    },
    validateCommentEdit(){
        if(!this.comment_edit.trim()){
            if(this.error_validation['comment_edit'].length == 0){
              this.error_validation['comment_edit'].push('ປະກອບຄຳແນະນຳຂອງທ່ານ');
            }
            return false;
        } else if(this.error_validation['comment_edit'].length > 0) {
            this.error_validation['comment_edit'].pop();
        }
        return true;
    },
    validateCommentApprove(){
        if(!this.comment_approve.trim()){
            if(this.error_validation['comment_approve'].length == 0){
              this.error_validation['comment_approve'].push('ປະກອບຄຳຄິດເຫັນຂອງທ່ານ');
            }
            return false;
        } else if(this.error_validation['comment_approve'].length > 0) {
            this.error_validation['comment_approve'].pop();
        }
        return true;
    },
    notEditShow(type){
      return !((type == 'ED') || (type == 'EDD'));
    },
    exitDialog(){
      this.config['show'] = false;
      this.check_approve = false;
    },
    rejectRequirement(){
      if(this.validateCommentApprove()) {
        this.$store.commit('flexible_interest_module/changeCommentApprove', { comment: this.comment_approve });
        this.comment_approve = "";
        this.check_approve = false;
        this.config['rejectEvt']();
      }
    },
    sendApprove(){
      if(this.validateCommentApprove()) {
        this.$store.commit('flexible_interest_module/changeCommentApprove', { comment: this.comment_approve });
        this.comment_approve = "";
        this.check_approve = false;
        this.config['sendApproveEvt']();
      }
    },
    sendRequest(){
      if(this.validateCommentRequest()) {
        this.$store.commit('flexible_interest_module/changeCommentRequest', { comment: this.comment_request });
        this.comment_request = "";
        this.check_request_approve = false;
        this.config['sendRequestEvt']();
      }
    },
    sendEdit() {
      if(this.validateCommentEdit()){
        this.$store.commit('flexible_interest_module/changeCommentEdit', { comment: this.comment_edit });
        this.comment_edit = "";
        this.check_response_edit = false;
        this.config['sendEditEvt']();
      }
    },
    getEarningPerYear(key){
        if(this.customer_info['depositAmount'] && this.customer_info['currencyCode'] && this.customer_info['depositType']){
          var interest = this.customer_info['depositAmount'] * (this.customer_info[key] / 100) * (this.customer_info['depositTotalDays'] / 360);
          return interest.toLocaleString(undefined,{'minimumFractionDigits':0,'maximumFractionDigits':3})
        } else {
          return 0;
        }
    },
    canApprove(){
      try{
              var customer_interest = parseFloat(this.customer_info['customerInterest']);
            var max_interest = parseFloat(this.customer_info['normalInterest']) + parseFloat(this.customer_info['interestFlexible']);
            if((customer_interest > max_interest) && (this.customer_info['normalInterest'] > 0) && (this.customer_info['interestFlexible'] > 0)){
                return false || this.approve_permission['canApprove'];
            } else {
                return true;
            }
          } catch(e) {
              return false;
          }
    },
    printFlexibleInterest(){
      $.print("#divPrint");
      //window.print();
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
.show-on-print-mode{
  visibility: hidden;
}
// .fi-empty:before{
//   content: '*'
// }
.fi-text-more {
  font-size: 12px;
}
table.tb-big {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
.success{
  background: #20A816;
}
.success:hover{
    background: rgb(20, 104, 14);
}
.edit {
  background: rgba(187, 163, 152, 0.959);
}
.edit:hover{
  background: rgba(145, 136, 132, 0.959);
}
.request {
  background: #A8890C;;
}
.request:hover {
  background: rgb(143, 116, 11);;
}
.cancle {
  background: red;
}
.cancle:hover {
  background: #DC4D39;
}
.reject {
  background: rgb(216, 96, 77);
}
.reject:hover {
  background: rgb(170, 68, 52);
}
.PENDING{
    color: rgb(250, 150, 0);
    font-weight: bold;
    font-family: Helvetica;
    text-shadow: 0 1px 0 white, 0 2px 0 white, 0 3px 0 rgb(250, 150, 0), 0 4px 0 rgb(250, 150, 0);
}
.EDIT{
  color: rgba(247, 82, 6, 0.959);
}
.EDITED{
  color: blue;
}
.REQUEST{
  color: #A8890C;
}
.REJECTED{
    color: #F34E4E;
}
.APPROVED{
    color: #20A816;
}
.CANCLE {
    color: #C72B2C;
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
.fi-print {
  position: absolute;
  cursor: pointer;
  top: 5px;
  right: 30px;
  color: red;
  font-weight: bold;
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
.request {
    background: #FB8C00;
}
.success {
    color: rgb(9, 192, 9);
}
.danger{
    font-size: 12px;
    color: red;
}
.danger:before{
    content: '* ';
}
.fi-btn{
    margin-top: 5px;
    margin-bottom: 10px;
    color: white;
    border: none;
    border-radius: 3px;
    width: 8rem;
    font-size: 1.2rem;
}

button:focus{
    outline: none;
}
.inverst-background {
  top: 0px;
  left: 0px;
  z-index: 999999999999999999999999999999999999999999998;
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
  z-index: 999999999999999999999999999999999999999999999;
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
#table_big{
  display: block;
}
#table_small{
  display: none;
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
