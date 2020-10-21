<template>
    <div class="edit">
        <div class='editTitle'>设置/编辑</div>
        <template v-if="ItemData"> 
            <div class="editMain">
                <!-- 选项名 -->
                <div class="item" v-if="!noName">
                    <Row >
                        <div class="label">选项名称</div>
                    </Row>
                    <Row>
                        <i-input v-model="ItemData.name"></i-input>
                    </Row>
                </div>
                <!-- 子选项 -->
                <div class="item" v-if="needOption">
                    <Row>
                        <div class="OptionItem">
                            <span class="label">子选项</span>
                            <Button @click="addOption" type="primary" size="small">新增选项</Button>
                        </div>
                    </Row>
                    <Row v-if="ItemData.options">
                        <template v-for="(item,index) in ItemData.options">
                            <template>
                                <div :key="index">
                                    <i-col span="20" class="OptionItem-input">
                                        <i-input v-model="item.key" ></i-input>
                                    </i-col>
                                    <i-col span="4" class="OptionItem-icon">
                                        <span class="removeIcon" @click="RemoveOption(index)">
                                            <Icon type="md-remove" />
                                        </span>
                                    </i-col>
                                </div>
                            </template>
                        </template>
                    </Row>
                </div>
                <!-- 必填项 -->
                <div class="item" v-if="hasRequired">
                    <Row>
                        <div class="label">是否是必填项</div>
                    </Row>
                    <Row>
                        <RadioGroup v-model="ItemData.required" vertical>
                            <Radio label="true"><span>是</span></Radio>
                            <Radio label="false"><span>否</span></Radio>
                        </RadioGroup>
                    </Row>
                </div>
                <!-- 上传图片修改图片 -->
                <div class="item" v-if="ItemData.type === 'image'">
                    <Row>
                        <div class="label">修改图片</div>
                    </Row>
                    <Row>
                        <Upload type="drag" 
                                action="http://oss.cepreicloud.com/bucket/upload" 
                                :format="['jpg','jpeg','png']"
                                :show-upload-list="false"
                                :on-success="uploadSuccess">
                            <div style="padding:20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>上传图片修改背景图</p>
                            </div>
                        </Upload>
                    </Row>
                </div>
                <!-- 有text的部分-->
                <div class="item" v-if="hasText">
                    <Row>
                        <div class="label">提示文字</div>
                    </Row>
                    <Row>
                        <i-input v-model="ItemData.text" type="textarea"></i-input>
                    </Row>
                </div>
            </div>
            <div class="editBtn">
                <Button @click="handleDelete" type="error">删除</Button>
                <Button @click="handleSave" type="success">保存</Button>
                <Button @click="handleCancel" type="primary">取消</Button>
            </div>
        </template>
        
    </div>
</template>
<script>
export default {
    name:'editarea',
    props:{
        ItemData:Object,
        defaultItemData:Object,
    },
    computed:{
        // 不需要Name属性
        noName(){
            const noName = this.ItemData.type === 'image' ? true : false 
            return noName
        },
        needOption(){
            const needOption = this.ItemData.type === 'radio' || this.ItemData.type === 'checkbox' ? true : false 
            return needOption
        },
        hasText(){
            const hasText = this.ItemData.type === 'foot-tip' || this.ItemData.type === 'foot' || this.ItemData.type === 'title' || this.ItemData.type === 'sub-title'
            return hasText
        },
        hasRequired(){
            const hasRequired = this.ItemData.type === 'input' || this.ItemData.type === 'checkbox' || this.ItemData.type === 'radio'
            return hasRequired
        }
    },
    methods:{
        // 删除
        handleDelete(){
            this.$emit('Delete')
        },
        // 取消
        handleCancel(){
            this.$emit('Cancel')
        },
        // 保存
        handleSave(){
            if(this.ItemData.type === 'radio' || this.ItemData.type === 'checkbox'){
                this.ItemData.options.forEach(item => {
                    item.value = item.key
                })
            }
            this.ItemData.name ? this.ItemData.name = this.ItemData.name.trim() : null
            this.ItemData.text ? this.ItemData.text = this.ItemData.text.trim() : null
            //  进行校验 通过就进行提交
            this.validate(this.ItemData) ? this.$emit('Save',this.ItemData) : null;
            console.log(this.ItemData)
        },
        // 新增子选项
        addOption(){
            this.ItemData.options.push({key:`选项${this.ItemData.options.length + 1}`,value:`选项${this.ItemData.options.length + 1}`})
        },
        // 删除子选项
        RemoveOption(index){
            this.ItemData.options.length > 1 ? this.ItemData.options.splice(index,1) : this.message('warning','选项数量不能为零')
        },
        // 验证
        validate(data){
            if(!data.name){
                this.message('error','选项名字不能为空')
                return false
            }
            if(!data.text && this.hasText){
                this.message('error','提示文字不能为空')
                return false
            }
            return true
        },
        uploadSuccess(response){
            console.log(123)
            const url = response.data 
            this.ItemData.imgAddress = url
        },
        message(type,content){
            switch(type){
                case 'warning':
                    this.$Modal.warning({title:'警告',content})
                    break ;
                case 'error':
                    this.$Modal.error({title:'错误',content})
                    break ;
            }
        }
    }
}
</script>
<style scoped>
.edit{
    flex:1 1 20%;
}
.editTitle{
    height:5%;
    display: flex;
    align-items: center;
    background-color:#2d8cf0;
    color:#fff;
    font-size:20x;
    padding:5px 0;
    padding-left:20px;
}
.editMain{
    height:85%;
    overflow:auto;
}
.item{
    padding:12px 30px;
}
.label{
    font-size:18px;
    font-weight: 700;
}
.OptionItem{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.OptionItem-input{
    margin:10px 0;
}
.OptionItem-icon{
    margin:10px 0;
    text-align: center;
}
.removeIcon{
    cursor: pointer;
    color:#2d8cf0;
    margin-left:10px;
    width:15px;
    height:32px;
    line-height: 32px;
}
.editBtn{
    height:10%;
    width:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>