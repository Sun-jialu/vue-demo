<template>
    <div>
     <el-row>
            <el-col :span="24">
            <el-form-item label="题目答案：" prop="workTopicAnswer">
                <el-input v-model="quesData.workTopicAnswer" placeholder="AB"></el-input>
            </el-form-item>
        </el-col>
      </el-row>

    <el-form ref='dataForm' :model="dynamicValidateForm" label-width='120px'>
        <el-row>
            <el-col :span="24">
                <el-form-item label="备注：" prop="remark">
                    <tinymce :maxHeight="400" v-model="quesData.remark"></tinymce>
                </el-form-item>
            </el-col>
        </el-row>
         <el-form-item 
         v-for='(item , index) in dynamicValidateForm.anserArr' 
         :label="`答案${item.label}`"
         :key="item.label"
          :rules="{ required: true, message: '答案不能为空', trigger: 'change'}"
          :prop="'anserArr.' + index + '.anser'">
                <tinymce :key="item.label" :maxHeight="400" v-model="item.anser"></tinymce>
          </el-form-item>
          
          <el-row>
            <el-col :span="24">
            <el-form-item label="" >
               <el-button type='primary' plain @click='addAnserItem()'>添加选项</el-button>
               <el-button 
               type='primary'
                :disabled='dynamicValidateForm.anserArr.length<=2'
                 plain  
                 @click='delAnserItem()'>
                 删除选项
                 </el-button>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    </div>
    <!-- 单选题组件 -->
    
</template>

<script>
import tinymce from '@/components/Tinymce'
export default {
   components: {
      tinymce
    },
 
   data(){
    return {
        hasInit:false,
        initCode :65,
        dynamicValidateForm:{
            anserArr:[], //答案 为数组的 列表
        },
    }
   },
       props:{
         quesData:{
          type:Object,
          default:()=>{
              return {
                workTopicAnswer:'',//题目答案  
                workTopicContent:'', //题目答案内容
                remark:''         //备注
              }
          }
      },
     },

     mounted(){
    },
    computed: {

  },
    watch:{
        'dynamicValidateForm.anserArr':{
             handler(val){
                 if(!this.hasInit){
                    this.hasInit = true
                    this.init()
                 }else{
                    this.quesData.workTopicContent = JSON.stringify(val)
                 }
             },
            immediate: true,
            deep:true,

         }
     },
   activated(){
   },
 
   destoryed(){
   },
    methods: {
        init(){
            var anserVal = this.quesData.workTopicContent || '[]'
            this.dynamicValidateForm.anserArr = JSON.parse(anserVal) || []
            var arrLength = this.dynamicValidateForm.anserArr.length
            this.initCode += arrLength
            if(arrLength == 0){
                //一条没有 则类似新增， 初始化四条
                this.intAnserArr()
            }
        },
        //添加一条
        getAnserItem(){
            var code = this.initCode
            var codeName = String.fromCharCode(code)
            var map ={
                'label':codeName,
                'anser':''
            }
            this.initCode ++ 
            return map
        },
        intAnserArr(){
            var num = [1,2,3,4] 
            num.forEach((item,index)=>{
               this.addAnserItem()
            })

        },
        //添加一项
        addAnserItem(){
            var map = this.getAnserItem()
            this.dynamicValidateForm.anserArr.push(map)
        },
        //删除一项
        delAnserItem(){
            var length = this.dynamicValidateForm.anserArr.length
             this.dynamicValidateForm.anserArr.splice(-1 , 1)
            this.initCode--
        },
        //检测数据是否通过
          checkValidate(){
            var check = true
              this.$refs['dataForm'].validate((valid) => {
                 check = valid
             });
             return check
        }
    }
    
}
</script>
<style lang="scss" scoped>

</style>