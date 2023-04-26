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
                <div class="home__box">
                    <div class="home__box-info">
                        <div class="home__box-info__name">SmallFish</div>
                    </div>
                    <div class="home__box-menu">
                        <MenuItem />
                    </div>
                </div>
            </template>
        </BoxAppear>
        <div class="home__main">
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import TitleBar from '@/components/title-bar.vue'
import { isOnline } from '@/utils/token'
import BoxAppear from './components/box-appear.vue'
import MenuItem from './components/menu-item.vue'

const boxVisible = ref(false)

const onClickRight = () => {
    boxVisible.value = !boxVisible.value
}

onMounted(() => {
    isOnline()
})
</script>

<style scoped lang='less'>
.home {
    padding: 19px;
    min-height: 100vh;
    box-sizing: border-box;
    background: #F5F5F5;
    overflow-x: hidden;

    &__title {
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, 
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }

    &__box {
        display: flex;
        flex-direction: column;

        &-info {
            display: flex;
            align-items: center;
            height: 40px;
            border-bottom: 1px solid #b2b1b1;

            &__name {
                margin-left: 16px;
                font-weight: 500;
            }
        }

        &-menu {
            flex: 1;
            display: flex;
        }
    }

    &__main {
        margin-top: 20px;
    }
}
</style>