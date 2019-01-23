define(['commonutil','ompage','pluspop'],function(ajaxUtil,page,pluspop){
	
	var obj = {};
	
	obj.open = function(fn){
		console.info("开启选择主机界面.");
		obj.loadListData(1,true);
		var selfDialog = dialog({
             id: 'select_script_dialog',
             title: '',
             content: $('#select_script_radio_model')[0],
             width: 900,
             height: 500,
             okValue:"选择",
             ok:function(){
             	var checkeds = $("input[name='select_script_input_radio']:checked");
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
             			name : obj.attr("data-name"),
             			type : obj.attr("data-type")
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
			"name": $("#select_script_input_name").val(),
			"currentPage": currentPage,
			"pageLimit" : "10"
		}
		ajaxUtil.callrest(compWsg.model_select_script, function(data) {
			require(['./list.tpl'], function(fun) {
				$("#select_script_tbody").html(fun(data.data));
				initTable();
				if (first) {					
					page.init('select_script_page',data.page,obj.loadListData);		
				}
			});
		},param,true);	
	}
	
	/**
	 * 查询按钮
	 */
	$("#select_script_btn_search").on("click",function(){
		obj.loadListData(1,true);//加载数据
	});
	/**
	 * 重置按钮
	 */
	$("#select_script_btn_reset").on("click",function(){
		$("#select_script_input_name").val("");
	});
	
	return obj;
});


