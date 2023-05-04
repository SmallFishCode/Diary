<template>
    <div class="loading">
        <van-loading vertical>
            <template #icon>
                <van-icon name="star-o" size="30" />
            </template>
            加载中...
        </van-loading>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='less'>
.loading {
    height: calc(100vh - 70px);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>