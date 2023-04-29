module.exports = {
	index: async (fish) => {    // 查看日记详情
		try {
			const { id } = fish.ctx.request.body

			// 根据 id 查询该笔记的详情信息
			const res = await fish.$mysqlAsync.query(`SELECT * FROM diary_info`)
            // 踩坑 查数据库， 字段类型一定要一样！！
			const diaryDetail = res[0].find(item => item.diary_id === Number(id))
            const imgArr = diaryDetail?.imageUrl.split(',').filter(item => item !== ',' && item !== '')
            diaryDetail.imageUrl = imgArr
            diaryDetail.diaryId = diaryDetail.diary_id
            diaryDetail.diaryText = diaryDetail.text
            diaryDetail.diaryTime = diaryDetail.timeNum

            delete diaryDetail.diary_id
            delete diaryDetail.text
            delete diaryDetail.timeNum

            if (diaryDetail) {
                fish.ctx.body = {
                    result: 201,
                    data: diaryDetail,
                    message: '',
                }
            } else {
                fish.ctx.status = 407
                fish.ctx.body = {
                    result: 407,
                    data: null,
                    message: '找不到该笔记!',
                }
            }
		} catch (error) {
			console.log(error);
		}
	},
    delete: async (fish) => {   // 删除日记
        try {
            const fs = require('fs')
            const path = require('path')

            const { id } = fish.ctx.request.body

            // 根据 id 查询该笔记的详情信息
			const [ res ] = await fish.$mysqlAsync.query(`SELECT * FROM diary_info WHERE diary_id = ${id}`)

            const imageArr = res[0]?.imageUrl.split(',').filter(item => item !== ',' && item !== '')
            
            // 删除指定文件
            function deleteFile(imgArr) {
                imgArr.forEach(async (img) => {
                    const filePath = path.join(__dirname, `../${img}`)

                    // 判断该文件是否存在
                    // const stats = await util.promisify(fs.stat)(filePath);
                    // console.log(stats.sFile());

                    fs.unlink(filePath, (err) => {
                        if (err) { throw err; }
                    })
                })
            }
            
            await deleteFile(imageArr)

            // 删除数据库该条日记
            await fish.$mysqlAsync.query(`DELETE FROM diary_info WHERE diary_id = ${id}`)

            fish.ctx.body = {
                result: 200,
                data: null,
                message: '删除成功!'
            }
            
        } catch (error) {
            fish.ctx.status = 406
            fish.ctx.body = {
                result: 406,
                data: null,
                message: '删除失败!请重试'
            }
            console.log(error);
        }
    }
}
