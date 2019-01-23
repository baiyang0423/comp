define(['commonutil','ompage','pluspop'],function(ajaxUtil,page,pluspop){
	
	var obj = {};
	
	obj.open = function(fn){
		console.info("开启选择主机界面.");
		
		obj.loadListData(1,true);
		var selfDialog = dialog({
             id: 'select_host_dialog',
             title: '',
             content: $('#select_host_radio_model')[0],
             width: 1100,
             height: 500,
             okValue:"选择",
             ok:function(){
             	var checkeds = $("input[name='select_host_input_radio']:checked");
             	if(checkeds.length == 0){
             		pluspop.alert("请选择主机!");
             		return false;
             	}else if(checkeds.length > 1){
             		pluspop.alert("只能选择1台主机!");
             		return false;
             	}else{
             		var param = {
             			id : $(checkeds[0]).val(),
             			name:$(checkeds[0]).attr("ip")
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
			"name": $("#select_host_input_name").val(),
			"ip": $("#select_host_input_ip").val(),
			"type": $("#select_host_input_type").val(),
			"currentPage": currentPage,
			"pageLimit" : "10"
		}
		ajaxUtil.callrest(compWsg.model_select_host, function(data) {
			require(['./list.tpl'], function(fun) {
				$("#select_host_tbody").html(fun(data.data));
				initTable();
				if (first) {					
					page.init('select_host_page',data.page,obj.loadListData);		
				}
			});
		},param,true);	
	}
	
	/**
	 * 查询按钮
	 */
	$("#select_host_btn_search").on("click",function(){
		obj.loadListData(1,true);//加载数据
	});
	/**
	 * 重置按钮
	 */
	$("#select_host_btn_reset").on("click",function(){
		$("#select_host_input_name").val("");
		$("#select_host_input_ip").val("");
	});
	
	return obj;
});


