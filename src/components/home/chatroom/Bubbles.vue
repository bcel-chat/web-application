<template>

    <div class="_9tCEa">
        <transition-group name="bounce-profile" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <template v-for="(msg, index) in message">
                
        <!-- <div class="bb-wrapper date-bubbles">
            <div class="bb-container Zq3Mc"><span dir="auto" class="">2/4/2018</span></div>
        </div>

        <div class="bb-wrapper date-bubbles">
            <span></span>
            <div class="bb-container _14b5J Zq3Mc tail"><span class="tail-container"></span><span class="tail-container highlight"></span>
                <div role="button"><span><span dir="ltr" class="">Messages you send to this chat and calls are secured with end-to-end encryption.</span></span></div><span></span></div>
        </div> -->

        <!-- <div class="bb-wrapper date-bubbles">
            <div class="bb-container Zq3Mc"><span dir="auto" class="">2/3/2018</span></div>
        </div> -->

       

        <!--start file bubble -->
        <file-bubble v-if="msg.mtype == 3" :key="index"/>
        <!--end file bubble -->

        <!-- start voice bubbles -->
        <!-- <voice-bubble v-else-if="msg.type === 'voice'"/> -->
        <!-- end voice bubbles -->

         <!-- start normal bubbles -->
        <normal-bubble v-else-if="msg.mtype == 1" :message="msg" :id="getID(index)" :key="index"/>
       
        <!-- end normal bubbles -->

        <!-- start date bubbles -->
        <date-bubble v-else-if="msg.mtype == 4" :message="msg" :key="index"/>
        <!-- start date bubbles -->

        <!-- start right bubbles -->
        <!-- <div class="bb-wrapper _1nHRW">
            <span></span>
            <div class="bb-container _3DFk6 message-out tail">
                <span class="tail-container"></span>
                <span class="tail-container highlight"></span>
                <div class="bb-content">
                    <div class="copyable-text" data-pre-plain-text="[7:46 AM, 2/4/2018] Pitpy BPSS: ">
                        <div class="_3zb-j msg-space">
                            <span dir="ltr" class="selectable-text invisible-space copyable-text">ວ່າ?</span>
                        </div>
                    </div>
                    <div class="time-content">
                        <div class="time-box" role="button">
                            <span class="_1ORuP"></span>
                            <span class="bb-time">7:46 AM</span>
                            <div class="_32uRw">
                                <span data-icon="msg-check" class="">
                                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                        <path fill="#92A58C" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <span></span>
            </div>
        </div> -->
        <!-- start right bubbles -->

        <!-- start voice bubbles right -->
        <!-- <div class="bb-wrapper _1nHRW"><span></span>
            <div class="bb-container _17oKL message-out">
                <div class="_2N_Df LKbsn">
                    <div class="_2jfIu">
                        <div class="_2cfqh">
                            <div class="_1QMEq _22cMG">
                                <div class="E5U9C">
                                    <button class="_2pQE3">
                                        <span data-icon="audio-play" class="">
                                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="34" height="34">
                                                <path fill="#263238" fill-opacity=".5" d="M8.5 8.7c0-1.7 1.2-2.4 2.6-1.5l14.4 8.3c1.4.8 1.4 2.2 0 3l-14.4 8.3c-1.4.8-2.6.2-2.6-1.5V8.7z"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <div class="_1_Gu6">
                                    <div class="DYGf2">0:05</div>
                                    <div class="_1sLSi">
                                        <span class="nDKsM" style="width: 10%;"></span>
                                        <input type="range" class="_3geJ8" min="0" max="100" value="20">
                                        <audio src="blob:https://web.whatsapp.com/0da35c1c-35dd-496d-b6c7-a4fbb20226f3" preload="auto"></audio>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="_1mbqw">
                            <div class="QnDup"><span data-icon="ptt-in-green" class=""><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 26" width="19" height="26"><path fill="#FFF" d="M9.217 24.401c-1.158 0-2.1-.941-2.1-2.1v-2.366c-2.646-.848-4.652-3.146-5.061-5.958l-.052-.357-.003-.081a2.023 2.023 0 0 1 .571-1.492c.39-.404.939-.637 1.507-.637h.3c.254 0 .498.044.724.125v-6.27A4.27 4.27 0 0 1 9.367 1a4.27 4.27 0 0 1 4.265 4.265v6.271c.226-.081.469-.125.723-.125h.3c.564 0 1.112.233 1.501.64s.597.963.571 1.526c0 .005.001.124-.08.6-.47 2.703-2.459 4.917-5.029 5.748v2.378c0 1.158-.942 2.1-2.1 2.1h-.301v-.002z"></path><path fill="#09D261" d="M9.367 15.668a2.765 2.765 0 0 0 2.765-2.765V5.265a2.765 2.765 0 0 0-5.529 0v7.638a2.764 2.764 0 0 0 2.764 2.765zm5.288-2.758h-.3a.64.64 0 0 0-.631.598l-.059.285a4.397 4.397 0 0 1-4.298 3.505 4.397 4.397 0 0 1-4.304-3.531l-.055-.277a.628.628 0 0 0-.629-.579h-.3a.563.563 0 0 0-.579.573l.04.278a5.894 5.894 0 0 0 5.076 4.978v3.562c0 .33.27.6.6.6h.3c.33 0 .6-.27.6-.6V18.73c2.557-.33 4.613-2.286 5.051-4.809.057-.328.061-.411.061-.411a.57.57 0 0 0-.573-.6z"></path></svg></span></div>
                        </div>
                        <div class="_2fuJy">
                            <div class="_1WliW" style="height: 55px; width: 55px;">
                                <img :src="this.$store.state.uinfo.pic" draggable="false" class="Qgzj8 gqwaM" style="visibility: visible;">
                                <div class="_3ZW2E"><span data-icon="default-user" class=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212"><path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path><g fill="#FFF"><path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path></g></svg></span></div>
                            </div>
                        </div>
                    </div>
                    <div class="_27K_5">
                        <div class="time-box">
                            <span class="_1ORuP"></span>
                            <span class="bb-time">8:24 PM</span>
                            <div class="_32uRw">
                                <span data-icon="msg-dblcheck-ack" class="">
                                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                        <path fill="#4FC3F7" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div><span></span>
            </div>
        </div> -->
        <!-- end voice bubbles right -->


        <!-- start right bubbles reply -->
        <!-- <div class="bb-wrapper _1nHRW">
            <span></span>
            <div class="bb-container _3DFk6 message-out">
                <div class="bb-content">
                    <div class="copyable-text" data-pre-plain-text="[7:46 AM, 2/4/2018] Pitpy BPSS: ">
                    <div class="_3CVlE">
                        <div class="_21gzc">
                            <div class="_1iJeo" role="button">
                                <span class="bg-color-2 EebcE"></span>
                                <div class="_3sEgI">
                                    <div class="_1lKj0">
                                        <div class="_111ze color-2" role="button">
                                            <span dir="auto" class="">You</span>
                                        </div>
                                        <div class="Y9G3K" role="button">
                                            <span dir="auto" class="quoted-mention">ຮອດແລ້ວ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="_3zb-j msg-space">
                        <span dir="ltr" class="selectable-text invisible-space copyable-text">ວ່າ?</span>
                    </div>
                    </div>
                    <div class="time-content">
                        <div class="time-box" role="button">
                            <span class="_1ORuP"></span>
                            <span class="bb-time">7:46 AM</span>
                            <div class="_32uRw">
                                <span data-icon="msg-check" class="">
                                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                        <path fill="#92A58C" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <span></span>
            </div>
        </div> -->
        <!-- end right bubbles reply -->
       
        <!-- start image bubbles box -->
        <picture-bubble v-else-if="msg.mtype == 2" :message="msg" :key="index"/>
        <!-- end image bubbles box -->

        <!-- start emoji bubbles box -->
        <!-- <emoji-bubble/> -->
        <!-- end emoji bubbles -->
        </template>
        </transition-group>
    </div>
