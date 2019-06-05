<template>
<div class="_2vPAk">
    <div class="_2fq0t copyable-area">
        <div class="pitpy-profile">
            <header class="profile-head">
                <div class="cover-box">
                    <div class="no-img" v-if="noImg">
                        <span >Image not found ☹</span>
                    </div>
                    <img :src="base64" alt=""  class="cover">
                </div>
                <div class="arrow-box">
                    <div class="arrow" role="button" tabindex="-1" @click="sideProfile()">
                        <transition name="bounce-pic" class="img-box" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                            <i class="material-icons" v-if="profilePic">arrow_downward</i>
                        </transition>
                    </div>
                    <div class="txt">
                        <span>New Group</span>
                    </div>
                </div>
                <transition name="bounce-profile" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <div class="pic-box group-box" v-if="profilePic">
                        <div>
                            <div class="upload-box upload-group" title="Upload picture">
                                <label for="file-upload" class="file-upload">
                                    <i class="material-icons">cloud_upload</i>
                                </label>
                                <input id="file-upload" ref="fi" accept=".jpeg,.jpg,.png,.gif,.bmp,.ico,.svg" @change="getUrl(500)" type="file"/>
                            </div>
                            <transition name="bounce-profile" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                                <img class="success-pic group-success" v-if="succ" :src="`data:image/png;base64,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`"/>
                            </transition>
                            <img class="pro-pic group-pic" :src="base64" alt="">
                        </div>
                    </div>
                </transition>
            </header>
            <div class="scroll-able" :style="overflow">
                <!-- <div class=    "name-box"> -->
                <transition tag="div" class="name-box" name="slide-text" enter-active-class="animated slideInDown" leave-active-class="animated slideOutDown">
                    <div class="_2AafV" v-if="profilePic">
                        <div tabindex="-1" class="ogWqZ _31WRs">
                            <span :class="['_2rXhY', editAble ? 'CrwPM' : '']">Group Subject</span>
                            <div class="_2OIDe"></div>
                                <div class="_1DTd4">
                                    <div tabindex="-1" class="_3F6QL bsmJe focused">
                                        <div class="_39LWd" style="visibility: visible;"></div>
                                        <div class="_2S1VP copyable-text selectable-text" @keydown="prevent" contenteditable="true" data-tab="1" dir="ltr" @input="update"></div>
                                    </div>
                                    <span class="_1nooG">
                                        <div class="_2EuwQ">{{CntName}}</div>
                                        <!-- <div class="gUL_D">
                                            <span data-icon="emoji-input" class="">
                                                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
                                                    <path fill="#263238" fill-opacity=".5" d="M9.5 1.7C4.8 1.7 1 5.5 1 10.2s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5zm0 15.9c-4.1 0-7.4-3.3-7.4-7.4s3.3-7.4 7.4-7.4 7.4 3.3 7.4 7.4-3.3 7.4-7.4 7.4z"></path>
                                                    <path fill="#263238" fill-opacity=".5" d="M6.8 9.8c.7-.1 1.2-.7 1.1-1.4-.1-.6-.5-1.1-1.1-1.1-.7 0-1.2.7-1.1 1.4 0 .6.5 1 1.1 1.1zM13.9 11.6c-1.4.2-2.9.3-4.4.4-1.5 0-2.9-.1-4.4-.4-.2 0-.4.1-.4.3v.2c.9 1.8 2.7 2.9 4.7 3 2-.1 3.8-1.2 4.8-3 .1-.2 0-.4-.1-.5h-.2zm-4.1 2c-2.3 0-3.5-.8-3.7-1.4 2.3.4 4.6.4 6.9 0 0 .1-.4 1.4-3.2 1.4zM12.2 9.8c.7-.1 1.2-.7 1.1-1.4-.1-.6-.5-1.1-1.1-1.1-.7 0-1.2.7-1.1 1.4.1.6.5 1 1.1 1.1z"></path>
                                                </svg>
                                            </span>
                                        </div> -->
                                    </span>
                                </div>
                            <div class="_245vA"></div>
                            <div class="_3ukHf">
                                <div class="momMR"></div>
                            </div>
                        </div>
                    </div>
                </transition>
                <span>
                    <transition name="btn-save" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                        <div class="_1ZJYc" style="transform: scale(1); opacity: 1; animation-duration: .2s;" v-if="editAble">
                            <div role="button" class="_3hV1n" @click="save">
                                <span data-icon="checkmark-light" class="">
                                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="#FFF" d="M8 17.1l-5.2-5.2-1.7 1.7 6.9 7L22.9 5.7 21.2 4 8 17.1z"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </transition>
                </span>
                <!-- </div> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ds from '@/helper/deepstream.js'
