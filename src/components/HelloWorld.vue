<template>
    <div class="wrap">
        <itemarea ref="item"/>
        <formarea ref="formarea" @edit="editBefore($event)"/>
        <editarea :data="data" @Delete="handleDelete" @Cancel="handleCancel"/>
    </div>
</template>

<script>
import itemarea from "./Item"
import formarea from "./Form"
import editarea from "./Edit"
export default {
  name: 'HelloWorld',
  components:{itemarea,formarea,editarea},
  data(){
    return{
      inner:false,
      data:null,
    }
  },
  methods:{
     editBefore(index){
       this.data = this.$refs.formarea.itemArr[index] 
        console.log(this.data)
     },
     handleDelete(){
        this.$refs.formarea.handleDelete()
        this.$refs.formarea.EditIndex = null
     },
     handleCancel(){
       this.$refs.formarea.EditIndex = null
       this.data = null
     }
  }
}
</script>
<style>
html,body{
  height:100%;
}
.wrap{
  height:100%;
  display: flex;
}
.formarea{
  flex:1 1 80%;
  background-color: whitesmoke;
}
.active{
  border:2px solid red;
}
</style>

