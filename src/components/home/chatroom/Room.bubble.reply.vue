<template>
    <div class="sdw bubble-style tail" :class="[`message-${bubbles.status}`]" @mouseover="bubArr(bubbles.id)" @mouseleave="bubArr(null)">
        <span class="tail-container"></span>
        <span class="tail-container highlight"></span>
        <div class="bubble">
            <div class="_111ze color-8 _2lc14" role="" v-if="bubbles.status == 'in'">
                <span class="RZ7GO" role="button">Hatty</span>
            </div>
            <div class="_3Usvm copyable-text" data-pre-plain-text="[12:57, 12/12/2018] +856 20 54 314 447: ">
                <div class="_3CVlE">
                    <div class="_21gzc"><span class="_2v3X3"></span>
                        <div class="_1iJeo" role="button"><span class="bg-color-3 EebcE"></span>
                            <div class="_3sEgI">
                                <div class="_1lKj0">
                                    <div class="_111ze color-3" role="button"><span dir="auto" class="_2a1Yw">Lar BCEL</span></div>
                                    <div class="Y9G3K" role="button"><span dir="auto" class="quoted-mention">ໃຜບໍ່ທັນລະໂອນເຂົ້າບັນຊີຂ້ອຍເດີ</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="_3zb-j ZhF0n"><span dir="ltr" class="selectable-text invisible-space copyable-text">Aow la</span></div>
            </div>
            <div class="_2f-RV">
                <div class="_1DZAH"><span class="_1ORuP"></span><span class="_3EFt_">12:57</span></div>
            </div>
        </div>
        <span></span>
    </div>
</template>

<script>
    export default {
        props:{
            bubbles: null
        },
        data(){
            return {
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
