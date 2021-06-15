var kb;
	function pageinit(){
		kb = document.getElementById("psam");
	}
	function initReader(){
		response = kb.initReader();
		result = response.split(",");//0,qa
		if(result[0] == 0){
			alert("success");
		}
	}
	function init(){
		response = kb.KBINITMODULE();
//		result = response.split(",");//0,qa
//		if(result[0] == 0){
//			alert("success");
//		}
	}
	function setno(){
		no = "1";
		response = kb.KBSETPINPADNO(no);
		result = response.split(",");
		if(result[0] == 0){
			alert("success");
		}
	}
	function getno(){
		response = kb.KBGETPINPADNO();
		result = response.split(",");
		if(result[0] == 0){
			alert(result[1]);
		}
	}
	function reset(){
		response = kb.KBRESETPINPAD();
		result = response.split(",");
		if(result[0] == 0){
			alert("success");
		}
	}
	function getpass(){
		pageinit();
		init();//初始化
		iPassLen=6;// 密码长度[4-10]
		iSoundHintMode = 0;//语音提示模式[0 : 输入密码,1 : 再输入一次]
		iCipherUploadMode =1;// 密码上送方式[0 : 达到设置的密码长度自动返回,1 : 按确认返回]
		iTimeOut = 30;// 键盘超时时间[一般设置为30~45S]
		response = kb.KBGETPASSWORD(iPassLen,iSoundHintMode,iCipherUploadMode,iTimeOut);
		result = response.split(",");
		return result;
	}
	function getpassAgain(){
		pageinit();
		init();//初始化
		iPassLen=6;// 密码长度[4-10]
		iSoundHintMode = 1;//语音提示模式[0 : 输入密码,1 : 再输入一次]
		iCipherUploadMode =1;// 密码上送方式[0 : 达到设置的密码长度自动返回,1 : 按确认返回]
		iTimeOut = 30;// 键盘超时时间[一般设置为30~45S]
		response = kb.KBGETPASSWORD(iPassLen,iSoundHintMode,iCipherUploadMode,iTimeOut);
		result = response.split(",");
		return result;
	}
	function release(){
		response = kb.KBRELEASEMODULE();
//		result = response.split(",");
//		if(result[0] == 0){
//			alert("success");
//		}
	}