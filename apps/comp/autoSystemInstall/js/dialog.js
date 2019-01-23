define(function() {
	var dialog = {};
	var dia;
	var dia1;
	var dia2;
	/**
	 * 大弹窗
	 * @param {Object} formId
	 */
	dialog.showDialog = function(formId){
		dia = $("#"+formId).ui_dialog({
			width: 1300,
			height: 650,
		}).showModal();
	}
	
	dialog.closeDialog = function(){
		dia.close();
	}
	/**
	 * 中弹窗
	 */
	dialog.showDialog1 = function(formId){
		dia1 = $("#"+formId).ui_dialog({
			width: 1300,
			height: 650,
		}).showModal();
	}
	
	dialog.closeDialog1 = function(){
		dia1.close();
	}
	
	/**
	 * 小弹窗
	 */
	dialog.showDialog2 = function(formId){
		dia2 = $("#"+formId).ui_dialog({
			width: 400,
			height: 300,
		}).showModal();
	}
	
	dialog.closeDialog2 = function(){
		dia2.close();
	}
	
	return dialog;
});