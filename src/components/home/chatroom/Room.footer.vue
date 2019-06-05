<template>
<footer class="_2tW_W">
    <div class="_3pkkz copyable-area">
        <div class="weEq5" style="will-change: width;">
            <div data-state="closed" class="mYCYF _3svz5">
                <div tabindex="-1" class="_1x_c3 _35Ob4 kQJNA _2-5II _338za" data-tab="4">
                    <button class="ory3u">
                        <span data-icon="smiley" class="">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="weEq5" style="will-change: width;">
            <div data-state="closed" class="mYCYF _3svz5">
                <div tabindex="-1" class="_1x_c3 _35Ob4 kQJNA _2-5II _338za" data-tab="4">
                    <label for="file-upload" class="ory3u" role="button">
                        <span data-icon="smiley" class="">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="15 0 50 35" width="60" height="60">
                                <path opacity=".45" fill="#263238" d="M33.9 33.9H19.1c-1 0-1.9-.8-1.9-1.9V21c0-1 .8-1.9 1.9-1.9h14.8c1 0 1.9.8 1.9 1.9v11c-.1 1.1-.9 1.9-1.9 1.9zm-2.2-12c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zm1.9 8L28.9 27l-2.4 1.2-4.7-3.5-2.4 2.3v4.7h14.2v-1.8z"></path>
                            </svg>
                        </span>
                    </label>
                    <input id="file-upload" ref="fi" accept=".jpeg,.jpg,.png,.gif,.bmp,.ico,.svg" type="file" multiple @change="getUrl(1920)"/>
                </div>
            </div>
        </div>
        <div class="weEq5" style="will-change: width;">
            <div data-state="closed" class="mYCYF _3svz5">
                <div tabindex="-1" class="_1x_c3 _35Ob4 kQJNA _2-5II _338za" data-tab="4">
                    <button class="ory3u">
                        <span data-icon="smiley" class="">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="15 0 55 20" width="60" height="60">
                                <path opacity=".45" fill="#263238" d="M21.4 16.3c-1.1 0-2 .9-2 2v15.6c0 1.1.9 2 2 2h11.7c1.1 0 2-.9 2-2V22.1l-5.9-5.9-7.8.1zm6.8 6.1v-4.7l5.4 5.4h-4.8c-.4 0-.6-.3-.6-.7z"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="_1Plpp">
            <div class="_3F6QL _2WovP">
                <div class="_39LWd" :style="{visibility: visibility}">Type a message</div>
                <div class="_2S1VP copyable-text selectable-text" @input="update" @keydown="inputHandler" ref="input" contenteditable="true" data-tab="1" dir="ltr" spellcheck="true"></div>
            </div>
        </div>
        <div class="weEq5">
            <div class="_1UWg0" v-if="send">
                <span>
                    <button class="_2SbJ1">
                        <span data-icon="ptt" class="">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="#263238" fill-opacity=".45" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path>
                            </svg>
                        </span>
                    </button>
                </span>
            </div>
            <button class="_35EW6" @click="sendMsg" v-else>
                <span data-icon="send" class="">
                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="#263238" fill-opacity=".45" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
                    </svg>
                </span>
            </button>
        </div>
    </div>
    <!-- <emoji-panel v-if="emoji" /> -->
</footer>
</template>

<script>
const EmojiPanel = () => import('@/components/home/chatroom/Emoji.panel.vue')
import ds from "@/helper/deepstream.js"
import moment from 'moment'
import mixin from '@/mixins/picture.js'
export default {
    mixins: [mixin],
    components: {
        EmojiPanel
    },
    data() {
        return {
            emoji: false,
            input: null,
            send: true,
            message: null,
            record: null,
            visibility: 'visible',
            clearType: '',
            moment: moment,
            base64: null
        }
    },
    mounted() {
        this.recordName = `chats`
        this.record = ds.record.getRecord(this.recordName)
        // this.record.subscribe('data',this.getData, true)
        this.clearType = _.debounce(this.clear, 500)

        this.onMatch
    },
    computed:{
        inputAgent(){
            return this.$store.state.userDetail.filepanel.picture
        }
    },
    methods: {
        update(e){
            this.input = e.target.innerText
            if (e.target.innerText) {
                this.visibility = 'hidden'
                this.send = false
            } else {
                this.visibility = 'visible'
                this.send = true
            }

           this.sendTyping()
        },
        inputHandler(e) {
            if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault()
                this.sendMsg()
            }
        },
        sendTyping(){
            this.record.set(`typing/${this.$store.state.chats.reciever.id}`, {
                receive: this.$store.state.chats.reciever.user_id,
                sender: this.$store.state.uinfo.uinfo.uid,
                type:  `typing...`
            })
            this.clearType()
        },
        clear(){
            this.record.set(`typing/${this.$store.state.chats.reciever.id}`, {
                receive: this.$store.state.chats.reciever.uid,
                sender: this.$store.state.uinfo.uinfo.uid,
                type: ''
            })
        },
        sendMsg() {
            let rid
            if( this.$store.state.userDetail.tabs == 1)
                rid = this.$store.state.chats.reciever.id
            else
                rid = this.$store.state.chats.roomcheck
 
            const msg = {
                rid: rid,
                uid: this.$store.state.uinfo.uinfo.uid,
                name: this.$store.state.uinfo.uinfo.display,
                message: this.input,
                status: '',
                type: 1
            }
            if (!this.send || this.input.trim()) {
                this.saveMsg(msg)
                // ds.event.emit(`message/${rid}`, msg)
                this.activeRoom()
                this.$refs.input.innerHTML = null
                this.visibility = 'visible'
                this.send = true
                this.input = ''
            }
        },
        activeRoom(){
            let rid
            if( this.$store.state.userDetail.tabs == 1)
                rid = this.$store.state.chats.reciever.id
            else 
                rid = this.$store.state.chats.roomcheck
            
            ds.rpc.make('activeRoom', {
               rid: rid
            }, (res) => {
                console.log("Ok!");
            })
        },
        saveMsg(msg){
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
        panel(e){
            if(e == 1){

            }else if(e == 2){
                this.$store.dispatch('userDetail/filepanel', {
                    picture: true
                })
            }else{

            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/chatroom/room.footer.scss';
</style>
