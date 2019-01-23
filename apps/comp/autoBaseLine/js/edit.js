define(['commonutil', 'ompage', 'pluspop','/apps/comp/autoBaseLine/js/operation.js'], function(ajaxUtil, page, pluspop,operation) {
	var edit = {}
	var dialog ;
	edit.showDialog = function(){
		if($("input[name=baseId]:checked").size() != 1){
			pluspop.alert("请选择一个任务");
			return false;
		}
		var taskId = $("input[name=baseId]:checked").val();
		var param = { "taskId":taskId };
		ajaxUtil.callrest(compWsg.auto_baseLine_searchOne, function(data) {
			console.info(data);
			$("#configure_title").val(data.data.entity.title);
			$("#configure_personLiable").val(data.data.entity.personLiable);
			$("#configure_remarks").val(data.data.entity.remarks);
			$("#taskId").val(data.data.entity.id);
			require(['../tpl/edit_configure_host.tpl'], function(fun) {
				$("#tbody_base_confiure_1").html(fun(data.data.entity));
			});
		},param ,true);	
		
		operation.showDialog("add");
	}
	
	return edit;
});