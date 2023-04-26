<template>
    <div class="home">
        <div class="home__title">
            <TitleBar
                title="Home"
                :show-left="false"
                :show-right="true"
                @onClickRight="onClickRight"
            />
        </div>
        <BoxAppear :visible="boxVisible">
            <template #boxContent>
                <div>
                    烂笔头
                </div>
            </template>
        </BoxAppear>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import TitleBar from '@/components/title-bar.vue'
import BoxAppear from './components/box-appear.vue'

const boxVisible = ref(false)

const onClickRight = () => {
    boxVisible.value = !boxVisible.value
}
</script>

<style scoped lang='less'>
.home {
    padding: 19px;
    min-height: 100vh;
    box-sizing: border-box;
    background: #F5F5F5;

    &__title {
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, 
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
}
</style>