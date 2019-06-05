<template>
    <div class="_1GX8_">
        <div class="YUoyu" data-asset-chat-background="true"></div>
        <room-header />
        <div class="_3zJZ2">
            <div class="copyable-area">
                <transition name="bounce-profile" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <div class="_298R6" role="button" @click="toBottom" v-if="scrollBtn" style="transform: scaleX(1) scaleY(1); opacity: 1;">
                        <span class="FJVFR"></span>
                        <span data-icon="down" class="">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" width="21" height="21">
                                <path fill="#263238" fill-opacity=".33" d="M4.8 6.1l5.7 5.7 5.7-5.7 1.6 1.6-7.3 7.2-7.3-7.2 1.6-1.6z"></path>
                            </svg>
                        </span>
                    </div>
                </transition>
                <div class="_2nmDZ" @scroll="scrolling" ref="scroll_id">
                    <div class="wml2-"></div>
                    <div class="_9tCEa">
                        <div v-for="(msg, index) in message" :key="index">
                            <date-bubble v-if="checkTime(index, msg.time) != null" :message="msg.time" :key="msg.id"/>
                            <alert-created v-if="msg.mtype == 3" :message="msg" :key="msg.id"/>
                            <alert-added v-if="msg.mtype == 3" :message="msg" :key="msg.id"/>
                            <normal-bubble v-if="msg.mtype == 1" :message="msg" :time="checkTime(index, msg.time)" :id="getID(index)" :key="index"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="grGJn" style="height: 320px;"></div> -->
        <room-footer />
    </div>
</template>

<script>
const RoomHeader = () => import('@/components/home/chatroom/Room.header.vue')
// const Bubbles = () => import('@/components/home/chatroom/Bubbles.vue')
const RoomFooter = () => import('@/components/home/chatroom/Room.footer.vue')
const NormalBubble = () => import('@/components/home/chatroom/bubbles/normal.vue')
const FileBubble = () => import('@/components/home/chatroom/bubbles/file.vue')
const ReplyBubble = () => import('@/components/home/chatroom/bubbles/reply.vue')
const VoiceBubble = () => import('@/components/home/chatroom/bubbles/voice.vue')
const PictureBubble = () => import('@/components/home/chatroom/bubbles/picture.vue')
const EmojiBubble = () => import('@/components/home/chatroom/bubbles/emoji.vue')
const DateBubble = () => import('@/components/home/chatroom/bubbles/date.vue')
const AlertCreated = () => import('@/components/home/chatroom/bubbles/alertCreated.vue')
const AlertAdded = () => import('@/components/home/chatroom/bubbles/alertAdded.vue')

import ds from "@/helper/deepstream.js"
export default {
    components: {
        RoomHeader,
        RoomFooter,
        NormalBubble,
        FileBubble,
        ReplyBubble,
        VoiceBubble,
        PictureBubble,
        EmojiBubble,
        DateBubble,
        AlertCreated,
        AlertAdded
    },
    data() {
        return {
            scrollBtn: false,
            loadingPercent: 0,
            loadTime: 0,
            interval: null,
            onupdate: null,
            listNum: 300,
            showList: 300,
            display: false,
            moment: this.$moment,
            timeLoop: 0
        }
    },
    mounted() {
        let rid

        if (this.$store.state.userDetail.tabs == 1)
            rid = this.$store.state.chats.reciever.id
        else
            rid = this.$store.state.chats.roomcheck

        this.getMsg(rid)

        setTimeout(() => {
            if(!this.scrollBtn)
                this.toBottom()
        }, 300);
    },
    computed: {
        message() {
            setTimeout(() => {
                if(!this.scrollBtn)
                    this.toBottom()
            }, 100);
            return _.reverse(this.$store.state.chats.message)
        },
        getRoomId() {
            let rid
            if (this.$store.state.userDetail.tabs == 1)
                rid = this.$store.state.chats.reciever.id
            else
                rid = this.$store.state.chats.roomcheck

            return rid
        },
        getScrollTop(){
            const div = this.$refs.scroll_id
            const height = div.scrollHeight - div.clientHeight
            return height
        }
    },
    methods: {
        getID(index) {
            let i
            if (index > 0) {
                if (this.$store.state.chats.message[index - 1].uid === this.$store.state.chats.message[index].uid) {
                    i = true
                } else {
                    i = false
                }
            }
            return i
        },
        getMsg(rid) {
            var flipped
            ds.rpc.make('getMessage', {
                rid: rid
            }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    this.$store.dispatch('chats/message', res)
                }
            })
        },
        scrolling() {
            const div = this.$refs.scroll_id
            const height = div.scrollHeight - div.clientHeight
            if (div.scrollTop < height) {
                this.scrollBtn = true
            } else {
                this.scrollBtn = false
            }
        },
        toBottom() {
            let div = this.$refs.scroll_id
            div.scrollTop = div.scrollHeight - div.clientHeight
        },
        checkTime(index, mydate) {
            let i
            if (index > 0) {
                if (this.moment(this.$store.state.chats.message[index - 1].time).format('YYYY-MM-DD') == this.moment(this.$store.state.chats.message[index].time).format('YYYY-MM-DD')) {
                    i = null
                } else {
                    i = mydate
                }
            }else{
                i = mydate
            }
            return i
        }
    }
}
</script>

<style lang="scss">
@import '~@/assets/scss/chatroom/room.main.scss';

// .animated.zoomIn {
//     animation-duration: .1s;
// }

@import '~@/assets/scss/chatroom/bubbles.scss';
.animated.zoomIn{
    animation-duration: .2s;
}
.animated.zoomOut{
    animation-duration: .3s;
}
</style>
