<template>
    <div class="formarea" >
        <div class="formarea--header">
            <div class="formarea--header--title">
                <img class="formarea--header--title--icon" src="@/assets/img/editForm.png" alt="">
                表单编辑区域
            </div>
            <div class="formarea--BtnGroup">
                <Button size="small" class="formarea--BtnGroup--btn reset" type="error" @click="ResetForm">重置</Button>
                <Button size="small" class="formarea--BtnGroup--btn save" type="success" @click="saveModalShow = true">保存</Button>
            </div>
        </div>
        <div  class="formarea--Main" :class="{'active':inner}" @dragover.prevent @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
            <div ref="domList">
                <draggable v-bind="{animation:150}" v-model="newitemArr" @start="start" @end="end">
                <!-- 循环 itemArr -->
                <template v-for="item in newitemArr" >
                    <!-- <div :key="item.id" class="formarea--Item" :class="{'formarea--ItemEdit':EditId === item.id}" @click="handleEdit(item.id)" draggable 
                    @dragstart.stop="onItemDragStart"
                    @dragenter.stop="onItemDragEnter"
                    @dragend.stop="onItemDragEnd"
                    > -->
                      <div :key="item.id" class="formarea--Item" :class="{'formarea--ItemEdit':EditId === item.id}" @click="handleEdit(item.id)" draggable >
                        <Row>
                            <div class="formarea--Item--label" v-if="item.type !== 'image' && item.type !== 'title' && item.type !== 'sub-title'">
                                <span class="formarea--Item--required" v-if="item.required === 'true'">*</span>{{item.name}}
                            </div>
                        </Row>
                        <Row class="formarea--Item--component">
                            <i-col span="24">
                                    <!-- 输入框 -->
                                    <!-- 带icon -->
                                    <template v-if="item.type === 'input' && item.prefix">
                                        <Input v-show="item.inpType === 'tel'" type="tel" :prefix="item.prefix" style="width:70%" :placeholder="item.text"/> 
                                        <Input v-show="item.inpType === 'text'" :prefix="item.prefix" style="width:70%" :placeholder="item.text"/>
                                    </template>
                                    <!-- 不带icon -->
                                    <template v-if="item.type === 'input' && !item.prefix">
                                        <Input v-show="item.inpType === 'tel'" type="tel"  style="width:70%" :placeholder="item.text"/> 
                                        <Input v-show="item.inpType === 'text'"  style="width:70%" :placeholder="item.text"/>
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
                                    <!-- 日期选择 -->
                                    <template v-if="item.type === 'dateSelect'">
                                        <DatePicker style="width:40%;" size="large" type="date" :placeholder="item.text" ></DatePicker>
                                    </template>
                                    <!-- 下拉框 -->
                                    <template v-if="item.type === 'Select'">
                                        <Select style="width:40%" :prefix="item.prefix">
                                            <template v-for="(option,index) in item.options">
                                                <Option :value="option.key" :key="index">{{option.key}}</Option>
                                            </template>
                                        </Select>
                                    </template>
                                    <!-- 所在地选择 -->
                                    <template v-if="item.type === 'region'">
                                         <i-region style="width:40%"  placeholder='请选择省市区'></i-region>
                                    </template>
                                    <!-- 图片 -->
                                    <template v-if="item.type === 'image'">
                                        <img  ref="image" :src="item.imgAddress" alt="" class="formarea--Item--image" draggable=false>
                                    </template>
                                    <!-- 标题 -->
                                    <template v-if="item.type === 'title'" >
                                        <div class="formarea--Item--title">{{item.text}}</div>
                                    </template>
                                    <!-- 副标题 -->
                                    <template v-if="item.type === 'sub-title'">
                                        <div class="formarea--Item--subTitle">{{item.text}}</div>
                                    </template>
                            </i-col>
                        </Row>
                    </div>  
                </template>
                </draggable>
            </div>
            <!-- 提交按钮 -->
            <div class="formarea--submitBtn">
                <Button style="width:100%;" type="primary" v-if="itemArr.length >= 1" @click="editBtnText($event)">
                    <i-input v-if="isEditBtnText" v-model="btnText" @on-blur="editBtnText($event)"  @on-enter="editEnterKey" ref="SubmitBtn"></i-input>
                    <span v-else>{{btnText}}</span>
                </Button>
            </div>
            <!-- 底部提示文字 -->
            <div class="formarea--tip" v-if="hasFootTip" @click="handleEdit(hasFootTip.id)" :class="{'formarea--ItemEdit':EditId === hasFootTip.id}">
                <div>{{hasFootTip.text}}</div>
            </div>
            <!-- 底部文字 -->
            <div class="formarea--foot" v-if="hasFoot" @click="handleEdit(hasFoot.id)" :class="{'formarea--ItemEdit':EditId === hasFoot.id}">
                <span>{{hasFoot.text}}</span>
            </div>
        </div>
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
            <div style="font-size:25px">图片上传中</div>
        </Spin>
        <Modal v-model="saveModalShow" title="请给表单起一个名字" :loading="saveModalLoading" @on-cancel="cancelSaveForm" @on-ok="SaveForm">
            <Input v-model="formName"/>
        </Modal>
    </div>
