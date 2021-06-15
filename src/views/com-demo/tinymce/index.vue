<template>
    <div >
        <!-- <titleBar></titleBar> -->
       <tinymce :maxHeight="400" v-model="content"></tinymce>
    </div>
</template>

<script>
    import tinymce from '@/components/Tinymce'
    export default {
        data () {
            return {
               content:'测试',
            }
        },
        components: {
            tinymce
        },
        mounted(){
        },
        activated () {
         
        },
        methods: {
        }
    }
</script>
