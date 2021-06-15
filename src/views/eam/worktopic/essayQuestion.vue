<template>
    <!-- 问答题组件 -->
      <div>
      <el-row>
            <el-col :span="24">
            <el-form-item label="题目答案：" prop="workTopicAnswer">
                 <tinymce :maxHeight="400" v-model="quesData.workTopicAnswer"></tinymce>
            </el-form-item>
        </el-col>
      </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="备注：" prop="remark">
                    <tinymce :maxHeight="400" v-model="quesData.remark"></tinymce>
                </el-form-item>
            </el-col>
        </el-row>
      </div>
</template>

<script>
import tinymce from '@/components/Tinymce'
export default {
   components: {
      tinymce
    },
  computed: {

  },
  mounted(){
   
  },
     props:{
         quesData:{
          type:Object,
          default:()=>{
              return {
                workTopicAnswer:'',//题目答案  
                workTopicContent:'', //题目答案内容
                remark:'',          //备注
              }
          }
      },
     },
   data(){
    return {
      
    }
   },
   
   activated(){
   },
 
   destoryed(){
   },
    methods: {
     
   
    }
    
}
</script>
<style lang="scss" scoped>

</style>