<template>
    <div class="formarea" :class="{'active':inner}" @dragover.prevent @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
        <div  class="formarea-Main" >
            <div ref="domList">
                <!-- 循环 itemArr -->
                <template v-for="item in newitemArr">
                    <div :key="item.id" class="item" :class="{'itemEdit':EditId === item.id}" @click="handleEdit(item.id)" draggable 
                    @dragstart.stop="onItemDragStart"
                    @dragenter.stop="onItemDragEnter"
                    @dragend.stop="onItemDragEnd">
                        <Row>
                            <div class="label">
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
                            </i-col>
                        </Row>
                    </div>  
                </template>
            </div>
            <!-- 提交按钮 -->
            <Button class="submit-Btn" type="primary" v-if="itemArr.length >= 1">
                <i-input v-if="isEditBtnText" v-model="btnText" @on-blur="editBtnText"></i-input>
                <span v-else @click="editBtnText">{{btnText}}</span>
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
            console.log(domList)
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
                obj.id = new Date().getTime() 
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
        editBtnText(){
            this.isEditBtnText = !this.isEditBtnText
        },
        // form是否在to之前
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
        }
    },
}
</script>
<style scoped>
.formarea{
    flex:1 1 60%;
    height:100%;
    overflow:auto;
}
.formarea-Main{
    /* padding:20px;
    height:92%;
    overflow: auto; */
    height:100%;
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