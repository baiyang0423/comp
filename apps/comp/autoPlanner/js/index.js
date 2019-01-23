define(['commonutil', 'ompage', 'pluspop','/apps/comp/autoPlanner/js/configure.js'], function(ajaxUtil, page, pluspop,configure) {
	var pageLimit = 10 ;
	var add_dialog;
	var planner = {};
	
	
	planner.init = function(){
		planner.search();
		planner.getLoginUser();
		//查询
		$("#btn_search_planner_task").click(planner.search);
		//添加
		$("#btn_planner_add").click(planner.addDialog);
		//删除
		$("#btn_planner_delete").click(planner.deleteTask);
		//保存
		$("#planner_configure_save").click(planner.save);
		//执行
		$("#btn_planner_excute").click(planner.execute);
		//验证corntab
//		$("#planner_crontab").blur(planner.validateCorntab);
		//暂停任务
		$("#btn_planner_stop").click(planner.pauseTask);
		//取消
		$("#btn_cancel").click(planner.cancel);
		//报告
		$("#btn_planner_report").click(planner.report);
		//返回
		$("#btn_backup").click(planner.backUp);
		//修改
		$("#btn_planner_edit").click(planner.edit);
		//单次执行
		$("#btn_planner_excute_one").click(planner.executeOne);
 	}
	/**
	 * 单次执行
	 */
	planner.executeOne = function(){
		var plannerIds = [] ;
		//判断任务是否执行过
		var inputs = $('input[name="plannerId"]:checked');
		if(inputs.size() <= 0){
			pluspop.alert("请选择任务");
			return false;
		}
		var v = false;
		inputs.each(function(index,ele){
			var execStatus = $(ele).attr("execStatus");
			if(execStatus == null || execStatus == 'PAUSE'){
				v = true;
				return false;
			}
			plannerIds.push($(ele).val());
		});
		if(v){
			pluspop.alert("只能执行已经执行的任务");
			return false;
		}
		ajaxUtil.postrest(compWsg.auto_planner_executeOne, function(data) {
			if(data.retCode == 0){
				pluspop.alert("操作成功");
			}else{
				pluspop.alert("操作失败");
			}
		}, plannerIds ,true);
	}
	/**
	 * 修改
	 */
	planner.edit = function(){
		if($("input[name='plannerId']:checked").size() != 1){
			pluspop.alert("请选择一个任务");
			return false;
		}
		//查询数据
		var param = {"plannerId":$("input[name='plannerId']:checked").val()};
		ajaxUtil.callrest(compWsg.auto_planner_searchOne, function(data) {
			console.info(data.data);
			$("#planner_name").val(data.data.entity.name);
			$("#planner_crontab").val(data.data.entity.crontab);
			$("#planner_taskOwner").val(data.data.entity.taskOwner);
			$("#planner_smsNotice").val(data.data.entity.smsNotice);
			$("#planner_configure_id").val(data.data.entity.id);
			$("#planner_createUser").val(data.data.entity.createUser);
			$("#planner_beginTime").val(data.data.entity.beginTime);
			$("#planner_endTime").val(data.data.entity.endTime);
			$("#planner_remarks").text(data.data.entity.remarks);
		}, param ,false);
		$("#planner_configure_show_type").val("edit");
		configure.showEditStep();
		add_dialog = $("#showConfigure").ui_dialog({
			width: 1200,
			height: 600,
		}).showModal();
	}
	
	/**
	 * 返回
	 */
	planner.backUp = function(){
		configure.closeDialog();
		add_dialog = $("#showConfigure").ui_dialog({
			width: 1100,
			height: 550,
		}).showModal();
	}
	/**
	 * 报告
	 */
	planner.report = function(){
		require(['/apps/comp/autoPlanner/js/report.js'], function(report) {
			report.showReport();
		});
	}
	/**
	 * 取消
	 */
	planner.cancel = function(){
		var ids = [] ;
		var taskId = $("#planner_configure_id").val();
		ids.push(taskId)
		var param = ids;
		configure.cancel();
		add_dialog.close();
	}
	/**
	 * 暂停任务
	 */
	planner.pauseTask = function(){
		if($('input[name="plannerId"]:checked').size() <= 0){
			pluspop.alert("请选择任务");
			return false;
		}
		var ids = [];
		$("input[name=plannerId]:checked").each(function(index,ele){
			var id = $(ele).val();
			ids.push(id);
		})
		var param = ids ;
		ajaxUtil.postrest(compWsg.auto_planner_pauseAirFlow, function(data) {
			if(data.retCode == 0){
				pluspop.alert("操作成功");
				planner.search();
			}else{
				pluspop.alert("操作失败");
			}
		}, param ,true);
	}
	/**
	 * 验证corntab
	 */
	planner.validateCorntab = function(){
		var corntab = $("#planner_crontab").val();
		if("" == corntab || null == corntab){
			return false;
		}
		if("none" == corntab || "once" == corntab || "@once" == corntab){
			return false;
		}
		var param = {
			"corn":corntab
		}
		ajaxUtil.callrest(compWsg.auto_planner_validateCorntab, function(data) {
			if(data.retCode != 0){
				pluspop.alert(data.retMsg);
			}
		}, param ,true);
	}
	
	/**
	 * 执行
	 */
	planner.execute = function(){
		if($('input[name="plannerId"]:checked').size() <= 0){
			pluspop.alert("请选择任务");
			return false;
		}
		var ids = [];
		$("input[name=plannerId]:checked").each(function(index,ele){
			var id = $(ele).val();
			ids.push(id);
		})
		var param = ids ;
		ajaxUtil.postrest(compWsg.auto_planner_executeAirFlow, function(data) {
			if(data.retCode == 0){
				pluspop.alert("操作成功");
				planner.search();
			}else{
				pluspop.alert("操作失败");
			}
		}, param ,true);
	
		
	}
	/**
	 * 删除任务
	 */
	planner.deleteTask = function(){
		if($('input[name="plannerId"]:checked').size() <= 0){
			pluspop.alert("请选择任务");
			return false;
		}
		pluspop.confirm(pluspop.msg.confirm_delete,function(){
			var ids = [];
			$("input[name=plannerId]:checked").each(function(index,ele){
				var id = $(ele).val();
				ids.push(id);
			})
			var param = ids ;
			ajaxUtil.postrest(compWsg.auto_planner_delete, function(data) {
				if(data.retCode == 0){
					planner.search();
					pluspop.alert("操作成功");
				}else{
					pluspop.alert("操作失败");
				}
			}, param ,true);
		});
	}
	/**
	 * 添加弹窗
	 */
	planner.addDialog = function(){
		planner.getLoginUser();
		planner.getNewId();
		$("#planner_configure_add_form")[0].reset();
		$("#planner_remarks").text("");
		planner.clearHtml();
		$("#planner_configure_show_type").val("add");
		add_dialog = $("#showConfigure").ui_dialog({
			width: 1100,
			height: 550,
		}).showModal();
	}
	/**
	 * 保存
	 */
	planner.save = function(){
		if($("#planner_name").val() ==null || $("#planner_name").val() == ""){
			pluspop.alert("流程标题不能为空");
			return false;
		}
		if($("#planner_crontab").val() ==null || $("#planner_crontab").val() == ""){
			pluspop.alert("执行策略不能为空");
			return false;
		}
		if($("#planner_beginTime").val() ==null || $("#planner_beginTime").val() == ""){
			pluspop.alert("起始时间不能为空");
			return false;
		}
		if($("#planner_taskOwner").val() ==null || $("#planner_taskOwner").val() == ""){
			pluspop.alert("任务责任人不能为空");
			return false;
		}
		var step_size = configure.getStepSize();
		if(step_size <= 0){
			pluspop.alert("步骤不能为空");
			return false;
		}
		var size = configure.getAtomicTaskSize();
		if(size <= 0){
			pluspop.alert("原子任务不能为空");
			return false;
		}
		configure.execPerview();
		add_dialog.close();
	}
	
	planner.search = function(){
		planner.searchWithPage(1,true);
	}
	/**
	 * 分页查询
	 * @param {Object} currentPage
	 * @param {Object} first
	 */
	planner.searchWithPage = function(currentPage,first){
		var param = {"name":$("#planner-name").val(),
				 	 "currentPage": currentPage,
					 "pageLimit" : pageLimit
					}
		
		ajaxUtil.callrest(compWsg.auto_planner_searchWithPage, function(data) {
			require(['../tpl/list.tpl'], function(fun) {
				$("#tbody_index").html(fun(data.data));
				console.info(data.data);
				initTable();
				if (first) {					
					page.init('page_index',data.page,planner.searchWithPage);		
				}
			});
		},param,true);	
	}
	
	
	/**
	 * 获取登录用户
	 */
	planner.getLoginUser = function(){
		ajaxUtil.callrest(compWsg.auto_planner_getLoginUser, function(data) {
			if(data.retCode == '0'){
				$("#planner_createUser").val(data.data.entity);
			}
		},"",true);	
	}
	
	/**
	 * 重置页面
	 */
	planner.clearHtml = function(){
		$("#planner_configure_line").html("");
		$("#planner_configure_step_div").html("");
		
	}
	
	/**
	 * 获取ID
	 */
	planner.getNewId = function(){
		ajaxUtil.callrest(compWsg.auto_planner_getNewId, function(data) {
			console.log(data);
			$("#planner_configure_id").val(data.data.entity);
		},"",true);	
	}
	
	planner.searchTask = function(){
		planner.search();
	}
	
	return planner;
});