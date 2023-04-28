<template>
    <div class="box-container" :class="[visible ? 'appear' : '']">
        <div class="box" :style="style">
            <slot name="boxContent"></slot>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'

defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
})

const style = computed(() => ({
    width: `${window.innerWidth - 38}px`,
}))
</script>

<style scoped lang='less'>
.box-container {
    display: flex;
    justify-content: center;
    opacity: 0;
    transform: scale(0) translateY(-300px);
    transition: all .7s ease-in-out;
    box-sizing: border-box;
    margin-top: 50px;
    position: absolute;

    .box {
        height: 300px;
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, 
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
}

.appear {
    opacity: 1;
    transform: scale(1) translateY(0px);
}

</style>