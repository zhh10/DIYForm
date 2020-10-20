<template>
    <div class="formarea" >
        <div class="save">
            <Button size="small" class="saveBtn" type="success">保存</Button>
            <Button size="small" class="saveCancel" type="error" @click="ResetForm">重置</Button>
        </div>
        <div  class="formarea-Main" :class="{'active':inner}" @dragover.prevent @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
            <div ref="domList">
                <!-- 循环 itemArr -->
                <template v-for="item in newitemArr">
                    <div :key="item.id" class="item" :class="{'itemEdit':EditId === item.id}" @click="handleEdit(item.id)" draggable 
                    @dragstart.stop="onItemDragStart"
                    @dragenter.stop="onItemDragEnter"
                    @dragend.stop="onItemDragEnd">
                        <Row>
                            <div class="label" v-if="item.type !== 'image' && item.type !== 'title' && item.type !== 'sub-title'">
                                <span class="required" v-if="item.required === 'true'">*</span>{{item.name}}
                            </div>
                        </Row>
                        <Row class="component">
                            <i-col span="24">
                                <!-- 输入框 -->
                                    <template v-if="item.type === 'input'">
                                        <i-input></i-input>
                                    </template>
                                    <!-- 单选框 -->
                                    <template v-if="item.type === 'radio'">
                                        <RadioGroup>
                                            <template v-for="(option,index) in item.options">
                                                <Radio :label="option.key" :key="index"></Radio>
                                            </template>
                                        </RadioGroup>
                                    </template>
                                    <!-- 多选框 -->
                                    <template v-if="item.type === 'checkbox'">
                                        <checkboxGroup>
                                            <template v-for="(option,index) in item.options">
                                                <Checkbox :label="option.key" :key="index"></Checkbox>
                                            </template>
                                        </checkboxGroup>
                                    </template>
                                    <!-- 图片 -->
                                    <template v-if="item.type === 'image'">
                                        <img :src="item.imgAddress" alt="" class="image" draggable=false>
                                    </template>
                                    <!-- 标题 -->
                                    <template v-if="item.type === 'title'" >
                                        <div class="title">{{item.text}}</div>
                                    </template>
                                    <!-- 副标题 -->
                                    <template v-if="item.type === 'sub-title'">
                                        <div class="sub-title">{{item.text}}</div>
                                    </template>
                            </i-col>
                        </Row>
                    </div>  
                </template>
            </div>
            <!-- 提交按钮 -->
            <Button class="submit-Btn" type="primary" v-if="itemArr.length >= 1" @click="editBtnText($event)">
                <i-input v-if="isEditBtnText" v-model="btnText" @on-blur="editBtnText($event)"  @on-enter="editEnterKey" ref="SubmitBtn" size="large"></i-input>
                <span v-else >{{btnText}}</span>
            </Button>
            <!-- 底部提示文字 -->
            <div class="tip" v-if="hasFootTip" @click="handleEdit(hasFootTip.id)" :class="{'itemEdit':EditId === hasFootTip.id}">
                <div>{{hasFootTip.text}}</div>
            </div>
            <!-- 底部文字 -->
            <div class="foot" v-if="hasFoot" @click="handleEdit(hasFoot.id)" :class="{'itemEdit':EditId === hasFoot.id}">
                <span>{{hasFoot.text}}</span>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    name:'formarea',
    data(){
        return {
            inner:false,
            itemArr:[],
            formDom:null,
            formIndex:null,
            toDom:null,
            toIndex:null,
            children:[],
            EditId:null,
            btnText:'提交',//默认提交按钮文字
            isEditBtnText:false,
            Lock:false,
        }
    },
    computed:{
        newitemArr(){
            //  剔除 底部提示文字组件 和 底部文字组件
            return this.itemArr.filter(item => item.type !== 'foot-tip' && item.type !== 'foot')
        },
        hasFootTip(){
            const index = this.itemArr.findIndex(item => item.type === 'foot-tip')
            if(index === -1){
                return false
            }else{
                return this.itemArr[index]
            }
        },
        hasFoot(){
            const index = this.itemArr.findIndex(item => item.type === 'foot')
            if(index === -1){
                return false 
            }else{
                return this.itemArr[index]
            }
        }
    },
    methods:{
        onDragEnter(){
            this.inner = true
        },
        onDragLeave(){
            this.inner = false
        },
        onItemDragStart(e){
            this.children = [...this.$refs.domList.children]
            this.formDom = e.target 
            this.formDom.style.opacity = 0.3
        },
        onItemDragEnter(e){
            this.toDom = e.target
            if(this.formDom && this.toDom){
                if(this.isPrevious(this.formDom,this.toDom)){
                    this.$refs.domList.insertBefore(this.formDom,this.toDom)
                }else{
                    this.$refs.domList.insertBefore(this.formDom,this.toDom.nextElementSibling)
                }
            }
        },
        onItemDragEnd(){
            this.formDom.style.opacity = 1 
            let domList = [...this.$refs.domList.children]
            let order = domList.map(item => this.children.findIndex(i => i === item))
            let newData = [] 
            order.forEach((item,index)=>{
                console.log(item,index)
                newData[index] = this.newitemArr[item]
            })
            this.hasFootTip ? newData.push(this.hasFootTip) : null
            this.hasFoot ? newData.push(this.hasFoot) : null
            this.children = domList
            this.itemArr = newData
        },
        onDrop(e){
            this.inner = false
            let obj = e.dataTransfer.getData('data')
            if(obj){
                obj = JSON.parse(obj)
                obj.id = Math.random().toString(16).substr(2,4)//生成4位随机数
                // obj.id = new Date().getTime() 
                this.itemArr.push(obj)
            }
        },
        // 编辑
        handleEdit(id){
            this.EditId = id
            this.$emit('edit',this.EditId)
        },
        // 删除某一项
        handleDelete(){
            const self = this
            const index = this.itemArr.findIndex(item => item.id === self.EditId)
            this.itemArr.splice(index,1)
        },
        // 切换 编辑按钮文字
        editBtnText(e){
            console.log(this.Lock)
            if(!this.Lock){
                console.log(123)
                if(this.btnText){
                this.btnText = this.btnText.trim()
                }else{
                    this.$Modal.warning({title:'警告',content:'按钮文字不能为空'})
                    this.$refs.SubmitBtn.focus()
                    return ;
                } 
                // this.$refs.SubmitBtn ? console.log(Array.from(this.$refs.SubmitBtn.$el.children).includes(e.target)) : null
                // console.log(e.target)
                if(this.$refs.SubmitBtn && Array.from(this.$refs.SubmitBtn.$el.children).includes(e.target)){
                    console.log(4)
                    this.Lock = true
                    console.log(this.Lock)
                    setTimeout(()=>{this.Lock = false},100)
                }
                this.isEditBtnText = !this.isEditBtnText
                this.$nextTick(()=>{
                    this.isEditBtnText ? this.$refs.SubmitBtn.focus() : null
                })
            }
            
            
        },
        editEnterKey(e){
            e.target.blur()
        },
        // 查看form是否在to之前
        isPrevious(form,to){
            if(form && to){
                while(form.previousElementSibling !== null){
                    if(form.previousElementSibling === to){
                        // 说明toDOM在formDOM的前面
                        return true
                    }
                    form = form.previousElementSibling
                }
            }
        },
        // 重置表单
        ResetForm(){
            this.itemArr = []
            this.$emit('reset')
        }
    },
}
</script>
<style scoped>
.formarea{
    flex:1 1 60%;
    height:100%;
    /* overflow:auto; */
}
.save{
    height:5%;
    background-color:#2d8cf0;
    color:#fff;
    border-left:1px solid #fff;
    border-right:1px solid #fff;
    text-align:right;
    position: relative;
}
.saveBtn,.saveCancel{
    position:absolute;
    top:50%;
    transform: translateY(-50%);
}
.saveBtn{
    right:10px;
}
.saveCancel{
    right:70px;
}
.formarea-Main{
    /* padding:20px;
    height:92%;
    overflow: auto; */
    height:95%;
    overflow:auto;
}
.active{
    border:2px solid red;
}
.item{
    /* margin:10px 0;
    padding:10px; */
    padding:30px 12px;
    margin-bottom: 10px;
    /* display: flex; */
}
.item:hover{
    opacity: .5;
    border: 2px solid #000;
}
.itemEdit{
    background-color: rgba(255,255,255,.3);
    border-style:dashed; 
}
.label{
    line-height:1.4;
    font-size:1rem;
    font-weight:normal;
    color:#000;
}
.required{
    color:#ed4014;
}
.component{
    margin-top:6px;
}
.image{
    width:100%;
    height:100%;
}
.title{
    text-align: center;
    font-size:25px;
    font-weight:700;
}
.sub-title{
    text-align: center;
    font-size:20px;
    font-weight:500,
}
.submit-Btn{
    width:100%;
    height:8%;
    font-size:20px;
}
.tip{
    line-height: 1.4;
    font-weight: normal;
    color: #666666;
    padding:5px 10px;
    text-align: center;
}
.foot{
    margin-top: 20px;
    text-align:center;
}
</style>