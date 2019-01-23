define(['commonutil', 'ompage', 'pluspop','/apps/comp/autoPlanner/js/myEcharts.js'],function(ajaxUtil, page, pluspop,myEcharts){
	var report = {};
	var dialog ;
	var dialog1 ;
	//定时器
	var t1 ;
	
	
	
	function init(){
		//返回
		$('body').delegate('#btn_planner_report_base_back', 'click', function() {
			report.baseReportBack();
		});
		//基线加固详情
		$('body').delegate('.BASE_LINE', 'click', function() {
			var stepId = $(this).attr("stepId");
			report.showResult(stepId);
		});
		//停止定时
		$('body').delegate('#btn_planner_result_close', 'click', function() {
			clearInterval(t1);
			report.closeDialog();
		});
		//查询失败详细信息
		$('body').delegate('.search_fail_detail', 'click', function() {
			var taskId = $(this).attr("taskId");
			report.searchFailDetail(taskId);
		});
		//操作系统安装详情
		$('body').delegate('.OS_INSTALL', 'click', function() {
			pluspop.alert("此功能暂未开放，敬请期待！");
		});
		//自动化巡检详情
		$('body').delegate('.INSPECTION', 'click', function() {
			pluspop.alert("此功能暂未开放，敬请期待！");
		});
		//脚本检查详情
		$('body').delegate('.SCRIPT', 'click', function() {
			pluspop.alert("此功能暂未开放，敬请期待！");
		});
		//扩展类型详情
		$('body').delegate('.EXTEND', 'click', function() {
			pluspop.alert("此功能暂未开放，敬请期待！");
		});
		//进程检测详情
		$('body').delegate('.PROCESS', 'click', function() {
			pluspop.alert("此功能暂未开放，敬请期待！");
		});
		
	}
	/**
	 * 弹窗
	 */
	report.showDialog = function(formId){
		dialog = $("#"+formId).ui_dialog({
			width: 1300,
			height: 550,
		}).showModal();
	}
	/**
	 * 关闭弹窗
	 */
	report.closeDialog = function(){
		dialog.close();
	}
	/**
	 * 弹窗1
	 */
	report.showDialog1 = function(formId){
		dialog1 = $("#"+formId).ui_dialog({
			width: 1100,
			height: 500,
		}).showModal();
	}
	/**
	 * 关闭弹窗1
	 */
	report.closeDialog1 = function(){
		dialog1.close();
	}
	/**
	 * 展示页面
	 */
	report.showReport = function(){
		$("#planner_show_report_step").html("");
		if($("input[name='plannerId']:checked").size() != 1){
			pluspop.alert("请选择一个任务");
			return false;
		}
		report.brokenLine();
		report.showResultCount();
//		第二次打开页面，echarts已经初始化，不能再加载页面，先清除echarts的实例
		$('#brokenLine').removeAttr('_echarts_instance_');
		report.searchReportStep();
		report.showDialog("showReport");
		t1 = setInterval(report.ecexuteInterval,5000);
	}
	/**
	 * 定时执行
	 */
	report.ecexuteInterval = function(){
		report.brokenLine();
		report.showResultCount();
	}
	
	/**
	 * 查询失败详细信息
	 */
	report.searchFailDetail = function(taskId){
		var planner = $("input[name='plannerId']:checked").val();
		var param = {
			taskId:taskId,
			plannerId:planner
		}
		ajaxUtil.callrest(compWsg.auto_planner_searchFailDetail, function(data) {
			console.info(data.data);
			if(data.retCode == 0){
				require(['../tpl/fail_detail.tpl'], function(fun) {
					$("#tbody_fail_detail").html(fun(data.data));
				});
				report.showDialog1("showFailDetail");
			}else{
				pluspop.alert("操作失败");
			}
		},param,true);	
	};
	
	/**
	 * 折线图
	 */
	report.brokenLine = function(){
		var plannerId = $("input[name='plannerId']:checked").val();
		var param = {
			"plannerId":plannerId
		}
		ajaxUtil.callrest(compWsg.auto_planner_showBrokenLine, function(data) {
			var list = data.data.entity;
			//折线图
			myEcharts.brokenLine(list);
		},param,true);	
	}
	/**
	 * 执行结果总览
	 */
	report.showResultCount = function(){
		var plannerId = $("input[name='plannerId']:checked").val();
		var param = {
			"plannerId":plannerId
		}
		ajaxUtil.callrest(compWsg.auto_planner_showResultCount, function(data) {
			var list = data.data.entity;
			require(['../tpl/result_count.tpl'], function(fun) {
				$("#planner_show_report_count").html(fun(list));
			});
		},param,true);	
	}
	/**
	 * 查询步骤
	 */
	report.searchReportStep = function (){
		var param = {
			"taskId":$("input[name='plannerId']:checked").val()
		}
		ajaxUtil.callrest(compWsg.auto_planner_showPreview, function(data) {
			var step = data.data.entity.STEP;
			report.showPerview(step,"planner_show_report_step");
		},param,true);	
	}
	/**
	 * 原子任务执行结果
	 */
	report.showResult = function(stepId){
		var param = {"stepId":stepId};
		ajaxUtil.callrest(compWsg.auto_planner_showReport, function(data) {
			console.info(data.data.entity);
			require(['/apps/comp/autoBaseLine/js/innerHTML.js'], function(html) {
				html.clearHTML();
				//主机分布
				console.info(data.data.entity.BASE_OS);
				var os =data.data.entity.BASE_OS;
				myEcharts.yw_mouthdata(os);
				html.baseLineOS(os);
				//指标
				var reinforce = data.data.entity.BASE_REINFORCE;
				myEcharts.yw_daydata(reinforce);
				//漏洞检测明细
				var detection = data.data.entity.BASE_DETECTION_DETAIL;
				html.baseLineDetection(detection);
			});
		},param,true);
		//关闭结果页面定时任务
		clearInterval(t1);
		report.closeDialog();
		report.showDialog("showBaseResult");
	}
	/**
	 * 返回
	 */
	report.baseReportBack = function(){
		report.closeDialog();
		report.showReport();
	}
	/**
	 * 页面
	 * @param {Object} step
	 * @param {Object} formId
	 */
	report.showPerview = function(step,formId){
		var str0 = '<div class="fl" style="padding-top: 30px;padding-left: 100px;padding-right: 20px;"> '+
	               '     <span class="start-icon"></span> '+
	               '     <p class="tc mgt-10">开始</p> '+
	               ' </div>';
		step.forEach(function(attr,index){
			var str2 = "";
			$(attr).each(function(i,val){
				var p = report.imgIone(val.stepType);
				console.info(val);
				str2 += '<div class="fl tc pei-box on"> '+
	                    '   <div class="pei-line1 clear fl mgt-20 mgl-30"></div> '+
	                    '       <div class="fl '+val.stepType+'" taskId="'+val.taskId+'" stepId="'+val.id+'" style="width:84px;height:80px"> '+p+'<p class="mgt-10">'+val.stepName+'</p> '+
	                    '   </div> '+
	                    '</div>';
			});
			var str1 = ' <div class="fl col-9"> '+
	                   '     <div style="height: 110px;" class="pdt-30"> '+
	                   '         <div class="sat-one clear"> '+ str2 +'</div> '+
	                   '      </div> '+
	                   '  </div>';
	        $("#"+formId).append(str0+str1);
		});
	}
	
	
	report.imgIone = function(stepType){
		var p = "";
		if("OS_INSTALL" == stepType){
			p = '<p class="pei-icon pei-icon1"></p>';
		}
		if("BASE_LINE" == stepType){
			p = '<p class="pei-icon pei-icon2"></p>';
		}
		if("INSPECTION" == stepType){
			p = '<p class="pei-icon pei-icon3"></p>';
		}
		if("SCRIPT" == stepType){
			p = '<p class="pei-icon pei-icon4"></p>';
		}
		if("EXTEND" == stepType){
			p = '<p class="pei-icon pei-icon5"></p>';
		}
		if("PROCESS" == stepType){
			p = '<p class="pei-icon pei-icon6"></p>';
		}
		return p;
	}
	
	
	
	
	
	
	
	init();
	return report;
})