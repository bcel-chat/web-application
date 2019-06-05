<template>
<div>
    <div class="sub-part-01">
        <side-bar-header></side-bar-header>
    </div>
    <transition-group name="slide-fade-sidebar" tag="div" class="_1vDUw _1NrpZ">
        <chat-bar :key="1" v-if="tabs == 1"/>
        <contact-bar :key="2" v-else-if="tabs == 2"/>
        <extension-bar :key="3" v-else-if="tabs == 3"/>
        <notify-bar :key="4" v-else-if="tabs == 4"/>
    </transition-group>
   <!-- <transition-group name="slide-fade-sidebar" tag="div" class="sub-part-02" id="scroll-style">
        <chat-bar :key="1" v-if="tabs == 1"/>
        <group-bar :key="2" v-else-if="tabs == 2"/>
        <contact-bar :key="3" v-else-if="tabs == 3"/>
        <notify-bar :key="4" v-else-if="tabs == 4"/>
    </transition-group> -->
</div>
</template>

<script>
const SideBarHeader = () => import('../sidebar/Sidebar.header.vue')
const chatBar = () => import('@/components/home/sidebar/Sidebar.chats.vue')
const extensionBar = () => import('@/components/home/sidebar/Sidebar.extension.vue')
const contactBar = () => import('@/components/home/sidebar/Sidebar.contact.vue')
const notifyBar = () => import('@/components/home/sidebar/Sidebar.notify.vue')
export default {
    components: {
        SideBarHeader,
        chatBar,
        extensionBar,
        contactBar,
        notifyBar
    },
    computed:{
        tabs(){
            return this.$store.state.userDetail.tabs
        }
    }
}
</script>

<style lang="scss">
.slide-fade-sidebar-enter-active {
    transition: all .2s ease;
}

.slide-fade-sidebar-leave-active {
    transition: all .0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-sidebar-enter,
.slide-sidebar-fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
    {
    transform: translateX(100px);
    opacity: 0;
}

._1NrpZ {
    background-color: #fff;
}
._1vDUw {
    position: relative;
}
._1NrpZ {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    height: calc(100vh - 125px);
    overflow-y: auto;
    z-index: 1;
}
.RLfQR {
    margin-top: -1px;
    position: relative;
    overflow: auto;
}
</style>