</template>
<script>
import draggable from "vuedraggable"
import _ from "lodash"
export default {
    name:'formarea',
    components:{
        draggable
    },
    data(){
        return {
            inner:false,
            itemArr:[],
            fromDom:null,
            EditId:null,
            btnText:'提交',//默认提交按钮文字
            isEditBtnText:false,
            Lock:false,
            loading:false,
            saveModalShow:false,
            formName:null,
            saveModalLoading:true,
        }
    },
    computed:{
        newitemArr:{
            //  剔除 底部提示文字组件 和 底部文字组件
            get(){
                return this.itemArr.filter(item => item.type !== 'foot-tip' && item.type !== 'foot')
            },
            set(val){
                const newData = val 
                this.hasFootTip ? newData.push(this.hasFootTip) : null
                this.hasFoot ? newData.push(this.hasFoot) : null
                this.itemArr = newData
            }
            
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
        },
    },
    methods:{
        start(e){
            let {oldIndex,from} = e 
            window.e = e
            this.fromDom = from.querySelectorAll('.formarea--Item')[oldIndex]
            console.log(this.fromDom)
            this.fromDom.style = "box-shadow:0 10px 15px 0 rgba(0,0,0,.1);border-radius:4px;border:2px solid #2672ff;outline:none;"
        },
        end(){
            this.fromDom.style = ""
        },
        onDragEnter(){
            this.inner = true
        },
        onDragLeave(){
            this.inner = false
        },
        // onItemDragStart(e){
        //     this.children = [...this.$refs.domList.children]
        //     this.formDom = e.target 
        //     this.formDom.style.opacity = 1
        // },
        // onItemDragEnter(e){
        //     this.toDom = e.target
        //     console.log(this.formDom)
        //     console.log(this.toDom)
        //     if(this.formDom && this.toDom){
        //         if(this.isPrevious(this.formDom,this.toDom)){
        //             this.$refs.domList.insertBefore(this.formDom,this.toDom)
        //         }else{
        //             this.$refs.domList.insertBefore(this.formDom,this.toDom.nextElementSibling)
        //         }
        //     }
        // },
        // onItemDragEnd(){
        //     let domList = [...this.$refs.domList.children]
        //     let order = domList.map(item => this.children.findIndex(i => i === item))
        //     let newData = [] 
        //     order.forEach((item,index)=>{
        //         newData[index] = this.newitemArr[item]
        //     })
        //     this.hasFootTip ? newData.push(this.hasFootTip) : null
        //     this.hasFoot ? newData.push(this.hasFoot) : null
        //     this.children = domList
        //     this.itemArr = newData
        // },
        onDrop(e){
            this.inner = false
            let obj = e.dataTransfer.getData('data')
            if(obj){
                obj = JSON.parse(obj)
                obj.id = Math.random().toString(16).substr(2,4)//生成4位随机数
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
            if(this.EditId){
                this.$emit('reset')
            }
            if(!this.Lock){
                if(this.btnText){
                this.btnText = this.btnText.trim()
                }else{
                    this.$Modal.warning({title:'警告',content:'按钮文字不能为空'})
                    this.$refs.SubmitBtn.focus()
                    return ;
                } 
                if(this.$refs.SubmitBtn && Array.from(this.$refs.SubmitBtn.$el.children).includes(e.target)){
                    this.Lock = true
                    setTimeout(()=>{this.Lock = false},400)
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
            this.$Modal.confirm({
                title:'警告',
                content:'确定要重置表单吗？',
                onOk:() => {
                    this.itemArr = [] 
                    this.$emit('reset')
                },
                onCancel:() => {}
            })
        },
        SaveForm(){
            // 验证表单名字是否有填写
            console.log(this.formName)
            if(this.formName && this.formName.trim().length > 0){
                setTimeout(()=>{
                    this.saveModalLoading = false
                    this.save()
                    this.$nextTick(() => {
                        this.$Message.success('保存成功')
                        this.saveModalShow = false
                        this.saveModalLoading = true
                    })
                },0)
            }else{
                this.$Message.error('表单名未填写或者填写不规范')
                setTimeout(() => {
                    this.formName = null
                    this.saveModalLoading = false
                    this.$nextTick(() => {
                        this.saveModalLoading = true
                    });
                }, 0);
            }
        },
        save(){
            const itemArr = _.cloneDeep(this.itemArr)
            itemArr.push({
                type:'button',
                btnText:this.btnText
            })
            console.log(itemArr)
        },
        cancelSaveForm(){
            this.saveModalShow = false
            this.formName = null
        },
    }, 
}
</script>
<style  scoped>
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>
