<template>
    <div class="bb-wrapper date-bubbles">
        <div class="bb-container Zq3Mc">
            <span dir="auto" class="">{{nameCompare(message)}}</span>
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

             if(item.uid == this.$store.state.uinfo.uinfo.uid)
                return `You added ${item.added_name}`
            else
                return item.name + ' added you'

            // if(item.uid == this.$store.state.uinfo.uinfo.uid && item.added_id != this.$store.state.uinfo.uinfo.uid)
            //     return `You added ${item.added_name}`
            // else if(item.uid != this.$store.state.uinfo.uinfo.uid && item.added_id == this.$store.state.uinfo.uinfo.uid)
            //     return item.name + ' added you'
            //  else if(item.uid != this.$store.state.uinfo.uinfo.uid && item.added_id != this.$store.state.uinfo.uinfo.uid)
            //     return `${item.name} added ${item.added_name}`
        }
    }
}
</script>
