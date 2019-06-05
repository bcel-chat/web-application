<template>
    <div class="room-container" @scroll="scrolling" id="scroll" ref="scroll_id">
        <div class="spacer"></div>
        <div class="_bb_cnnr">
            <span>
                <transition name="bounce-btndown">
                <div class="_298R6" role="button" @click="toBottom" v-if="scrollBtn" style="transform: scaleX(1) scaleY(1); opacity: 1;">
                    <span class="FJVFR">
                        <span class="OUeyt" style="transform: scaleX(1) scaleY(1); opacity: 1;">1</span>
                    </span>
                    <span data-icon="down" class="">
                        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" width="21" height="21">
                            <path fill="#263238" fill-opacity=".33" d="M4.8 6.1l5.7 5.7 5.7-5.7 1.6 1.6-7.3 7.2-7.3-7.2 1.6-1.6z"></path>
                        </svg>
                    </span>
                </div>
                </transition>
            </span>
            <transition-group                    
                name="custom-classes-transition"
                enter-active-class="animated pulse"
                tag="div"
                class="__bb_cnn"
            >
                <div v-for="(bubble, index) in bubbles" :key="index" style="animation-duration: 0.5s" 
                     :class="[bubble.uid == store.uinfo.uid ? 'p-4' : 'p-12', '_bb_bx']">
                    <span></span>
                    <room-bubble v-if="bubble.type == 'normal'" :owners="owner" :bubbles="bubble"/>
                    <room-bubble-time v-else-if="bubble.type == 'time'" :bubbles="bubble"/>
                    <room-bubble-reply v-else-if="bubble.type == 'reply'" :bubbles="bubble"/>
                    <room-bubble-approve v-else-if="bubble.type == 'approve'" :bubbles="bubble"/>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import ds from "@/helper/deepstream.js"
    import RoomBubble from '@/components/home/chatroom/Room.bubble.vue'
    import RoomBubbleTime from '@/components/home/chatroom/Room.bubble.time.vue'
    import RoomBubbleReply from '@/components/home/chatroom/Room.bubble.reply.vue'
    import RoomBubbleApprove from '@/components/home/chatroom/Room.bubble.approve.vue'
    export default{
        components:{
            RoomBubble,
            RoomBubbleTime,
            RoomBubbleReply,
            RoomBubbleApprove
        },
        data(){
            return{
                moment: this.$moment,
                message: null,
                bubbles: [],
                store: this.$store.getters,
                scrollPosition: 0,
                scrollBtn: false,
                owner1: false,
                owner2: false
            }
        },
        mounted(){
            // let currentScrollPosition = e.srcElement.scrollTop;
            const div = this.$refs.scroll_id
            const height = div.scrollHeight - div.clientHeight - 50
            if (div.scrollTop < height) {
                this.scrollBtn = true
            } else {
                this.scrollBtn = false
            }

            ds.event.subscribe('message', msg=>{
                const cw = this.moment('2019-01-24').isSame(new Date(), 'week')
                let week = '';
                if(cw)
                    week = 'dddd'
                else
                    week = 'DD/MM/YYYY'

                if(this.bubbles.length < 1){
                    this.bubbles = [{
                        uid: this.store.uinfo.uid,
                        type: 'time',
                        time: this.moment(new Date()).calendar(null, {
                            sameDay: '[Today]',
                            lastDay: '[Yesterday]',
                            lastWeek: week,
                            sameElse: 'DD/MM/YYYY'
                        })
                    }]
                }

                ds.event.subscribe('chatroom-'+id, data=>{
                    console.log(data)
                })

                this.bubbles.push(msg)
                const i = this.bubbles.length
                if(i>1){ // Check user
                    const y = this.bubbles.length - 2 // Get before last message
                    if(this.bubbles[y].uid === msg.uid){ // Check last and before last message
                        this.owner1 = true
                    }else{
                        this.owner1 = false
                    }
                }else{
                    this.owner2 = true
                }

                this.$nextTick(()=>{
                   const l = this.bubbles.length
                    if(this.bubbles.uid == this.$store.getters.uinfo.uid){
                        this.toBottom()
                    } else {
                        if(this.scrollBtn == false){
                            this.toBottom()
                        }
                    }
                })
            })
        },  
        methods:{
            scrolling(){
                // let currentScrollPosition = e.srcElement.scrollTop;
                const div = this.$refs.scroll_id
                const height = div.scrollHeight - div.clientHeight - 50
                if (div.scrollTop < height) {
                    this.scrollBtn = true
                }else{
                    this.scrollBtn = false
                }
            },
            toBottom(){
                const div = this.$refs.scroll_id
                div.scrollTop =  div.scrollHeight
            }
        }
    }
</script>

<style lang="scss">
    @import '@/assets/scss/chatroom/room.content.scss';
    @import '@/assets/scss/chatroom/room.bubble.scss';

    .bounce-btndown-enter-active {
        animation: bounce-btndown-in .1s;
    }
    .bounce-btndown-leave-active {
        animation: bounce-btndown-in .2s reverse;
    }
    @keyframes bounce-btndown-in {
        0% {
            transform: scale(0);
        }
        30% {
            transform: scale(1);
        }
        30% {
            transform: scale(1);
        }
    }
</style>