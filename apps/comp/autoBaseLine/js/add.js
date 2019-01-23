define(['commonutil', 'ompage', 'pluspop','/apps/comp/autoBaseLine/js/operation.js'], function(ajaxUtil, page, pluspop,operation) {
	var add = {}
	
	add.showDialog = function(){
		//清除页面缓存
		add.clearAddHtml();
		//获取新ID
		$("#operaType").val("add");
		ajaxUtil.callrest(compWsg.auto_baseLine_getTaskId, function(data) {
			console.info(data);
			$("#taskId").val(data.data.entity);
		});	
		operation.showDialog("add");
	}
	
	/**
	 * 清空增加页面
	 */
	add.clearAddHtml = function(){
		$("#operaType").val("");
		$("#tbody_base_confiure_1").html("");
		$("#taskId").val("");
		$("#configure_title").val("");
		$("#configure_personLiable").val("");
		$("#configure_remarks").text("");
		$("#configure_remarks").val("");
		$(("#host_count_show")).html("当前配置主机数量：0台");
	}
	return add;
});