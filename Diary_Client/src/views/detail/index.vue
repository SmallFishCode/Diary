<template>
    <div v-if="!isLoading" class="detail">
        <TitleBar title="Detail" :show-right="true">
            <template #titleRight>
                <div class="title-bar__left" @click="onDeleteDiary">
                    <van-icon name="delete-o" size="18" color="#908a8ab3" />
                </div>
            </template>
        </TitleBar>
        <div class="detail__text">{{ detailInfo?.diaryText }}</div>
        <div class="detail__img">
            <img
                v-for="(img, index) in detailInfo?.imageUrl"
                :key="index"
                :src="BASE_URL + img"
                alt=""
            />
        </div>
        <div class="detail__info">
            <div class="detail__info-time">
                <span>{{ dayjs(detailInfo?.diaryTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                <div v-if="detailInfo?.tabs" class="detail__info-time-tabs">
                    <div class="detail__info-time-tabs-text">{{ detailInfo.tabs }}</div>
                </div>
            </div>
            <div class="detail__info-name">
                <van-icon
                    name="edit"
                    size="18"
                    color="#908a8ab3"
                    style="margin-right: 12px;"
                    @click="onUpdateDiary"
                />
                {{ `By ${detailInfo?.username}` }}
            </div>
        </div>
    </div>
    <Loading v-else />
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showConfirmDialog, showFailToast } from 'vant'
import dayjs from 'dayjs'
import TitleBar from '@/components/title-bar.vue'
import Loading from '@/components/loading.vue'
import { IGetDetailRes, deleteCardDetail, getCardDetail } from '@/server/detail'
import { BASE_URL } from '@/utils/const'

const route = useRoute()
const router = useRouter()

const detailInfo = ref<IGetDetailRes>()

const isLoading = ref(false)
const diaryId = route.params.id as string

const initCardDetailInfo = async () => {
    isLoading.value = true
    const res = await getCardDetail({ id: diaryId })
    detailInfo.value = res
    isLoading.value = false
}

initCardDetailInfo()

// 删除该条笔记
const onDeleteDiary = () => {
    showConfirmDialog({
        title: '确认删除',
        message:
    '您确定要删除该条日记吗？此操作不可逆！',
    })
    .then(() => {
        deleteCardDetail({ id: diaryId }).then(res => {
            if (res.result === 200) {
                router.push('/home')
            }
        }).catch((err) => {
            console.log(err)
            showFailToast(err)
        })
    })
    .catch(() => {
        // on cancel
    })
}

// 更新该笔记
const onUpdateDiary = () => {
    router.push(`/edit/${diaryId}`)
}

</script>

<style scoped lang='less'>
.detail {
    padding: 16px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100vh;

    &__text {
        margin-top: 10px;
        margin-bottom: 20px;
        white-space: pre-wrap;  // 识别换行 /n 
    }

    &__img {

        img {
            max-width: 300px;
        }
    }

    &__info {
        display: flex;
        justify-content: space-between;
        font-size: 9px;
        margin-top: 100px;

        &-name {
            display: flex;
            align-items: center;
            font-weight: 600;
        }

        &-time {
            display: flex;
            align-items: center;

            &-tabs {
                padding: 1px 4px;
                height: 16px;
                background: #908a8ab3;
                border-radius: 3px;
                margin-left: 5px;
                display: flex;
                align-items: center;
                justify-content: center;

                &-text {
                    font-weight: 500;
                    font-size: 9px;
                    color: #fff;
                }
            }
        }
    }
}
</style>