<template>
    <div class="edit">
        <TitleBar title="Edit" />
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
                        发布
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import { UploaderFileListItem, showFailToast } from 'vant'
import { Buffer } from 'buffer'
import TitleBar from '@/components/title-bar.vue'
import { IBufferFile, editInfoReq } from '@/server/edit'

const form = reactive({
    diaryText: '', // 正文内容
    imageUrlArr: [] as UploaderFileListItem[], // 图片地址
})

// 提交日记信息
const onSubmit = async (values: typeof form) => {
    const imageUrlFile = values.imageUrlArr.map((item) => (
        {
            file: item.file!,
            name: item.file!.name,
        }
    ))
    
    // 保存 bufferFileArr
    const bufferFileArr: IBufferFile[] = []
    let index = 1 // 当所有图片都加载完毕时上传

    console.log(imageUrlFile)

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
                        username: localStorage.getItem('username') || '',
                        bufferFileArr,
                    }
                    // 上传日记信息
                    editInfoReq(params).then((res) => {
                        reset()
                        index = 0
                    }).catch((err) => {
                        index = 0
                        showFailToast(err.message)
                    })
                }
                index++
            }
        })
    } else {
        const params = {
            diaryText: values.diaryText,
            username: localStorage.getItem('username') || '',
        }
        // 上传日记信息
        editInfoReq(params).then((res) => {
            reset()
            index = 0
        }).catch((err) => {
            index = 0
            showFailToast(err.message)
        })
    }
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

</script>

<style scoped lang='less'>

</style>