define(['commonutil', 'ompage', 'pluspop',
	'/apps/comp/autoSystemInstall/js/dialog.js',
	'/apps/comp/autoSystemInstall/js/list.js'],  function( ajaxUtil, page, pluspop,dialog,install) {
	
	var import_excel = {};
	
	/**
	 * 弹窗
	 */
	import_excel.showImport = function(){
		dialog.showDialog2("host_batch_import");
	}
	
	/**
	 * 选择文件
	 */
	$("#select_button").click(function() {
		$("#file_select").click();
	});
	/**
	 * 回显文件名
	 */
	$("#file_select").change(function(){
		var files = $("#file_select").prop('files');
		$("#select_file_name").val(files[0].name);
	})
	/**
	 * 导出模板
	 */
	$("#btn_host_out").click(function(){
		window.location.href = compWsg.auto_system_install_downloadTemplet;
	})
	
	
	
	/**
	 * 导入
	 */
	$("#btn_host_import").click(function(){
		var files = $("#file_select").prop('files'); //获取文件列表
		//获取数据
		var flowForm = new FormData(document.getElementById("host_batch_import_form")); 
		console.info(flowForm);
        $.ajax({
    	   url: compWsg.auto_system_install_import,
    	   type: 'POST',
    	   dataType:"json",
    	   data: flowForm,
    	   cache: false,
    	   contentType: false,
    	   processData: false,
    	   success: function (data) {
    		   	if (data.retCode == 0) {
    		   		ajaxUtil.callrest(compWsg.auto_system_install_findResoutces, function(data) {
						require(['../tpl/configure_1.tpl'], function(fun) {
							$("#tbody_install_confiure_1").html(fun(data.data));
							install.showHostCount();
						});
					},"",true);
      				pluspop.alert("导入成功");
      				dialog.closeDialog2();
      			}else{
      				pluspop.alert("添加失败");
      			}
    	   }
        });
	});
	
	
	return import_excel;
});