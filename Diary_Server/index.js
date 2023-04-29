const Fish = require('fish-node')
const serve = require('koa-static');
const fish = new Fish()

// 初始化 user 表
fish.$mysqlAsync.query('CREATE TABLE IF NOT EXISTS user ( user_id INT AUTO_INCREMENT PRIMARY KEY, is_vip INT NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, createTime VARCHAR(255) NOT NULL, timeNum BIGINT NOT NULL, token VARCHAR(255) NOT NULL)').then((res) => {
    console.log('user 表创建完成！');
}).catch((err) => {
    console.log(err, 'user 表创建失败！！！');
})

// 初始化 diary_info 表
fish.$mysqlAsync.query('CREATE TABLE IF NOT EXISTS diary_info ( diary_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT , username VARCHAR(255) NOT NULL, text VARCHAR(255) NOT NULL, imageUrl VARCHAR(255) NOT NULL, timeNum BIGINT NOT NULL, createTime VARCHAR(255) NOT NULL)').then((res) => {
    console.log('diary_info 表创建完成！');
}).catch((err) => {
    console.log(err, 'diary_info 表创建失败！！！');
})


// 静态服务
fish.use(serve('.'))

fish.go(3000)

