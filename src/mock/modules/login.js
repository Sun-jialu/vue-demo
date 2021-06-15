import Mock from 'mockjs'

let img = Mock.Random.dataImage('200x53')

export default [
    // user login
    {
        url: '/login/getCaptcha',
        type: 'get',
        response: config => {
            return {
                rsCode: 'AAAAAAA',
                code: 0,
                data: img
            }
        }
    },

    // get user info
    {
        url: '/login/login',
        type: 'post',
        response: config => {
            return {
                code: 0,
                rsCode: 'AAAAAAA',
                token: 'aweeqqqqqqweqwe1',
                expire: 1
            }

        }
    },

    // user logout
    {
        url: '/login/logout',
        type: 'post',
        response: _ => {
            return {
                rsCode: 'AAAAAAA',
                code: 20000,
                data: 'success'
            }
        }
    }
]