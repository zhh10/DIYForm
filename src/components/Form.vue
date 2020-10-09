<template>
    <div class="formarea" :class="{'active':inner}" @dragover.prevent @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
        <div ref="domList">
            <template v-for="item in itemArr">
                <div :key="item.id" class="item" :class="{'itemEdit':EditId === item.id}" @click="handleEdit(item.id)" draggable 
                @dragstart.stop="onItemDragStart"
                @dragenter.stop="onItemDragEnter"
                @dragend.stop="onItemDragEnd">
                    <Row>
                        <div class="label">
                            <span class="required" v-if="item.required === 'true'">*</span>{{item.name}}
                        </div>
                    </Row>
                    <Row class="input">
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
            EditId:null
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
            if(this.isPrevious(this.formDom,this.toDom)){
                this.$refs.domList.insertBefore(this.formDom,this.toDom)
            }else{
                this.$refs.domList.insertBefore(this.formDom,this.toDom.nextElementSibling)
            }
        },
        onItemDragEnd(){
            this.formDom.style.opacity = 1 
            let domList = [...this.$refs.domList.children]
            let order = domList.map(item => this.children.findIndex(i => i === item))
            let newData = [] 
            order.forEach((item,index)=>{
                console.log(item,index)
                newData[index] = this.itemArr[item]
            })
            this.children = domList
            this.itemArr = newData
            console.log(this.itemArr)
        },
        onDrop(e){
            this.inner = false
            let obj = e.dataTransfer.getData('data')
            if(obj){
                obj = JSON.parse(obj)
                console.log(obj)
                obj.id = new Date().getTime() 
                this.itemArr.push(obj)
            }
        },
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
        // form是否在to之前
        isPrevious(form,to){
            while(form.previousElementSibling !== null){
                if(form.previousElementSibling === to){
                    // 说明toDOM在formDOM的前面
                    return true
                }
                form = form.previousElementSibling
            }
        }
    },
}
</script>
<style scoped>
.formarea{
    flex:1 1 60%;
    padding:20px;
    overflow: auto;
}
.active{
    border:2px solid red;
}
.item{
    /* margin:10px 0;
    padding:10px; */
    padding:30px 12px;
    /* display: flex; */
}
.item:hover{
    opacity: .5;
    border: 2px solid #000;
}
.itemEdit{
    background-color: thistle;
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
.input{
    margin-top:6px;
}

</style>