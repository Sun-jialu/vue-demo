window.receiptPrinter=function() {
	var iccardforep;// 获取的组件
	var rs;
	/* 初始化 */
	function init() {
		rs = "";
		iccardforep = document.getElementById("psam");
		
	}
	/* 解析组件返回的结果 */
	function asvalue() {
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
	return {
		/**
		 * 开户打印小票
		 */
		openAccountPrinter: function(str) {
			init();
			var object = {};
			object.data = "";
			rs=iccardforep.openAccountTemplate(str);
			if (rs) {
				object = asvalue();
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		
		/**
		 * 开卡打印小票
		 */
		openCardPrinter: function(str) {
			init();
			var object = {};
			object.data = "";
			rs=iccardforep.OpenCardTemplate(str);
			if (rs) {
				object = asvalue();
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		
		/**
		 * 销户打印小票
		 */
		closeAccountPrinter : function(str) {
			init();
			var object = {};
			object.data = "";
			rs=iccardforep.closeAccountTemplate(str);
			if (rs) {
				object = asvalue();
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 *补卡打印小票
		 */
		replaceCardPrinter : function(str) {
			init();
			var object = {};
			object.data = "";
			rs=iccardforep.replaceCardTemplate(str);
			if (rs) {
				object = asvalue();
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		},
		/**
		 *充值打印小票
		 */
		depositPrinter : function(str) {
			init();
			var object = {};
			object.data = "";
			rs=iccardforep.depositTemplate(str);
			if (rs) {
				object = asvalue();
			} else {
				object.success = false;
				object.msg = "输入参数错误";
			}
			return object;
		}
	
	}
}()