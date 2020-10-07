<template>
    <div class="itemarea">
        <template v-for="(item,index) in itemList">
            <div class="item" draggable @dragstart.stop="onDragStart" @dragend.stop="onDragEnd" :key="index"
                :type="item.type"
                :options="item.options">
                {{item.name}}
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name:'itemarea',
    data(){
        return {
            item:null,
            itemList:[
                {type:'input',name:'输入框',options:[]},
                {type:'radio',name:'单选框',options:['选项一','选项二']},
                {type:'checkbox',name:'多选框',options:['选项一','选项二']},

            ]
        }
    },
    methods:{
        onDragStart(e){
            const self = this
            const element = e.target 
            const type = element.getAttribute('type')
            const options = element.getAttribute('options').split(',')
            const name = element.innerText 
            self.item = {type,name,options}
            e.dataTransfer.setData('data',JSON.stringify(self.item))
        },
        onDragEnd(){
            this.item = null
        },
        
    }
}
</script>
<style scoped> 
.itemarea{
    flex:1 1 20%;
    flex-wrap: wrap;
    justify-content: center;
}
.item{
    width:100px;
    height:50px;
    margin:20px 20px 10px 20px;
    background-color:skyblue;
    line-height: 50px;
    text-align: center;
    display: inline-block;
}
</style>