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
                        <span>Your Profile</span>
                    </div>
                </div>
                <transition name="bounce-profile" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <div class="pic-box" v-if="profilePic">
                        <div>
                            <div class="upload-box" title="Upload picture">
                                <label for="file-upload" class="file-upload">
                                    <i class="material-icons">cloud_upload</i>
                                </label>
                                <input id="file-upload" ref="fi" accept=".jpeg,.jpg,.png,.gif,.bmp,.ico,.svg" @change="getUrl(500)" type="file"/>
                            </div>
                            <transition-group name="bounce-pic" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
                                <div class="save-box" title="Save" v-if="btnSave" @click="fileSave" :key="1">
                                    <label for="ico" class="save">
                                        <i class="material-icons" id="ico">save</i>
                                    </label>
                                </div>
                                <div class="cancel-box" title="Cancel" v-if="btnSave" @click="fileCancel" :key="2">
                                    <label for="ico" class="cancel">
                                        <i class="material-icons" id="ico">close</i>
                                    </label>
                                </div>
                            </transition-group>
                            <transition name="bounce-profile" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                                <img class="success-pic" v-if="succ" :src="`data:image/png;base64,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`"/>
                            </transition>
                                <img class="pro-pic" :src="base64" alt="">
                            </div>
                        </div>
                </transition>
            </header>
            <div class="scroll-able" :style="overflow">
                <!-- <div class=    "name-box"> -->
                <transition-group tag="div" class="name-box" name="slide-text" enter-active-class="animated slideInDown" leave-active-class="animated slideOutDown">
                    <div class="name-content" :key="1" v-if="profilePic">
                        <div class="uname-title">Your Name</div>
                        <div class="uname" :style="[!editAble1 ? bd : '']">
                            <input class="name" v-model="txtName" ref="txt1" maxlength="30" :readonly="editAble1"/>
                            <transition-group tag="span" class="icbox" name="bounce-edit" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                                <div class="edit-ico front-ico" style="animation-duration: 0.2s" role="button" @click="edit(1)" v-if="editAble1" :key="1">
                                    <i class="material-icons ics">{{editIcon1}}</i>
                                </div>
                                <div class="edit-ico" role="button" @click="save(1)" v-else :key="2">
                                    <span class="cnt" :key="1">{{CntName}}</span>
                                    <i class="material-icons ics" :key="2">{{editIcon1}}</i>
                                </div>
                            </transition-group>
                        </div>
                    </div>
                    <div class="name-content" :key="2" v-if="profilePic">
                        <div class="uname-title">About</div>
                        <div class="uname" :style="[editAble2 ? bd : '']">
                            <editable :content="{editAble2,txtAbout}" @update="txtAbout = $event" ref="txt2"></editable>
                            <!-- <textarea class="name" v-model="txtAbout" wrap="soft" ref="txt2" maxlength="50" rows="2" cols="10" :readonly="editAble2"/> -->
                            <transition-group tag="span" class="icbox" name="bounce-edit" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                                <div class="edit-ico front-ico" role="button" @click="edit(2)" v-if="!editAble2" :key="1">
                                    <i class="material-icons ics">{{editIcon2}}</i>
                                </div>
                                <div class="edit-ico" role="button" @click="save(2)" v-else :key="2">
                                    <span class="cnt">{{CntAbout}}</span>
                                    <i class="material-icons ics">{{editIcon2}}</i>
                                </div>
                            </transition-group>
                        </div>
                    </div>
                    <div class="sts-content" :key="3" v-if="profilePic">
                        <div class="sts-title">Online</div>
                        <div class="sts-box">
                            <div class="chk-btn">
                                <input type="checkbox" id="chk" v-model="sts">
                                <label for="chk"></label>
                            </div> 
                            <span class="sts-text">{{ sts ? 'Online' : 'Offline' }}</span>
                        </div>
                    </div>
                    <div class="logout-content" :key="4" v-if="profilePic">
                        <div class="btn-box" role="button" @click="logout">
                            <strong>LOGOUT</strong>
                        </div>
                    </div>
                </transition-group>
                <!-- </div> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ds from '@/helper/deepstream.js'
