<template>
    <div class="login-container">
        <div class="login-content">
          <div class="login-part-01">
            <div class="logo-img">
              <img src="../../assets/img/bcel.png" alt="logo">
            </div>
           <!-- <div class="logo-text">Chat Application</div> -->
          </div>
          <div class="login-part-02">
            <div class="login-logo">
              <img src="../../assets/img/bcel.png" alt="logo">
            </div>
            <div class="login-text">
              <span v-if="!isActive">Login</span>
              <span class="login-failed" v-if="isActive">Login Failed!</span>
            </div>
            <section>
              <form @submit.prevent="login">
                <div class="field">
                  <label class="label">User</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" :class="{ 'is-danger': $v.authData.user.$error }" type="text" maxlength="30" placeholder="User" v-model.trim="$v.authData.user.$model" autofocus>
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                    <span class="icon is-small is-right" v-if="$v.authData.user.$error">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                  <p class="help is-danger" v-if="$v.authData.user.$error">User is required</p>
                  <p class="help is-danger" v-if="!$v.authData.user.maxLength">Maximum is 30 charector</p>
                </div>
                
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" :class="{ 'is-danger': $v.authData.password.$error }" type="password" maxlength="30" placeholder="Password" v-model.trim="$v.authData.password.$model">
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                    <span class="icon is-small is-right" v-if="$v.authData.password.$error">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                  <p class="help is-danger" v-if="$v.authData.password.$error">Password is required</p>
                </div>
                <b-field>
                  <button class="button is-primary is-fullwidth mt">Login</button>
                </b-field>
              </form>
            </section>
          </div>
        </div>
    </div>
</template>

<script>
import ds from "@/helper/deepstream.js"
import { required, maxLength } from 'vuelidate/lib/validators'
import debounce from "lodash.debounce"
import {mapState, mapActions} from 'vuex'

export default {
  name: "auth",
  data() {
    return {
      ds: null,
      isActive: false,
      authData: {
        user: 'pitpy',
        password: 'Pitpy@#bceL'
      },
      items:[],
      record: null,
      val: []
    };
  },
  validations() {
    return {
        authData: {
          user: { required, maxLength: maxLength(30) },
          password:  { required, maxLength: maxLength(30) },
      }
    }
  },
  mounted(){
    // this.record = ds.record.getRecord(`online-`+this.$store.state.uinfo.uinfo.uid)
    // this.record.subscribe('users', this.getOnline, true)
  },
  methods: {
      login(){
        this.$v.authData.$touch();
        if (this.$v.authData.$pending || this.$v.authData.$error) return;
        ds.login({
          user: this.authData.user,
          password: this.authData.password
        }, (success, data) =>{
          if(success){
              this.$store.dispatch("authData/login", {
                user: this.authData.user,
                password: this.authData.password
              });

              this.$store.dispatch("uinfo/uinfo", {
                uid: data[0].wlc_id,
                display: data[0].displayname,
                desc: data[0].description
              })

              // this.record.set('users',[{
              //   users: {
              //     uid: this.$store.state.uinfo.uinfo.uid,
              //     online: true
              //   }
              // }])

              this.$store.dispatch('uinfo/pic', data[0].picture)

              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect);
              } else {
                this.$router.push("/");
              }
          }else{
              this.setDelay()
              return
          }
        })
      },
      getOnline(users){
        this.$store.dispatch('online/online', users)
        console.log(this.$store.state.online.online) 
      },
      setDelay() {
        this.debounced = debounce(this.unsetDelay, 5000);
        this.isActive = true;
        this.debounced();
      },
      unsetDelay() {
        this.isActive = false;
      }
  }

};
</script>

<style lang="scss">
  @import '../../assets/scss/login.scss';
</style>