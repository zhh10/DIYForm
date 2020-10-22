<template>
    <div class="wrapper">
        <itemarea ref="item"/>
        <formarea ref="formarea" @edit="editBefore($event)" @reset="editAfter"/>
        <editarea :ItemData="data" :defaultItemData="defaultData" @Delete="handleDelete" @Cancel="handleCancel" @Save="handleSave"/>
    </div>
</template>

<script>
import itemarea from "./Item"
import formarea from "./Form"
import editarea from "./Edit"
import _ from "lodash"
export default {
  name: 'HelloWorld',
  components:{itemarea,formarea,editarea},
  data(){
    return{
      inner:false,
      data:null,
      defaultData:null,
    }
  },
  methods:{
    // 编辑前的准备工作
     editBefore(id){
        if(this.defaultData){
            // 如果有defaultData在 说明上一次没保存就切换了 这时候要回撤数据
            // const index = this.$refs.formarea.itemArr.findIndex(item => item.id === this.$refs.formarea.EditId) 
            const id = this.defaultData.id 
            const index = this.$refs.formarea.itemArr.findIndex(item => item.id === id) 
            this.$set(this.$refs.formarea.itemArr,index,this.defaultData)
        }
        const index = this.$refs.formarea.itemArr.findIndex(item => item.id === id)
        this.data = this.$refs.formarea.itemArr[index] 
        this.defaultData =  _.cloneDeep(this.data)
     },
     // 编辑后的操作
     editAfter(){
        // this.$refs.formarea.Edit = null 
        this.data = null 
        this.defaultData = null 
        this.$refs.formarea.EditId = null
     },
    //  删除
     handleDelete(){
        this.$refs.formarea.handleDelete()
        this.editAfter()
     },
    //  取消保存
     handleCancel(){
       const id = this.$refs.formarea.EditId 
       const index = this.$refs.formarea.itemArr.findIndex(item => item.id === id)
       this.$set(this.$refs.formarea.itemArr,index,this.defaultData)
       this.editAfter()
     },
     // 保存
     handleSave(data){
       const id = this.$refs.formarea.EditId 
       const index = this.$refs.formarea.itemArr.findIndex(item => item.id === id) 
       this.$set(this.$refs.formarea.itemArr,index,data) 
       this.editAfter() 
     },
  }
}
</script>
<style>
html,body{
  height:100%;
}
</style>

