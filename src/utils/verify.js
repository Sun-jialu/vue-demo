//验证出生日期*******
var checkBirth = function (val) {
    var pattern = /^((19[2-9]\d{1})|(20((0[0-9])|(1[0-8]))))\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2][0-9])|30|31)$/;
    if (pattern.test(val)) {
        var date = new Date(val);
        var month = val.substring(val.indexOf("-") + 1, val.lastIndexOf("-"));
        return date && (date.getMonth() + 1 == parseInt(month));
    }
    return false;
}

let FormValidate = (function () {
    function FormValidate() { }
    // From表单验证规则  可用于公用的校验部分
    FormValidate.Form = function () {
        return {
            //校验学号
            validatorStudentNumber(rule, value, callback) {
                if (value == "") {
                    return callback(new Error('学号不能为空'))
                } else if (/^\d{16}$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('必须为数字且长度为16位'))
                }
            },
            //校验姓名、家庭成员姓名
            validatorName(rule, value, callback) {
                if (value == "") {
                    return callback(new Error('姓名不能为空'))
                } else if (/^[\u4e00-\u9fa5 ]{2,20}$/.test(value) || /^[a-zA-Z\/ ]{2,20}$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('输入的中英文必须在2-20位之间'))
                }
            },
            //校验证件号码
            validatorIdNumber(rule, value, callback) {
                if (value == "") {
                    return callback(new Error('证件不能为空'))
                } else if (/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
                    console.log('value :>> ', value, rule);
                    callback()
                } else {
                    callback(new Error('输入号码在18位'))
                }
            },
            //校验出生日期
            validatorBirthday(rule, value, callback) {
                let flag = checkBirth(value)
                if (value == "") {
                    return callback(new Error('出生日期不能为空'))
                } else if (flag) {
                    callback()
                } else {
                    callback(new Error('必须按照示例输入'))
                }
            },
            //校验籍贯
            validatorNativePlace(rule, value, callback) {
                if (value == "") {
                    return callback(new Error('籍贯不能为空'))
                    // ([^省]+省|.+自治区|[^市]+市)([^自治州]+自治州|[^市]+市|[^盟]+盟|[^地区]+地区|.+区划)([^市]+市|[^县]+县|[^旗]+旗|.+区)
                    //([^\x00-\xff]|[A-Za-z0-9_])+
                } else if (/^([^省]+省|.+自治区|[^市]+市)([^自治州]+自治州|[^市]+市|[^盟]+盟|[^地区]+地区|.+区划)([^市]+市|[^县]+县|[^旗]+旗|.+区)/.test(value)) {
                    callback()
                } else {
                    callback(new Error('必须按照示例输入'))
                }
            },
            //校验届次
            validatorYearNumber(rule, value, callback) {
                var date = new Date();
                let year = date.getFullYear();//获取当前年份
                // let re = `/^(1|19[5-9]\d|20\d{2}|${year})$/`
                // /^(1|19[5-9]\d|20\d{2}|2222)$/
                if (value == "") {
                    return callback(new Error('届次不能为空'))
                } else if (/^(1|19[5-9]\d|20\d{2}|2222222222222222)$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('必须按照示例输入'))
                }
            },
            //校验电话
            validatorTel(rule, value, callback) {
                if (value == "") {
                    callback()
                } else if (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,20}$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('电话输入格式不正确'))
                }
            },
            //教师证编号
            validatorTeacherNumber(rule, value, callback) {
                if (value == "") {
                    return callback(new Error('教师证编号不能为空'))
                } else if (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('格式不正确'))
                }
            },
            //教龄
            validatorTeachYears(rule, value, callback) {
                if (value == "") {
                    return callback(new Error('教龄不能为空'))
                } else if (/^([0-8]?[0-9]|90)$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('只能为0-90之间的数字'))
                }
            },
            //成绩 
            validatorScore(rule, value, callback) {
                if (value == "") {
                    return callback(new Error('成绩不能为空'))
                } else if (/^(0|100|[1-9]\d)$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('只能为0-100之间的数字'))
                }
            },
            //邮箱
            validatorEmail(rule, value, callback) {
                if (value == "") {
                    callback()
                } else if (/^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('格式不正确'))
                }
            },
            //URL地址
            validatorUrl(rule, value, callback) {
                if (/^http[s]?:\/\/.*/.test(value)) {
                    callback()
                } else {
                    callback(new Error('格式不正确'))
                }
            },
            //只能输入数字和小数点
            validatorNumAndPoint(rule, value, callback) {
                if (/^\d+$|^\d+[.]?\d+$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('请输入正确的数值'))
                }
            },
            //金额校验，为大于0或者正数，两位小数，其他符号不可输入
            validatorMoney(rule, value, callback) {
                if (/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/.test(value)) {
                    callback()
                } else {
                    callback(new Error('请输入正确的金额，可保留两位小数'))
                }
            },
            //邮政编码
            validatorPostcode(rule, value, callback) {
                if (value == "") {
                    callback()
                } else if (/^[1-9]\d{5}$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('请输入正确的邮政编码'))
                }
            },
            //网址
            validatorWebsite(rule, value, callback) {
                if (value == "") {
                    callback()
                } else if (/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('请输入正确的网址'))
                }
            }



        }
    }

    return FormValidate
}())

exports.FormValidate = FormValidate