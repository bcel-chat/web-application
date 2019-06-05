<template>
<div class="ctnlb">
    <div class="ctl" @click="newGroup">
        <div class="_2umId">
            <div class="_1WliW" style="height: 49px; width: 49px; cursor: pointer;">
               <div class="_1jJLh">
                   <span data-icon="new-group" class="">
                        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                            <path fill="#FFF" d="M15.313 15.672c2.401 0 4.237-1.835 4.237-4.235S17.713 7.2 15.313 7.2s-4.235 1.836-4.235 4.237 1.834 4.235 4.235 4.235zm9.349-.64c1.571 0 2.773-1.201 2.773-2.772 0-1.571-1.202-2.773-2.773-2.773s-2.772 1.202-2.772 2.773c0 1.571 1.201 2.772 2.772 2.772zm-1.724 5.841a7.856 7.856 0 0 0-.889-1.107 8.074 8.074 0 0 0-1.825-1.413 9.05 9.05 0 0 0-.675-.346l-.021-.009c-1.107-.502-2.5-.851-4.232-.851-1.732 0-3.124.349-4.232.851l-.112.054a9.247 9.247 0 0 0-.705.374 8.137 8.137 0 0 0-1.705 1.341 7.991 7.991 0 0 0-.656.773 8.584 8.584 0 0 0-.233.334c-.063.095-.116.184-.164.263l-.012.02a4.495 4.495 0 0 0-.213.408v2.276h16.061v-2.276s-.07-.164-.225-.427a4.257 4.257 0 0 0-.162-.265zm1.724-4.357c-1.333 0-2.376.3-3.179.713a9.409 9.409 0 0 1 1.733 1.218c1.402 1.25 1.959 2.503 2.017 2.641l.021.049h4.954v-1.571s-1.294-3.05-5.546-3.05zM9.41 13.78H6.261v-3.152H4.344v3.152H1.2v1.918h3.144v3.145h1.917v-3.145H9.41V13.78z"></path>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div class="cinf">
            <div class="tpt">New group</div>
        </div>
    </div>
</div>
</template>

<script>
import ds from "@/helper/deepstream.js"
export default {
    data(){
        return {
            moment: this.$moment
        }
    },
    methods:{
        newGroup(){
             ds.rpc.make('setNewgroup', {
                rid: 0,
                rname: '',
                img: 'no',
                lastseen: this.moment(new Date).format('YYYY-MM-DD'),
                type: 2,
                active: 0,
                sender: this.$store.state.uinfo.uinfo.uid,
                reciever: this.$store.state.uinfo.uinfo.uid,
            }, (err,res)=>{
                this.$store.dispatch('chats/roomcheck', res)
            })
            this.$store.dispatch('userDetail/sidebar', {
                sidenewgroup: true
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors.scss";
.ctnlb:hover{
    background-color: $hover;
}
.ctnlb {
    .slide {
        animation-duration: .4s;
    }

    .ctl {
        width: 100%;
        display: flex;
        padding: 10px 0 10px 10px;
        cursor: pointer;
        // border: solid 1px rgb(250, 209, 209);
        // border-radius: 5px;
        margin-bottom: 6px;
        -border: solid 1px rgb(250, 209, 209);
        -webkit-box-shadow: 0px 0px 14px -6px rgba(230, 58, 58, 1);
        -moz-box-shadow: 0px 0px 14px -6px rgba(230, 58, 58, 1);
        box-shadow: 0px 0px 12px -6px rgba(230, 58, 58, 1);

        ._2umId {
            display: flex;
            margin-right: 15px;

            ._1WliW {
                border-radius: 50%;
                position: relative;
                overflow: hidden;

                .Qgzj8.gqwaM {
                    opacity: 1;
                }

                .Qgzj8 {
                    border-radius: 50%;
                    opacity: 1;
                    display: block;
                    opacity: 0;
                    position: relative;
                    transition: opacity 150ms ease-out;
                    width: 100%;
                    height: 100%;
                    z-index: 100;
                    object-fit: cover;
                }

                ._3ZW2E {
                    left: 0;
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }
            }
        }

        .cinf {
            width: 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-right: 10px;
            font-size: 1.2rem;
        }

        .cinfb {
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
        }
    }
}

._1jJLh {
    background-color: $primary;
    border-radius: 50%;
}
._1jJLh {
    -webkit-align-items: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
    height: 48px;
    -webkit-justify-content: center;
    justify-content: center;
    width: 48px;
}
</style>
