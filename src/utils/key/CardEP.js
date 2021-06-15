
window.cardservice = function(){
	var iccardforep;// 获取的组件
	var flog;
	var params;
	var rs;
	/** 公共方法 */
	function toPostObject(jsonStr) {
		params = "";
		var p = "";
		try {
			// $.each(jsonStr, function(key, val) {
			// 	p += key + "=" + val + " ;";
			// });
			for(var key in jsonStr){
				p += key + "=" + jsonStr[key] + " ;";
			}
			params = p;
			return true;
		} catch (e) {
			return false;
		}
	}

	/* 与组件交互 */
	function transcommit(trntype) {
		// $.ajax({
		// 	url : "checkSession",
		// 	complete : function(xhr, status) {
		// 		if(xhr.status == 500){
		// 			Util.showMsg('此页面已失效,将自动刷新');
		// 			parent.location.reload();
		// 			return;
		// 		}
		// 	}
		// });
		rs = "";
		if (params == undefined) {
			params = "";
		}
		iccardforep = document.getElementById("psam");
		try {
			
			rs = iccardforep.InitReaderForEp();
			if ((rs.split(","))[0] != 0) {
				return false;
			}
			console.log( trntype+'           ' +params)
			rs = iccardforep.SendCmdForEP(trntype, params);
			return true;
		} catch (e) {
			rs = "1,访问控件异常";
			return false;
		} finally {
			try {
				iccardforep.ReleaseReaderForEP();
			} catch (e) {

			}
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
			var content = array[i].split("=");
			object[content[0]] = trimStr(content[1]);
		}
		return object;
	}
	return {
		/**
		 * 内部认证
		 * 选择文件 str内容:CalType,KeyIndex,Data
		 */
		CMD_INTERNALAUTH : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(0)) {
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
		 * 选择文件 str内容:SelType,SelValue
		 */
		CMD_SELECT : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(1)) {
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
		 * 取随机数 str<Length> return object["random"];
		 */
		CMD_GETCHALLENGE : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(2)) {
					object = asvalue();
					if (object.success) {
						object.data = {
							random : object.msg
						};
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
		 * 发送外部认证指令 str内容:KeyType,EnCryRand
		 */
		CMD_SINGLEEXTERNALAUTH : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(3)) {
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
		 * 外部认证[包含取随机数] str内容:KeyType,KeyValue
		 */
		CMD_EXTERNALAUTH : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(4)) {
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
		 * 校验PIN码 str内容<PinType,PinValue>
		 */
		CMD_VERIFYPIN : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(5)) {
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
		 * 读二进制文件 str内容<FileSign,FileOffSet,FileLen> return object["record"];
		 */
		CMD_READBINARY : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(6)) {
					object = asvalue();
					if (object.success) {
						object.data = {
							record : object.msg
						};
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
		 * 写二进制文件 str内容<FileSign,FileOffSet,FileData>
		 */
		CMD_UPDATEBINARY : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(7)) {
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
		 * 读记录文件 str内容<RecordNum,ParaP2> return object["record"];
		 */
		CMD_READRECORD : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(8)) {
					object = asvalue();
					if (object.success) {
						object.data = {
							record : object.msg
						};
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
		 * 取卡片UID return object[uid];
		 */
		CMD_GETCARDUID : function() {
			var object = {};
			object.data = "";
			if (transcommit(9)) {
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
		 * 取卡片UID(带参数) return object[uid]; 参数AppName,GetUIDMode=01
		 */
		CMD_GETCARDUIDBYAID : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(9)) {
					object = asvalue();
					if (object.success) {
						object.data = returnsObject(object.msg);
					}
				} else {
					object.success = false;
					object.msg = rs.split(",")[1];
				}
			}else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 * 查询余额 str<AppName应用名称> return object[Balance];
		 */
		CMD_GETBALANCE : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(10)) {
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
		 * 读卡编号 str<AppName应用名称> return object[CardID];
		 */
		CMD_GETCARDID : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(11)) {
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
		 * 读卡状态 str内容<AppName应用名称,RecordNum,ParaP2> return object[CardStatus];
		 */
		CMD_GETCARDSTATUS : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(12)) {
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
		 * 写卡状态 str内容<AppName应用名称,CardID,CardStatus>
		 */
		CMD_SETCARDSTATUS : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(13)) {
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
		 * 读卡消费状态 str<AppName应用名称> return object[CardPurchaseStatus];
		 */
		CMD_GETCARDPURCHASESTATUS : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(14)) {
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
		 * 写卡消费状态 str内容<AppName应用名称,CardID,CardPurchaseStatus>
		 */
		CMD_SETCARDPURCHASESTATUS : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(15)) {
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
		 * 卡户浏览 str<AppName应用名称> return
		 * object[SingleLimit单笔限额,TotalLimit累计限额,CardType卡类型,SubSysCode所属子系统,Name持卡人姓名,CertNo持卡人证件号，
		 * CertType持卡人证件类型，CardID卡编号，CardValidDate卡有效期,CardStatus卡状态,IDCode身份代码,Balance余额,PurchaseCount消费交易次数，LoadCount圈存交易次数];
		 */
		CMD_GETALLCARDINFO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(16)) {
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
		 * 开户 str内容<AppName应用名称,Name姓名,CertType证件类型,CertNo证件号码,SubSysCode所属子系统,IDCode身份代码,CardType卡类型,CardID卡编号,CardValidDate卡有效期,
		 * SingleLimit单次消费限额,TotalLimit累计消费限额,CardStatus卡状态,Balance卡余额,LoadSno圈存控制序号,SubsidySno补助控制序号,Password个人密码,
		 * {?????strTermSno终端机编号}, TranDate交易日期,TranTime交易时间>,CardNo外部卡号> return object[TAC]
		 */
		CMD_WRITEALLCARDINFO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(17)) {
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
		 * 读圈存控制序号 str<AppName应用名称> return object[LoadSno];
		 */
		CMD_GETLOADSNO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(18)) {
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
		 * 写图存控制序号 str<AppName应用名称,CardID,NewLoadSno>
		 */
		CMD_SETLOADSNO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(19)) {
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
		 * 读补助控制序号 str<AppName应用名称> return object[SubsidySno];
		 */
		CMD_GETSUBSIDYSNO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(20)) {
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
		 * 写补助控制序号 str<AppName应用名称,CardID,NewSubsidySno>
		 */
		CMD_SETSUBSIDYSNO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(21)) {
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
		 * 更新个人密码 str<AppName应用名称,CardID,NewPassword>
		 */
		CMD_UPDATEPASSWORD : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(22)) {
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
		 * 更新持卡人信息 str<AppName应用名称,Name姓名,CertType证件类型,CertNo证件号码,SubSysCode所属子系统,CardType卡类型,CardID卡编号>
		 */
		CMD_UPDATECARDHOLDERINFO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(23)) {
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
		 * 更新应用信息 str<AppName应用名称,IDCode身份代码,CardValidDate卡有效期,CardID卡编号>
		 */
		CMD_UPDATEAPPINFO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(24)) {
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
		 * 圈存 str<应用名称AppName,KeyIndex密钥索引<内部已默认为'01'>,TranAmt交易金额,TermSno终端机编号<内部已注释，通过内部方法获取编号>,TranDate交易日期,TranTime交易时间,CardID卡编号>
		 * return object[TAC];
		 */
		CMD_LoadForCard : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(25)) {
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
		 * 消费 str<应用名称AppName,KeyIndex密钥索引<内部已默认为'01'>,TranAmt交易金额,TermSno终端机编号<内部已注释，通过内部方法获取编号>,TranDate交易日期,TranTime交易时间,CardID卡编号>
		 * return object[TAC];
		 */
		CMD_PURCHASE : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(26)) {
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
		 * 获取联机交易次数 str<应用名称AppName> return object[LoadCount];
		 */
		CMD_GETLOADCOUNT : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(27)) {
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
		 * 获取脱机交易次数 str<应用名称AppName> return object[PurchaseCount];
		 */
		CMD_GETPURCHASECOUNT : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(28)) {
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
		 * 更新消费限额 str<应用名称AppName,CardID卡编号,SingleLimit单笔限额,TotalLimit累计限额>
		 */
		CMD_UPDATEPURCHASELIMIT : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(29)) {
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
		 * 获取证件类型和证件号码 str<应用名称AppName> return
		 * object[Name持卡人姓名,CertNo持卡人证件号,CertType持卡人证件类型];
		 */
		CMD_GETCERRTYPEANDNO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(30)) {
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
		 * 取金融IC卡账号 str<应用名称AppName> return object[BankAccountNo银行账号];
		 */
		CMD_GETACCOUNTNO : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(31)) {
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
		 * 读用户代码(机构号) str<应用名称AppName> return object[UserCode];
		 */
		CMD_GETUSERCODE : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(32)) {
					
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
		 * 写用户代码(机构号) str<应用名称AppName,CardID卡编号,用户代码NewUserCode>
		 */
		CMD_SETUSERCODE : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(33)) {
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
		 * 更新个人密码(需原密码) str<应用名称AppName,CardID卡编号,旧密码OldPassword,新密码NewPassword>
		 */
		CMD_UPDATEPASSWORDWITHOLDPASSWORD : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(34)) {
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
		 * 更新累积消费日期 str<应用名称AppName,CardID卡编号,旧密码OldPassword,新密码NewPassword>
		 */
		CMD_UPDATETOTALPURCHASEDATE : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(35)) {
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
		 * 使用PSAM卡分散子密钥 str<应用名称DFName,PIN码值PinValue,密钥标识KeyIndex,分散因子DivGene>
		 * return object[NewPass];
		 */
		CMD_DIVSUBKEYUSEPSAM : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(40)) {
					object = asvalue();
					if (object.success) {
						object.data = {
							NewPass : object.msg
						};
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
		 * 清卡
		 */
		CMD_CLEARCARD : function() {
			var object = {};
			object.data = "";
			if (transcommit(50)) {
				object = asvalue();
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 替换密钥(原系统的个人化功能) str<cardType卡类型 1:cpu 2:m1> return UID
		 */
		CMD_INITKEY : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(36)) {
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
		CMD_INITKEY_HD : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(172)) {
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
		 * 陕西市政府项目华大芯片初始化
		 */
		CMD_INITKEY_SXHD : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(173)) {
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
		 * 长沙银行同方芯片初始化
		 */
		CMD_INITKEY_TF : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(174)) {
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
		 * 卡片注销 str<AppName,CardID,SerialNo（卡号=uID）,InstNo(机构号), InLoadSeq, LoadSeq,InSubsidySeq, SubsidySeq,  CARDDEPOSIT, tbCardDeposit, CARDREFUND, tbCardCost, BALANCE, tbBalance， tbOnlBalance>
		 * 
		 */
		CMD_CANCELLATION : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(37)) {
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
		 * 卡解挂 str<AppName,CardID> 
		 */
		CMD_LOSSRELIEVE : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(38)) {
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
		 * 圈存及补助申请准备 str<AppName,GetUIDMode,CurDate> 
		 * return UserCode UID CardID LoadSno SubsidySno PurchaseCount LoadCount Balance Random IDCode
		 */
		CMD_READYFROAPPLY_QC : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(60)) {
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
		 * 更新圈存控制序号 str<NewLoadSno>
		 */
		CMD_UPDATELOADSNO_QC : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(62)) {
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
		 * 更新补助控制序号 str<NewSubsidySno> 
		 */
		CMD_UPDATESUBSIDYSNO_QC : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(63)) {
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
		 * 初始化圈存 str<TranAmt> 
		 * return Balance  TranAmt LoadRandom LoadTranSno TerminalNo MAC1
		 */
		CMD_INITLOAD_QC : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(64)) {
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
		 * 圈存 str<TranDate  TranTime MAC2> 
		 * return TAC
		 */
		CMD_LOAD_QC : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(65)) {
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
		 * CMD_UPDATEPWD_QC 修改消费密码 str<OldPassword  NewPassword> 
		 */
		CMD_UPDATEPWD_QC : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(66)) {
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
		 * 读取消费限额 
			return [SingleLimit单笔限额   TotalLimit累计限额]
		 */
		CMD_GETPURCHLIMIT_QC : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(69)) {
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
		 * 更新消费限额  str<SingleLimit,TotalLimit>
		 */
		CMD_SETPURCHLIMIT_QC : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(70)) {
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
		 * 校验消费密码 str<OldPassword>
		 */
		CMD_VERIFYPWD_QC : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(71)) {
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
		 * 消费 str<Key CardUID TranAmt TranDate TranTime >
		 * return TAC
		 */
		CMD_PURCHASE_QC : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(72)) {
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
		 * 卡片初始化 str<CardType卡类型     MaintainKey 维护主密钥>
		 * 卡类型只能是00[设置卡],或01[采集卡],或02[系统卡],或03[查询卡],或04[复采卡]		 * 
		 */
		CMD_CARDINIT_ZX : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(86)) {
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
		 * 获取小钱包信息 str<APPNAME>
		 * return [Balance TotalDepoistAmt LastDepositTime LastDepositAmt] 
		 */
		CMD_GETWALLETINFO_ZX : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(87)) {
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
		 * 小钱包充值 str<交易金额TranAmt,交易日期TranDate,交易时间TranTime>
		 * return [Balance TotalDepoistAmt LastDepositTime LastDepositAmt] 
		 */
		CMD_DEPOSIT_ZX : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(88)) {
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
		 * 发水控系统卡 str<MaintainKey,Mode>
		 */
		CMD_ISSSYSCARD_ZX : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(89)) {
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
		 * 发水控设置卡 str<卡底金LowAmt,计费方式FeeType,商户编号MerchNo,起始终端编号StartTermNo,最大消费时间MaxTime,最大使用次数MaxUseCount>
		 */
		CMD_ISSSETCARD_ZX : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(90)) {
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
		 * 设置小钱包信息 str<应用名称AppName,当前余额Balance,累计充值金额TotalDepoistAmt,最后充值时间LastDepositTime,最后充值金额LastDepositAmt>
		 */
		CMD_SETWALLETINFO_ZX : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(91)) {
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
		 * 系统卡和设置卡是否已初始化 
		 * return [FL0BLEN]
		 */
		CMD_ISCARDINIT_ZX : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(92)) {
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
		 * 联机卡片初始化 
		 * return [FL0BLEN]
		 */
		CMD_ONLINE_INIT : function() {			
			if (transcommit(160)) {
				object = asvalue();				
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		},
		/**
		 * 联机卡片个人化 		 
		 * str:AppName应用aid,BCTC应用标识,CardNo卡号,ExpiryDate失效日期,ValidDate生效日期,SN发卡序号,CVM卡片交易属性,ORGNO机构编号,mainkey机构主密钥
		 */
		CMD_ONLINE_PUTCARD : function(str) {
			var object = {};
			object.data = "";
			if (toPostObject(str)) {
				if (transcommit(161)) {
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
		 * 读取卡片信息
		 * str AppName
		 * return [CardNo,SN,OrgNo]
		 */
		CMD_ONLINE_READCARD : function(str) {
			var object = {};
			object.data = "";
			 
			if (toPostObject(str)) {
				if (transcommit(162)) {
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
		 * 检测psam信息
		 */
		CMD_CHECK_PSAM : function() {
			var object = {};
			if (transcommit(41)) {
				object = asvalue();	
				if (object.success) {
					object.data = returnsObject(object.msg);
				}
			} else {
				object.success = false;
				object.msg = rs.split(",")[1];
			}
			return object;
		}
	}
}();