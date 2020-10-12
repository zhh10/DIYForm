<template>
    <div class="edit">
        <div class='editTitle'>设置/编辑</div>
        <template v-if="ItemData"> 
            <div class="editMain">
                <div class="item">
                    <Row>
                        <div class="label">选项名称</div>
                    </Row>
                    <Row>
                        <i-input v-model="ItemData.name"></i-input>
                    </Row>
                </div>
                <div class="item" v-if = "ItemData.type === 'radio' || ItemData.type === 'checkbox'">
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
                <div class="item" v-if="ItemData.required">
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
                <!-- 底部提示文字  底部文字 -->
                <div class="item" v-if="ItemData.type === 'foot-tip' || ItemData.type === 'foot'">
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
            // 校验选项名字
            this.$emit('Save',this.ItemData)
        },
        // 新增子选项
        addOption(){
            this.ItemData.options.push({key:`选项${this.ItemData.options.length + 1}`,value:`选项${this.ItemData.options.length + 1}`})
        },
        // 删除子选项
        RemoveOption(index){
            this.ItemData.options.length > 1 ? this.ItemData.options.splice(index,1) : this.$Modal.warning({title:'警告',content:'选项数量不能为零'})
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