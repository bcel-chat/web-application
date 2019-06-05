<template>
    <div class="RLfQR">
        <transition-group name="flip-list">
        <div :class="['_2wP_Y', store.userDetail.bgactive.status && store.userDetail.bgactive.rid == item.id ? 'shadow-active' : '']" style="z-index: 121; height: 72px; transition: none 0s ease 0s;" v-for="(item, index) in rooms" :key="index">
            <div tabindex="-1" @mouseover="mouseOver(item.id)" @mouseleave="mouseLeave(item.id)">
                <div :class="['_2EXPL', 'CxUIE', store.userDetail.bgactive.status && store.userDetail.bgactive.rid == item.id ? 'bgactive' : '']"  @click.self="getContact(item)">
                    <div class="dIyEr" @click="getContact(item)">
                        <div class="_1WliW" style="height: 49px; width: 49px;">
                            <img :src="item.upicture" alt="" v-if="item.type == 1" draggable="false" class="Qgzj8 gqwaM" style="visibility: visible;">
                            <img :src="item.picture" alt="" v-else-if="item.type == 2" draggable="false" class="Qgzj8 gqwaM" style="visibility: visible;">
                            <div class="_3ZW2E">
                                <span data-icon="default-user" class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                        <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path><g fill="#FFF">
                                        <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path></g>
                                    </svg>
                                </span>
                                <span data-icon="default-group" class="">
                                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                        <path fill="#DFE5E7" d="M105.946.25C164.318.25 211.64 47.596 211.64 106s-47.322 105.75-105.695 105.75C47.571 211.75.25 164.404.25 106S47.571.25 105.946.25z"></path>
                                        <path fill="#FFF" d="M61.543 100.988c8.073 0 14.246-6.174 14.246-14.246s-6.173-14.246-14.246-14.246-14.246 6.173-14.246 14.246 6.174 14.246 14.246 14.246zm8.159 17.541a48.192 48.192 0 0 1 8.545-6.062c-4.174-2.217-9.641-3.859-16.704-3.859-21.844 0-28.492 15.67-28.492 15.67v8.073h26.181l.105-.248c.303-.713 3.164-7.151 10.365-13.574zm80.755-9.921c-6.854 0-12.21 1.543-16.336 3.661a48.223 48.223 0 0 1 8.903 6.26c7.201 6.422 10.061 12.861 10.364 13.574l.105.248h25.456v-8.073c-.001 0-6.649-15.67-28.492-15.67zm0-7.62c8.073 0 14.246-6.174 14.246-14.246s-6.173-14.246-14.246-14.246-14.246 6.173-14.246 14.246 6.173 14.246 14.246 14.246zm-44.093 3.21a23.21 23.21 0 0 0 4.464-.428c.717-.14 1.419-.315 2.106-.521 1.03-.309 2.023-.69 2.976-1.138a21.099 21.099 0 0 0 3.574-2.133 20.872 20.872 0 0 0 5.515-6.091 21.283 21.283 0 0 0 2.121-4.823 22.16 22.16 0 0 0 .706-3.193c.16-1.097.242-2.224.242-3.377s-.083-2.281-.242-3.377a22.778 22.778 0 0 0-.706-3.193 21.283 21.283 0 0 0-3.272-6.55 20.848 20.848 0 0 0-4.364-4.364 21.099 21.099 0 0 0-3.574-2.133 21.488 21.488 0 0 0-2.976-1.138 22.33 22.33 0 0 0-2.106-.521 23.202 23.202 0 0 0-4.464-.428c-12.299 0-21.705 9.405-21.705 21.704 0 12.299 9.406 21.704 21.705 21.704zM145.629 131a36.739 36.739 0 0 0-1.2-1.718 39.804 39.804 0 0 0-3.367-3.967 41.481 41.481 0 0 0-3.442-3.179 42.078 42.078 0 0 0-5.931-4.083 43.725 43.725 0 0 0-3.476-1.776c-.036-.016-.069-.034-.104-.05-5.692-2.581-12.849-4.376-21.746-4.376-8.898 0-16.055 1.795-21.746 4.376-.196.089-.379.185-.572.276a43.316 43.316 0 0 0-3.62 1.917 42.32 42.32 0 0 0-5.318 3.716 41.501 41.501 0 0 0-3.443 3.179 40.632 40.632 0 0 0-3.366 3.967c-.452.61-.851 1.186-1.2 1.718-.324.493-.6.943-.841 1.351l-.061.101a27.96 27.96 0 0 0-.622 1.119c-.325.621-.475.975-.475.975v11.692h82.53v-11.692s-.36-.842-1.158-2.195a35.417 35.417 0 0 0-.842-1.351z"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="_3j7s9" @click.self="getContact(item)">
                        <div class="_2FBdJ">
                            <div class="_25Ooe" @click="getContact(item)">
                                <span dir="auto" v-if="item.type == 1" title="BCEL family 2018m" class="_1wjpf _clr">{{item.username}}</span>
                                <span dir="auto" v-else-if="item.type == 2" title="BCEL family 2018m" class="_1wjpf _clr">{{item.name}}</span>
                            </div>
                            <div class="_3Bxar" @click="getContact(item)">
                                <span class="_3T2VG">{{checkTime(item.lastseen)}}</span>
                                <!-- <span v-else-if="item.type == 2" class="_3T2VG">12:45 PM</span> -->
                            </div>
                        </div>
                        <div class="_1AwDx" @click.self="getContact(item)">
                            <div class="_itDl">
                                <span class="_2_LEW" :title="item.bubble" @click="getContact(item)">
                                    <span class="_1bX-5" v-if="store.chats.reciever.type == 2 && item.bubble_type != 3 && item.bubble_uid != store.uinfo.uinfo.uid && item.name != ''">
                                        <span class="_ita">{{item.bubble_name}}:</span>
                                    </span>
                                    <span :class="['_1wjpf', '_3NFp9', item.hasread > 0 ? 'textbold' : '']" v-if="item.bubble_type == 3">{{nameCompare(item)}}</span>
                                    <span :class="['_1wjpf', '_3NFp9', item.hasread > 0 ? 'textbold' : '']" v-else>{{item.bubble}}</span>
                                </span>
                            </div>
                            <div class="_3Bxar" @click.self="getContact(item)">
                                <span @click="getContact(item)" v-if="item.hasread > 0">
                                    <div class="_15G96" style="transform: scaleX(1) scaleY(1); opacity: 1;">
                                        <span class="OUeyt">{{item.hasread}}</span>
                                    </div>
                                </span>
                                <span></span>
                                <span>
                                <transition name="slide-fade-arrow">
                                    <div class="ZR5SB" style="width: 20px; opacity: 1;" @click="getYX" v-if="arrSt && item.id == arr">
                                        <span data-icon="down" class="">
                                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" width="21" height="21">
                                                <path fill="#263238" fill-opacity=".33" d="M4.8 6.1l5.7 5.7 5.7-5.7 1.6 1.6-7.3 7.2-7.3-7.2 1.6-1.6z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </transition>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </transition-group>
    </div>
