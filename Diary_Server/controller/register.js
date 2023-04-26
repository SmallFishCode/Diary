module.exports = {
        index: async (fish) => {
                try {
                        const {username, password} = fish.ctx.request.body
                        const res = await fish.$mysqlAsync.query(`SELECT * FROM register`)
                        console.log('The user table contains: ', res[0]);
                        const isExit = res[0].some(item => item.username === username)
                        if (isExit) {
                                fish.ctx.status = 402
                                fish.ctx.body = {
                                result: 402,
                                data: null,
                                message: '账号已存在,注册失败！'
                                }
                        } else {
                                await fish.$mysqlAsync.query(`INSERT INTO register (id, username, password) VALUES ('${res[0].length + 1}', "${username}", "${password}")`)
                                fish.ctx.body = {
                                        result: 200,
                                        data: null,
                                        message: '注册成功！'
                                }
                        }
                } catch (error) {
                        console.log(error, '错误提示！！');
                }
        },
}
