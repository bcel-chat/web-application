<template>
    <div class="">
        <div class="fi-login">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-6 col-md-5 col-lg-3 fi-body">
                        <div class="fi-header">
                            <img class="img-logo" src="@/assets/flexible_interest/images/ic-logo.png" alt="Logo" width="100">
                        </div>
                        <div class="fi-input text-left">
                            <label for="userId">ລະຫັດເຂົ້າສູ່ລະບົບ</label>
                            <br>
                            <input type="text" v-model="userId" id="userId" required autocomplete="off" placeholder="User ID">
                            <br>
                            <span v-if="errorMessage" style="color: white; font-size: 12px;">({{errorMessage}})</span>
                        </div>
                        <div class="fi-footer text-right">
                            <button class="fi-btn" type="button" @click="doLogin()">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ds from '@/helpler/ds.js'
export default {
  name: 'login',
  data(){
      return {
          userId: '',
          errorMessage: ''
      }
  },
  mounted(){
  },
  destroyed(){
    window.sessionStorage.removeItem('login');
  },
  methods: {
    doLogin(){
        if(this.userId.trim()){
            ds.rpc.make('/bcel/api/flexible/interest/current/user', { userId: this.userId}, ( error, result ) => {
                if(result)
                {
                    if(result['userId']){
                        console.log(result);
                        this.$store.commit('flexible_interest_module/addLoginUser', { user: result['userId'] });
                        window.sessionStorage.setItem('user', result['userId']);
                        if(((result['permission'] == 1) || (result['permission'] == 2))) {
                            window.sessionStorage.setItem('permission', 'true');
                            this.$router.push({path: sessionStorage.getItem('flexible_root_router')+'/flexible/leader/approve'});
                        } else if(result['permission'] == 3) {
                            window.sessionStorage.setItem('permission', 'report');
                            this.$router.push({path: sessionStorage.getItem('flexible_root_router')+'/flexible/report/pending/all'});
                        } else  {
                            window.sessionStorage.setItem('permission', 'false');
                            this.$router.push({path: sessionStorage.getItem('flexible_root_router')+'/flexible/staff/progress/info'});
                        }
                    }  else {
                        this.$root.$emit("resetDefault");
                        //this.$router.back();
                        this.errorMessage = 'ລະຫັດບໍ່ຖືກຕ້ອງ';
                    }
                }  else if(error) {
                    this.$root.$emit("resetDefault");
                    //this.$router.back();
                    console.log(error)
                        this.errorMessage = 'ເກີດຂໍ້ຜິດພາດໃນຂະນະເຂົ້າລະບົບ';
                } else {
                        this.errorMessage = 'ລະຫັດບໍ່ຖືກຕ້ອງ';
                }
            });
        } else {
            this.errorMessage = 'ລະຫັດຫ້າມວ່າງ...';
        }
    },
  },
}
</script>

<style lang="scss" scoped>
    .fi-login {
        position: absolute;
        width: 96%;
        left: 2%;
        top: 50%;
        margin-top: -140px;
    }
    .fi-body{
        background: linear-gradient(to bottom right, rgba(233, 111, 95, 0.918) 10%, #A42C35 200%);
        color: white;
        border-radius: 5px;
    }
    .img-logo{
        margin-top: -55px;
    }
    .fi-btn{
        margin-top: 5px;
        margin-bottom: 10px;
        background: #C72B2C;
        color: white;
        border: none;
        border-radius: 3px;
        width: 6rem;
        font-size: 1rem;
    }
    .fi-btn:hover{
        background: #A42C35;
    }
    input{
        width: 100%;
        padding-left: 1px;
        background: transparent;
        color: white;
        border: none;
        padding-right: 5px;
        font-size: 18px;
    }
    input:focus, button:focus{
        outline: none;
    }
    input:focus, input:valid{
        border-bottom: 2px rgb(211, 208, 208) solid;
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
</style>
