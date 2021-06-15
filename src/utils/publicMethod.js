//路由跳转默认值
function assignment(formInline, params) {
    if (JSON.stringify(params) == "{}") {
        for (var l in formInline) {
            formInline[l] = ""
        }
    } else {
        for (var i in formInline) {
            // console.log(i)
            for (var j in params) {
                if (i == j) {
                    formInline[i] = params[j];
                }
            }
        }
    }
}
function isNull(obj){
        let newObj = JSON.parse(JSON.stringify(obj)); 
        for(let key in newObj){
          if(newObj[key] === ''){
            delete newObj[key]
          }
        }
        return Object.keys(newObj).map(function (key) {
          if(typeof newObj[key] === 'number'){
            return key + "=" + newObj[key];
          }else{
    //return encodeURIComponent(key) + "=" + encodeURIComponent(newObj[key])+"'";
             return key + "=" + newObj[key];
          }
        }).join("&");
      }
function dataNull(data){    
    data.forEach((item)=>{
        for(let i in item){
            if(item[i]==null){
                item[i]="未填写"
            }
        }
    })
}

function moneyFormatter(money){
    if(!money){
      return ''
    }else{
      var val = parseFloat(money) || 0
      var newVal = parseFloat(val/100)
      var forMateVal = newVal.toFixed(2)
      return forMateVal
    }
    
  }
export {
    assignment,
    isNull,
    dataNull,
    moneyFormatter
}