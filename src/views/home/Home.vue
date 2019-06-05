<template>
<div class="home-container">
    <div class="app _3dqpi two">
        <span>
            <div tabindex="-1" class="_2uLFU" :style="{top: this.$store.state.userDetail.context.y, left: this.$store.state.userDetail.context.x, transformOrigin: 'left top 0px', transform: 'scale(1)', opacity: '1'}" v-if="this.$store.state.userDetail.contextActive">
                <ul class="_3s1D4">
                    <li tabindex="-1" class="_10anr vidHz _28zBA" data-animate-dropdown-item="true" style="opacity: 1;">
                        <div class="_3lSL5 _2dGjP _1vu-E" role="button" title="Reply">Reply</div>
                    </li>
                    <li tabindex="-1" class="_10anr vidHz _28zBA" data-animate-dropdown-item="true" style="opacity: 1;">
                        <div class="_3lSL5 _2dGjP _1vu-E" role="button" title="Forward message">Forward message</div>
                    </li>
                    <li tabindex="-1" class="_10anr vidHz _28zBA" data-animate-dropdown-item="true" style="opacity: 1;">
                        <div class="_3lSL5 _2dGjP _1vu-E" role="button" title="Star message">Star message</div>
                    </li>
                    <li tabindex="-1" class="_10anr vidHz _28zBA" data-animate-dropdown-item="true" style="opacity: 1;">
                        <div class="_3lSL5 _2dGjP _1vu-E" role="button" title="Delete message">Delete message</div>
                    </li>
                </ul>
            </div>
        </span>
        <div class="MZIyP">
            <div class="_3q4NP k1feT">
                <span class="_2JThb">
                    <div class="sidebar-content">
                        <!-- enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft" -->
                        <transition name="slide-sidebar">
                            <side-user-profile v-if="this.$store.state.userDetail.sidebar.sideprofile" :overflow="profileOverflow" :style="{animationDuration: '0.1s'}"/>
                            <side-new-chat v-else-if="this.$store.state.userDetail.sidebar.sidenewchat" :style="{animationDuration: '.1s'}"/>
                            <side-new-group v-else-if="this.$store.state.userDetail.sidebar.sidenewgroup" :style="{animationDuration: '.1s'}"/>
                            <side-group-profile v-else-if="this.$store.state.userDetail.sidebar.sidegroupprofile" :style="{animationDuration: '.1s'}"/>
                        </transition>
                    </div>
                </span>
            </div>
            <div :class="['_3q4NP', this.$store.state.userDetail.sidebar.sideprofile || this.$store.state.userDetail.sidebar.sidenewchat || this.$store.state.userDetail.sidebar.sidenewgroup || this.$store.state.userDetail.sidebar.sidegroupprofile ? '' : '_1Iexl']">
                <span class="_2JThb">
                    <transition name="slide-up" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
                        <panel-files v-if="this.$store.state.userDetail.filepanel.picture" style="animation-duration: .3s"/>
                    </transition>
                </span>
            </div>
            <div :class="['_3q4NP', '_2yeJ5', this.$store.state.userDetail.contactinfo == 'person' ? 'right-bar' : '']">
                <span class="_2JThb"></span>
            </div>
        </div>
        <div class="home-content">
            <div class="home-part-01" ref="hp01" :class="[this.$store.state.userDetail.sidetochat ? 'side-change' : 'side-change-default']">
                <sideindex />
            </div>
            <div class="home-part-02">
                <welcome v-if="!this.$store.state.authData.rest && !this.$store.state.userDetail.mobile"/>
                <room-main v-else />
                <!-- <flexible-main/> -->
            </div>
            <div :class="[this.$store.state.userDetail.contactinfo == 'person' ? 'enter' : 'leave', this.$store.state.userDetail.mobile ? 'user-info-mobile' : 'user-info']" :style="this.$store.state.userDetail.contactinfo == 'person' && !this.$store.state.userDetail.mobile ? 'width: 30%' : ''">
                <div class="info-box" v-if="this.$store.state.userDetail.contactinfo == 'person'">
                    <sideinfo/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
