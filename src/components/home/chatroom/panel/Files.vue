<template>
    <div class="_2vPAk" tabindex="-1" style="height: 100%; transform: translateY(0%);">
        <span class="_3rsak"><div tabindex="-1">
            <div class="_2fq0t _1drQ- copyable-area">
                <div class="_3TSht" style="display: none;"></div>
                <header class="wDFKR">
                    <div class="Ghmsz" data-animate-drawer-title="true">
                        <div class="SFEHG">
                            <button class="_1aTxu" @click="panelClose">
                                <span data-icon="x-light" class="">
                                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="#FFF" d="M19.058 17.236l-5.293-5.293 5.293-5.293-1.764-1.764L12 10.178 6.707 4.885 4.942 6.649l5.293 5.293-5.293 5.293L6.707 19 12 13.707 17.293 19l1.765-1.764z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div class="_1xGbt">Preview</div>
                    </div>
                </header>
                <div class="_2sNbV _3ySAH" tabindex="-1">
                    <div class="NuJ4j">
                        <span>
                            <div class="_3Mxes">
                                <div class="_2k1om" data-animate-attach-media="true" style="opacity: 1; transform: scale(1);">
                                    <div class="xVBLL">
                                        <div class="IuYNx _3E6Ha">
                                            <div style="width: 100%; height: 100%;">
                                                <transition name="show-case" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                                                    <img :src="picture" class="_1a4Ru" v-if="showcase">
                                                </transition>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div class="_18KIe" data-animate-media-caption="true" style="opacity: 1; transform: translateY(0%);">
                            <div tabindex="-1" class="TI3qN _2Mg6D">
                            <span class="_7HWvs">Add a caption…</span>
                            <div class="_2ssn3"></div>
                            <div class="_17XE4">
                                <div class="_1xHCd">
                                    <div class="TSSFW"></div>
                                    <div class="_245vA"></div>
                                </div>
                            </div>
                            <div class="CzI8E">
                                <div tabindex="-1" class="_3F6QL bsmJe _1ZxJu">
                                    <div class="_39LWd" style="visibility: visible;"></div>
                                    <div class="_2S1VP copyable-text selectable-text" contenteditable="true" data-tab="1" dir="ltr" spellcheck="true"></div>
                                </div>
                                <div class="_3MR8o">
                                    <div class="_3GaI4">
                                        <button class="wTdDG">
                                            <span data-icon="emoji-input" class="">
                                                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
                                                    <path fill="#263238" fill-opacity=".5" d="M9.5 1.7C4.8 1.7 1 5.5 1 10.2s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5zm0 15.9c-4.1 0-7.4-3.3-7.4-7.4s3.3-7.4 7.4-7.4 7.4 3.3 7.4 7.4-3.3 7.4-7.4 7.4z"></path>
                                                    <path fill="#263238" fill-opacity=".5" d="M6.8 9.8c.7-.1 1.2-.7 1.1-1.4-.1-.6-.5-1.1-1.1-1.1-.7 0-1.2.7-1.1 1.4 0 .6.5 1 1.1 1.1zM13.9 11.6c-1.4.2-2.9.3-4.4.4-1.5 0-2.9-.1-4.4-.4-.2 0-.4.1-.4.3v.2c.9 1.8 2.7 2.9 4.7 3 2-.1 3.8-1.2 4.8-3 .1-.2 0-.4-.1-.5h-.2zm-4.1 2c-2.3 0-3.5-.8-3.7-1.4 2.3.4 4.6.4 6.9 0 0 .1-.4 1.4-3.2 1.4zM12.2 9.8c.7-.1 1.2-.7 1.1-1.4-.1-.6-.5-1.1-1.1-1.1-.7 0-1.2.7-1.1 1.4.1.6.5 1 1.1 1.1z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                    <div class="_3GaI4 _2IC1c">
                                        <div class="_2IC1c"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
            </div>
                <transition-group class="_3nuGo" name="show-case" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <template v-for="(pic,index) in storePicture">
                        <div :key="index" v-if="showcase" :class="['_2gZno', ind == index ? '_2UCiX' : '']"  role="button" @click="getPicture(pic.file), setActive(index)" style="opacity: 1; display: block; transform-origin: 50% 50% 0px; transform: scaleX(1) scaleY(1);">
                            <div class="_2pAE-" role="button">
                                <span data-icon="x-alt-light" class="">
                                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="24" height="24">
                                    <filter id="NewFilter_1_"><feGaussianBlur in="SourceGraphic" stdDeviation=".1"></feGaussianBlur></filter>
                                    <path d="M17.7 16.4l-4.2-4.2L17.7 8l-1.5-1.5-4.2 4.2-4.2-4.2L6.3 8l4.2 4.2-4.2 4.2 1.5 1.5 4.2-4.2 4.2 4.2z" opacity=".2" filter="url(#NewFilter_1_)"></path>
                                    <path fill="#FFF" d="M17.7 16l-4.2-4.2 4.1-4.2-1.4-1.4-4.2 4.1-4.2-4.2-1.5 1.5 4.1 4.2L6.3 16l1.4 1.4 4.2-4.1 4.2 4.1 1.6-1.4z"></path>
                                </svg>
                                </span>
                            </div>
                            <img :src="pic.file" alt="" class="GpvML"/>
                            
                            <!-- <div class="GpvML" style="background-image: url(&quot;blob:https://web.whatsapp.com/9df9d560-a0b5-419c-987b-9882e2325f29&quot;);"></div> -->
                        </div>
                    </template>
                
                    <label :key="31" for="file-upload" v-if="showcase" class="_1ypOz" role="button" style="opacity: 1; display: block; transform-origin: 50% 50% 0px; transform: scaleX(1) scaleY(1);">
                        <span data-icon="add-alt" class="">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="#19AEF5" d="M20 13.5h-6.5V20h-2.9v-6.5H4v-2.9h6.5V4h2.9v6.5H20v3z"></path>
                            </svg>
                        </span>
                        <div class="Vrmh_">Add file</div>
                    </label>
                </transition-group>
                <span>
                    <div class="_3nfoJ" tabindex="-1" style="transform: scale(1); opacity: 1;">
                        <div role="button" class="_3hV1n yavlE">
                            <span data-icon="send-light" class="">
                                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 24" width="28" height="24">
                                    <path fill="#FFF" d="M5.101 21.757L27.8 12.028 5.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </span>
                <input id="file-upload" ref="fi" accept=".jpeg,.jpg,.png,.gif,.bmp,.ico,.svg"  type="file" multiple style="display: none;" @change="getUrl(1920)">
                </div>
            </div>
        </div>
    </span>
</div>
</template>

<script>
import mixin from '@/mixins/picture.js'
export default {
    mixins: [mixin],
    data(){
        return {
            picture: null,
            showcase: false,
            ind: 0
        }
    },
    mounted(){
        const img = this.$store.state.chats.picture
        setTimeout(() => {
            this.showcase = true
            img.forEach(e => {
                this.picture = this.$store.state.chats.picture[0].file
            });
        }, 500);
    },
    computed:{
        storePicture(){
           return this.$store.state.chats.picture
        }
    },
    methods:{
        panelClose(){
            this.$store.dispatch('userDetail/filepanel', {
                picture: false
            })
           this.$store.dispatch('userDetail/clearfilepath', null)
           this.$store.dispatch('chats/clearpicture', [])
        },
        getPicture(img){
            this.picture = img
        },
        setActive(index){
            this.ind = index
        }
    }
}
</script>
