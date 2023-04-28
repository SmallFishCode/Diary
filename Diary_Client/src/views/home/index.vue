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
                        <MenuItem @handleClick="exitLogin" />
                    </div>
                </div>
            </template>
        </BoxAppear>
        <div class="home__main">
            <div class="home__main-edit" @click="clickEdit">
                <van-icon name="edit" size="30" color="#fff" />
            </div>
        </div>
        <div class="home__list">
            <DiaryCard :diary-card-list="diaryCardList" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TitleBar from '@/components/title-bar.vue'
import BoxAppear from './components/box-appear.vue'
import MenuItem from './components/menu-item.vue'
import DiaryCard from './components/diary-card.vue'
import { IHomeDiaryCardRes, getHomeDiaryCard } from '@/server/home'

const diaryCardList = ref<IHomeDiaryCardRes[]>([])

const boxVisible = ref(false)
const router = useRouter()

// 获取日记列表数据
const initCardList = async () => {
    diaryCardList.value = await getHomeDiaryCard({ username: localStorage.getItem('username') || '' })
}

initCardList()

// 点击菜单栏
const onClickRight = () => {
    boxVisible.value = !boxVisible.value
}

// 退出登录
const exitLogin = () => {
    localStorage.clear()
    router.push('/login')
}

// 点击编辑
const clickEdit = () => {
    router.push('/edit')
}
   
</script>

<style scoped lang='less'>
.home {
    padding: 19px;
    min-height: 100vh;
    box-sizing: border-box;
    background: #F5F5F5;
    overflow-x: hidden;

    // &__title {
    //     box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    //     rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, 
    //     rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    // }

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

        &-edit {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #555;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            bottom: 150px;
            right: 50px;
        }
    }
}
</style>