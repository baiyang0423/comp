define(['commonutil', 'ompage', 'pluspop'], function(ajaxUtil, page, pluspop) {
	var operation = {};
	var taskParam = {};
	var dialog ;
	var t1 ;
	
	
	function init(){
		//下一步
		$('body').delegate('#btn_base_configure_1_next', 'click', function() {
			operation.configure_dialog_next();
		});
		//上一步
		$('body').delegate('#btn_base_configure_2_pre', 'click', function() {
			operation.configure1_dialog_perview();
		});
		/**
		 * 指标保存
		 */
		$('body').delegate('#btn_base_configure_2_save', 'click', function() {
			operation.configureSave();
		});
		//取消保存
		$('body').delegate('#btn_base_configure_1_cancel', 'click', function() {
			operation.configureCancel();
		});
	}
	/**
	 * 弹窗
	 * @param formId
	 */
	operation.showDialog = function (formId){
		//弹出对话框
		dialog = $("#"+formId).ui_dialog({
			width: 1300,
			height: 550,
		}).showModal();
	}
	/**
	 * 关闭弹窗
	 */
	operation.closeDialog = function (){
		dialog.remove();
	}
	/**
	 * 取消保存
	 */
	operation.configureCancel = function(){
		operation.closeDialog();
	};
	/*
	 * 下一步
	 */
	operation.configure_dialog_next = function(){
		if($("#configure_title").val() == ''){
			pluspop.alert("标题不能为空");
			return false;
		}
		if($("#configure_personLiable").val() == ''){
			pluspop.alert("责任人不能为空");
			return false;
		}
		if($("#configure_remarks").val() == ''){
			pluspop.alert("描述不能为空");
			return false;
		}
		var tr = $("#tbody_base_confiure_1").children("tr");
		var size = $("#tbody_base_confiure_1 tr").length
		if(size <= 0){
			pluspop.alert("请选择主机");
			return false;
		}
		var data = get_table_data();
		taskParam = {
			"hostInfos": data,
			"taskId":$("#taskId").val(),
			"title":$("#configure_title").val(),
			"personLiable":$("#configure_personLiable").val(),
			"remarks":$("#configure_remarks").val(),
			"smsNotice":$('.allr-type.on').attr("value")
		}
		var operaType = $("#operaType").val();
		//查询kpi
		require(['/apps/comp/autoBaseLine/js/kpi.js'], function(kpi) {
			kpi.kpiHandler();
		});
		//打开下一页
		dialog.remove();
		operation.showDialog("add1");
		$("#configure_taskId_2").val($("#taskId").val());
		var operaType = $("#operaType").val("next");
	}
	/**
	 * 上一步
	 */
	operation.configure1_dialog_perview = function(){
		dialog.remove();
		operation.showDialog("add");
	};
	/**
	 * 保存指标
	 */
	operation.configureSave = function(){
		var taskId = $("#configure_taskId_2").val();
		var kpiIds = getKpis();
		var task = taskParam;
		console.info(task);
		ajaxUtil.postrest(compWsg.auto_baseLine_save, function(data) {
			var kpi = {
				"taskId":taskId,
				"kpiIds":kpiIds
			}
			console.info(kpi);
		
			ajaxUtil.postrest(compWsg.auto_baseLine_configure_saveConfigure, function(data) {
				require(['/apps/comp/autoBaseLine/js/ompop.js'], function(pop) {
					pop.confirmAll("是否进行在线检测",function() { //确定键函数
						operation.execConfigureCheck();
					},function(){ //取消键函数
						operation.updateConfigure();
					});
				});
			}, kpi,true);
		},task,false);	
	}
	
	/**
	 * 更新有效状态
	 */
	operation.updateConfigure = function(){
		var taskId = $("#configure_taskId_2").val();
		var param ={
			"taskId":taskId,
			"status":"ALL"
		}
		ajaxUtil.postrest(compWsg.auto_baseLine_configure_configureUpdate, function(data) {
			if(data.retCode == RetCode.SUCCESS) {
				pluspop.alert("操作成功");
				require(['/apps/comp/autoBaseLine/js/index.js'], function(task) {
					task.searchTask();
				});
				operation.closeDialog();
			} else {
				pluspop.alert(data.reMsg);
			}
		}, param,true);
	}
	/**
	 * 指标检测
	 */
	 operation.execConfigureCheck = function (){
		var taskId = $("#configure_taskId_2").val();
		var param ={
			"taskId":taskId
		}
		ajaxUtil.postrest(compWsg.auto_baseLine_configure_configureCheck, function(data) {
			if(data.retCode == RetCode.SUCCESS) {
			} else {
				//根据任务ID删除配置信息
				pluspop.alert("Restful接口调用失败");
			}
		}, param,true);
		dialog.remove();
		$("#base_line_chcke_taskId").val($("#configure_taskId_2").val());
		operation.checkResultDialog();
	}
	/**
	 * 检测页面
	 */
	operation.checkResultDialog = function(){
		$("#checkPercent").val("");
		t1 = setInterval(operation.scheduleCheckPercent,2000);
		operation.searchCehckResult();
		operation.showDialog("check");
	}
	/**
	 * 检测进度
	 */
	operation.searchCehckResult = function(){
		var id = $("#base_line_chcke_taskId").val();
		var param = {"id":id};
		ajaxUtil.callrest(compWsg.auto_baseLine_configure_showConfigureCheckResule, function(data) {
			console.info(data.data);
			if(data.data.entity != null){
				require(['../tpl/check.tpl'], function(fun) {
					$("#base_line_check_list").html(fun(data.data));
				});
			}
		},param,false);
	}
	 
	operation.scheduleCheckPercent = function(){
		var param = {"taskId":$("#base_line_chcke_taskId").val()};
		ajaxUtil.postrest(compWsg.auto_baseLine_configure_scheduleCheckPercent, function(data) {
			console.info(data.data.entity);
			if(data.data.entity == 100){
				$("#checkPercent").val("100");
				clearInterval(t1);
				operation.searchCehckResult();
			}
			require(['/apps/comp/autoBaseLine/js/myEcharts.js'], function(myEcharts) {
				myEcharts.PercentPie(data.data.entity);
			});
		},param,true);
		   
	}
	
	/**
	 * 检查页面取消
	 */
	 operation.checkCancel = function(){
	 	pluspop.confirm("取消将删除本次添加的任务，是否确认操作？",function(){
			var param = {
				"taskId":$("#base_line_chcke_taskId").val()
			};
			ajaxUtil.postrest(compWsg.auto_baseLine_delete, function(data) {
				require(['/apps/comp/autoBaseLine/js/index.js'], function(task) {
					task.searchTask();
				});
				clearInterval(t1);
				require(['/apps/comp/autoBaseLine/js/operation.js'], function(operation) {
					operation.closeDialog();
				});
			},param,true);
		});
	 }
	 
	/**
	 * 获取指标信息
	 */
	function getKpis(){
		var kpiIds = [];
		var lis = $(".selected").children("li");
		lis.each(function(){
			var kpiId = $(this).children("span").attr("value");
			kpiIds.push(kpiId);
		})
		return kpiIds;
	}
	/**
	 * 获取主机信息
	 */
	function get_table_data() {
		var tr = $("#base_houst_host_list_table tr");
		var result = [];
		for (var i = 1; i < tr.length; i++) {
			var inputs = $(tr[i]).find("td").find("input");
			if (inputs.length > 0) {
				result.push({
					pwdId : inputs[0].value,
					sudoUsername : inputs[1].value,
					sudoPassword : inputs[2].value
				});
			}
		}
		return result;
	}
	
	init();
	return operation;
});