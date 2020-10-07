<template>
    <div class="edit">
        <div>编辑</div>
        <template v-if="data"> 
            {{data.name}}
            <Button @click="handleDelete" type="error">删除</Button>
            <Button @click="handleCancel" type="primary">取消</Button>
        </template>
        
    </div>
</template>
<script>
export default {
    name:'editarea',
    props:{
        data:Object
    },
    methods:{
        handleDelete(){
            this.$emit('Delete')
        },
        handleCancel(){
            this.$emit('Cancel')
        }
    }
}
</script>
<style scoped>
.edit{
    flex:1 1 20%;
}
</style>