// import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    props: ['overflow'],
    data() {
        return {
            profilePic: false,
            txtName: this.$store.state.uinfo.uinfo.display,
            txtAbout: this.$store.state.uinfo.uinfo.desc,
            CntName: 0,
            nameMax: 30,
            img: false,
            editAble: false,
            base64: '',
            imageInput: null,
            succ: false,
            noImg: false,
            txtName: ''
        }
    },
    mounted() {
        this.CntAbout = (this.aboutMax - this.txtAbout.length)
        this.CntName = (this.nameMax - this.txtName.length)

        setTimeout(() => {
            this.base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAErCAYAAABkeL7NAAAe5klEQVR4Xu2dibc1R1VHDw6AgkNEhQiBoCRhEAigSCTKLH+zixkEhIRJcIoDiomAKAIqijitnfRzPV5uT3WrT3V177OW6wu+7q7qXdW/W3Xq1KnnhCYBCUigEwLP6aSeVlMCEpBAKFh2AglIoBsCClY3TWVFJSABBcs+IAEJdENAweqmqayoBCSgYNkHJCCBbggoWN00lRWVgAQULPuABCTQDQEFq5umsqISkICCZR+QgAS6IaBgddNUVlQCElCw7AMSkEA3BBSsbprKikpAAgqWfUACEuiGgILVTVNZUQlIQMGyD0hAAt0QULC6aSorKgEJKFj2AQlIoBsCClY3TWVFJSABBcs+IAEJdENAweqmqayoBCSgYNkHJCCBbggoWN00lRWVgAQULPuABCTQDQEFq5umsqISkICCZR+QgAS6IaBgddNUVlQCElCw7AMSkEA3BBSsbprKikpAAgqWfUACEuiGgILVTVNZUQlIQMGyD0hAAt0QULC6aSorKgEJKFj2AQlIoBsCClY3TWVFJSABBcs+IAEJdENAweqmqayoBCSgYNkHJCCBbggoWN00lRWVgAQULPuABCTQDQEFq5umsqISkICCZR+QgAS6IaBgddNUVlQCElCw7AMSkEA3BBSsbprKikpAAgqWfUACEuiGgILVTVNZUQlIQMGyD0hAAt0QULC6aSorKgEJKFj2AQlIoBsCClY3TWVFJSABBcs+IAEJdENAweqmqayoBCSgYNkHJCCBbggoWN00lRWVgAQULPuABCTQDQEFq5umsqISkICCZR+QgAS6IaBgddNUVlQCElCw7AMSkEA3BBSsbprKikpAAgqWfUACEuiGgILVTVNZUQlIQMGyD0hAAt0QULC6aSorKgEJKFj2AQlIoBsCClY3TWVFJSABBcs+IAEJdENAweqmqayoBCSgYNkHJCCBbggoWN00lRWVgAQULPuABCTQDQEFq5umsqISkICCZR+QgAS6IaBgddNUVlQCElCw7AMSkEA3BBSsbprKikpAAgqWfUACEuiGgILVTVNZUQlIQMGyD0hAAt0QULC6aSorKgEJKFj2AQlIoBsCClY3TWVFJSABBcs+IAEJdENAweqmqayoBCSgYO27DzwvIn46In42In4mIl4QEc+P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'
            this.profilePic = true
        }, 250)
    },
    watch: {
        txtAbout() {
            this.CntAbout = (this.aboutMax - this.txtAbout.length)
        },
        txtName() {
            this.CntName = (this.nameMax - this.txtName.length)
        }
    },
    methods: {
        prevent(){
            if(this.txtName.length > 29 && event.keyCode != 8)
                event.preventDefault()
        },
        update(e){
            this.txtName = e.target.innerHTML
            if(this.txtName == '')
                this.editAble = false
            else
                this.editAble = true
        },
        save() {
            ds.rpc.make('setGroupProfile', {
                rid: this.$store.state.chats.roomcheck,
                rname: this.txtName,
                desc: '',
                img: this.base64,
            }, (err, res) => {
                this.saveMsg()
                this.$store.dispatch('userDetail/sidebar', {
                    sidegroupprofile: false
                })
                ds.event.emit(`side/chat}`, {
                    data: 'GO!'
                })
            })
        },
        saveMsg(){
            const msg = {
                rid: this.$store.state.chats.roomcheck,
                uid: this.$store.state.uinfo.uinfo.uid,
                name: this.$store.state.uinfo.uinfo.display,
                message: 'created this group',
                status: '',
                type: 3
            }
            ds.rpc.make('setMessage', msg, (err, res)=>{
                if(err){
                    console.log(err);
                }else{
                    ds.event.emit(`message/${msg.rid}`, res)
                    ds.event.emit(`side/${this.$store.state.chats.reciever.user_id}`,{sts: 'Ok!'})
                    this.$store.dispatch('userDetail/tabs', 1)
                    this.$store.dispatch('userDetail/bgactive', {
                        status: true,
                        rid: msg.rid
                    })
                }
            })
        },
        sideProfile() {
            this.$store.dispatch('userDetail/sidebar', {
                sidenewgroup: true
            })
        },
        getUrl(width) {
            var input = this.$refs.fi;

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (event) => {
                    var img = new Image();

                    var filePath = input.value;
                    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.ico|\.svg)$/i;
                    if (!allowedExtensions.exec(filePath)) {
                        this.base64 = this.alt
                        this.noImg = true
                        this.btnSave = false
                        return
                    }
                    img.onload = () => {
                        if (img.width > width) {
                            var oc = document.createElement('canvas'),
                                octx = oc.getContext('2d');
                            oc.width = img.width;
                            oc.height = img.height;
                            octx.drawImage(img, 0, 0);
                            while (oc.width * 0.5 > width) {
                                oc.width *= 0.5;
                                oc.height *= 0.5;
                                octx.drawImage(oc, 0, 0, oc.width, oc.height);
                            }
                            oc.width = width;
                            oc.height = oc.width * img.height / img.width;
                            octx.drawImage(img, 0, 0, oc.width, oc.height);
                            this.base64 = oc.toDataURL()
                        } else {
                            this.base64 = img.src
                        }
                    };
                    
                    this.base64 = event.target.result
                    img.src = event.target.result;
                };
                reader.readAsDataURL(input.files[0]);
                this.btnSave = true
            }
        }
    }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/sidebar/sidebar.userprofile.scss';
@import '~@/assets/scss/sidebar/sidebar.group.profile.input.scss';
</style>
