	//获取根密钥
	getMotherKey = function(type){
		var param = {cardtype:type};
		var mk = "";
		$.ajax({
			url : "key/getMotherKey",
			type : 'POST',
			data : param,
			async : false
		}).done(function(rs) {
			if(200 == rs.status){
				mk = rs.msg;
			}
			if(mk == undefined){
				mk = "";
			}
		});
		return mk;
	}
	isexitCmk = false;
	isexitMmk = false;
	pageinitbutton = function(){
		if(getMotherKey(1) != ""){
			isexitCmk = true;
			$("#rcpu").attr("disabled",true);
			$("#rcpu").attr("ng-checked",false);
			$("#cpus").html("已存在CPU类型密钥，不能重复生成");				
		}
		isdisabled = true;
		/*if(getMotherKey(1) == "" ){
			$("#submit").attr("disabled",false);
		}else{
			$("#submit").attr("disabled",true);
		}
		
		if(isexitCmk && isexitMmk){
			$("#submit").attr("ng-disabled",true);
		}*/
	}
	initbutton = function(t){
		if(t == 1){
			if(getMotherKey(1) != ""){
				$("#rcpu").attr("disabled",true);
				$("#rcpu").attr("ng-checked",false);
				$("#cpus").html("已存在CPU类型密钥，不能重复生成");
				$("#submit").attr("disabled",true);
			}else{
				$("#psw1").val("");
				$("#psw2").val("");
				$("#submit").attr("disabled",false);
			}
		}
	}