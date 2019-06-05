<template>
<div class="pitpy-profile">
    <header>
        <div class="cover-box">
            <img v-if="this.$store.state.chats.reciever.picture != 'no' || !this.$store.state.chats.reciever.picture" :src="this.$store.state.chats.reciever.picture" class="cover">
            <img v-else-if="!this.$store.state.chats.reciever.Upicture" :src="this.$store.state.chats.reciever.upicture" class="cover">
        </div>
        <div class="arrow-box">
            <div class="arrow" role="button" tabindex="-1" @click="sideInfo()">
                <transition name="bounce-pic" class="img-box" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <i class="material-icons" v-if="img">close</i>
                </transition>
            </div>
            <div class="txt">
                <span>Contact info</span>
            </div>
        </div>
        <transition name="bounce-profile" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
            <div class="pic-box" v-if="img" :style="{animationDuration: '.4s'}">
                <img v-if="this.$store.state.chats.reciever.picture != 'no' || !this.$store.state.chats.reciever.picture" :src="this.$store.state.chats.reciever.picture" class="pro-pic">
                <img v-else-if="!this.$store.state.chats.reciever.Upicture" :src="this.$store.state.chats.reciever.upicture" class="pro-pic">
            </div>
        </transition>
    </header>
    <div class="spc"></div>
    <div class="detail-box">
        <transition-group tag="div" class="name-box" name="slide-text" enter-active-class="animated slideInDown" leave-active-class="animated slideOutDown">
            <div class="name-box" :key="1" v-if="img" :style="{animationDuration: '.4s'}">
                <div class="name-content">
                    <div class="uname">{{this.$store.state.chats.reciever.username}}</div>
                    <div class="uabout" :title="`About `+this.$store.state.chats.reciever.username">{{this.$store.state.chats.reciever.desc}}</div>
                </div>
            </div>
            <div class="udetail-box" :key="2" v-if="img" :style="{animationDuration: '.4s'}">
                <div class="udetail-content">
                    <div class="udetail-title">Contact</div>
                    <div class="udetail">
                        <div class="detail"><span>Email:</span> {{this.$store.state.chats.reciever.email}}</div>
                        <div class="detail"><span>Phone:</span> <a :href="`tel:+`+this.$store.state.chats.reciever.mobile"> {{this.$store.state.chats.reciever.mobile}}</a></div>
                    </div>
                </div>
                <div class="udetail-content">
                    <div class="udetail-title">Department/Branch</div>
                    <div class="udetail">
                        <div class="detail">{{this.$store.state.chats.reciever.dept}}/{{this.$store.state.chats.reciever.branch}}</div>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            img: false
        }
    },
    mounted() {
        setTimeout(() => {
            // this.base64 = this.$store.state.uinfo.pic
            this.img = true
        }, 250)
    },
    methods: {
        sideInfo() {
            this.$store.dispatch('userDetail/contactinfo', false)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/sidebar/sidebar.info.scss";
</style>
