<template>
    <van-nav-bar :title="title" fixed placeholder>
        <template v-if="showLeft" #left>
            <div class="title-bar__left" @click="onClickLeft">
                <van-icon name="arrow-left" size="18" color="#908a8ab3">
                    <!-- <span class="title-bar__back">{{ leftText }}</span> -->
                </van-icon>
            </div>
        </template>
        <template v-if="showRight" #right>
            <slot name="titleRight"></slot>
        </template>
    </van-nav-bar>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'

defineProps({
    showLeft: {
        type: Boolean,
        default: true,
    },
    showRight: {
        type: Boolean,
        default: false,
    },
    leftText: {
        type: String,
        default: 'Back',
    },
    title: {
        type: String,
        required: true,
    },
})

const router = useRouter()
const emits = defineEmits(['on-click-right'])

const onClickLeft = () => router.back()
</script>

<style scoped lang='less'>
.title-bar {
    min-height: 46px;
    
    &__back {
        margin-left: 5px;
        color: #908a8ab3;
    }
}
</style>