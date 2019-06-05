<template>
    <div class="bb-wrapper date-bubbles">
        <div class="bb-container Zq3Mc">
            <span dir="auto" class="">{{mydate}}</span>
        </div>
    </div>
</template>

<script>
export default {
     props:{
        message: null,
    },
    data(){
        return{
            moment: this.$moment,
        }
    },
    computed:{
        mydate(){
            const cw = this.moment(this.$props.message).isSame(new Date(), 'week')
                let week = '';
                if(cw)
                    week = 'dddd'
                else
                    week = 'DD/MM/YYYY'

            return this.moment(this.$props.message).calendar(null, {
                            sameDay: '[Today]',
                            lastDay: '[Yesterday]',
                            lastWeek: week,
                            sameElse: 'DD/MM/YYYY'
                        })
        }
    }
}
</script>
