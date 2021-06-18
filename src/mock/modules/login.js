import Mock from 'mockjs'

// let img = Mock.Random.dataImage('200x53')
var charactors = "1234567890";
var randomNum = '', i;
for (let j = 1; j <= 4; j++) {
    i = parseInt(10 * Math.random());
    randomNum = randomNum + charactors.charAt(i);
}

//模拟可登录人员
let userData = [{
    username: "admin",
    password: "123456",
    userType: '1',
    userTypeName: '管理员'
}, {
    username: "sjl",
    password: "sjl666",
    userType: '2',
    userTypeName: '用户'
},]

export default [
    // 获取随机数
    {
        url: '/login/getCaptcha',
        type: 'get',
        response: config => {
            return {
                rsCode: 'AAAAAAA',
                code: 0,
                // data: img
                data: randomNum
            }
        }
    },

    // 登录
    {
        url: '/login/login',
        type: 'post',
        response: config => {
            let loginFlag = null
            let itemData = null
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].username == config.body.username && userData[i].password == config.body.password) {
                    loginFlag = true
                    itemData = userData[i]
                }
            }
            if (loginFlag) {
                return {
                    code: 200,
                    rsCode: 'AAAAAAA',
                    rsData: itemData,
                    token: 'aweeqqqqqqweqwe1',
                    expire: 1
                }
            } else {
                return {
                    code: 400,
                    rsCode: 'AAAAAAA',
                    token: '',
                    message: "账号或密码有误",
                    expire: 1
                }
            }
        }
    },

    // 退出登录
    {
        url: '/login/logOut',
        type: 'get',
        response: config => {
            return {
                code: 200,
                rsCode: 'AAAAAAA',
                // token: 'aweeqqqqqqweqwe1',
                expire: 1
            }
        }
    }
]