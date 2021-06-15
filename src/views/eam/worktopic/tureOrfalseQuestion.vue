<template>
    <div>
    <el-row>
            <el-col :span="24">
            <el-form-item 
            label="题目答案：" 
            prop='workTopicAnswer'>
                 <el-radio-group v-model="quesData.workTopicAnswer">
                     <el-radio :label="1">正确</el-radio>
                     <el-radio :label="2">错误</el-radio>
                 </el-radio-group>
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
      }
  },  
  computed: {

  },
  mounted(){
   
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