<template>
    <!-- 缓存 home 页面 -->
    <router-view v-slot="{Component}">
        <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
*{
    margin: 0px;
    padding: 0px;
}
</style>
