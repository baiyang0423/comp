define(['/apps/comp/autoBaseLine/configureManager/js/list.js'], function(list) {
	var configure = {};
	
	configure.init = function(){
		list.search();
		//查询
		$("#btn_search").click(list.search);
		//增加
		$("#btn_base_line_configure_add").click(list.showAddDialog);
		//保存
		$("#btn_configure_save").click(list.save);
		//修改
		$("#btn_base_line_configure_edit").click(list.showEditDialog);
		//删除
		$("#btn_base_line_configure_delete").click(list.delete);
		//代码不能重复
		$("#configure_code").blur(list.validateCode)
		//关闭弹窗
		$(".close_dialog").click(list.closeDialog);
		//同步文件到ansible
		$("#btn_base_line_configure_reset").click(list.synchronous);
	}
	
	
	
	return configure;
})
	