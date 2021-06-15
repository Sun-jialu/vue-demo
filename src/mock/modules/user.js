import Mock from 'mockjs'


export default [
    // user login
    {
        url: '/sys/user/updatePwd',
        type: 'post',
        response: config => {
            return {
                rsCode: 'AAAAAAA',
                code: 0,
                data: 'success'
            }
        }
    },


]