<template>
    <div class="itemarea">
        <div class="itemTitle">基础/组件</div>
        <template v-for="(item,index) in itemList">
            <div class="item" draggable @dragstart.stop="onDragStart" @dragend.stop="onDragEnd" :key="index"
                :type="item.type"
                :options="JSON.stringify(item.options)"
                :required="item.required"
                :text="item.text"
                :imgAddress="item.imgAddress">
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
             * @text 相关文字
             */
            itemList:[
                {type:'input',name:'输入框',},
                {type:'checkbox',name:'多选框',options:[{key:'选项1',value:'选项1'},{key:'选项2',value:'选项2'}],required:true,},
                {type:'radio',name:'单选框',options:[{key:'选项1',value:'选项1'},{key:'选项2',value:'选项2'}],required:true,},
                {type:'foot-tip',name:'底部提示文字',text:'点击编辑底部提示文字'},
                {type:'foot',name:'底部文字',text:'由赛宝质云提供技术支持'},
                {type:'image',name:'图片',imgAddress:'http://pcdn.mikecrm.com/ugc_4_a/pub/s6/s63kf0hky40tpe1ioz25c2mjchshd1cy/form/image/C2nSzNvrEI9sD1NMl1sOv1EjLcmxzq5n.jpg',},
                {type:'title',name:'标题',text:'点击编辑标题'},
                {type:'sub-title',name:'副标题',text:'点击编辑副标题'},
            ]
        }
    },
    methods:{
        onDragStart(e){
            const self = this
            const element = e.target 
            const type = element.getAttribute('type')
            const options = element.getAttribute('options') ? JSON.parse(element.getAttribute('options').split(',')) : null
            const required = element.getAttribute('required') ? String(Boolean(element.getAttribute('required'))) : null
            const text = element.getAttribute('text')
            const imgAddress = element.getAttribute('imgAddress')
            const name = element.innerText 
            self.item = {type,
                         name,
                         options,
                         required,
                         text,
                         imgAddress
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
    line-height: 50px;
    text-align: center;
    display: inline-block;
    border:1px solid #000;
}
.itemTitle{
    height:5%;
    display: flex;
    align-items: center;
    background-color:#2d8cf0;
    color:#fff;
    font-size:20x;
    padding:5px 0;
    padding-left:20px;
}
</style>