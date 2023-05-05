module.exports = {
	index: async (fish) => {    // 根据 username 查询用户标签使用情况
		try {
			const { username } = fish.ctx.request.body

			// 根据 username 查询该用户的所有标签
			const res = await fish.$mysqlAsync.query(`SELECT * FROM diary_info`)
			const diaryList = res[0].filter(item => item.username === username)

			// 按照每个 tabs 分为不同的数组
            function groupByTabs(data) {
                const groupedData = {};
                
                data.forEach((item) => {
                    const tab = item.tabs;
                
                    if (!groupedData[tab]) {
                        groupedData[tab] = [];
                    }
                
                    groupedData[tab].push(item);
                });
                
                return groupedData;
            }

            const tabsObj = groupByTabs(diaryList)

            // 存放最终数据
            const tabsArr = []

            for (let item in tabsObj) {
                if (item) {
                    tabsArr.push({value: tabsObj[item].length, name: item})
                }
            }

			fish.ctx.body = {
				result: 201,
				data: tabsArr,
				message: '',
			}


		} catch (error) {
			console.log(error);
		}
	},
}
