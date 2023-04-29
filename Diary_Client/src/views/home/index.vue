<template>
    <div v-if="!isLoading" class="home">
        <div class="home__title">
            <TitleBar
                title="Home"
                :show-left="false"
                :show-right="true"
                @onClickRight="onClickRight"
            >
                <template #titleRight>
                    <div class="title-bar__left" @click="onClickRight">
                        <van-icon name="ellipsis" size="18" color="#908a8ab3" />
                    </div>
                </template>
            </TitleBar>
        </div>
        <BoxAppear :visible="boxVisible">
            <template #boxContent>
                <div class="home__box">
                    <div class="home__box-info">
                        <div class="home__box-info__name">{{ username }}</div>
                    </div>
                    <div class="home__box-menu">
                        <MenuItem menu-name="开通VIP" @handleClick="getVip" />
                        <MenuItem menu-name="开通VIP" @handleClick="getVip" />
                        <MenuItem menu-name="开通VIP" @handleClick="getVip" />
                        <MenuItem menu-name="开通VIP" @handleClick="getVip" />
                        <MenuItem menu-name="退出登录" @handleClick="exitLogin" />
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
    <Loading v-else />
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TitleBar from '@/components/title-bar.vue'
import Loading from '@/components/loading.vue'
import BoxAppear from './components/box-appear.vue'
import MenuItem from './components/menu-item.vue'
import DiaryCard from './components/diary-card.vue'
import { IHomeDiaryCardRes, getHomeDiaryCard } from '@/server/home'

const diaryCardList = ref<IHomeDiaryCardRes[]>([])

const boxVisible = ref(false)
const router = useRouter()
const isLoading = ref(false)
const username = ref(localStorage.getItem('username') || '')

// 获取日记列表数据
const initCardList = async () => {
    isLoading.value = true
    diaryCardList.value = await getHomeDiaryCard({ username: username.value })
    isLoading.value = false
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

// 开通 VIP
const getVip = () => {
    console.log('开通 VIP')
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
        height: 100%;
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
            padding: 32px 12px 10px 12px;
            box-sizing: border-box;
            flex-wrap: wrap /* 只要您把这个属性去掉,就不会自动换行了*/
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