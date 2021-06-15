	
function epcard($scope, $http,cardservice) {
	
	
	$scope.PREPERSO = function(){
		var object = cardservice.CMD_PREPERSO();
		if(object.success){
			if(object.msg != ""){
				alert(object.msg);
			}else{
				alert("预个人化成功");
			}			
		}else{
			if(object.msg != ""){
				alert(object.msg);
			}else{
				alert("预个人化失败");
			}
			
		}
	}
	$scope.init = function(){
		var str = {cardType:'1'};
		var object = cardservice.CMD_INITKEY(str);
		if(object.success){
			if(object.msg != ""){
				alert(object.msg);
			}else{
				alert("个人化成功");
			}			
		}else{
			if(object.msg != ""){
				alert(object.msg);
			}else{
				alert("个人化失败");
			}
			
		}
	}
	$scope.SELECT = function(){
		var str = {SelType:'00',SelValue:'3f00'};
		var object = cardservice.CMD_SELECT(str);
		if(object.success){
			if(object.msg != ""){
				alert(object.msg);
			}else{
				alert("选择文件成功");
			}			
		}else{
			if(object.msg != ""){
				alert(object.msg);
			}else{
				alert("选择文件失败");
			}
			
		}
	}
	$scope.getRandom = function(){
		var str = {Length:'04'};
		var object = cardservice.CMD_GETCHALLENGE(str);
		if(object.success){
			if(object.msg != ""){
				alert(object.msg);
			}else{
				alert("获取随机数");
			}			
		}else{
			if(object.msg != ""){
				alert(object.msg);
			}else{
				alert("获取随机数失败");
			}
			
		}
	}
	$scope.VERIFYPIN = function(){
		var str = {PinType:"01",PinValue:'521800'};
		var object = cardservice.CMD_VERIFYPIN(str);
		if(object.success){
			if(object.msg != ""){
				alert(object.msg);
			}else{
				alert("pin检验成功");
			}			
		}else{
			if(object.msg != ""){
				alert(object.msg);
			}else{
				alert("pin检验成功");
			}
			
		}
	}
	
	
}
