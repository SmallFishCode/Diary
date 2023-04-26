<template>
    <div class="menu">
        <van-icon
            class="menu-icon"
            name="close"
            color="#908a8ab3"
        />
        <div class="menu-text">退出登录</div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='less'>
.menu {
    width: 80px;
    height: 80px;
    // border: 1px solid #908a8ab3;

    &-text {
        font-size: 12px;
        color: #908a8ab3;
    }
}
</style>