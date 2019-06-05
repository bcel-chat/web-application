<template>
<div>
    <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated fadeOut">
        <div class="search-container" v-if="searchBox" :style="{animationDuration: '.2s', width: `${this.$store.getters['userDetail/sidewidth']}px`}">
            <div class="search-content">
                <div class="close-box" title="Close" @click="close">
                    <i class="material-icons ic">cancel</i>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input type="text" v-model="eSearch" tabindex="-0" autofocus ref="search" class="search-txt" placeholder="Search contacts">
                    </div>
                    <div class="icon-box" title="Search" v-if="searchBox" role="button" @click="setFocus()">
                        <i class="material-icons ic">search</i>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <header class="_3auIg">
        <div class="_2umId">
            <div class="_avatar" role="button" @click="sideChange(2)" style="height: 40px; width: 40px; cursor: pointer;" :title="[stsOnline ? 'Online': 'Offline']">
                <img :src="this.$store.state.uinfo.pic" draggable="false" class="Qgzj8 gqwaM" style="visibility: visible;">
                <div class="_3ZW2E">
                    <span data-icon="default-user" class="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                        <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path><g fill="#FFF"><path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path></g>
                        </svg>
                    </span>
                </div>
                <span :class="['online-status', stsOnline ? 'sts-online' : 'sts-offline']"></span>
            </div>
            <div class="abt">
                <div class="unme" role="button" @click="sideChange(2)" :title="this.$store.state.uinfo.uinfo.display">{{this.$store.state.uinfo.uinfo.display}}</div>
                <div class="usts" role="button" @click="sideChange(2)" :title="this.$store.state.uinfo.uinfo.desc">{{this.$store.state.uinfo.uinfo.desc}}</div>
            </div>
        </div>
        <div class="_20NlL">
            <div class="_3Kxus">
                <div class="rAUz7">
                    <div role="button" @click="searchBox = true, setFocus()" title="Search">
                        <span data-icon="search" class="">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="#f75e5e" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path>
                            </svg>
                        </span>
                    </div>
                    <span></span>
                </div>
                <div class="rAUz7">
                    <div role="button" @click="sideChange(1)" title="New chat">
                        <span data-icon="chat" class="">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="#f75e5e" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path>
                            </svg>
                        </span>
                    </div>
                    <span></span>
                </div>
            </div>
        </div>
    </header>
    <section>
        <nav>
            <ul>
                <li v-for="menu in menus" :key="menu.index">
                    <a role="button" @click="demo(menu.key)" :class="[store.userDetail.tabs === menu.key ? 'tab-active' : '']">
                        <font-awesome-icon :icon="menu.icon" size="lg" class="ico"/>
                        <span>{{ menu.name }}</span>
                    </a>
                </li>
            </ul>
        </nav>
    </section>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import ds from '@/helper/deepstream.js'
export default {
    data() {
        return {
            stsOnline: true,
            store: this.$store.state,
            searchBox: false,
            icon: true,
            tabnum: 1,
            menus: [{
                    name: 'Chats',
                    key: 1,
                    icon: 'comment-alt'
                },
                {
                    name: 'Contact',
                    key: 2,
                    icon: 'address-card'
                },
                {
                    name: 'Extension',
                    key: 3,
                    icon: 'expand-arrows-alt'
                },
                {
                    name: 'Notification',
                    key: 4,
                    icon: 'bell'
                }
            ]
        }
    },
    computed: {
        eSearch: {
            get() {
                return this.$store.state.userDetail.searchbox
            },
            set(value) {
                this.$store.dispatch('userDetail/searchbox', value)
            }
        }
    },
    watch: {
        eSearch(value) {
            let sel = 2
            if(value){
               sel = 1
            }else{
               sel = 2
            }
            ds.rpc.make('getContact', {
                username: value,
                sel: sel,
                uid: this.$store.state.uinfo.uinfo.uid
            }, (err, res) => {
                this.$store.dispatch('userDetail/contact', res)
            })
        }
    },
    methods: {
        demo(e) {
            this.tabnum = e
            this.$store.dispatch('userDetail/tabs', e)
        },
        sideChange(e) {
            if (e === 1) {
                this.$store.dispatch('userDetail/sidebar', {
                    sidenewchat: true
                })
            } else if (e === 2) {
                this.$store.dispatch('userDetail/sidebar', {
                    sideprofile: true
                })
            } else {
                this.$store.dispatch('userDetail/sideToChat', true)
            }

             console.log('Mobile mode: '+this.$store.state.userDetail.mobile);
        },
        setFocus() {
            this.$nextTick(() => {
                this.$refs.search.focus()
            })
        },
        focus(e) {
            if (e === 1) {
                this.icon = false
            } else {
                this.icon = true
            }
        },
        close() {
            this.searchBox = false
            this.$store.dispatch('userDetail/searchbox', '')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/sidebar/sidebar.header.scss';
@import '@/assets/scss/sidebar/sidebar.tabs.scss';
</style>