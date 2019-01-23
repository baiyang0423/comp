define(['commonutil','ompage','pluspop'],function(ajaxUtil,page,pluspop){
	
	var obj = {};
	
	obj.open = function(fn){
		console.info("开启选择bomc资源界面.");
		obj.loadListData(1,true);
		var selfDialog = dialog({
             id: 'select_bomc_resource_dialog',
             title: '',
             content: $('#select_bomc_resource_check_model')[0],
             width: 1100,
             height: 500,
             okValue:"选择",
             ok:function(){
             	var checkeds = $("input[name='select_bomc_resource_input_check']:checked");
             	if(checkeds.length == 0){
             		pluspop.alert("请选择资源!");
             		return false;
             	}else{
             		var files = new Array();
             		$.each(checkeds,function(index,val){
             			var j = {
             				id:$(val).val(),
             				unitId : $(val).attr("unit_id"),
             				ip:$(val).attr("ip"),
             				manufacturer: $(val).attr("manufacturer")
             			}
             			files.push(j);
             		});
             		fn(files);
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
			ip:$("#select_bomc_resource_input_id_ip").val(),
			manufacturer:$("#select_bomc_resource_input_id_type").val()
		}
		ajaxUtil.callrest(compWsg.model_select_bomc_resource, function(data) {
			require(['./list.tpl'], function(fun) {
				$("#select_bomc_resource_body").html(fun(data.data));
				initTable();
			});
		},param,true);	
	}
	
	/**
	 * 查询按钮
	 */ 
	$("#select_bomc_resource_btn_id_search").on("click",function(){
		obj.loadListData(1,true);//加载数据
	});
	/**
	 * 重置按钮
	 */
	$("#select_bomc_resource_btn_id_reset").on("click",function(){
		$("#select_bomc_resource_input_id_ip").val("");
		$("#select_bomc_resource_input_id_type").val("");
	});
	
	
	
	return obj;
});


