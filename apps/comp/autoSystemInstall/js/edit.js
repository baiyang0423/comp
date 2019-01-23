define(['commonutil', 'ompage', 'pluspop',
		'/apps/comp/autoSystemInstall/js/dialog.js',
		'/apps/comp/autoSystemInstall/js/list.js'
		], function(ajaxUtil, page, pluspop,dialog,install) {
	var edit = {};
	edit.sData = [];
	
	edit.showDialog = function(){
		$("#operaType").val("edit");
		if($("input[name='instanllId']:checked").size() != 1){
			pluspop.alert("请选择一个任务");
			return false;
		}
		var param = {id:$("input[name='instanllId']:checked").val()};
		ajaxUtil.callrest(compWsg.auto_system_install_searchOne, function(data) {
			console.info(data.data);
			$("#install_id").val(data.data.entity.id);
			$("#configure_personLiable").val(data.data.entity.personLiable);
			$("#configure_remarks").val(data.data.entity.remarks);
			edit.sData = data.data.entity.configure;
			var htmlData = {entity:data.data.entity.resource};
			console.info(htmlData);
			require(['../tpl/configure_1.tpl'], function(fun) {
				$("#tbody_install_confiure_1").html(fun(htmlData));
//				install.showHostCount();
				console.info(data.data);
				dialog.showDialog("showConfigure1");
			});
			
			
		},param,true);
	}
	
	
	return edit;
});