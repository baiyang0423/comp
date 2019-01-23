define(function() {
	var dialog ;
	var operation = {};
	
	/**
	 * 弹窗
	 */
	operation.showDialog = function (formId){
		//弹出对话框
		dialog = $("#"+formId).ui_dialog({
			width: 1100,
			height: 550,
		}).showModal();
	}
	/**
	 * 中等弹窗
	 */
	operation.showMiddleDialog = function (formId){
		//弹出对话框
		dialog = $("#"+formId).ui_dialog({
			width: 750,
			height: 450,
		}).showModal();
	}
	/**
	 * 关闭弹窗
	 */
	operation.closeDialog = function (){
		dialog.close();
	}
	return operation;
});