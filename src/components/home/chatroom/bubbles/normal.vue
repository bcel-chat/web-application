<template>
<div :class="['bb-wrapper', 'mb-2']">
    <span></span>
    <div class="bb-container _3DFk6" :class="[message.uid === this.$store.state.uinfo.uinfo.uid ? 'message-out' : 'message-in', !id || time ? 'tail' : '']" @mouseover="bubArr(message.mid)" @mouseleave="OutArr(message.mid)">
        <span v-if="!id || time" class="tail-container"></span>
        <span v-if="!id || time" class="tail-container highlight"></span>
        <div class="bb-content">
            <div class="_111ze color-5 _2lc14" role="" v-if="message.uid != this.$store.state.uinfo.uinfo.uid && this.$store.state.chats.reciever.type == 2">
                <span class="RZ7GO" role="button">{{message.name}}</span>
                <span dir="auto" class="_3Ye_R _1wjpf _1OmDL">BCEL</span>
            </div>
            <div class="copyable-text">
                <div class="_3zb-j msg-space">
                    <span dir="auto" class="selectable-text invisible-space copyable-text">{{message.message}}</span>
                </div>
            </div>
            <div class="time-content">
                <div class="time-box">
                    <span class="_1ORuP"></span>
                    <span class="bb-time">{{ moment(message.time).format('h:mm A') }}</span>
                     <div class="_32uRw" v-if="message.uid === this.$store.state.uinfo.uinfo.uid">
                        <transition name="flip" enter-active-class="animated flipInY" leave-active-class="animated flipOutY">
                        <span data-icon="msg-check" class="" v-if="message.read == 0 && !getOnline">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                <path fill="#92A58C" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                            </svg>
                        </span>
                         <span data-icon="msg-dblcheck" class="" v-else-if="message.read == 0 && getOnline">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                <path fill="#92A58C" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                            </svg>
                        </span>
                        <span data-icon="msg-dblcheck-ack" class="" v-else-if="message.read > 0">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                <path fill="#8E0B0B" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                            </svg>
                        </span>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <span>
            <transition name="slide-fade">
                <div :class="[message.uid === this.$store.state.uinfo.uinfo.uid ? 'out':'in', '_1i1U7', '_1UyGF']" style="opacity: 1;" v-if="arrSt && message.mid == arr">
                    <div data-js-context-icon="true" class="_3kN0h" style="transform: translateX(0%);" @click="getYX">
                        <span data-icon="down-context" class="">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                <path fill-opacity=".45" d="M3.3 4.6L9 10.3l5.7-5.7 1.6 1.6L9 13.4 1.7 6.2l1.6-1.6z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </transition>
        </span>
    </div>
</div>
</template>

<script>
import ds from "@/helper/deepstream.js"
export default {
    props:{
        message: null,
        id: null,
        time: null,
        btnbottom: null
    },
    data(){
        return {
            moment: this.$moment,
            arr: null,
            arrSt: false,
            record: null
        }
    },
    created(){
        this.setRead(this.$props.message)
    },
    updated(){
    //    this.setRead(this.$props.message)
    },
    computed: {
        getOnline(){
            if (this.$store.state.chats.online == null)
                return true
            else if (this.$store.state.chats.online.online == 'online')
                return true
            else
                return false
        }
    },
    methods:{
        bubArr(e){
            this.arr = e
            if(e){
                this.arrSt = true
            }
        },
        OutArr(e){
            this.arr = e
            if(e && this.$store.state.userDetail.contextActive){
                this.arrSt = true
            }else{
                this.arrSt = false
            }
        },
        getYX(e){
            let info = {
                x: `${e.pageX - 5}px`,
                y: `${e.pageY + 10}px`
            }
            this.$store.dispatch('userDetail/context', info)
            this.$store.dispatch('userDetail/contextActive', true)
        },
        setRead(val){
            if(val.uid != this.$store.state.uinfo.uinfo.uid){
                ds.rpc.make('setRead', {
                    cid: val.mid,
                    uid: this.$store.state.uinfo.uinfo.uid,
                    rid: val.rid
                }, (err, res) => {
                    if(err)
                        console.log(err)
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
    transition: all .1s ease;
}
.slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
    transform: translateX(5px);
    opacity: 0;
}
</style>
