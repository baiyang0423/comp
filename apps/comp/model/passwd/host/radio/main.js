define(['commonutil','ompage','pluspop'],function(ajaxUtil,page,pluspop){
	var obj = {};

    $("body").delegate('.rule-label label','click',function(){
        var label = $(this).closest("tr").siblings().find("label");
        label.removeClass("on");
        $(this).addClass("on");
    });

	obj.open = function(fn){
		console.info("开启选择主机密码界面.");
		obj.loadListData(1,true);
		var selfDialog = dialog({
             id: 'select_pwd_host_radio_dialog',
             title: '选择主机密码',
             content: $('#select_pwd_host_radio_model')[0],
             width: 1100,
             height: 500,
             okValue:"选择",
             ok:function(){
             	var checkeds = $("input[name='select_pwd_host_radio_input_radio']:checked");
             	if(checkeds.length == 0){
             		pluspop.alert("请选择主机!");
             		return false;
             	}else if(checkeds.length > 1){
             		pluspop.alert("只能选择1台主机!");
             		return false;
             	}else{
             		var obj = $(checkeds[0]);
             		var param = {
             			id : obj.val(),
             			ip:obj.attr("data-ip"),
             			hostname:obj.attr("data-ip"),
             			username:obj.attr("data-username"),
             			hostId:obj.attr("data-hostId")
             		}
             		fn(param);
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
			"name": $("#select_pwd_host_radio_input_name").val(),
			"ip": $("#select_pwd_host_radio_input_ip").val(),
			"currentPage": currentPage,
			"pageLimit" : "10"
		}
		ajaxUtil.callrest(compWsg.model_select_passwd_host, function(data) {
			if(data.retCode == '0'){
				require(['./list.tpl'], function(fun) {
					$("#select_pwd_host_radio_tbody").html(fun(data.data));
					initTable();
					if (first) {					
						page.init('select_pwd_host_radio_page',data.page,obj.loadListData);		
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
	$("#select_pwd_host_radio_btn_search").on("click",function(){
		obj.loadListData(1,true);//加载数据
	});
	/**
	 * 重置按钮
	 */
	$("#select_pwd_host_radio_btn_reset").on("click",function(){
		$("#select_pwd_host_radio_input_name").val("");
		$("#select_pwd_host_radio_input_ip").val("");
	});
	
	return obj;
});


