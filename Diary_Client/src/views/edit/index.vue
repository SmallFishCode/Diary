<template>
    <div class="edit">
        <TitleBar title="Edit" :show-right="true">
            <template v-if="diaryId" #titleRight>
                <div class="title-bar__left" @click="onDeleteDiary">
                    <van-icon name="delete-o" size="18" color="#908a8ab3" />
                </div>
            </template>
        </TitleBar>
        <div class="edit__form">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field
                        v-model="form.diaryText"
                        name="diaryText"
                        autosize
                        rows="10"
                        type="textarea"
                        maxlength="200"
                        show-word-limit
                        placeholder="Please input something..."
                    />
                    <van-field
                        v-model="form.tabs"
                        name="tabs"
                        placeholder="请输入标签..."
                        show-word-limit
                        maxlength="6"
                    />
                    <van-field name="imageUrlArr">
                        <template #input>
                            <van-uploader
                                v-model="form.imageUrlArr"
                                :max-size="5 * 1024 * 1024"
                                :max-count="3"
                                multiple
                                @oversize="onOversize"
                            />
                        </template>
                    </van-field>
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button
                        round
                        block
                        type="default"
                        native-type="submit"
                    >
                        <van-loading v-if="isLoading" type="spinner" />
                        <span v-else>{{ route.params.id ? '更新' : '发布' }}</span>
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { UploaderFileListItem, showConfirmDialog, showFailToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { Buffer } from 'buffer'
import TitleBar from '@/components/title-bar.vue'
import { IBufferFile, IEditInfoReq, editInfoReq } from '@/server/edit'
import { deleteCardDetail, getCardDetail } from '@/server/detail'
import { BASE_URL, CLIENT_BASE_URL } from '@/utils/const'

const form = reactive({
    diaryText: '', // 正文内容
    imageUrlArr: [] as UploaderFileListItem[], // 图片地址
    tabs: '', // 标签
})

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)

// 获取到日记 id，如果存在则调用 update 接口，如果不存在调用 add 接口
const diaryId = route.params.id as string | undefined

// 获取日记详情信息
const initCardDetailInfo = async (id: string) => {
    const res = await getCardDetail({ id })
    form.diaryText = res.diaryText
    form.tabs = res.tabs

    // vant 组件文件预览格式要求:  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
    // 详情可见: https://vant-ui.github.io/vant/#/zh-CN/uploader
    form.imageUrlArr = res.imageUrl.map((img) => ({
        url: BASE_URL + img, 
    })) 
}

// 判断是否是 update 操作，如果是，则进行数据 init
if (diaryId) {
    initCardDetailInfo(diaryId)
}

// 提交日记信息
const onSubmit = async (values: typeof form) => {
    isLoading.value = true
    // 筛选出已存在服务器上的图片，不反复存入
    const isExitImgArr = values.imageUrlArr.filter(item => item.url !== undefined).map(item => item.url!.slice(BASE_URL.length))
    const imageUrlFile = values.imageUrlArr.filter(item => item.file !== undefined).map((item) => (
        {
            file: item.file!,
            name: item.file!.name,
        }
    ))
    
    // 保存 bufferFileArr
    const bufferFileArr: IBufferFile[] = []
    let index = 1 // 当所有图片都加载完毕时上传

    if (imageUrlFile.length) {
        imageUrlFile.forEach((item) => {
            let reader = new FileReader()
            reader.readAsArrayBuffer(item.file)
            reader.onload = function (e) {
                const res = e.target!.result // ArrayBuffer
                const buf = Buffer.from(res as Buffer) // Buffer

                // 转换成json，是为了获取buffer里面的data（二进制数据)
                bufferFileArr.push({
                    buffer: JSON.parse(JSON.stringify(buf)).data,
                    fileName: item.name,
                })
            }
            reader.onloadend = function () {
                if (index === imageUrlFile.length) {
                    const params = {
                        diaryText: values.diaryText,
                        tabs: values.tabs,
                        username: localStorage.getItem('username') || '',
                        bufferFileArr,
                        diaryId,
                        isExitImgArr,
                    }
                    // 上传日记信息
                    addDiary(params)
                }
                index++
            }
        })
    } else {
        const params = {
            diaryText: values.diaryText,
            tabs: values.tabs,
            username: localStorage.getItem('username') || '',
            diaryId,
            isExitImgArr,
        }
        // 上传日记信息
        addDiary(params)
    }
}

// add 日记
const addDiary = (params: IEditInfoReq) => {
    editInfoReq(params).then((res) => {
        isLoading.value = false
        reset()
        window.location.replace(`${CLIENT_BASE_URL}/home`) 
    }).catch((err) => {
        console.log(err)
        isLoading.value = false
        showFailToast(err)
    })
}

// 重置表单
const reset = () => {
    form.diaryText = ''
    form.imageUrlArr = []
}

// 限制上传图片的大小
const onOversize = (file: File) => {
    showFailToast('文件大小不能超过 5MB')
}

// 删除该条笔记
const onDeleteDiary = () => {
    if (diaryId) {
        showConfirmDialog({
            title: '确认删除',
            message:
    '您确定要删除该条日记吗？此操作不可逆！',
        })
        .then(() => {
            deleteCardDetail({ id: diaryId }).then(res => {
                if (res.result === 200) {
                    // router.push({ name: 'home' })
                    window.location.replace(`${CLIENT_BASE_URL}/home`) 
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
}

</script>

<style scoped lang='less'>
.edit {
    height: 100vh;
    overflow-y: scroll;
}

</style>