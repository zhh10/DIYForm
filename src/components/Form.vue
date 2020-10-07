<template>
    <div class="formarea" :class="{'active':inner}" @dragover.prevent @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
        <div ref="domList">
            <template v-for="(item,index) in itemArr">
                <div :key="item.id" class="item" :class="{'itemEdit':EditIndex === index}" @click="handleEdit(index)" draggable 
                @dragstart.stop="onItemDragStart"
                @dragenter.stop="onItemDragEnter"
                @dragend.stop="onItemDragEnd">
                    <span>{{item.name}}</span>
                    <!-- 输入框 -->
                    <template v-if="item.type === 'input'">
                        <i-input></i-input>
                    </template>
                    <!-- 单选框 -->
                    <template v-if="item.type === 'radio'">
                        <RadioGroup vertical>
                            <template v-for="(option,index) in item.options">
                                <Radio :label="option" :key="index"></Radio>
                            </template>
                        </RadioGroup>
                    </template>
                    <!-- 多选框 -->
                    <template v-if="item.type === 'checkbox'">
                        <checkboxGroup vertical>
                            <template v-for="(option,index) in item.options">
                                <Checkbox :label="option" :key="index"></Checkbox>
                            </template>
                        </checkboxGroup>
                    </template>
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
            EditIndex:null
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
                obj.id = new Date().getTime() 
                this.itemArr.push(obj)
            }
        },
        handleEdit(index){
            this.EditIndex = index 
            this.$emit('edit',this.EditIndex)
        },
        // 删除某一项
        handleDelete(){
            this.itemArr.splice(this.EditIndex,1)
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
}
.active{
    border:2px solid red;
}
.item{
    margin:10px 0;
    padding:10px;
    display: flex;
}
.item:hover{
    opacity: .5;
    border: 2px solid #000;
}
.itemEdit{
    background-color: thistle;
}
</style>