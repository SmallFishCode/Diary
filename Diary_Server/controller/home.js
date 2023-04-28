module.exports = {
	index: async (fish) => {
		try {
			const { username } = fish.ctx.request.body

			// 根据 username 查询该用户的所有笔记
			const res = await fish.$mysqlAsync.query(`SELECT * FROM diary_info`)
			const diaryList = res[0].filter(item => item.username === username)

			// 按照日记创建时间排序
			diaryList?.sort((a, b) => b.timeNum - a.timeNum)

			// 整合数据，按照顺序返回
			diaryList?.forEach(item => {
				const imgArr = item.imageUrl.split(',').filter(item => item !== ',' && item !== '')
				item.imageUrl = imgArr
				item.diaryId = item.diary_id
				item.diaryText = item.text
				item.diaryTime = item.timeNum

				delete item.diary_id
				delete item.text
				delete item.timeNum
			})

			fish.ctx.body = {
				result: 201,
				data: diaryList,
				message: '',
			}


		} catch (error) {
			console.log(error);
		}
	},
}
