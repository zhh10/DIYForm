<template>
    <div class="itemarea">
        <template v-for="(item,index) in itemList">
            <div class="item" draggable @dragstart.stop="onDragStart" @dragend.stop="onDragEnd" :key="index"
                :type="item.type"
                :options="JSON.stringify(item.options)"
                :required="item.required">
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
            /**
             * 参数有说明
             * @type 类型
             * @name 名称
             * @options 子选项
             * @required 是否是必填项
             */
            itemList:[
                {type:'input',name:'输入框',options:[],required:false,},
                {type:'checkbox',name:'多选框',options:[{key:'选项1',value:'选项1'},{key:'选项2',value:'选项2'}],required:true,},
                {type:'radio',name:'单选框',options:[{key:'选项1',value:'选项1'},{key:'选项2',value:'选项2'}],required:true,},
            ]
        }
    },
    methods:{
        onDragStart(e){
            const self = this
            const element = e.target 
            const type = element.getAttribute('type')
            const options = JSON.parse(element.getAttribute('options').split(','))
            const required = String(Boolean(element.getAttribute('required')))
            const name = element.innerText 
            self.item = {type,
                         name,
                         options,
                         required,
                         }
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