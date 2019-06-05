<template>
    <div class="sdw bubble-style tail" :class="[bubbles.uid == this.$store.getters.uinfo.uid ? 'message-out' : 'message-in']" @mouseover="bubArr(bubbles.id)" @mouseleave="bubArr(null)">
        <span class="tail-container highlight" v-if="owners == false"></span>
        <div class="bubble">
            <div class="_111ze color-17 _2lc14" role="" v-if="bubbles.uid != this.$store.getters.uinfo.uid">
                <span class="RZ7GO" role="button">{{ bubbles.name }}</span>
            </div>
            <div class="copyable-text">
                <div class="_3zb-j ZhF0n">
                    <span dir="ltr" class="selectable-text invisible-space copyable-text">{{ bubbles.message }}</span>
                </div>
            </div>
            <div class="_2f-RV">
                <div class="_1DZAH">
                    <span class="_1ORuP"></span>
                    <span class="_3EFt_">{{ moment(bubbles.time).format("h:mm A") }}</span>
                    <div class="_32uRw">
                        <span data-icon="msg-dblcheck-ack" v-if="bubbles.uid == this.$store.getters.uinfo.uid">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                <path fill="#4FC3F7" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <span>
            <transition name="slide-fade">
                <div class="_1i1U7 _1UyGF" :class="[bubbles.uid == this.$store.getters.uinfo.uid ? 'jZ4tp-out' : 'jZ4tp-in']" style="opacity: 1;" v-if="arrSt && bubbles.id == arr">
                    <div data-js-context-icon="true" class="_3kN0h" style="transform: translateX(0px);">
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
</template>

<script>
    export default{
        props:{
            bubbles: null,
            owners: false
        },
        data(){
            return {
                moment: this.$moment,
                arr: null,
                arrSt: false
            }
        },
        methods:{
            bubArr(e){
                this.arr = e
                if(e != null){
                    this.arrSt = true
                }else{
                    this.arrSt = false
                }
            }
        }
    }
</script>

<style lang="scss">
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