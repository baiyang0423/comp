define(function(){
	var page = {};
	/**
	 * 成功提示框
	 * @param {Object} title_  标题放大字体
	 * @param {Object} msg_   消息体 正常字体
	 */
	page.success = function(title_,msg_,callback_){
		require(["./alert.tpl"],function(sus){
			var d = dialog({
				id:"dialog_" + Math.random(),
		        title: '提示信息',
		        content: sus({flag:"success",msg:msg_,title:title_}),
		        width: 400,
				height: 300,
				ok:function(){if( $.isFunction(callback_) ){callback_()}},
				okValue: "确定"
		    }).showModal();
		});
	}
	/**
	 * 失败提示框
	 * @param {Object} title_  标题放大字体
	 * @param {Object} msg_   消息体 正常字体
	 */
	page.fail = function(title_,msg_,callback_){
		require(["./alert.tpl"],function(sus){
			var d = dialog({
				id:"dialog_" + Math.random(),
		        title: '提示信息',
		        content: sus({flag:"fail",msg:msg_,title:title_}),
		        width: 400,
				height: 300,
				ok:function(){if( $.isFunction(callback_) ){callback_()}},
				okValue: "确定"
		    }).showModal();
		});
	}
	/**
	 * 开启加载提示
	 * @param {Object} Msg_  替换提示文字
	 */
	page.loading = function(Msg_,width_,height_){
		
		if(Msg_ == undefined){
			$("#model_tip_msg").text("Loading…");
		}else{
			$("#model_tip_msg").text(Msg_);
		}
		if(width_ == undefined){
			width_ = 320;
		}
		
		if(height_ == undefined){
			height_ = 60
		}
		var temp = $('#comp_loading').ui_dialog({
			id : "loadingDialog_",
			width: width_,
			height: height_,
			cancel: false
		});
		temp.width(width_);
		temp.height(height_);
		temp.showModal();
		$(".ui-dialog-content").css({"background-color":"#444"});
		$(".ui-dialog").css("border","0");
		$(".ui-popup").css({
			"top":"-200px",
			"border":"1px solid #000",
			"border-radius":"10px",
			"overflow":"hidden"
		});
		$(".ui-popup").animate({top:"223"},400);
	}
	/**
	 * 关闭提示框
	 */
	page.close = function(){
		dialog.get("loadingDialog_").close();
	}
	
	
	/**
	 * 
	 * @param {Object} msg_
	 * 消息体内容:{
			"title" : "123213",
			"content" : "sadasd",
			"messageTypeId" : "010101",
			"startTime" : "2018-12-13 11:53",
			"endTime":"2018-12-13 11:53"
		}
	 */
	page.sendOpMsg = function(msg_){	
		try{
			ajaxUtil.postrest(messageWsg.message_send_op,function(data){
				if(data.retCode != '0'){
					page.fail("出错","无法发送操作日志!");
				}
			},msg_);
		}catch(e){console.log(e);}
	}
	return page;
})