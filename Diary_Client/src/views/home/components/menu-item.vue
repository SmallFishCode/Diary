<template>
    <div class="menu" @click="() => emits('handleClick')">
        <div class="menu-icon">
            <van-icon name="close" color="#908a8ab3" size="24" />
        </div>
        <div class="menu-text">退出登录</div>
    </div>
</template>

<script setup lang='ts'>
const emits = defineEmits(['handleClick'])
</script>

<style scoped lang='less'>
.menu {
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #908a8ab3;

    &-icon {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &-text {
        flex: 1;
        font-size: 12px;
        color: #908a8ab3;
    }
}
</style>