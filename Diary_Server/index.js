const Fish = require('fish-node')
const fish = new Fish()


// 初始化表格
fish.$mysqlAsync.query('CREATE TABLE IF NOT EXISTS register ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL )').then((res) => {
    console.log('register 表创建完成！');
}).catch((err) => {
    console.log(err, 'register 表创建失败！！！');
})

fish.go(3000)