define(['commonutil', 'ompage', 'pluspop',
		'/apps/comp/autoSystemInstall/js/list.js',
		'/apps/comp/autoSystemInstall/js/edit.js',
		'/apps/comp/autoSystemInstall/js/report.js'
		], function(ajaxUtil, page, pluspop,list,edit,report) {
	var install = {};
	
	install.init = function(){
		list.search();
		//添加
		$("#btn_sys_install_add").click(list.showConfigure1);
		//下一页
		$("#btn_install_configure_1_next").click(list.showNext);
		//上一页
		$("#btn_install_configure_2_prev").click(list.showPrev);
		//统一配置
		$("#btn_configure_setting").click(list.setConfigure);
		//统一模板
		$("#btn_templet_setting").click(list.setTemplet);
		//保存任务
		$("#btn_install_configure_2_save").click(list.save);
		//删除任务
		$("#btn_sys_install_delete").click(list.delete);
		//执行预览
		$("#btn_sys_install_excute").click(list.execPreview);
		//导入
		$("#import_excel").click(list.showImport);
		//刷新
		$("#btn_refresh").click(list.refresh);
		//修改
		$("#btn_sys_install_edit").click(edit.showDialog);
		//报告
		$("#btn_sys_install_report").click(report.showDialog);
		//关闭弹窗
		$('body').delegate('.dia_close', 'click', function() {
			require(['/apps/comp/autoSystemInstall/js/dialog.js'], function(dialog) {
				dialog.closeDialog();
			});
		});
		//删除预选主机
		$('body').delegate('.host_delete', 'click', function() {
			$(this).parent("td").parent("tr").remove();
			list.showHostCount();
		});
		//全选
		$('body').delegate('.all-checked span', 'click', function() {
			//	$(this).parent(".replace-checkbox").toggleClass("checked");
			var tbody = $(this).closest("table").children("tbody");
			if($(this).parent().hasClass("checked")){
				var lable = tbody.children("tr").find(".js-checkbox.replace-checkbox");
				lable.addClass("checked");
				lable.children("input").prop('checked','checked');
			}else{
				var lable = tbody.children("tr").find(".js-checkbox.replace-checkbox");
				lable.removeClass("checked");
				lable.children("input").prop('checked','');
			}
		});
	}
	
	return install;
});