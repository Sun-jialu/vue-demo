	
function key_operator($scope, $http) {	
	var rs;
	var orgNo; 
	var orgId;
	var level = 1;
	var psam;
	var value;
	var flog;
	var path;
	var parentid;
	var parentno;
	var org_cardtype;
	var add_url = "key/motherKeyNodeAdd";
	$scope.recode = false;
	$scope.orgKeyNode = {};
	$scope.motherKeyNode = {};
	$scope.isdisabled = false;
	var isexits = false;
	
	/**
	 * 一级机构密钥初始化
	 */
	$scope.rootKeyInit = function(){
		if($scope.getRootKey(1) != ""){
			$("#rcpu").attr("disabled",true);
			$("#rcpu").attr("ng-checked",false);
			$("#cpus").html("已存在CPU类型密钥，不能重复生成");
			$scope.isdisabled = true;
		}
	}
	
	//获取根密钥
	$scope.getRootKey = function(type){
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
	
	$scope.showbutton = function(t){
		if(t == 1){
			$scope.isdisabled = true;
		}else{
			$scope.isdisabled = false;
		}		
	}
	//生成motherkey
	$scope.createRootKey = function(motherKeyNode) {
		$.ajax({
			url : "checkSession",
			complete : function(xhr, status) {
				if(xhr.status == 500){
					Util.showMsg('此页面已失效,将自动刷新');
					parent.location.reload();
					return;
				}
			}
		});
		if (!$("#smart-form-addMotherKey").valid()){
			return;
		}	
		$scope.showbutton(1);
		ajaxPost(null, add_url, motherKeyNode,$scope.addFromcallback2, $scope.valideError);
	}
	
	//生成com/orgkey
	$scope.createOrgKey = function(orgKeyNode){
		$.ajax({
			url : "checkSession",
			complete : function(xhr, status) {
				if(xhr.status == 500){
					Util.showMsg('此页面已失效,将自动刷新');
					parent.location.reload();
					return;
				}
			}
		});
		if (!$("#smart-form-addorgKey").valid()){
			return;
		}
		if(!$scope.selectcom()){
			return;
		}
		$scope.showbutton(1);
		orgKeyNode.type = $scope.orgKeyNode.type;
		add_url = "key/comOrOrgKeyNodeAdd";
		orgNo = orgKeyNode.code;//分公司/机构编号
		if(level == 1){
			orgKeyNode.level = 1;
			if($scope.motherkey == undefined ){
				if(!$scope.getMotherKey(1,true)){
					$scope.showbutton(2);
					return ;
				}
			}
		}else if(level == 2){
			orgKeyNode.level = 2;
			if($scope.comkey == undefined){
				if(!$scope.getComKey(parentno,true)){
					$scope.showbutton(2);
					return;
				}
			}
		}else if(level == 3){
			orgKeyNode.level = 3;
			if($scope.motherkey == undefined ){
				if(!$scope.getMotherKey(2,true)){
					$scope.showbutton(2);
					return ;
				}
			}
		}
		ajaxPost(null, add_url, orgKeyNode,$scope.addFromcallback, $scope.valideError);
	}
	
	$scope.selectcom = function(){
		flog = true;
		$("#submit").attr("disabled",false);
		var orgtype = $("#orgtype").val();
		var errorinfo = "";
		switch(orgtype){
		case "4":
			errorinfo = "请选择一个二级机构";			
			if(path.length != orgtype){
				$scope.valideError(errorinfo);
				flog = false;
			}
			break;
		case "5":
			errorinfo = "请选择一个三级机构";
			if(path.length != orgtype && path.length <= orgtype){
				$("#view_orgname").val("");
				$("#orgname").val("");
				$scope.valideError(errorinfo);
				flog= false;
			}
			break;
		}		
		return flog;
	}
	
	//获取分公司密钥
	$scope.getMotherKey = function(type,show){
		var param = {cardtype:type};
		$.ajax({
			url : "key/getMotherKey",
			type : 'POST',
			data : param,
			async : false
		}).done(function(rs) {
			if(200 != rs.status){
				if(show){
					$scope.valideError(rs.msg);
				}				
				flog= false;
				return flog;
			}
			if(rs.msg != undefined){
				isexits = true;
			}
			$scope.motherkey = rs.msg;
			flog= true;
		});
		return flog;
	}
	$scope.getComKey = function(code,show){
		isexits = false;
		var param = {code:code};
		$.ajax({
			url : "key/getComKey",
			type : 'POST',
			data : param,
			async : false
		}).done(function(rs) {
			if(200 != rs.status){
				if(show){
					$scope.valideError(rs.msg);
				}				
				flog= false;
				return flog;
			}
			if(rs.msg != undefined){
				isexits = true;
			}
			$scope.comkey = rs.msg;
			flog= true;
		});
		return flog;
	}
	//获取M1类型的机构密钥
	$scope.getOrgKey = function (show){
		isexits = false;
		var param = {code:$scope.orgKeyNode.code};
		$.ajax({
			url : "key/getOrgKey",
			type : 'POST',
			data : param,
			async : false
		}).done(function(rs) {
			if(200 != rs.status){
				if(show){
					$scope.valideError(rs.msg);
				}				
				flog = false;
				return flog;
			}
			if(rs.msg != undefined){
				isexits = true;
			}
			$scope.orgkey = rs.msg;
			flog = true;
		});
		return flog;
	}
	//获取M1类型的机构密钥
	//传机构id
	$scope.getM1OrgKey = function(show){
		isexits = false;
		var param = {code:$scope.orgKeyNode.orgid};
		$.ajax({
			url : "key/getM1OrgKey",
			type : 'POST',
			data : param,
			async : false
		}).done(function(rs) {
			if(200 != rs.status){
				if(show){
					$scope.valideError(rs.msg);
				}				
				flog = false;
				return flog;
			}
			if(rs.msg != undefined){
				isexits = true;
			}
			$scope.orgkey = rs.msg;
			$scope.pin = rs.pin;
			$scope.orgsectors = rs.orgsectors;
			$scope.cardsectors = rs.cardsectors;
			flog =true;
		});
		return flog;
	}
	function asvalue(values){
		result = values.split(",");
		if(result[0] == 1){
			$scope.showbutton(2);
			$scope.valideError(result[1]);
			return false;
		}
		value = result[1];
		return true ;
	}
		
	// 新增提交回调函数
	$scope.addFromcallback2 = function(success) {
		initbutton($scope.motherKeyNode.CARDTYPE);
		$scope.valideOk(success.msg);
	}
	
	$scope.addFromcallback = function(success) {
		if($scope.orgKeyNode.level == 3){
			
			$scope.userSession.CARDSECTORS = $scope.cardsector;
			/*$scope.confirmDialog("重新登录","此功能需重新登录才能生效",function(){
				window.location.href = 'logout';
			},null);*/
		}
		$scope.valideOk(success.msg);
	}
	$scope.showsubmit = function(isshow){
		if(isshow){
			$("#submit1").attr("disabled",true);
		}else{
			setTimeout(function(){$("#submit1").attr("disabled",false);},100);
		}
	}
	//发放根psam卡  //支持CPU发卡
	$scope.putRootCard = function(){
		$.ajax({
			url : "checkSession",
			complete : function(xhr, status) {
				if(xhr.status == 500){
					Util.showMsg('此页面已失效,将自动刷新');
					parent.location.reload();
					return;
				}
			}
		});
		psam  = document.getElementById("psam");
		$scope.showsubmit(true);
		var param = {cardtype:"1"};	
		$.blockUI({
			fadeIn : 1000,
			message : '<i class="fa fa-clock-o">请稍侯,PSAM卡正在处理中...</i>',
			onBlock : function() {
				$.ajax({
					url : "key/getMotherKey",
					type : 'POST',
					data : param,
					async : false
				}).done(function(rs) {
					if(200 == rs.status){
						var mk = rs.msg;
						rs = psam.InitReader();
						result = rs.split(",");
						if(result[0] == 0){
							tranType = 253;
							rs = psam.SendCmd(tranType,mk);
							result = rs.split(",");
							if(result[0] == 0){
								psam.ReleaseReader();
								if(result[0] != 0){
									$scope.valideError(result[1]);
									$scope.showsubmit(false);
									return;
								}
								$scope.readCardUID(0,1);
								if($scope.recode){
									$scope.valideOk("发放一级PSAM卡成功");
								}
								$scope.showsubmit(true);
								return;
							}else{
								psam.ReleaseReader();
								$scope.valideError("发放一级机构PSAM卡失败");
								$scope.showsubmit(false);
							}
						}else{
							psam.ReleaseReader();
							$scope.valideError(result[1]);
							$scope.showsubmit(false);
							return;
						}
					}else{
						$scope.valideError(rs.msg);
						$scope.showsubmit(false);
					}
				});
			}
		});
	}
	/*
	 * 查询卡户信息
	 * cardtype:卡类型 0 PSAM卡,1:用户卡
	 * type :卡片级别： 1根PSAM,2公司机构卡
	 * //传机构id
	 * */
	$scope.readCardUID = function(cardtype,type){
		var orgid;
		var tt;
		rs = psam.GetPsamUID();		
		result = rs.split(",");
		if(result[0] == 1){
			$scope.valideError("获取PSAM卡UID失败，请检查");
			return false;
		}else{
			if(cardtype == 0){
				tt = "0";
			}else{
				tt = "1";
			}
			if(type == 1){
				orgid = "0";
			}else{
				orgid = $scope.orgKeyNode.orgid;//机构编码
			}
			var param = {type:tt,code:orgid,strPsamUID:result[1]};
			$.ajax({
				url : "key/getCardInfo",
				type : 'POST',
				data : param,
				async : false
			}).done(function(rs) {
				if(200 != rs.status){
					$scope.valideError(rs.msg);
					$scope.recode = false;
				}else{
					$scope.recode = true;
				}
			});
		}		
	}
	//发放分公司psam卡  //仅支持CPU发卡
	$scope.putComCard = function(){
		$.ajax({
			url : "checkSession",
			complete : function(xhr, status) {
				if(xhr.status == 500){
					Util.showMsg('此页面已失效,将自动刷新');
					parent.location.reload();
					return;
				}
			}
		});
		$scope.showsubmit(true);
		if (!$("#smart-form-addorgKey").valid()){
			$scope.showsubmit(false);
			return;
		}
		if(!$scope.selectcom()){
			$scope.showsubmit(false);
			return;
		}
		var code = $scope.orgKeyNode.code;
		if(!$scope.getComKey(code,true)){
			$scope.showsubmit(false);
			return;
		}
		psam  = document.getElementById("psam");
		rs = psam.InitReader();
		result = rs.split(",");
		$.blockUI({
			fadeIn : 1000,
			message : '<i class="fa fa-clock-o">请稍侯,PSAM卡正在处理中...</i>',
			onBlock : function() {
				if(result[0] == 0){
					tranType = 254;
					rs = psam.SendCmd(tranType,$scope.comkey);
					result = rs.split(",");
					if(result[0] == 0){
						psam.ReleaseReader();
						if(result[0] != 0){
							$scope.valideError(result[1]);
							$scope.showsubmit(false);
							return;
						}
						$scope.readCardUID(0,2);
						if($scope.recode){
							$scope.valideOk("发放二级PSAM卡成功");
						}
						$scope.showsubmit(true);				
						return;				
					}else{
						psam.ReleaseReader();
						$scope.valideError("发放二级机构PSAM卡失败");
						$scope.showsubmit(false);
					}
				}else{
					psam.ReleaseReader();
					$scope.valideError(result[1]);
					$scope.showsubmit(false);
					return;
				}
			}
		});
	}
	//发放机构psam卡支持CPU发卡及M1发卡
	$scope.putOrgCard = function(orgKeyNode){
		$.ajax({
			url : "checkSession",
			complete : function(xhr, status) {
				if(xhr.status == 500){
					Util.showMsg('此页面已失效,将自动刷新');
					parent.location.reload();
					return;
				}
			}
		});
		$scope.showsubmit(true);
		if (!$("#smart-form-addorgKey").valid()){
			$scope.showsubmit(false);
			return;
		}
		if(!$scope.selectcom()){
			$scope.showsubmit(false);
			return;
		}
		psam  = document.getElementById("psam");
		var code = $scope.orgKeyNode.code;
		orgKeyNode.type = $scope.orgKeyNode.type;
		
		$.blockUI({
			fadeIn : 1000,
			message : '<i class="fa fa-clock-o">请稍侯,PSAM卡正在处理中...</i>',
			onBlock : function() {
				if(orgKeyNode.type == 1){
					if(!$scope.getOrgKey(code,true)){
						$scope.showsubmit(false);
						return;
					}
					try{
						rs = psam.InitReader();
					}catch(e){
						psam.ReleaseReader();
						$scope.valideError("PSAM卡连接失败");
						$scope.showsubmit(false);
					}
					result = rs.split(",");
					if(result[0] == 0){
						tranType = 261;
						// 请求写卡组建参数
						// 请求写卡组建参数
						var psamReqParam = {
							"ORGID": orgKeyNode.orgid,
							"URL": $scope.userSession.psamInitGetKeyUrl
						};
						psamReqParam = $scope.toPostObject(psamReqParam);
						rs = psam.SendCmd(tranType, psamReqParam);
						result = rs.split(",");
						if(result[0] == 0){
							psam.ReleaseReader();
							if(result[0] != 0){
								$scope.valideError(result[1]);
								$scope.showsubmit(false);
								return;
							}
							$scope.readCardUID(0,2);
							if($scope.recode){
								$scope.valideOk("发放三级PSAM卡成功");
							}
							$scope.showsubmit(true);
							return;
						}else{					
							psam.ReleaseReader();
							$scope.valideError("发放三级机构PSAM卡失败");
							$scope.showsubmit(false);
						}
					}else{
						psam.ReleaseReader();
						$scope.valideError(result[1]);
						$scope.showsubmit(false);
						return;
					}			
				}else{
					if(!$scope.getM1OrgKey(code,true)){
						$scope.showsubmit(false);
						return;
					}
					rs = psam.GenCommunityPsamByKey($scope.orgkey,$scope.pin);
					result = rs.split(",");
					if(result[0] != 0){
						$scope.valideError(result[1]);
						$scope.showsubmit(false);
						return;
					}
					$scope.readCardUID(0,2);
					if($scope.recode){
						$scope.valideOk("发放三级PSAM卡成功");
					}
					$scope.showsubmit(false);
					return;			
				}
			}
		});
	}

	$scope.checkboxall = function(){
		if ($("#fullselect").prop("checked")) {  
	        $("#jiami input[type='checkbox']").prop("checked", true);  
	    } else {  
	        $("#jiami input[type='checkbox']").prop("checked", false);  
	    }
	}
	
	//初始化当前选中的分公司或机构判断是否已经存在密钥，如果存在则按钮置灰不可点击
	$scope.validateKey = function(){
		isexits = false;
		$scope.isdisabled = false;
		var type = $("#orgtype").val();
		var ot = $("#ot").val();		
		switch(type){
		case "4":			
			if($scope.getComKey($scope.orgKeyNode.code,false) && isexits == true){
				if(ot == "key"){
					$("#submit").attr("disabled",true);
					$scope.valideError("已存在二级机构密钥，不能重复生成");
				}				
			}
			break;
		case "5":			
			$scope.isdisabled = false;
			if($scope.orgKeyNode.type==1){
				//保存类型设置
				level = 2;
				//根据类型显示元素
				$("#jiami").hide();
				$("#faka").hide();
				if($scope.getOrgKey(false) && isexits == true){
					if(ot == "key"){
						$("#submit").attr("disabled",true);
						$scope.valideError("已存在三级机构密钥，不能重复生成");
					}
				}
			}
			if($scope.orgKeyNode.type==2){
				//保存类型设置
				level =3;
				if($scope.getM1OrgKey(false) && isexits == true){
					if(ot == "key"){
						$("#jiami").show();
						$("#faka").show();
						//$scope.orgsectors = rs.orgsectors;
						//$scope.cardsectors
						var orgcheckeds = $scope.orgsectors.split(",");
						var cardsectors = $scope.cardsectors.split(",");
						for(var i=0;i<orgcheckeds.length;i++){
							$("#jiami input:checkbox[value='"+orgcheckeds[i]+"']").attr("checked","true");
						}
						$('#jiami input[type="checkbox"]').attr("disabled",true);
						for(var i=0;i<cardsectors.length;i++){
							$("#faka input:checkbox[value='"+cardsectors[i]+"']").attr("checked","true");
						}
						$('#faka input[type="checkbox"]').attr("disabled",true);
						$("#submit").attr("disabled",true);
						$scope.valideError("已存在三级机构密钥，不能重复生成");
					}
				}else{
					//根据类型显示元素
					$("#jiami").show();
					$("#faka").show();
				}				
			}
			break;
		}
		
	}

	$scope.showOrgTree = function(id) {
		initDivs(id, 'org/orgNodeTree', function(data) {
	//	initDivs(id, 'org/orgNodeTree?level='+level, function(data){
			$scope.orgKeyNode.orgid=data.id;
			$scope.orgKeyNode.code=data.extvalue;
			$scope.orgKeyNode.type=data.cardtype;
			path = data.nodepath;
			parentid = data.parentid;
			parentno = data.parentno;
			$scope.selectcom(); 
			$scope.validateKey();
		});
	}
	
	/**
	 * 页面加载时赋默认值,生成二级机构密钥
	 */
	$scope.createSecondOrgKey = function(){
		if($scope.userSession.NODE_LEVEL == 2){
			ajaxPost(null, "org/getOrgInfoMap/" + $scope.userSession.ORG_ID, null, function(data){
				if(data.RETCODE == 'AAAAAAA'){
					$scope.orgKeyNode.orgid=data.ORG_ID;
					$scope.orgKeyNode.code=data.NODE_NO;
					$scope.orgKeyNode.type=data.CARDTYPE;
					path = data.NODE_PATH;
					parentid = data.PARENT_ID;
					$("#view_orgname").val(data.NODE_NAME);
					parentno = data.PARENT_NO;
					$scope.selectcom(); 
					$scope.validateKey();
				}
			},$scope.valideError);
		}
	}
	
	/**
	 * 页面加载时赋默认值，发放二级机构PSAM卡
	 */
	$scope.createSecondOrgPsam = function(){
		if($scope.userSession.NODE_LEVEL == 2){
			ajaxPost(null, "org/getOrgInfoMap/" + $scope.userSession.ORG_ID, null, function(data){
				if(data.RETCODE == 'AAAAAAA'){
					$scope.orgKeyNode.orgid=data.ORG_ID;
					$scope.orgKeyNode.code=data.NODE_NO;
					$scope.orgKeyNode.type=data.CARDTYPE;
					path = data.NODE_PATH;
					parentid = data.PARENT_ID;
					$("#view_orgname").val(data.NODE_NAME);
					parentno = data.PARENT_NO;
					$scope.selectcom(); 
					$scope.validateKey();
				}
			},$scope.valideError);
		}
	}
	
	/**
	 * 页面加载时赋默认值,生成三级机构密钥
	 */
	$scope.createThirdOrgKey = function(){
		
		if($scope.userSession.NODE_LEVEL == 3){
			ajaxPost(null, "org/getOrgInfoMap/" + $scope.userSession.ORG_ID, null, function(data){
				if(data.RETCODE == 'AAAAAAA'){
					$scope.orgKeyNode.orgid=data.ORG_ID;
					$scope.orgKeyNode.code=data.NODE_NO;
					$scope.orgKeyNode.type=data.CARDTYPE;
					path = data.NODE_PATH;
					parentid = data.PARENT_ID;
					$("#view_orgname").val(data.NODE_NAME);
					parentno = data.PARENT_NO;
					$scope.selectcom(); 
					$scope.validateKey();
				}
			},$scope.valideError);
		}
	}
	
	/**
	 * 页面加载时赋默认值，发放三级机构PSAM卡
	 */
	$scope.createThirdOrgPsam = function(){
		if($scope.userSession.NODE_LEVEL == 3){
			ajaxPost(null, "org/getOrgInfoMap/" + $scope.userSession.ORG_ID, null, function(data){
				if(data.RETCODE == 'AAAAAAA'){
					$scope.orgKeyNode.orgid=data.ORG_ID;
					$scope.orgKeyNode.code=data.NODE_NO;
					$scope.orgKeyNode.type=data.CARDTYPE;
					path = data.NODE_PATH;
					parentid = data.PARENT_ID;
					$("#view_orgname").val(data.NODE_NAME);
					parentno = data.PARENT_NO;
					$scope.selectcom(); 
					$scope.validateKey();
				}
			},$scope.valideError);
		}
	}
	
	 $scope.toPostObject = function(jsonStr){
		var p = "";
		try {
			$.each(jsonStr, function(key, val) {
				p += key + "=" + val + " ;";
			});
		} catch (e) {
		}
		return p;
	}
}

checkActivex = function(){
	psam  = document.getElementById("psam");
	try{
		rs = psam.check();
	}catch(e){			 
		$scope.valideError("请先安装控件!");
	}
}
