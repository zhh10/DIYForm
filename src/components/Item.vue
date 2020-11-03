<template>
    <div class="Itemarea">
        <div class="Itemarea--title">
            <img class="Itemarea--title--icon" src="@/assets/img/select.png" alt="">
            组件选择
        </div>
        <div class="Itemarea--main">
            <div class="Itemarea--content">
                <div class="Itemarea--subTitle">
                    <div>
                        <img class="Itemarea--subTitle--icon" src="@/assets/img/basic.png" alt="">
                    </div>
                    <div>
                        基础类组件
                    </div>
                </div>
                <template v-for="item in BasicList">
                    <div class="Itemarea--item" draggable @dragstart.stop="onDragStart" @dragend.stop="onDragEnd" :key="item.name"
                        :type="item.type"
                        :options="JSON.stringify(item.options)"
                        :required="item.required"
                        :text="item.text"
                        :imgAddress="item.imgAddress"
                        :inpType="item.inpType"
                        :prefix="item.prefix">
                            <div class="Itemarea--item--layout">
                                <img class="Itemarea--item--icon" :src="item.icon" alt="" draggable=false>
                                <div>{{item.name}}</div>
                            </div>
                    </div>
                </template>
            </div>

            <div class="Itemarea--content">
                <div class="Itemarea--subTitle">
                    <div>
                        <img class="Itemarea--subTitle--icon" src="@/assets/img/image.png" alt="">
                    </div>
                    <div>
                         图片类组件
                    </div>
                </div>
                <template v-for="item in ImgList">
                    <div class="Itemarea--item" draggable @dragstart.stop="onDragStart" @dragend.stop="onDragEnd" :key="item.name"
                        :type="item.type"
                        :options="JSON.stringify(item.options)"
                        :required="item.required"
                        :text="item.text"
                        :imgAddress="item.imgAddress"
                        :inpType="item.inpType"
                        :prefix="item.prefix">
                            <div class="Itemarea--item--layout">
                                <img class="Itemarea--item--icon" :src="item.icon" alt="" draggable=false>
                                <div>{{item.name}}</div>
                            </div>
                    </div>
                </template>
            </div>

            <div class="Itemarea--content">
                <div class="Itemarea--subTitle">
                    <div>
                        <img class="Itemarea--subTitle--icon" src="@/assets/img/connect.png" alt="">
                    </div>
                    <div>
                        联系人组件
                    </div>
                </div>
                <template v-for="item in connectList">
                        <div class="Itemarea--item" draggable @dragstart.stop="onDragStart" @dragend.stop="onDragEnd" :key="item.name"
                            :type="item.type"
                            :options="JSON.stringify(item.options)"
                            :required="item.required"
                            :text="item.text"
                            :imgAddress="item.imgAddress"
                            :inpType="item.inpType"
                            :prefix="item.prefix">
                                <div class="Itemarea--item--layout">
                                    <img class="Itemarea--item--icon" :src="item.icon" alt="" draggable=false>
                                    <div>{{item.name}}</div>
                                </div>
                        </div>
                </template>
            </div>
        </div>
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
             * @inpType {String} 输入框的类型 tel
             */
            BasicList:[
                {type:'input',name:'文本输入框',text:'请输入一些文字',inpType:'text',icon:require('@/assets/img/input.png')},
                {type:'input',name:'数字输入框',texst:'请输入一些文字',inpType:'tel',icon:require('@/assets/img/InpNum.png'),},
                {type:'checkbox',name:'多选框',options:[{key:'选项1',value:'选项1'},{key:'选项2',value:'选项2'}],required:true,icon:require('@/assets/img/checkbox.png')},
                {type:'radio',name:'单选框',options:[{key:'选项1',value:'选项1'},{key:'选项2',value:'选项2'}],required:true,icon:require('@/assets/img/radio.png')},
                {type:'foot-tip',name:'提示文字',text:'点击编辑底部提示文字',icon:require('@/assets/img/foot-tip.png')},
                {type:'foot',name:'底部文字',text:'由 zhh10 提供技术支持',icon:require('@/assets/img/foot.png')},
                {type:'title',name:'标题',text:'点击编辑标题',icon:require('@/assets/img/title.png')},
                {type:'sub-title',name:'文本描述',text:'编辑文本描述',icon:require('@/assets/img/subTitle.png')},
                {type:'dateSelect',name:'日期选择',text:'选择日期',icon:require('@/assets/img/dateSelect.png')},
                {type:'Select',name:'下拉框',options:[{key:'选项1',value:'选项1'},{key:'选项2',value:'选项2'}],icon:require('@/assets/img/dateSelect.png')},
            ],
            ImgList:[
                {type:'image',name:'图片展示',imgAddress:'http://pcdn.mikecrm.com/ugc_4_a/pub/s6/s63kf0hky40tpe1ioz25c2mjchshd1cy/form/image/C2nSzNvrEI9sD1NMl1sOv1EjLcmxzq5n.jpg',
                icon:require('@/assets/img/show.png')},
            ],
            connectList:[
                {type:'input',name:'姓名',inpType:'text',icon:require('@/assets/img/name.png'),prefix:'ios-contact',required:true,text:'请输入姓名'},
                {type:'input',name:'手机',inpType:'tel',icon:require('@/assets/img/phone.png'),prefix:'logo-whatsapp',required:true,text:'请输入手机号码'},
                {type:'input',name:'公司',inpType:'text',icon:require('@/assets/img/company.png'),prefix:'company',text:'请输入公司'},
                {type:'input',name:'部门',inpType:'text',icon:require('@/assets/img/department.png'),prefix:'department',text:'请输入部门'},
                {type:'input',name:'职位',inpType:'text',icon:require('@/assets/img/position.png'),prefix:'position',text:'请输入职位'},
                {type:'input',name:'学校',inpType:'text',icon:require('@/assets/img/school.png'),prefix:'ios-school',text:'请输入学校'},
                {type:'region',name:'所在地',inpType:'text',icon:require('@/assets/img/location.png')},
                {type:'dateSelect',name:'生日',text:'请选择日期',icon:require('@/assets/img/birthday.png')},
                {type:'Select',name:'性别',options:[{key:'男',value:'男'},{key:'女',value:'女'}],icon:require('@/assets/img/sex.png')},
                {type:'input',name:"微信号",inpType:'text',icon:require('@/assets/img/wechat.png'),prefix:'ios-text',text:'请输入微信号'},
            ]
        }
    },
    methods:{
        onDragStart(e){
            const self = this
            const element = e.target 
            const type = element.getAttribute('type')                                                                              //类型
            const inpType = element.getAttribute('inpType')
            const options = element.getAttribute('options') ? JSON.parse(element.getAttribute('options').split(',')) : null        //子选项
            const required = element.getAttribute('required') ? String(Boolean(element.getAttribute('required'))) : String(false)  //必填项 默认非必填
            const text = element.getAttribute('text')                                                                              //文本
            const imgAddress = element.getAttribute('imgAddress')                                                                  //图片地址
            const name = element.innerText                                                                                         //名称
            const prefix = element.getAttribute('prefix')
            self.item = {type,
                         name,
                         options,
                         required,
                         text,
                         imgAddress,
                         inpType,
                         prefix,
                         }
            e.dataTransfer.setData('data',JSON.stringify(self.item))
        },
        onDragEnd(){
            this.item = null
        },
        
    }
}
</script>

