module.exports = {
    index: async (fish) => {
        try {
            const {username, password} = fish.ctx.request.body
            const res = await fish.$mysqlAsync.query(`SELECT * FROM register`)
            const isExit = res[0].find(item => item.username === username)
            if (isExit) {
                if (password === isExit.password) {
                    fish.ctx.body = {
                        result: 200,
                        data: null,
                        message: '登录成功！'
                    }
                } else {
                    fish.ctx.status = 401
                    fish.ctx.body = {
                        result: 401,
                        data: null,
                        message: '密码错误！请重新输入'
                    }
                }
            } else {
                fish.ctx.status = 403
                fish.ctx.body = {
                    result: 403,
                    data: null,
                    message: '账号不存在！请注册！'
                }
            }
        } catch (error) {
                console.log(error, '错误提示！！');
        }
    },
}
