<template>
    <div class="Itemarea">
        <div class="Itemarea--title">基础/组件</div>
        <template v-for="(item,index) in itemList">
            <div class="Itemarea--item" draggable @dragstart.stop="onDragStart" @dragend.stop="onDragEnd" :key="index"
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
             * 参数说明
             * @type {String} 类型  
             * @name {String} 名称
             * @options {Array<Object>} 子选项 
             * @required {Boolean} 是否是必填项
             * @text {String} 相关文字
             * @imgAddress {String} 默认图片地址
             */
            itemList:[
                {type:'input',name:'输入框',},
                {type:'checkbox',name:'多选框',options:[{key:'选项1',value:'选项1'},{key:'选项2',value:'选项2'}],required:true,},
                {type:'radio',name:'单选框',options:[{key:'选项1',value:'选项1'},{key:'选项2',value:'选项2'}],required:true,},
                {type:'foot-tip',name:'底部提示文字',text:'点击编辑底部提示文字'},
                {type:'foot',name:'底部文字',text:'由 zhh10 提供技术支持'},
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
            const type = element.getAttribute('type')                                                                              //类型
            const options = element.getAttribute('options') ? JSON.parse(element.getAttribute('options').split(',')) : null        //子选项
            const required = element.getAttribute('required') ? String(Boolean(element.getAttribute('required'))) : String(false)  //必填项 默认非必填
            const text = element.getAttribute('text')                                                                              //文本
            const imgAddress = element.getAttribute('imgAddress')                                                                  //图片地址
            const name = element.innerText                                                                                         //名称
            self.item = {type,
                         name,
                         options,
                         required,
                         text,
                         imgAddress,
                         }
            e.dataTransfer.setData('data',JSON.stringify(self.item))
        },
        onDragEnd(){
            this.item = null
        },
        
    }
}
</script>