<template>
    <div class="home">
        <TitleBar
            title="Home"
            :show-left="false"
            :show-right="true"
        >
            <template #titleRight>
                <div class="title-bar__left" @click="onClickRight">
                    <van-icon name="ellipsis" size="18" color="#908a8ab3" />
                </div>
            </template>
        </TitleBar>
        <div v-if="!isLoading" class="home__content">
            <van-pull-refresh v-model="pullRefreshLoading" @refresh="onRefresh">
                <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    :offset="50"
                    :immediate-check="false"
                    @load="initCardList"
                >
                    <BoxAppear :visible="boxVisible">
                        <template #boxContent>
                            <div class="home__box">
                                <div class="home__box-info">
                                    <div class="home__box-info__name">{{ username }}</div>
                                </div>
                                <div class="home__box-menu">
                                    <MenuItem icon-name="gem-o" menu-name="开通VIP" @handleClick="getVip" />
                                    <MenuItem
                                        icon-name="search"
                                        menu-name="标签查询"
                                        @handleClick="() => {
                                            boxVisible = false
                                            showSearchWithTabs = true
                                        }"
                                    />
                                    <MenuItem icon-name="close" menu-name="退出登录" @handleClick="exitLogin" />
                                </div>
                            </div>
                        </template>
                    </BoxAppear>
                    <van-search
                        v-show="showSearchWithTabs"
                        v-model="searchTextWithTabs"
                        class="home__search-with-tabs"
                        placeholder="请输入搜索关键词"
                        autofocus
                        @search="searchDiaryWithTabs"
                    />
                    <div class="home__list">
                        <DiaryCard v-if="!isEmpty" :diary-card-list="diaryCardList" />
                        <van-empty v-else description="快去添加日记吧!" />
                    </div>
                </van-list>
            </van-pull-refresh>
           
            <div class="home__main">
                <div class="home__main-edit" @click="clickEdit">
                    <van-icon name="edit" size="30" color="#fff" />
                </div>
            </div>
        </div>
        <Loading v-else />
    </div>
</template>

<script setup lang='ts' name="home">
import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import TitleBar from '@/components/title-bar.vue'
import Loading from '@/components/loading.vue'
import BoxAppear from './components/box-appear.vue'
import MenuItem from './components/menu-item.vue'
import DiaryCard from './components/diary-card.vue'
import { IHomeDiaryCardRes, getHomeDiaryCard } from '@/server/home'
import { searchWithTabs } from '@/server/search'
import { CLIENT_BASE_URL } from '@/utils/const'

const diaryCardList = ref<IHomeDiaryCardRes[]>([])

const boxVisible = ref(false)
const page = ref(1)
const router = useRouter()
const isLoading = ref(false)
const pullRefreshLoading = ref(false)
const showSearchWithTabs = ref(false)
const searchTextWithTabs = ref('') // 根据 tabs 搜索日记
const username = ref(localStorage.getItem('username') || '')
const loading = ref(false)
const finished = ref(false)
const isEmpty = ref(true)

// 获取日记列表数据
const initCardList = async () => {
    if (page.value === 1) {
        isLoading.value = true
    } else {
        loading.value = true
    }
    setTimeout(async () => {
        const res = await getHomeDiaryCard({ username: username.value, page: page.value, pageSize: 10 })
        if (!res.length && !isEmpty.value) {
            finished.value = true
        } else {
            diaryCardList.value.push(...res)
        }
        if (page.value === 1) {
            isLoading.value = false
            isEmpty.value = !res.length
        }
        loading.value = false
        page.value++
    }, 100)
}

initCardList()

// 点击菜单栏
const onClickRight = () => {
    boxVisible.value = !boxVisible.value
}

// 退出登录
const exitLogin = () => {
    localStorage.clear()
    window.location.replace(`${CLIENT_BASE_URL}/login`) 
}

// 开通 VIP
const getVip = () => {
    console.log('开通 VIP')
}

// 点击编辑
const clickEdit = () => {
    router.push('/edit')
}

// 根据标签查询日记
const searchDiaryWithTabs = async (text: string) => {
    showSearchWithTabs.value = false
    if (text) {
        diaryCardList.value = await searchWithTabs({ tabs: text, username: localStorage.getItem('username') || '' })
        searchTextWithTabs.value = ''
        if (!diaryCardList.value.length) {
            isEmpty.value = true
        }
    }
}
   
// 下拉刷新
const onRefresh = async () => {
    setTimeout(async () => {
        finished.value = false
        page.value = 1
        diaryCardList.value.length = 0
        await initCardList() // 刷新列表
        searchTextWithTabs.value = ''
        pullRefreshLoading.value = false
        showToast({ message: '刷新成功', duration: 300 })
    }, 500)
}

onActivated(() => {
    boxVisible.value = false
})

</script>

<style scoped lang='less'>
.home {
    padding: 0px 19px 19px 19px;
    height: 100vh;
    box-sizing: border-box;
    background: #F5F5F5;
    overflow-x: hidden;

    &__content {
        height: calc(100vh - 70px);

        :deep(.van-pull-refresh) {
            min-height: 200px;
        }
    }

    &__search-with-tabs {
        width: calc(100% - 38px);
        padding-right: 19px;
        box-sizing: border-box;
        position: fixed;
        background: #555;
        border-radius: 5px;
        top: 100px;
    }

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
            bottom: 100px;
            right: 50px;
        }
    }

    &__list {
        padding: 0px 5px;
        height: 100%;
        box-sizing: border-box;
    }
}
</style>