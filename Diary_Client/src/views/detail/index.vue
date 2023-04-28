<template>
    <div class="detail">
        <TitleBar title="Detail" />
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
            <div class="detail__info-time">{{ dayjs(detailInfo?.diaryTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
            <div class="detail__info-name">{{ `By ${detailInfo?.username}` }}</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import TitleBar from '@/components/title-bar.vue'
import { IGetDetailRes, getCardDetail } from '@/server/detail'
import { BASE_URL } from '@/utils/const'

const route = useRoute()

const detailInfo = ref<IGetDetailRes>()

const diaryId = route.params.id as string

const initCardDetailInfo = async () => {
    const res = await getCardDetail({ id: diaryId })
    detailInfo.value = res
}

initCardDetailInfo()

</script>

<style scoped lang='less'>
.detail {
    padding: 16px;
    box-sizing: border-box;
    overflow-x: hidden;

    &__text {
        margin-top: 10px;
        margin-bottom: 20px;
        white-space: pre-wrap;  // 识别换行 /n 
    }

    &__img {

        img {
            max-width: 200px;
            min-height: 200px;
        }
    }

    &__info {
        display: flex;
        justify-content: space-between;
        font-size: 9px;
        margin-top: 100px;

        &-name {
            font-weight: 600;
        }
    }
}
</style>