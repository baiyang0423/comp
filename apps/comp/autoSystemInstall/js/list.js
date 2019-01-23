define(['commonutil', 'ompage', 'pluspop',
		'/apps/comp/autoSystemInstall/js/dialog.js',
		'/apps/comp/autoSystemInstall/js/import.js',
		'/apps/comp/autoSystemInstall/js/innerHTML.js',
		'/apps/comp/autoSystemInstall/js/edit.js'
		], function(ajaxUtil, page, pluspop,dialog,import_excel,innerHTML,edit) {
	var pageLimit = 10 ;
	var install = {};
	var preData = [];
	
	/**
	 * 刷新
	 */
	install.refresh = function(){
		ajaxUtil.callrest(compWsg.auto_system_install_findResoutces, function(data) {
			require(['../tpl/configure_1.tpl'], function(fun) {
				$("#tbody_install_confiure_1").html(fun(data.data));
				install.showHostCount();
			});
		},"",true);
	}
	
	/**
	 * 导入
	 */
	install.showImport = function(){
		import_excel.showImport();
	}
	
	/**
	 * 执行预览
	 */
	install.execPreview = function(){
		if($("input[name='instanllId']:checked").size() != 1){
			pluspop.alert("请选择一个任务");
			return false;
		}
		var param = {id:$("input[name='instanllId']:checked").val()}
		ajaxUtil.callrest(compWsg.auto_system_install_execPreview, function(data) {
			if(data.retCode == 0){
				require(['../tpl/execPreview.tpl'], function(fun) {
				$("#div_install_exec_preview").html(fun(data.data.entity));
					console.info(data.data);
				});
				dialog.showDialog("showExecPreview");
			}else{
				pluspop.alert("操作失败");
			}
		},param,true);
	}
	
	
	/*
	 * 删除
	 */
	install.delete = function(){
		var inputs = $("input[name='instanllId']:checked");
		if(inputs.size() <= 0){
			pluspop.alert("请选择任务");
			return false;
		}
		var param = [];
		inputs.each(function(i,ele){
			param.push($(ele).val());
		});
		ajaxUtil.postrest(compWsg.auto_system_install_delete, function(data) {
			if(data.retCode == 0){
				install.search();
				pluspop.alert("操作成功");
			}else{
				pluspop.alert("操作失败");
			}
		},param,true);
	}
	
	
	
	
	
	
	/**
	 * 分页查询
	 */
	install.search = function(){
		install.searchWithPage(1,true);
	}
		
	install.searchWithPage = function(currentPage,first){
		var param = {"content":$("#install_content").val(),
				 	 "currentPage": currentPage,
					 "pageLimit" : pageLimit
					}
		ajaxUtil.callrest(compWsg.auto_system_install_searchWithPage, function(data) {
			require(['../tpl/list.tpl'], function(fun) {
				$("#tbody_index").html(fun(data.data));
				console.info(data.data);
				initTable();
				if (first) {					
					page.init('page_index',data.page,install.searchWithPage);		
				}
			});
		},param,true);	
	}
		
		
	/**
	 * 保存
	 */
	install.save = function(){
		
		//1、保存主表
		var param = $("#install_configure1_form").serializeObject();
		param.smsNotice = $(".allr-type.on").attr("value");
		var configure2Data = innerHTML.getConfigure2Data();
		param.detailData = configure2Data;
		console.info(param);
		ajaxUtil.postrest(compWsg.auto_system_install_save, function(data) {
			console.info(data.data);
			if(data.retCode == 0){
				install.search();
				pluspop.alert("操作成功");
				dialog.closeDialog();
			}else{
				pluspop.alert("操作失败");
			}
		},param,true);
	}
	
	/**
	 * 统一模板
	 */
	install.setTemplet = function(){
		innerHTML.setTemplet();
	}
	/**
	 * 设定统一配置
	 */
	install.setConfigure = function(){
		innerHTML.setConfigure();
	}
	/**
	 * 返回上一步
	 */
	install.showPrev = function(){
		$("#operaType").val("add");
		preData = innerHTML.getConfigure2Data();
		dialog.closeDialog();
		dialog.showDialog("showConfigure1");
	}
	/**
	 * 添加页2
	 */
	install.showNext = function(){
		/*if($("#configure_personLiable").val() == "" || $("#configure_personLiable").val() == null ){
			pluspop.alert("责任人不能为空");
			return false;
		}
		if($("#configure_remarks").val() == "" || $("#configure_remarks").val() == null ){
			pluspop.alert("描述不能为空");
			return false;
		}
		if($("#tbody_install_confiure_1").children("tr").size() <= 0){
			pluspop.alert("主机不能为空");
			return false;
		}*/
		dialog.closeDialog();
		install.Configure2Table();
		//延时执行，为了防止错误数据
		setTimeout(install.getSelectedData,500);
	}
	/**
	 * 设置回显数据
	 */
	install.getSelectedData =function(){
		if($("#operaType").val() == "add"){
			innerHTML.getSelectedData(preData);
		}else{
			innerHTML.getSelectedData(edit.sData);
		}
	}
	
	/**
	 * 获取configure1表格数据，展示configure2表格
	 */
	install.Configure2Table = function(){
		var data1 = innerHTML.getConfigure1Table();
		var str = "";
		var str1 = '<option value="-">不安装操作系统</option>';
		$("#install_select_templet").html("");
		$("#install_select_os").html("");
		ajaxUtil.callrest(compWsg.auto_system_install_templet_select, function(data) {
			console.info(data.data);
			//模板
			data.data.entity.templet.forEach(function(attr,index){
				str += '<option value="'+attr.id+'">'+attr.name+'</option>';
			});
			//版本
			data.data.entity.dic.forEach(function(attr,index){
				str1 += '<option value="'+attr.id+'">'+attr.name+'</option>';
			})
			$("#install_select_templet").append(str);
			$("#install_select_os").append(str1);
			
			var data = {"entity":data1};
			require(['../tpl/configure_2.tpl'], function(fun) {
				$("#tbody_install_confiure_2").html(fun(data));
				$(".install_templet_td").html(str);
				$(".install_os_td").html(str1);
				dialog.showDialog("showConfigure2");
			});
			innerHTML.getSelectedData(preData);
		},"",true);
	}
	/**
	 * 添加页1
	 */
	install.showConfigure1 = function(){
		$("#operaType").val("add");
		$("#install_id").val("");
		$("#install_configure1_form")[0].reset();
		install.findResoutces();
	}
	/**
	 * 自动发现资源
	 */
	install.findResoutces = function(){
		ajaxUtil.callrest(compWsg.auto_system_install_findResoutces, function(data) {
			require(['../tpl/configure_1.tpl'], function(fun) {
				$("#tbody_install_confiure_1").html(fun(data.data));
				install.showHostCount();
				console.info(data.data);
				dialog.showDialog("showConfigure1");
			});
		},"",true);
	}
	
	install.showHostCount = function(){
		var size = $("#tbody_install_confiure_1").children("tr").size();
		$("#host_count_show").html("当前配置主机数量："+size+"台");
	}
	
	return install;
});