</template>

<script>
import ds from '@/helper/deepstream.js'
export default {
    data() {
        return {
            moment: this.$moment,
            br_t: true,
            br_b: true,
            rid: null,
            user_detail: [],
            isActive: null,
            rooms: null, 
            rid: null,
            record: null,
            arr: null,
            arrSt: false,
        }
    },
    mounted() {
        this.record = ds.record.getRecord(`chats`)
        this.getRoom()

        ds.event.subscribe(`side/chat}`, (data)=>{
            setTimeout(() => {
                this.getRoom()
            }, 500);
        })
    },
    computed:{
        store(){
            return this.$store.state
        }
    },
    methods: {
        getRoom(){
            ds.rpc.make('getRoom', {
                id: this.store.uinfo.uinfo.uid
            }, (err, res) => {
                this.rooms = res
            })
        },
        getContact(e){

            this.mobilech()

            this.$store.dispatch('userDetail/bgactive', {
                status: true,
                rid: e.id
            })

            if(this.$store.state.chats.reciever.id != undefined)
                ds.event.unsubscribe(`message/${this.$store.state.chats.reciever.id}`)

            this.record.unsubscribe(`typing/${this.$store.state.chats.reciever.id}`)
            this.$store.dispatch('chats/reciever', e)
            this.$store.dispatch('authData/rest', true)
            this.getMsg(e.id, 1)
            ds.event.subscribe(`message/${e.id}`, data => {
                this.$store.dispatch('chats/message', data)
                setTimeout(() => {
                    this.getMsg(e.id, 2)
                }, 100);
            })

            this.record.subscribe(`typing/${e.id}`, this.getTyping, true)

            if(e.type == 1){
                this.record.subscribe(`online/${this.$store.state.chats.reciever.user_id}`, data => {
                this.$store.dispatch('chats/online', data)
                }, true)
            }
        },
        getTyping(data) {
            if(data){
                if(data.sender != this.$store.state.uinfo.uinfo.uid){
                    this.$store.dispatch('chats/typing', data.type)
                    localStorage.setItem('partner', data.sender)
                }
            }
        },
        getMsg(rid, i){
            ds.rpc.make('getMessage', {
                rid: rid
            }, (err, res)=>{
                if(err){
                    console.log(err);
                }else{
                    this.$store.dispatch('chats/message', res)
                    if(i==1)
                        ds.event.emit(`scroll/${rid}`, true)
                }
            })
        },
        getRid(e) {
            ds.event.emit('getRid', {
                rid: e
            })
        },
        activeroom(index) {
            this.isActive = index
            this.$store.dispatch('auth/rest', true)
        },
        mouseOver(e) {
           this.arr = e
            if(e){
                this.arrSt = true
            }
        },
        mouseLeave(e) {
             this.arr = e
            if(e && this.$store.state.userDetail.contextActive){
                this.arrSt = true
            }else{
                this.arrSt = false
            }
        },
        detail(e) {
            this.rid = e
            this.$store.dispatch('detail/detail', this.rooms[e])
        },
        getYX(e) {
            // let info = {
            //     x: `${e.pageX - 20}px`,
            //     y: `${e.pageY + 15}px`
            // }
            // this.$store.dispatch('context', info)
            // this.$store.dispatch('contextActive', true)
            //console.log(e);
            
        },
        addroom() {
            const dt = new Date().toLocaleTimeString()
            var date = Date().slice(16, 21);
            const rooms = {
                id: 11,
                avatar: 'avatar.jpg',
                alt: 'avatar',
                name: 'Souvanna',
                message: 'Hollo!',
                time: date
            }
            //this.rooms = _.shuffle(this.rooms)
            this.rooms.unshift(rooms)

            _.replace = function (collection, identity, rooms) {
                let index = _.indexOf(collection, _.find(collection, identity));
                collection.splice(index, 0, rooms);
            };

            _.replace(this.rooms, {
                id: 11
            }, rooms);
        },
        checkTime(mydate) {
            const cw = this.moment(mydate).isSame(new Date(), 'week')
                let week = '';
                if(cw)
                    week = 'dddd'
                else
                    week = 'DD/MM/YYYY'

                return this.moment(mydate).calendar(null, {
                        sameDay: 'h:mm A',
                        lastDay: '[Yesterday]',
                        lastWeek: week,
                        sameElse: 'DD/MM/YYYY'
                    })
        },
        nameCompare(item){
            if(item.creator == this.store.uinfo.uinfo.uid)
                return 'You created this group'
            else
                return item.bubble_name + ' added you'
        },
        mobilech(){
            if (window.innerWidth < 900) {
                this.$store.dispatch('userDetail/mobile', true)
                this.$store.dispatch('userDetail/sideToChat', true)
            } else {
                this.$store.dispatch('userDetail/mobile', false)
                this.$store.dispatch('userDetail/sideToChat', false)
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/sidebar/sidebar.chats.scss';

.flip-list-move {
  transition: transform 5s;
}

//  for arrow
.slide-fade-arrow-enter-active {
    transition: all .1s ease;
}

.slide-fade-arrow-leave-active {
    transition: all .0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-arrow-enter,
.slide-fade-arrow-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
