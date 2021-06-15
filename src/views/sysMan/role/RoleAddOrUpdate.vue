<template>
    <el-dialog
            :title="!dataForm.id ? '新增' : '修改'"
            :close-on-click-modal="false"
            :visible.sync="visible">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item size="mini" label="授权">
                <el-tree
                        :data="menuList"
                        :props="menuListTreeProps"
                        node-key="menuId"
                        ref="menuListTree"
                        :default-expanded-keys='expendKey'
                        show-checkbox>
                </el-tree>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </el-dialog>
</template>

<script>
    import { treeDataTranslate } from '@/utils'
    export default {
        data () {
            return {
                visible: false,
                expendKey:[1,25],
                menuListClone:[],
                menuList: [],
                menuListTreeProps: {
                    label: 'name',
                    children: 'children'
                },
                dataForm: {
                    id: 0,
                    roleName: '',
                    remark: ''
                },
                dataRule: {
                    roleName: [
                        { required: true, message: '角色名称不能为空', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
           async init (id) {
                this.dataForm.id = id || 0
                this.visible = true
               await  this.$nextTick(() => {
                   this.$refs['dataForm'].resetFields();
               })
                const data =  await this.$API.sys.menuList() 
                var list = data
                this.menuList = treeDataTranslate(list, 'menuId')
                //1 记住新的列表 ，列表中包含 children
                this.menuListClone = JSON.parse(JSON.stringify( list))

                if(this.dataForm.id){
                    this.$API.sysUser.roleInfo(this.dataForm.id).then(data=>{
                        if (data && data.code === 0) {
                            this.dataForm.roleName = data.role.roleName
                            this.dataForm.remark = data.role.remark
                            //2 回显时 只拿叶子结点 id
                            var checkIds = []
                            this.menuListClone.forEach(item=>{
                                var isCheckItem =  data.role.menuIdList.indexOf(item.menuId)>-1
                                    && (!item.children || item.children.length==0)
                                 if(isCheckItem){
                                    checkIds.push(item.menuId)
                                }
                            })
                            this.$refs.menuListTree.setCheckedKeys(checkIds)
                        }
                    })
                }

            },
            // 表单提交
            dataFormSubmit () {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.visible = false
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.$emit('refreshDataList')
                            }
                        })
                    }
                })
            }
        }
    }
</script>
