<template>
    <transition 
        name="custom-classes-transition"
        enter-active-class="animated jackInTheBox"
        leave-active-class="animated zoomOut" 
        :duration="{ enter: 2000, leave: 800 }"
        v-if="ani">
        <div class="welcome">
            <div class="sayhi">Hi, <span>{{ getUsername }}</span></div>
            <div class="wlto">Welcome to <span class="bcel"> BCEL</span> <span class="chat"> Chat</span></div>
        </div>
    </transition>
</template>

<script>
    export default {
        data(){
            return{
                ani: false,
                name: ''
            }
        },
        mounted(){
            setTimeout(()=>{
               this.ani = true;
            }, 500)
        },
        computed:{
            getUsername(){
                let user
                if(this.$store.state.uinfo.uinfo.display)
                    user = this.$store.state.uinfo.uinfo.display
                return user
            }
        }
    }
</script>

<style lang="scss">
    .welcome{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        //text-transform: uppercase;
        background: linear-gradient(to right, rgb(238, 48, 23) 0%, #3e32e4 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: 'Poppins', sans-serif;
        font-weight: 900;
        .sayhi{
            font-size: 2vw;
            span{
                text-transform: capitalize;
            }
        }
        .wlto{
            font-size: 3vw;
            .bcel{
                background: linear-gradient(to bottom, rgb(189, 9, 9) 0%, #f78e80 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .chat{
                 background: linear-gradient(to bottom, rgb(241, 111, 111) 0%, #c32e2e 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }

    .bounce-wel-enter-active {
        animation: bounce-wel-in 3s;
    }
    .bounce-wel-leave-active {
        animation: bounce-wel-in 1s reverse;
    }
    @keyframes bounce-wel-in {
        0% {
            transform: scale(0);
        }
        1% {
            transform: scale(2);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
