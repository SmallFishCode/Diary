module.exports = {
    // 添加日记 更新日记 共用一套逻辑，通过前端是否传 diaryId 判断
    index: async (fish) => {    
            const path = require('path')
            const fs = require('fs')
            const dayjs = require('dayjs')
            
            try {
                // 获取上传的信息
                const fileInfo = fish.ctx.request.body;

                // 上传图片的链接 存数据库(如果前端传了 isExitImgArr，说明这些都是已有数据)
                let imageUrl = fileInfo.isExitImgArr.length ? fileInfo.isExitImgArr.join(',') + ',' : ''

                // 处理图片，上传到本地 /images 目录下
                function handleImage(imgArr) {
                    imgArr.forEach((img, index) => {
                        const arr = img.fileName.split('.')
                        const fileType = arr[arr.length - 1]
                        const fileName = `${index}${Date.now()}.${fileType}`

                        imageUrl += '/images/' + fileName + ','

                        // 写入图片到 images 目录下
                        const filePath = path.join(__dirname, `../images/${fileName}`)
                        fs.writeFileSync(filePath, Buffer.from(img.buffer), 'utf-8')
                    })
                }

                // 处理图片文件
                fileInfo.bufferFileArr && await handleImage(fileInfo.bufferFileArr)

                // 创建时间 createTime
                const createTime = dayjs().format('YYYY-MM-DD HH:mm')

                // fileInfo.diaryId 存在，说明为 update 操作，不存在为 add 操作
                if (fileInfo.diaryId) {
                    // update 日记信息
                    await fish.$mysqlAsync.query(`UPDATE diary_info SET text = "${fileInfo.diaryText}", tabs = "${fileInfo.tabs}", imageUrl = "${imageUrl}", timeNum = "${Date.now()}", createTime = "${createTime}" WHERE diary_id = "${fileInfo.diaryId}"`)
                    
                    fish.ctx.body = {
                        result: 200,
                        data: null,
                        message: '更新成功!'
                    }
                } else {
                    // 查询 user 表获取 user_id
                    const res = await fish.$mysqlAsync.query(`SELECT * FROM user`)
                    const userId = res[0].find(item => item.username === fileInfo.username).user_id

                    // 获取 日记 id
                    const diaryRes = await fish.$mysqlAsync.query(`SELECT * FROM diary_info`)
                    const diaryId = diaryRes[0][diaryRes[0].length - 1].diary_id + 1 || 1

                    // 存数据库
                    await fish.$mysqlAsync.query(`INSERT INTO diary_info (diary_id, user_id, username, text, tabs, imageUrl, createTime, timeNum) VALUES ("${diaryId}", "${userId}","${fileInfo.username}", "${fileInfo.diaryText}", "${fileInfo.tabs}", "${imageUrl}", "${createTime}", "${Date.now()}")`)

                    fish.ctx.body = {
                        result: 200,
                        data: null,
                        message: '上传成功!'
                    }
                }
            } catch (error) {
                fish.ctx.status = 406
                fish.ctx.body = {
                    result: 406,
                    data: null,
                    message: '操作失败!'
                }
                console.log(error, '错误提示！！');
            }
    },
}
