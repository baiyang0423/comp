define(['commonutil','ompage','pluspop'],function(ajaxUtil,page,pluspop){
	var obj = {};
	obj.open = function(fn){
		console.info("开启选择主机密码界面.");
		obj.loadListData(1,true);
		var selfDialog = dialog({
             id: 'select_pwd_db_check_dialog',
             title: '选择数据库密码',
             content: $('#select_pwd_db_check_model')[0],
             width: 1100,
             height: 410,
             okValue:"选择",
             ok:function(){
             	var checkeds = $("input[name='select_pwd_db_check_input_radio']:checked");
             	if(checkeds.length == 0){
             		pluspop.alert("请选择数据库!");
             		return false;
             	}else{
             		var arr = Array();
             		$.each(checkeds,function(index,val){
             			var obj = $(val);
             			var param = {
	             			id : obj.val(),
	             			ip:obj.attr("data-ip"),
	             			dbName:obj.attr("data-dbName"),
	             			username:obj.attr("data-username")
	             		}
             			arr[arr.length] = param;
             		});
             		fn(arr);
             		return true;
             	}
             },
             cancelValue: '关闭',
             cancel: function() {}
         }).showModal();
         return selfDialog;
	}
	obj.loadListData = function(currentPage,first){
		var param = 
		{
				"name": $("#select_pwd_db_check_input_name").val(),
				"ip": $("#select_pwd_db_check_input_ip").val(),
				"type":$("#select_pwd_db_check_input_type").val(),
				"currentPage": currentPage,
				"pageLimit" : "10"
		}
		ajaxUtil.callrest(compWsg.model_select_passwd_db, function(data) {
			if(data.retCode == '0'){
				require(['./list.tpl'], function(fun) {
					if(data.data.entity == null){
						pluspop.alert("没有查询到数据库信息!");
					}
					$("#select_pwd_db_check_tbody").html(fun(data.data));
					initTable();
					if (first) {					
						page.init('select_pwd_db_check_page',data.page,obj.loadListData);		
					}
				});
			}else{
				pluspop.alert(data.retMsg);
			}
		},param,true);	
	}
	
	/**
	 * 查询按钮
	 */
	$("#select_pwd_db_check_btn_search").on("click",function(){
		obj.loadListData(1,true);//加载数据
	});
	/**
	 * 重置按钮
	 */
	$("#select_pwd_db_check_btn_reset").on("click",function(){
		$("#select_pwd_db_check_input_name").val("");
		$("#select_pwd_db_check_input_ip").val("");
		$("#select_pwd_db_check_input_type").val("");
	});
	
	return obj;
});


