<template>
    <div
        v-for="item in diaryCardList"
        :key="item.diaryId"
        class="diary-card"
        @click="toDetail(item.diaryId)"
    >
        <div class="diary-card__time">
            <div class="diary-card__time-year">{{ dayjs(item.diaryTime).format('YYYY年') }}</div>
            <div class="diary-card__time-day">{{ dayjs(item.diaryTime).format('MM月DD日') }}</div>
            <div class="diary-card__time-day">{{ dayjs(item.diaryTime).format('HH:mm') }}</div>
        </div>
        <div class="diary-card__content">
            <div class="diary-card__content-text">{{ item.diaryText }}</div>
            <div class="diary-card__content-image">
                <img
                    v-for="(img, index) in item.imageUrl"
                    :key="index"
                    :src="BASE_URL + img"
                    alt=""
                />
            </div>
            <div class="diary-card__content-info">
                <div class="diary-card__content-info-name">{{ item.username }}</div>
                <div v-if="item.tabs" class="diary-card__content-info-tabs">
                    <div class="diary-card__content-info-tabs-text">{{ item.tabs }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import dayjs from 'dayjs'
import { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { IHomeDiaryCardRes } from '@/server/home'
import { BASE_URL } from '@/utils/const'

defineProps({
    diaryCardList: {
        type: Object as PropType<IHomeDiaryCardRes[]>,
        required: true,
    },
})

const router = useRouter()

const toDetail = (id: number) => {
    router.push(`/detail/${id}`)
}

</script>

<style scoped lang='less'>
.diary-card {
    margin-top: 20px;
    max-height: 176px;
    padding: 16px;
    background: #fff;
    border-radius: 12px;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, 
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    &:last-child {
        margin-bottom: 20px;
    }
    
    &__time {
        width: 60px;
        font-size: 9px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    &__content {
        flex: 1;
        font-size: 12px;
        margin-left: 20px;

        &-text {
            display: -webkit-box; /* 盒子类型 */
            word-break: break-all; /* 自动换行的处理方法。允许在单词内换行 */
            text-overflow: ellipsis; /* 溢出时用... */
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:3; /* 最大行数 */
        }

        &-image {
            width: calc(100vw - 150px);
            margin-top: 20px;
            max-height: 80px;
            white-space: nowrap;
            overflow-x: scroll;
            overflow-y: hidden;

            img {
                width: 80px;
                height: 80px;
                margin-right: 5px;
            }

            &::-webkit-scrollbar {
                display: none;
            }
        }

        &-info {
            margin-top: 10px;
            display: flex;
            align-items: center;

            &-name {
                font-weight: 600;
                font-size: 10px;
            }

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