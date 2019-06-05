<template>
<div class="_2vPAk">
    <div class="_3rsak">
        <div class="_2fq0t copyable-area">
            <div class="new-chat">
                <div class="header">
                    <transition name="bounce-pic" class="img-box" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                        <img :src="require('../../../assets/img/bcel.bak.png')" alt="" v-if="bcelPic">
                    </transition>
                    <div class="arrow-box">
                        <div class="arrow" role="button" @click="sideNewChat()">
                            <!-- <span data-icon="back-light" class=""><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#FFF" d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"></path></svg></span> -->
                            <transition name="bounce-pic" class="img-box" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                                <i class="material-icons" v-if="bcelPic">arrow_downward</i>
                            </transition>
                        </div>
                        <div class="txt">
                            <span>New Chat</span>
                        </div>
                    </div>
                </div>
                <div class="_2sNbV">
                <div class="search">
                    <div class="sbox">
                        <div class="siconbox_">
                            <i class="material-icons">search</i>
                        </div>
                        <div class="stxt">
                            <input class="txt" tabindex="0" autofocus v-model="eSearch" ref="search" placeholder="Search Contacts">
                        </div>
                        <div class="siconbox_" role="button" @click="clear()">
                            <transition name="bounce-profile" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                                <i class="material-icons" style="font-size: 1.2em" v-if="clearIcon">clear</i>
                            </transition>
                        </div>
                    </div>
                </div>
                <div class="contact">
                    <button-newgroup/>
                    <transition tag="div" name="slide-list">
                        <contact v-if="bcelPic" />
                    </transition>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Contact from '@/components/home/sidebar/Sidebar.contact.vue'
import ButtonNewgroup from '@/components/home/sidebar/Sidebar.button.newgroup.vue'
import ds from '@/helper/deepstream.js'
export default {
    components: {
        Contact,
        ButtonNewgroup
    },
    data() {
        return {
            bcelPic: false,
            search: '',
            clearIcon: false
        }
    },
    computed: {
        eSearch: {
            get() {
                return this.$store.state.userDetail.searchbox
            },
            set(value) {
                this.$store.dispatch('userDetail/searchbox', value)
            }
        }
    },
    watch: {
        eSearch(value) {
            let sel = 2
            if(value){
               sel = 1
               this.clearIcon = true
            }else{
               sel = 2
               this.clearIcon = false
            }
            ds.rpc.make('getContact', {
                username: value,
                sel: sel,
                uid: this.$store.state.uinfo.uinfo.uid
            }, (err, res) => {
                this.$store.dispatch('userDetail/contact', res)
            })
        }
    },
    mounted() {
        this.$refs.search.focus()
        setTimeout(() => {
            this.bcelPic = true
        }, 250)
    },
    methods: {
        sideNewChat() {
            this.$store.dispatch('userDetail/sidebar', {
                sidenewchat: false
            })
            this.clear()
        },
        clear() {
            this.$store.dispatch('userDetail/searchbox', '')
            this.$refs.search.focus()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/sidebar/sidebar.newchat.scss';

.slide-list-enter-active {
    transition: all .3s ease;
}

.slide-list-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-list-enter,
.slide-list-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
    {
    transform: translateY(15px);
    opacity: 0;
}
</style>