import Editable from '@/components/home/caneditable.vue'
// import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    components: {
        Editable
    },
    props: ['overflow'],
    data() {
        return {
            sts: true,
            profilePic: false,
            txtName: this.$store.state.uinfo.uinfo.display,
            txtAbout: this.$store.state.uinfo.uinfo.desc,
            CntName: 0,
            nameMax: 30,
            CntAbout: 0,
            aboutMax: 50,
            editIcon1: 'create',
            editIcon2: 'create',
            img: false,
            editAble1: true,
            editAble2: false,
            bd: {
                borderBottom: 'solid 1.3px #fc6c6c'
            },
            record: null,
            base64: '',
            imageInput: null,
            btnSave: false,
            succ: false,
            noImg: false,
            record: null
        }
    },
    mounted() {
        this.CntAbout = (this.aboutMax - this.txtAbout.length)
        this.CntName = (this.nameMax - this.txtName.length)

        setTimeout(() => {
            this.base64 = this.$store.state.uinfo.pic
            this.profilePic = true
        }, 250)
        // this.record = ds.record.getRecord(this.$store.state.uinfo.uinfo.uid)
        // this.record.subscribe('data', this.editText, true)
        ds.event.subscribe("profile-" + this.$store.state.uinfo.uinfo.uid, res => {
            this.txtName = res[0].displayname
            this.$store.dispatch("uinfo/uinfo", {
                uid: res[0].uid,
                display: res[0].displayname,
                desc: res[0].desc,
            })
            this.base64 = res[0].picture
            this.$store.dispatch('uinfo/pic', res[0].picture)
        })
        this.record = ds.record.getRecord(`chats`)
    },
    watch: {
        txtAbout() {
            this.CntAbout = (this.aboutMax - this.txtAbout.length)
        },
        txtName() {
            this.CntName = (this.nameMax - this.txtName.length)
        }
    },
    computed: {
        getBase64() {
            return this.$store.state.uinfo.pic
        },
        alt() {
            return 'data:image/png;base64,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'
        }
    },
    methods: {
        edit(e) {
            if (e == 1) {
                this.editAble1 = false
                this.editIcon1 = 'check'
                this.$nextTick(() => {
                    this.$refs.txt1.focus()
                })
            } else {
                this.editAble2 = true
                this.editIcon2 = 'check'
                this.$refs.txt2.setFocus()
            }
        },
        save(e) {
            if (e == 1 && !this.editAble1) {
                this.editAble1 = true
                this.editIcon1 = 'create'
                this.RPC('changeProfile', {
                    uid: this.$store.state.uinfo.uinfo.uid,
                    uname: this.txtName,
                    desc: this.txtAbout,
                    pic: this.base64,
                    sts: 1
                }, e)
            } else if (e == 2 && this.editAble2) {
                this.editAble2 = false
                this.editIcon2 = 'create'
                this.RPC('changeProfile', {
                    uid: this.$store.state.uinfo.uinfo.uid,
                    uname: this.txtName,
                    desc: this.txtAbout,
                    pic: this.base64,
                    sts: 1
                }, e)
            }
        },
        sideProfile() {
            this.$store.dispatch('userDetail/sidebar', {
                sideprofile: false
            })
        },
        editText(data) {
            if (data.uid == this.$store.state.uinfo.uinfo.uid) {
                this.txtName = data.name
                this.txtAbout = data.about
            }
        },
        RPC(name, data, num) {
            ds.rpc.make(name, data, (err, res) => {
                if (err) {
                    this.$toast.open({
                        duration: 5000,
                        message: `Save failed!`,
                        position: 'is-top',
                        type: 'is-danger'
                    })
                } else {
                    if (num === 3) {
                        this.$store.dispatch('uinfo/pic', res[0].picture)
                    } else {
                        this.$store.dispatch("uinfo/uinfo", {
                            uid: res[0].uid,
                            display: res[0].displayname,
                            desc: res[0].desc
                        })
                    }
                }
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
        },
        fileSave() {
            this.RPC('changeProfile', {
                uid: this.$store.state.uinfo.uinfo.uid,
                uname: this.txtName,
                desc: this.txtAbout,
                pic: this.base64,
                sts: 3
            }, 3)
            this.btnSave = false
            this.$refs.fi.value = null
            this.succ = true
            this.noImg = false
            setTimeout(() => {
                this.succ = false
            }, 2000);
        },
        fileCancel() {
            this.btnSave = false
            this.base64 = this.getBase64
            this.$refs.fi.value = null
            this.noImg = false
        },
        logout() {
            this.record.set(`online/${this.$store.state.uinfo.uinfo.uid}`, {
                online: `last seen today at ${this.$moment(new Date).format('h:mm A')}`
            })
            ds.event.unsubscribe('profile-' + this.$store.state.uinfo.uinfo.uid)
            this.$store.dispatch('authData/rest', false)
            this.$store.dispatch('uinfo/uinfo', null)
            this.$store.dispatch('uinfo/pic', null)
            this.$store.dispatch('authData/login', null)
            this.$store.dispatch('userDetail/sidebar', false)
            this.$store.dispatch('userDetail/tabs', 1)
            this.$router.push({
                path: '/login'
            })
            localStorage.removeItem('info.uinfo')
            ds.close()
        }
    }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/sidebar/sidebar.userprofile.scss';
</style>
