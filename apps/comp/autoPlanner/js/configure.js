define(['commonutil', 'ompage', 'pluspop','/apps/comp/autoPlanner/js/innerHTML.js','/apps/comp/autoPlanner/js/childTaskList.js'], 
function(ajaxUtil, page, pluspop,innerHTML,childList) {
	var configure = {};
	var perview_dialog;
	var jsonObj = {};
	var stepData = [];
	function init(){
		$('body').delegate('.dialog-small', 'click', function() {
			var stepId = $(this).find(".step_parentId").val();
			var childTask_type =  $(this).find(".step_parentId").siblings("div").children("p").eq(1).attr("value");
			$("#small_stepId").val(stepId);
			$("#childTask_type").val(childTask_type);
//			alert(stepId +","+childTask_type);
			var dia_dialog = $('#dialog_small').ui_dialog({
                title: '提示',
                width: 400,
                height: 300
            }).showModal();
		});
		$('body').delegate('.dialog-small2', 'click', function() {
			$("#planner_type").val("childTask");
			var dia_dialog = $('#dialog_small2').ui_dialog({
                title: '创建子任务',
                width: 400,
                height: 300
            }).showModal();
		});
		$('body').delegate('.dialog-small3', 'click', function() {
			$("#planner_type").val("step");
			var dia_dialog = $('#dialog_small2').ui_dialog({
                title: '创建子任务',
                width: 400,
                height: 300
            }).showModal();
		});
		
		
		$('body').delegate('#btn_planner_configure_childTask', 'click', function() {
			configure.saveStep();
		});
		//创建任务流
		$('body').delegate('#btn_planner_create_air_flow', 'click', function() {
			configure.savePlannerData();
		});
		/**
		 * 创建步骤属性
		 */
		$('body').delegate('#btn_planner_configure_operation', 'click', function() {
			var type = $("#opeartion_type").children("div").children("div").find(".on").children("span").attr("value");
			if(type == "step"){
				$("#planner_type").val("childTask");
				var dia_dialog = $('#dialog_small2').ui_dialog({
	                title: '创建子任务',
	                width: 400,
	                height: 300
	            }).showModal();
			}
			if(type == "configure"){
				configure.showChildTask();
			}
			if(type == "delete"){
				configure.deleteStep();
			}
		});
	}
	
	/**
	 * 取消
	 */
	configure.cancel = function(){
		stepData.length = 0 ;
		childList.childData.length = 0 ;
	}
	
	/**
	 * 保存步骤
	 */
	configure.saveStep = function (){
		var planner_type = $("#planner_type").val();
		if(planner_type == "step"){
			var taskId = $("#planner_configure_id").val();
			var parentId = "ROOT";
			var str = innerHTML.getTypeAndName();
			var stepType = str.split(",")[0];
			var name = str.split(",")[1];
			var id = configure.guid();
			var param = {
				"id":id,
				"taskId":taskId,
				"parentId":parentId,
				"stepType":stepType,
				"stepName":name
			}
			stepData.push(param);
			jsonObj.step = stepData;
			innerHTML.addStepHTML(id);
			innerHTML.addLine();
		}
		
		if(planner_type == 'childTask'){
			var taskId = $("#planner_configure_id").val();
			var parentId = $("#small_stepId").val();
			var str = innerHTML.getTypeAndName();
			var stepType = str.split(",")[0];
			var name = str.split(",")[1];
			var id = configure.guid();
			var param = {
				"id":id,
				"taskId":taskId,
				"parentId":parentId,
				"stepType":stepType,
				"stepName":name
			}
			stepData.push(param);
			jsonObj.step = stepData;
			innerHTML.addChildTask(id,parentId);
		}
		console.info(stepData);
	}
	/**
	 * 删除已选步骤
	 */
	configure.deleteStep = function(){
		var stepId = $("#small_stepId").val();
		//删除本身数据
		if(childList.childData.length > 0){
			childList.childData.forEach(function(attr ,index){
				if(attr.stepId == stepId){
					childList.childData.splice(index,1);
				}
			});
		}
		if(stepData.length > 0){
			stepData.forEach(function(attr ,index){
				if(attr.id == stepId){
					stepData.splice(index,1);
				}
			});
		}
		//删除子步骤数据
		var divs = $("#"+stepId).parent("div").nextAll();
		divs.each(function(index,ele){
			var key = $(ele).find("input").val();
			var childData = childList.childData;
			if(childList.childData.length > 0){
				childList.childData.forEach(function(attr ,index){
					if(attr.stepId == key){
						childList.childData.splice(index,1);
					}
				});
			}
			if(stepData.length > 0){
				stepData.forEach(function(attr ,index){
					if(attr.id == key){
						stepData.splice(index,1);
					}
				});
			}
			console.info(childData);
		});
		var param = {"id":stepId};
		innerHTML.deleteStepDiv(param);
		innerHTML.deleteLine();
		console.info(stepData);
		console.info("childList.childData");
		console.info(childList.childData);
	}
	/**
	 * 展示原子任务
	 */
	configure.showChildTask = function (){
		var type = $("#childTask_type").val();
		if("base_line" == type){
			childList.showBaseLineList();
		}else{
			pluspop.alert("此功能暂未开放，敬请期待！")
		}
//		console.info(type);
	}
	/**
	 * 获取原子任务数
	 */
	configure.getAtomicTaskSize = function(){
		var size = 0;
		childList.childData.forEach(function(attr,index){
			size += attr.atomicTask.length;
		})
		console.info("原子任务长度 = "+size);
		return size;
	}
	/**
	 * 获取步骤数
	 */
	configure.getStepSize = function(){
		return stepData.length;
	}
	/**
	 * 将步骤数据保存到数据库
	 */
	configure.save = function(){
		var param = stepData;
		ajaxUtil.postrest(compWsg.auto_planner_step_save, function(data) {
			if(data.retCode == 0){
				configure.saveJobs();
			}else{
				pluspop.alert("步骤保存失败");
			}
		}, param ,true);
	}
	/**
	 * 将原子任务数据保存到数据库
	 */
	configure.saveJobs = function(){
		console.info("保存原子任务");
		console.info(childList.childData);
		var param = childList.childData;
		ajaxUtil.postrest(compWsg.auto_planner_step_job_save, function(data) {
			if(data.retCode == 0){
				configure.createAirFlow();
			}else{
				pluspop.alert("原子任务保存失败");
			}
		}, param ,true);
	}
	/**
	 * 将保存的任务创建成任务流
	 */
	configure.createAirFlow = function(){
		var param = {
			"taskId":$("#planner_configure_id").val()
		};
		ajaxUtil.callrest(compWsg.auto_planner_createAirFlow, function(data) {
			if(data.retCode == 0){
				require(['/apps/comp/autoPlanner/js/index.js'], function(task) {
					task.searchTask();
				});
				perview_dialog.close();
				pluspop.alert("任务编排创建成功");
			}else{
				pluspop.alert("任务编排创建失败");
			}
		}, param ,true);
	}
	/**
	 * 执行预览
	 */
	configure.execPerview = function(){
		$("#planner_show_pervice_step").html("");
		configure.searchStep();
		perview_dialog = $("#showPerview").ui_dialog({
			width: 1150,
			height: 600,
		}).showModal();
	}
	/**
	 * 创建任务流
	 */
	configure.savePlannerData = function(){
		//1、保存编排任务 2、保存步骤 3、保存原子任务 4、创建任务流
		var param = $("#planner_configure_add_form").serializeObject();
		ajaxUtil.postrest(compWsg.auto_planner_save, function(data) {
			if(data.retCode == 0){
				configure.save();
			}else{
				pluspop.alert("操作失败");
			}
		}, param ,true);
	}
	/**
	 * 查询步骤
	 */
	configure.searchStep = function (){
		var step = configure.showPreviewStepData();
		innerHTML.showPerview(step,"planner_show_pervice_step");
		var atomicTask = configure.showPreviewAtomicTaskData();
		var entity = {"BASE":atomicTask};
		require(['../tpl/perview_base_line.tpl'], function(fun) {
			$("#planner_pervive_base_line").html(fun(entity));
		});
	}
	
	/**
	 * 预览步骤数据
	 */
	configure.showPreviewStepData = function(){
		var array = [];
		var divs = $("#planner_configure_step_div").children("div");
		divs.each(function(i,ele){
			var array1 = [];
			var div = $(ele).find(".dialog-small");
			div.each(function(s,e){
				var data = {
					"stepType" : $(e).find("p").eq(1).attr("value").toUpperCase(),
					"stepName" : $(e).find("p").eq(1).html()
				}
				array1.push(data);
			});
			array.push(array1);
		});
		return array;
	}
	/**
	 * 预览原子任务数据
	 */
	configure.showPreviewAtomicTaskData = function(){
		var array = [];
		childList.childData.forEach(function(a ,i){
			var atomicTask = a.atomicTask;
			atomicTask.forEach(function(attr ,index){
				array.push(attr);
			});
		});
		return array;
	}
	/**
	 * 关闭弹窗
	 */
	configure.closeDialog = function(){
		perview_dialog.close();
	};
	
	/**
	 * 修改展示步骤
	 */
	configure.showEditStep = function(){
		var param = {
			"taskId":$("#planner_configure_id").val()
		}
		ajaxUtil.callrest(compWsg.auto_planner_showPreview, function(data) {
			var step = data.data.entity.STEP;
			console.info(step);
			stepData = innerHTML.editShowStep(step);
			console.info(stepData);
		},param,true);
		//查询原子任务
		ajaxUtil.callrest(compWsg.auto_planner_step_job_queryAtomicTask, function(data) {
			childList.childData = data.data.entity;
			console.info(childList.childData);
		},param,true);	
	};
	
	
	//页面获取UUID
	configure.S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    configure.guid = function() {
    	return  (configure.S4()+configure.S4()+configure.S4()+configure.S4()+configure.S4()+configure.S4()+configure.S4()+configure.S4());
    }
	
	
	init();
	return  configure ;

});