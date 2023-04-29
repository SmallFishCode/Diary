module.exports = {
    index: async (fish) => {
            const path = require('path')
            const fs = require('fs')
            const dayjs = require('dayjs')
            
            try {
                // 获取上传的信息
                const fileInfo = fish.ctx.request.body;

                // 上传图片的链接 存数据库
                let imageUrl = ''

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

                // 查询 user 表获取 user_id
                const res = await fish.$mysqlAsync.query(`SELECT * FROM user`)
                const userId = res[0].find(item => item.username === fileInfo.username).user_id

                // 获取 日记 id
                const diaryRes = await fish.$mysqlAsync.query(`SELECT * FROM diary_info`)
                const diaryId = diaryRes[0][diaryRes[0].length - 1].diary_id + 1 || 1

                // 创建时间 createTime
                const createTime = dayjs().format('YYYY-MM-DD HH:mm')

                // 存数据库
                await fish.$mysqlAsync.query(`INSERT INTO diary_info (diary_id, user_id, username, text, imageUrl, createTime, timeNum) VALUES ("${diaryId}", "${userId}","${fileInfo.username}", "${fileInfo.diaryText}", "${imageUrl}", "${createTime}", "${Date.now()}")`)

                fish.ctx.body = {
                    result: 200,
                    data: null,
                    message: '上传成功!'
                }

            } catch (error) {
                fish.ctx.status = 406
                fish.ctx.body = {
                    result: 406,
                    data: null,
                    message: '上传图片失败!'
                }
                console.log(error, '错误提示！！');
            }
    },
}
