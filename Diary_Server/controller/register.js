module.exports = {
        index: async (fish) => {
                const md5 = require('js-md5')
                const dayjs = require('dayjs')

                try {
                        const {username, password} = fish.ctx.request.body
                        const res = await fish.$mysqlAsync.query(`SELECT * FROM user`)
                        const isExit = res[0].some(item => item.username === username)
                        if (isExit) {
                                fish.ctx.status = 402
                                fish.ctx.body = {
                                result: 402,
                                data: null,
                                message: '账号已存在,注册失败！'
                                }
                        } else {
                                const token = md5(username + password + '322603')
                                await fish.$mysqlAsync.query(`INSERT INTO user (user_id, is_vip, username, password, createTime, timeNum, token) VALUES ('${res[0].length + 1}', "${0}", "${username}", "${password}", "${dayjs().format('YYYY-MM-DD HH:mm')}", "${Date.now()}", "${token}")`)
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
