
 window.cardserviceform1=function() {
	var iccardforep;// 获取的组件
	var flog;
	var params;
	var rs;
	var sectors="";
	/** 公共方法 */
	function toPostObject(jsonStr) {
		params = "";
		var p = "";
		try {
			$.each(jsonStr, function(key, val) {
				p += key + "=" + val + " ;";
			});
			params = p;
			return true;
		} catch (e) {
			return false;
		}
	}

	/* 与组件交互 */
	function transcommit(trntype) {
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
		rs = "";
		if (params == undefined) {
			params = "";
		}
		iccardforep = document.getElementById("psam");
		try {
			rs = iccardforep.SendCmdForEP(1001,"Sector="+sectors);
			if ((rs.split(","))[0] != 0) {
				rs[1] = "组件初始化失败";
				return false;
			}
			rs = iccardforep.SendCmdForEP(trntype, params);
			return true;
		} catch (e) {
			rs = "1,访问控件异常";
			return false;
		}
	}
	/* 解析组件返回的结果 */
	function asvalue() {
		var flog;
		var object = {};
		result = "";
		result = rs.split(",");
		if (result[0] == 1) {
			object.success = false;
			object.msg = "" + result[1];
			return object;
		}
		object.success = true;
		object.msg = "" + result[1];
		return object;
	}
	function trimStr(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	/* 解析返回的结果组装为Object对象 */
	function returnsObject(str) {
		var object = {};
		var array = str.split(";");
		for (var i = 0; i < array.length; i++) {
			if (array[i] != '') {
				var content = array[i].split("=");
				object[content[0]] = trimStr(content[1]);
			}
		}
		return object;
	}
	return {
		/**
		 * m1- 开户
		 * str内容:Name  UID,CertType,CertNo,IDCode,CardID,NodeNO用户代码,CardValidDate,Password,SingleLimit,TotalLimit,Balance
		 */
		SET_SECTORS : function(str) {
			sectors=str;
		},
		/**
		 * m1- 开户
		 * str内容:Name  UID,CertType,CertNo,IDCode,CardID,NodeNO用户代码,CardValidDate,Password,SingleLimit,TotalLimit,Balance
		 */
		CMD_M1_CARD_REGISITER : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(100)) {
					object = asvalue();
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * m1-读卡片序列号
		 */
		CMD_M1_READUID : function(str) {
			var object = {};
			object.data = "";
			if (transcommit(101)) {
				object = asvalue();
				if (object.success) {
					object.data = returnsObject(object.msg);
				}
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 获取圈存控制号 LoadSno;
		 */
		CMD_M1_GETLOADSNO : function(str) {
			var object = {};
			object.data = "";
			if (transcommit(102)) {
				object = asvalue();
				if (object.success) {
					object.data = returnsObject(object.msg);
				}
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 获取补助控制号   SubsidySno
		 */
		CMD_M1_GET_SUBSIDYSNO : function(str) {
			var object = {};
			object.data = "";
			if (transcommit(104)) {
				object = asvalue();
				if (object.success) {
					object.data = returnsObject(object.msg);
				}
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 重置消费密码 str内容<UID,NewPassword>
		 */
		CMD_M1_SETPASSWORD : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(105)) {
					object = asvalue();
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 *修改消费密码 str内容<NewPassword;
		 */
		CMD_M1_MODIFY_PASSWORD : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(106)) {
					object = asvalue();
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 圈存 str内容<UID,TranAmt>
		 */
		CMD_M1_DEPOSIT : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(107)) {
					object = asvalue();
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 消费 str内容<UID,TranAmt> ;
		 */
		CMD_M1_CONSUME : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(108)) {
					object = asvalue();
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 清卡;
		 */
		CMD_M1_CLEARCARD : function() {
			var object = {};
			object.data = "";
			if (transcommit(109)) {
				object = asvalue();
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 更新累计消费日期 
		 */
		CMD_M1_UPDATE_TOTAL_PURCHASE_DATE : function(str) {
			var object = {};
			object.data = "";
			if (transcommit(110)) {
				object = asvalue();
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 读取银行卡号 str<AppName应用名称> return object[BankAccountNo];
		 */
		CMD_M1_READ_BANK_ACD : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(111)) {
					object = asvalue();
					if (object.success) {
						object.data = returnsObject(object.msg);
					}
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 修改卡信息 str内容<UID,CardValidDate,IDCode,CertType,CertNo,SingleLimit,TotalLimit,Name>;
		 */
		CMD_M1_MODIFY_CARD_INFO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(112)) {
					object = asvalue();
					if (object.success) {
						object.data = returnsObject(object.msg);
					}
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 卡户浏览 return object<UserCode,CardID,CardValidDate,IDCode,Balance,PurchaseCount,LoadCount,SubsidySno,LoadSno>
		 */
		CMD_M1_READ_CARD_INFO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(113)) {
					object = asvalue();
					if (object.success) {
						object.data = returnsObject(object.msg);
					}
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 读取卡片状态  return object[CardStatus];
		 */
		CMD_M1_GET_CARD_STT : function(str) {
			var object = {};
			object.data = "";
			if (transcommit(114)) {
				object = asvalue();
				if (object.success) {
					object.data = returnsObject(object.msg);
				}
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},

		/**
		 * 获取证件号及类型 object[CertNo,CertType]
		 */
		CMD_M1_GET_CERT_NO_AND_TYPE : function(str) {
			var object = {};
			object.data = "";
			if (transcommit(115)) {
				object = asvalue();
				if (object.success) {
					object.data = returnsObject(object.msg);
				}
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 修改卡消费状态 
		 */
		CMD_M1_SET_CARD_CONSUME_STT : function(str) {
			var object = {};
			object.data = "";
			if (transcommit(116)) {
				object = asvalue();
				if (object.success) {
					object.data = returnsObject(object.msg);
				}
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 修改卡内部状态   UID  CardStatus
		 */
		CMD_M1_SET_CARD_STT : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(117)) {
					object = asvalue();
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 修改圈存控制号 str<CardID,NewLoadSno> ;
		 */
		CMD_M1_SET_LOAD_SNO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(118)) {
					object = asvalue();
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 读卡内部号CardID str<CardID>
		 */
		CMD_M1_READ_CARD_ID : function(str) {
			var object = {};
			object.data = "";
			if (transcommit(119)) {
				object = asvalue();
				if (object.success) {
					object.data = returnsObject(object.msg);
				}
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 修改补助控制号 str<CardID,NewLoadSno>;
		 */
		CMD_M1_SETSUBSIDE_SNO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(120)) {
					object = asvalue();
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 更新消费限额 str<UID,SingleLimit,TotalLimit>;
		 */
		CMD_M1_SETCONSUMELIMIT : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(121)) {
					object = asvalue();
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 注销 str<CardID InLoadSeq LoadSeq InSubsidySeq SubsidySeq CARDDEPOSIT tbCardDeposit CARDREFUND tbCardCost BALANCE tbBalance tbOnlBalance SerialNo AppName InstNo> return UID
		 */
		CMD_M1_CANCELLATION : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(122)) {
					object = asvalue();					
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 解挂 str<CardID,SerialNo,AppName> 
		 */
		CMD_M1_LOSSRELIEVE : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(123)) {
					object = asvalue();					
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 初始化 str<cardType卡类型 1:cpu 2:m1> return UID
		 */
		CMD_M1_INITCARD : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(128)) {
					object = asvalue();
					if (object.success) {
						object.data = returnsObject(object.msg);
					}
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 替换密钥(原系统的个人化功能) str<cardType卡类型 1:cpu 2:m1> return UID
		 */
		CMD_INITM1KEY : function() {
			var object = {};
			object.data = "";
			if (transcommit(130)) {
				object = asvalue();
				if (object.success) {
					object.data = returnsObject(object.msg);
				}
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 读取usercode return UserCode
		 */
		CMD_M1_READUSERCODE : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(129)) {
					object = asvalue();
					if (object.success) {
						object.data = returnsObject(object.msg);
					}
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		}
	}
}()