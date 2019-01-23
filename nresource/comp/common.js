$(document).ready(function(){
	/**
	 * 绑定选择框勾选事件
	 */
	$("body").delegate(".replace-checkbox input","click",function(event){
		$(this).parent(".replace-checkbox").toggleClass("checked");
	});
	
	/**
	 * 绑定tr 对tr点击tr时候默认选择内部的checkbox或者radio 是否绑定根据tr的class开管指定
	 * 如 <tr class='bindCheckRadio'> 级联radio
	 *  <tr class='bindCheckBox'> 级联checkbox
	 */
	$("body").delegate(".bindCheckBox td:gt(0)",'click',function(){
		$(this).parent("tr").children("td:first").children("label:first").toggleClass("checked");
		var cur = $(this).parent("tr").children("td:first").children("label:first")
		.children(":checkbox:first")[0].checked;
		$(this).parent("tr").children("td:first").children("label:first")
		.children(":checkbox:first").prop('checked',!cur);
	});
	
	/**
	 * 在table的全选按钮的check样式class中加入allcheck 样式自动绑定
	 */
	$("body").delegate(".allcheck","click",function(){
		$(this).toggleClass("checked");
		var table = $(this).parent().parent().parent().parent();
		var tbody = table.children("tbody");
		var trs   = tbody.children("tr");
		/**
		 * 根据当前全选按钮状态选择tr下的复选框
		 */
		var checked = $(this).hasClass('checked');
		$.each(trs,function(index,tr){
			var label = $(tr).children("td:first").children(".replace-checkbox");
			label.toggleClass('checked',checked);
			label.children(":checkbox:first").prop('checked',checked);
		});
	})
	
});