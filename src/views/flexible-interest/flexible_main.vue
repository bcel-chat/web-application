<template>
  <!-- <div class="test"> -->
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="content">
        <!-- <flexible-process/>     -->
        <router-view/>
    </div>
  </div>
</template>

<script>

import ds from '@/helper/ds.js'
const FlexibleProcess = () => import('@/views/flexible-interest/flexible_process.vue')
export default {
  name: 'flexible_main',
  components:{
      FlexibleProcess
  },
  data(){
      return {
      }
  },
  mounted(){
        this.$root.$on('resetDefault', () => {
          this.resetDefault();
        });
        
        ds.rpc.make('/bcel/api/flexible/interest/current/user', { userId: 'BCEL1159'}, ( error, result ) => {
            
            if(result)
            {
                if(result['userId']){
                    this.$store.commit('flexible_interest_module/addLoginUser', { user: result['userId'] });
                    window.sessionStorage.setItem('user', result['userId']);
                    if(((result['permission'] == 1) || (result['permission'] == 2))) {
                        window.sessionStorage.setItem('permission', 'true');
                        this.$router.push({
                            path: sessionStorage.getItem('flexible_root_router')+'/flexible/leader/approve'
                        });
                    } else if(result['permission'] == 3) {
                        window.sessionStorage.setItem('permission', 'report');
                        this.$router.push({
                            path: sessionStorage.getItem('flexible_root_router')+'/flexible/report/pending/all'
                        });
                    } else  {
                        window.sessionStorage.setItem('permission', 'false');
                        this.$router.push({
                            path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'
                        });
                    }
                }  else {
                    this.$root.$emit("resetDefault");
                    this.$router.back();
                }
            }  else if(error) {
                this.$root.$emit("resetDefault");
                this.$router.back();
            } else {
                this.$root.$emit("resetDefault");
                this.$router.back();
            }
        });
  },
  methods: {
      getPermission(){
          return window.sessionStorage.getItem('permission') == 'true';
      },
      resetDefault(){
        window.sessionStorage.removeItem('actionProgress');
        window.sessionStorage.removeItem('requirement');
        var newInfo = {
            bank_accounts: [
                {acc_no: '', desc: ''}
            ],
            currency: {
                currencyId: ''
            },
            customer_interest: 0,
            deposit_amount: '',
            documents: '',
            document_files:[],
            aclass: {descriptionLao: ''},
            more_info: '',
            name: '',
            earning_general_interest: 0,
            earning_customer_interest: 0,
            max_flexible:0,
            occupation: '',
            staff_note: '',
            deposit_age: {
                typeId: ''
            },
            products: [],
            normal_interest: 0.0
        }
        this.$store.commit('flexible_interest_module/addCustomerRequirement', { info: newInfo });
        this.$store.commit('flexible_interest_module/clearProgressActionActive', { val: [{},{},{},{},{}] });
      }
  },
}
</script>

<style lang="scss" scoped>

* {
    font-family: Phetsarath_OT;
}
div.products>div>:not(div) {
  display: none;
}
div.products>div{
    font-size: 0px;
}
div.products .form-actions {
  display: none;
}
div.products h1{
    display: none;
}
div.products button.button.btn.btn-primary{
    display: none;
}
div.products td a{
    display: none;
}
div.products div.product p{
    display: none;
}
.test{
    width: 75%;
}
.content{
    background: white;
}
@media only screen and (max-width: 992px) {
    .test{
        width: 100%;
    }
    div.products div.product{
        padding-top: 100px;
        padding-left: 10px;
    }
    div.products div.product table{
        font-size: 14px;
    }
    div.products div.product.visa{
        
    }
}
</style>
