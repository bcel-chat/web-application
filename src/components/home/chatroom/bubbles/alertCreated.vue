<template>
    <div class="bb-wrapper date-bubbles">
        <div class="bb-container Zq3Mc">
            <span dir="auto" class=""><span>{{nameCompare(message)}}</span> {{message.message}}</span>
        </div>
    </div>
</template>

<script>
export default {
     props:{
        message: null,
    },
    methods:{
        nameCompare(item){
            console.log(item);
            
            if(item.uid == this.$store.state.uinfo.uinfo.uid)
                return 'You'
            else
                return item.name
        }
    }
}
</script>
