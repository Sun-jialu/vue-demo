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
		var mk1 = getMotherKey(1);
		var mk2 = getMotherKey(2);
		if(mk1 != ""){
			isexitCmk = true;
			$("#rcpu").attr("disabled",true);
			$("#rcpu").attr("ng-checked",false);
			$("#cpus").html("已存在CPU类型密钥，不能重复生成");				
		}
		if(mk2 != ""){
			isexitMmk = true;
			$("#rm").attr("disabled",true);
			$("#ms").html("已存在M1类型密钥，不能重复生成");				
		}
		
		if(mk1 == "" ){
			$("#submit").attr("ng-disabled",false);
		}else if(mk2 == ""){
			$("#rm").attr("ng-checked",true);
			$("#rm").attr("ng-init","motherKeyNode.CARDTYPE=2");
			$("#submit").attr("ng-disabled",false);
		}else{
			$("#submit").attr("ng-disabled",true);
		}
		
		if(isexitCmk && isexitMmk){
			$("#submit").attr("ng-disabled",true);
		}
	}
	initbutton = function(t){
		if(t == 1){
			if(getMotherKey(1) != ""){
				$("#rcpu").attr("disabled",true);
				$("#rcpu").attr("ng-checked",false);
				$("#cpus").html("已存在CPU类型密钥，不能重复生成");
				$("#submit").attr("ng-disabled",true);
			}else{
				$("#psw1").val("");
				$("#psw2").val("");
				$("#submit").attr("ng-disabled",false);
			}
		}
		if(t == 2){
			if(getMotherKey(2) != ""){
				$("#rm").attr("disabled",true);
				$("#ms").html("已存在M1类型密钥，不能重复生成");
				$("#submit").attr("ng-disabled",true);
			}else{
				$("#psw1").val("");
				$("#psw2").val("");
				$("#rm").attr("ng-checked",true);
				$("#submit").attr("ng-disabled",false);
				$("#rm").attr("ng-init","motherKeyNode.CARDTYPE=2");
			}
		}
	}