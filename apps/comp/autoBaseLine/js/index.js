define(['commonutil', 'ompage', 'pluspop','/apps/comp/autoBaseLine/js/myEcharts.js'], function(ajaxUtil, page, pluspop,myEcharts) {
	var pageLimit = 10 ;
	//定义dialog
	var report_dialog;
	var perview_dialog;
	
	var task = {};
	
	task.searchTask = function(){
		task.search();
	}
	task.init = function(){
		task.search();
		//查询
		$("#btn_search_task").click(task.search);
		//报告
		$("#btn_base_line_report").click(task.reportDialog);
		//删除
		$("#btn_base_line_delete").click(task.deleteBaseLine);
		//增加
		$("#btn_base_line_add").click(task.addDialog);
		//修改
		$("#btn_base_line_edit").click(task.editDialog);
		//执行
		$("#btn_base_line_excute").click(task.executeTask);
		//添加主机
		$('body').delegate('#btn_base_line_add_host', 'click', function() {
			task.showHostDialog();
		});
		//保存建议
		$('body').delegate('#base_line_chcke_save', 'click', function() {
			task.checkSave();
		});
		//删除选中主机
		$('body').delegate('.host_delete', 'click', function(event) {
			$(this).parent("td").parent("tr").remove();
			require(['/apps/comp/autoBaseLine/js/host.js'], function(host) {
				host.getHostCount();
			});
		});
		//全部删除选中主机
		$('body').delegate('#btn_base_line_delete_all_host', 'click', function() {
			$("#tbody_base_confiure_1").html("");
			require(['/apps/comp/autoBaseLine/js/host.js'], function(host) {
				host.getHostCount();
			});
		});
		//取消弹窗
		$(".js_cancel_report").click(task.removeReportDialog);
		$("#btn_close_perview").click(task.backPerview);
		$("#btn_base_line_chcke_cancel").click(task.checkCancel);
		$("#btn_base_line_perview_save").click(task.perviewConfirm);
 	}
	
	task.removeReportDialog = function(){
		report_dialog.remove();
	}
	task.perviewConfirm = function(){
		perview_dialog.remove();
		task.search();
	}
	/**
	 * 查询
	 */
	task.search = function(){
		task.searchWithPage(1,true);
	}
	/**
	 * 分页查询
	 * @param {Object} currentPage
	 * @param {Object} first
	 */
	task.searchWithPage = function(currentPage,first){
		var param = {"remarks":$("#remarks").val(),
				 	 "currentPage": currentPage,
					 "pageLimit" : pageLimit
					}
		
		ajaxUtil.callrest(compWsg.auto_baseLine_searchWithPage, function(data) {
			require(['../tpl/list.tpl'], function(fun) {
				$("#tbody_index").html(fun(data.data));
				console.info(data.data);
				initTable();
				if (first) {					
					page.init('page_index',data.page,task.searchWithPage);		
				}
			});
		},param,true);	
	}
	/**
	 * 修改
	 */
	task.editDialog = function(){
		require(['/apps/comp/autoBaseLine/js/edit.js'], function(edit) {
			edit.showDialog();
		});
	}
	/**
	 * 预览
	 */
	task.perviewDialog = function(){
		var param = {"id":$("#base_line_chcke_taskId").val()};
		ajaxUtil.callrest(compWsg.auto_baseLine_configurePerview, function(data) {
			console.info(data.data);
			var taskId = data.data.entity.taskId;
			var hosts = data.data.entity.hosts;
			require(['../tpl/perview.tpl'], function(fun) {
				$("#configurePerviewTable").html(fun(data.data.entity));
			});
		},param,true);	
		perview_dialog = $("#showPerview").ui_dialog({
			width: 1200,
			height: 650,
		}).showModal();
	}
	/**
	 * 返回预览
	 */
	task.backPerview = function(){
		perview_dialog.remove();
		require(['/apps/comp/autoBaseLine/js/operation.js'], function(operation) {
			operation.checkResultDialog();
		});
	}
	/**
	 * 报告
	 */
	task.reportDialog = function(){
		if($('input[name="baseId"]:checked').size() != 1){
			pluspop.alert("请选择任务");
			return false;
		}
		var base = $('input[name="baseId"]:checked');
		var id = base.val();
		var hostTotalCount = base.attr("hostTotalCount");
		var param = {"taskId":id};
		ajaxUtil.callrest(compWsg.auto_baseLine_searchReport, function(data) {
			console.info(data.data);
			require(['/apps/comp/autoBaseLine/js/innerHTML.js'], function(html) {
				html.clearHTML();
				//主机总数
				html.baseLineHostTotalCount(hostTotalCount);
				//描述
				if(data.data.entity == null){
					return false;
				}
				var summary = JSON.parse(data.data.entity.BASE_SUMMARY);
				html.baseLineSummary(summary);
				//详情
				var detail = JSON.parse(data.data.entity.BASE_DETAIL);
				html.baseLineDetail(detail);
				//主机分布
				$('#mouth-data-yw').removeAttr('_echarts_instance_');
				var os = JSON.parse(data.data.entity.BASE_OS);
				myEcharts.yw_mouthdata(os);
				html.baseLineOS(os);
				//指标
				$('#day-data-yw').removeAttr('_echarts_instance_');
				var reinforce = JSON.parse(data.data.entity.BASE_REINFORCE);
				myEcharts.yw_daydata(reinforce);
				html.baseLineReinforce(reinforce);
				//漏洞检测明细
				var detection = JSON.parse(data.data.entity.BASE_DETECTION_DETAIL);
				html.baseLineDetection(detection);
			});
		},param,true);	
		//弹窗
		require(['/apps/comp/autoBaseLine/js/operation.js'], function(operation) {
			operation.showDialog("showReport");
		});
	}
		
		
	/**
	 * 删除任务
	 */
	task.deleteBaseLine = function(){
		if($('input[name="baseId"]:checked').size() <= 0){
			pluspop.alert("请选择任务");
			return false;
		}
		var ids ;
		$('input[name="baseId"]:checked').each(function(index ,val){
			var id = $(val).val();
			if(index === 0){
				ids = id;
			}else{
				ids = ids +","+ id ;
			}
		});
		var param = {
			"taskId":ids
		}
		pluspop.confirm(pluspop.msg.confirm_delete,function(){
			ajaxUtil.postrest(compWsg.auto_baseLine_delete, function(data) {
					if(data.retCode == "0") {
						console.info(data);
						pluspop.alert("删除成功");
						task.search();
					}else{
						pluspop.alert("删除失败");
					}
				},param,true);
		});
	}
	/**
	 * 增加弹窗
	 */
	task.addDialog = function(){
		require(['/apps/comp/autoBaseLine/js/add.js'], function(add) {
			add.showDialog();
		});
	}
	
	/**
	 * 展示主机列表
	 */
	task.showHostDialog = function(){
		require(['/apps/comp/autoBaseLine/js/host.js'], function(host) {
			host.hostHandler();
		});
	}
   
		
	/**
	 * 任务执行
	 */
	task.executeTask = function(){
		if($('input[name="baseId"]:checked').size() <= 0){
			pluspop.alert("请选择任务");
			return false;
		}if($('input[name="baseId"]:checked').size() > 1){
			pluspop.alert("暂时仅限单任务执行");
			return false;
		}
		var param = {
			"taskId":$('input[name="baseId"]:checked').val()
		}
		ajaxUtil.postrest(compWsg.auto_baseLine_executeBaseTask, function(data) {
			if(data.retCode == RetCode.SUCCESS){
				pluspop.alert("操作成功");
				task.search();
			}else{
				pluspop.alert("操作失败");
			}
		},param,true);
//		pluspop.alert("操作成功");
//		search();
	}
		
	task.checkSave = function(){
		if("100" != $("#checkPercent").val()){
			pluspop.alert("正在检测，请等待 ...");
			return false;
		}
		
		var taskId = $("#configure_taskId_2").val();
		var status = $("#check_select").val();
		var param = {
			"taskId":taskId,
			"status":status
		}
		ajaxUtil.postrest(compWsg.auto_baseLine_configureUpdate, function(data) {
			if(data.retCode == RetCode.SUCCESS) {
				require(['/apps/comp/autoBaseLine/js/operation.js'], function(operation) {
					operation.closeDialog();
				});
				task.perviewDialog(taskId);
			} else {
				pluspop.alert("操作失败");
			}
		}, param,true);
		
	}
	
	task.checkCancel = function(){
		require(['/apps/comp/autoBaseLine/js/operation.js'], function(operation) {
			operation.checkCancel();
		});
	}
	
	return task;
});