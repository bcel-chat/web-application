<template>
    <div :contenteditable="content.editAble2" @keydown="prevent" ref="text" tabindex="-1" v-text="getAbout" class="name" @input="update"></div>
</template>

<script>
import ds from '@/helper/deepstream.js'
export default {
    props:['content'],
    data(){
        return{
            txtAbout: this.$store.state.uinfo.uinfo.desc
        }
    },
    mounted(){
        ds.event.subscribe("profile-"+this.$store.state.uinfo.uinfo.uid, res => {
            this.$refs.text.innerHTML = res[0].desc
        })
    },
    computed:{
        getAbout(){
            return this.$store.state.uinfo.uinfo.desc
        }
    },
    methods:{
        prevent(){
            if(this.$props.content.txtAbout.length > 49 && event.keyCode != 8)
                event.preventDefault()
        },
        update(event){
            this.$emit('update',event.target.innerText);
        },
        setFocus(){
            this.$nextTick(()=>{
                this.$refs.text.focus()
            })
        }
    }
}
</script>