</template>

<script>
const NormalBubble = () => import('@/components/home/chatroom/bubbles/normal.vue')
const FileBubble = () => import('@/components/home/chatroom/bubbles/file.vue')
const ReplyBubble = () => import('@/components/home/chatroom/bubbles/reply.vue')
const VoiceBubble = () => import('@/components/home/chatroom/bubbles/voice.vue')
const PictureBubble = () => import('@/components/home/chatroom/bubbles/picture.vue')
const EmojiBubble = () => import('@/components/home/chatroom/bubbles/emoji.vue')
const DateBubble = () => import('@/components/home/chatroom/bubbles/date.vue')
import ds from "@/helper/deepstream.js"
export default {
    components:{
        NormalBubble,
        FileBubble,
        ReplyBubble,
        VoiceBubble,
        PictureBubble,
        EmojiBubble,
        DateBubble
    },
    data(){
        return{
            record: null
        }
    },
    mounted(){
        console.log('this is bubble comment');
        
        let rid
            if( this.$store.state.userDetail.tabs == 1)
                rid = this.$store.state.chats.reciever.id
            else 
                rid = this.$store.state.chats.roomcheck

        this.getMsg(rid)
        // ds.event.subscribe(`message/${rid}`, data => {
        //     this.$store.dispatch('chats/message', data)
        // })
    },
    computed:{
        message(){
            return this.$store.state.chats.message
        }
    },
    methods:{
        getID(index){
            let i
            if(index > 0){
               if(this.$store.state.chats.message[index - 1].uid === this.$store.state.chats.message[index].uid){
                   i = true
               }else{
                   i = false
               }
            }
            return i
        },
        getMsg(rid){
            ds.rpc.make('getMessage', {
                rid: rid
            }, (err, res)=>{
                if(err){
                    console.log(err);
                }else{
                    this.$store.dispatch('chats/message', res)
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import '~@/assets/scss/chatroom/bubbles.scss';
.animated.zoomIn, .animated.zoomOut{
    animation-duration: .1s;
}
</style>
