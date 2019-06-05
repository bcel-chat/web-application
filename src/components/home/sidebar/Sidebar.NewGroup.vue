<template>
<div class="_2vPAk">
    <div class="_3rsak">
        <div class="_2fq0t copyable-area">
            <div class="new-chat">
                <div :class="['header', this.$store.state.userDetail.members ? 'new-group' : '']">
                    <transition name="bounce-pic" class="img-box" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                        <img :src="require('@/assets/img/bcel.bak.png')" alt="" v-if="bcelPic">
                    </transition>
                    <div class="arrow-box">
                        <div class="arrow" role="button" @click="sideNewChat()">
                            <!-- <span data-icon="back-light" class=""><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#FFF" d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"></path></svg></span> -->
                            <transition name="bounce-pic" class="img-box" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                                <i class="material-icons" v-if="bcelPic">arrow_downward</i>
                            </transition>
                        </div>
                        <div class="txt">
                            <span>Add group participants</span>
                        </div>
                    </div>
                </div>
                <div class="_2sNbV">
                    <div class="selected-contain">
                        <selected-member v-if="this.$store.state.userDetail.members"/>
                    </div>
                    <div class="search">
                        <div class="sbox">
                            <!-- <div class="siconbox_">
                                <i class="material-icons">search</i>
                            </div> -->
                            <div class="stxt">
                                <input class="txt" tabindex="0" autofocus v-model="eSearch" ref="search" placeholder="Type contact name">
                            </div>
                            <div class="siconbox_" role="button" @click="clear()">
                                <transition name="bounce-profile" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                                    <i class="material-icons" style="font-size: 1.2em" v-if="clearIcon">clear</i>
                                </transition>
                            </div>
                        </div>
                    </div>
                    <div class="contact">
                        <transition tag="div" name="slide-list">
                            <contact v-if="bcelPic"/>
                        </transition>
                    </div>
                    <transition name="next-button" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                        <span class="_28Pw9" v-if="this.$store.state.userDetail.members" style="animation-duration: .2s">
                            <div role="button" class="_3hV1n" style="transform: scale(1); opacity: 1;" @click="groupProfile">
                                <span data-icon="forward-light" class="">
                                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30">
                                        <path fill="#FFF" d="M15 7l-1.4 1.4 5.6 5.6H7v2h12.2l-5.6 5.6L15 23l8-8-8-8z"></path>
                                    </svg>
                                </span>
                            </div>
                        </span>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Contact from '@/components/home/sidebar/Sidebar.contact.group.vue'
import SelectedMember from '@/components/home/sidebar/Sidebar.member.selected.vue'
import ds from '@/helper/deepstream.js'
export default {
    components: {
        Contact,
        SelectedMember
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
            ds.rpc.make('getContactGroup', {
                username: value,
                sel: sel,
                uid: this.$store.state.uinfo.uinfo.uid,
                rid: this.$store.state.chats.roomcheck
            }, (err, res) => {
                this.$store.dispatch('userDetail/contactgroup', res)
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
            ds.rpc.make('deleteGroup', {
                rid: this.$store.state.chats.roomcheck
            }, (err, res)=>{
                if(err)
                    console.log(err)
                else
                    console.log('The group has been deleted!')
            })
            this.$store.dispatch('userDetail/sidebar', {
                sidenewchat: true
            })

            this.$store.dispatch('userDetail/members', null)
            this.clear()
        },
        clear() {
            this.$store.dispatch('userDetail/searchbox', '')
            this.$refs.search.focus()
        },
        groupProfile(){
            this.$store.dispatch('userDetail/sidebar', {
                sidegroupprofile: true
            })
            this.$store.dispatch('userDetail/members', null)
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