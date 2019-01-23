define(['commonutil', 'ompage', 'pluspop',
		'/apps/comp/autoSystemInstall/js/dialog.js',
		'/apps/comp/autoSystemInstall/js/myEcharts.js',
		],function(ajaxUtil, page, pluspop,dialog,myEcharts) {
	
	var report = {};
	
	report.showDialog = function(){
//		var execStatus = $("input[name='instanllId']:checked").attr("execStatus");
//		if(execStatus != 'DONE')
//			pluspop.alert("任务未完成，请稍后重试");return false;
		
		
		var param = {id:$("input[name='instanllId']:checked").val()};
		ajaxUtil.callrest(compWsg.auto_system_install_report, function(data) {
			console.info(data.data);
			report.showSummary(data.data.entity.OS_SUMMARY);
			report.showInstallDetail(data.data.entity);
			report.showInstallStatistics(data.data.entity.OS_RESULT_STATISTICS);
			myEcharts.yw_mouthdata(data.data.entity.OS_RESULT_STATISTICS);
		},param,true);
		dialog.showDialog("showReport");
	}
	
	report.showInstallStatistics = function(entity){
		require(['../tpl/report_installStatistics.tpl'], function(fun) {
			$("#install_statistics").html(fun(entity));
		});
	}
	
	report.showInstallDetail = function(entity){
		require(['../tpl/report_installDetail.tpl'], function(fun) {
			console.info()
			$("#install_detail_aaa").html(fun(entity));
		});
	}
	
	
	/**
	 * 详情
	 */
	report.showSummary = function(summary){
		var personLiable = summary.personLiable;
		var startTime = summary.startTime
		var useTime = summary.useTime
		var result = summary.result
		if(startTime == null){
			startTime = "--";
		}
		if(result == 'SUCCESS'){
			result = "成功";
		}else{
			result = '失败';
		}
		if(startTime == "--"){
			result = "--";
		}
		var str = ' <p class="mgb-20">'+summary.remarks+'</p> '+
				  ' <p class="mgb-20">负责人：'+personLiable+'</p> '+
                  ' <p class="mgb-20">开始时间：'+startTime+'</p> '+
                  ' <p class="mgb-20">安装耗时：'+useTime+'</p> '+
                  ' <p class="mgb-20">结果：'+result+'</p> '	;
		$("#install_summary").html(str);
	}
	
	return report;
});