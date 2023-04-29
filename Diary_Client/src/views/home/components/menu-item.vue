<template>
    <div class="menu" @click="() => emits('handleClick')">
        <div class="menu-icon">
            <van-icon name="close" color="#908a8ab3" size="24" />
        </div>
        <div class="menu-text">{{ menuName }}</div>
    </div>
</template>

<script setup lang='ts'>
defineProps({
    menuName: {
        type: String,
        required: true,
    },
})
const emits = defineEmits(['handleClick'])
</script>

<style scoped lang='less'>
.menu {
    width: 80px;
    height: 80px;
    margin: 0px 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, 
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

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