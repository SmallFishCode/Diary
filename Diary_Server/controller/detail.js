module.exports = {
	index: async (fish) => {
		try {
			const { id } = fish.ctx.request.body

			// 根据 id 查询该笔记的详情信息
			const res = await fish.$mysqlAsync.query(`SELECT * FROM diary_info`)
            // 踩坑 查数据库， 字段类型一定要一样！！
			const diaryDetail = res[0].find(item => item.diary_id === Number(id))
            const imgArr = diaryDetail.imageUrl.split(',').filter(item => item !== ',' && item !== '')
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
}
