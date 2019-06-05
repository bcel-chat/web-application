import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

if(window.sessionStorage.getItem('requirement')){
  var obj = JSON.parse(window.sessionStorage.getItem('requirement'));
  obj['document_files'] = [];
  window.sessionStorage.setItem('requirement', JSON.stringify(obj));
}
const flexible_interest_module = {
  namespaced: true,
  state: {
    max_flex: 0,
    comment_request: '',
    comment_edit: '',
    comment_approve: '',
    logined_user_id: window.sessionStorage.getItem('user')?window.sessionStorage.getItem('user'):'',
    request_approve_detail: {},
    customer_requirement: window.sessionStorage.getItem('requirement')?JSON.parse(window.sessionStorage.getItem('requirement')):{
      bank_accounts: [
        {acc_no: '', desc: ''}
      ],
      currency: {
        currencyId: ''
      },
      customer_interest: "0",
      deposit_amount: '',
      documents: '',
      document_files:[],
      aclass: {descriptionLao: ''},
      more_info: '',
      name: '',
      type: '',
      tel: '',
      customer_signature: '',
      earning_general_interest: 0,
      earning_customer_interest: 0,
      flexible_interest_id: '',
      max_flexible:0,
      occupation: '',
      staff_note: '',
      deposit_age: {
        typeId: ''
      },
      normal_interest: 0.0
    },
    progressActionActive: window.sessionStorage.getItem('actionProgress')?JSON.parse(window.sessionStorage.getItem('actionProgress')):[{},{},{},{},{}]
  },
  mutations: {
    changeMaxFlexible (state, { max }) {
      state.max_flex = max;
    },
    changeCommentApprove (state, { comment }) {
      state.comment_approve = comment;
    },
    changeCommentEdit (state, { comment }) {
      state.comment_edit = comment;
    },
    changeCommentRequest (state, { comment }) {
      state.comment_request = comment;
    },
    addLoginUser (state, { user }) {
      state.logined_user_id = user;
    },
    addCustomerRequirement (state, { info }) {
      state.customer_requirement = info;
    },
    addRequestApproveDetail (state, { info }) {
      state.request_approve_detail = info;
    },
    addProgressActionActive(state, { index, key, val }){
      state.progressActionActive[index][key] = val;
    },
    clearProgressActionActive(state, { val }){
      state.progressActionActive = val;
    }
  },
  getters: {
    maxFlex: state => state.max_flex,
    requirement: state => state.customer_requirement,
    action_active: state => state.progressActionActive,
    customer_detail: state => state.request_approve_detail,
    commentApprove: state => state.comment_approve,
    commentEdit: state => state.comment_edit,
    commentRequest: state => state.comment_request,
    user: state => state.logined_user_id
  },
  actions: {
    changeMaxFlexible (context){
      context.commit('changeMaxFlexible')
    },
    changeCommentApprove (context){
      context.commit('changeCommentApprove')
    },
    changeCommentEdit (context){
      context.commit('changeCommentEdit')
    },
    changeCommentRequest (context){
      context.commit('changeCommentRequest')
    },
    addLoginUser (context) {
      context.commit('addLoginUser')
    },
    actionAddCustomerRequirement (context) {
      context.commit('addCustomerRequirement')
    },
    addRequestApproveDetail (context) {
      context.commit('addRequestApproveDetail')
    },
    addProgressActionActive({commit}){
      commit('addProgressActionActive')
    },
    clearProgressActionActive({commit}){
      commit('clearProgressActionActive')
    }
  }
}

export default flexible_interest_module