const RoomMain = () => import('@/components/home/chatroom/Room.main.vue')
const RoomContent = () => import('@/components/home/chatroom/Room.content.vue')
const Welcome = () => import('@/components/home/welcome.vue')
const SideNewChat = () => import('@/components/home/sidebar/Sidebar.NewChat.vue')
const SideNewGroup = () => import('@/components/home/sidebar/Sidebar.NewGroup.vue')
const SideGroupProfile = () => import('@/components/home/sidebar/Sidebar.group.profile.vue')
const SideUserProfile = () => import('@/components/home/sidebar/Sidebar.userprofile.vue')
const sideindex = () => import('@/components/home/sidebar/Sidebar.index.vue')
const sideinfo = () => import('@/components/home/sidebar/Sidebar.info.vue')
const PanelFiles = () => import('@/components/home/chatroom/panel/Files.vue')



const Flexible = () => import('@/components/flexible-interest/fi_flexible_main.vue')

const FlexibleMain = () => import('@/views/flexible-interest/flexible_main.vue')

import ds from '@/helper/deepstream.js'
export default {
    name: 'home',
    components: {
        RoomMain,
        Welcome,
        RoomContent,
        SideNewChat,
        SideNewGroup,
        SideUserProfile,
        SideGroupProfile,
        sideindex,
        sideinfo,
        PanelFiles,
        Flexible,
        FlexibleMain
    },
    data() {
        return {
            chatRoom: null,
            screen: false,
            emoji: null,
            skin: 1,
            todoContext: false,
            isActive: false,
            sideWidth: 0,
            record: null,
            profileOverflow: {
                overflowY: 'auto'
            },
            items: [{
                    name: 'Archive chat'
                },
                {
                    name: 'Archive chat'
                },
                {
                    name: 'Archive chat'
                }
            ]
        }
    },
    created(){
             console.log(this.$router);
        this.detectmob()
    },
    mounted() {

   
        

        const storage = JSON.parse(localStorage.getItem('vuex' || []))
        window.onpopstate = () => {
            const p = this.$route.path
            if (p == '/login')
                this.$router.push('/home')
            else if (!storage.authData.user)
                this.$router.push('/login')
        }

        if(this.detectmob()){
            this.$store.dispatch('userDetail/mobile', true)
        }else{
            this.$store.dispatch('userDetail/mobile', false)
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth < 900) {
                this.$store.dispatch('userDetail/mobile', true)
                this.$store.dispatch('userDetail/sideToChat', true)
            } else {
                this.$store.dispatch('userDetail/mobile', false)
                this.$store.dispatch('userDetail/sideToChat', false)
            }
            this.$store.dispatch('userDetail/sidewidth', this.$refs.hp01.clientWidth)
        });
        // if (window.innerWidth < 900) {

        // } else {

        // }

        this.record = ds.record.getRecord(`chats`)
        this.record.set(`online/${this.$store.state.uinfo.uinfo.uid}`, {
            online: 'online',
        })

        this.$store.dispatch('userDetail/sidewidth', this.$refs.hp01.clientWidth)

        ds.event.subscribe("profile-" + this.$store.state.uinfo.uinfo.uid, res => {
            this.$store.dispatch("uinfo/uinfo", {
                uid: res[0].uid,
                display: res[0].displayname,
                desc: res[0].desc,
            })
            this.$store.dispatch('uinfo/display', res[0].displayname)
            this.$store.dispatch('uinfo/pic', res[0].picture)
        })

        window.addEventListener('beforeunload', () => {
            this.record.set(`online/${this.$store.state.uinfo.uinfo.uid}`, {
                online: `last seen today at ${this.$moment(new Date).format('h:mm A')}`
            })

            ds.rpc.make('updateLastseen', {
                uid: this.$store.state.uinfo.uinfo.uid
            }, (err, res) => {
                if (err)
                    console.log(err)
                else
                    console.log(res);
            })
        }, false)
    },
    methods: {
        disMiss() {
            this.$store.dispatch('userDetail/contextActive', false)
        },
        detectmob() { 
            if( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
            ){
                return true;
            }
            else {
                return false;
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
@import '@/assets/scss/chatroom/panel.files.scss';

.slide-info-enter-active {
    transition: all .1s ease;
}

.slide-info-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-info-enter

/* .slide-fade-leave-active below version 2.1.8 */
    {
    transform: translateX(300px);
    // opacity: 0;
}

.slide-info-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
    {
    transform: translateX(250px);
    // opacity: 0;
}

.animated .slideInUp .slide-up-enter-to{
    animation-direction: .2s;
}

.slide-sidebar-enter-active {
    transition: all .1s ease;
}

.slide-sidebar-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-sidebar-enter

/* .slide-fade-leave-active below version 2.1.8 */
    {
    transform: translateX(-300px);
    // opacity: 0;
}

.slide-sidebar-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
    {
    transform: translateX(-250px);
    // opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>