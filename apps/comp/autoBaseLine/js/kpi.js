define(['commonutil', 'ompage', 'pluspop'], function(ajaxUtil, page, pluspop) {
	var pageLimit = 10 ;
	var obj = {}
	var selfDialog_kpi ;
	//主调函数
	obj.kpiHandler = function(){
		obj.clearSelected();
		obj.unSelectedKpi();
		obj.selectedKpi();
		obj.searchSetMeal();
	}
	
	function init(){
		/**
		 * 绑定css事件
		 */
		$('body').delegate('.choice-1 li','click',function() {
        	$('.choice-1 li').find('span').removeClass('choice');
        	$(this).find('span').addClass('choice');
		});
		$('body').delegate('.choice-2 li','click',function() {
        	$('.choice-2 li').find('span').removeClass('choice');
        	$(this).find('span').addClass('choice');
		});
		/**
		 * 移除
		 */
		$('body').delegate('.remove-choice','click',function() {
			var li = $('.choice-2 li').find('.choice').parent('li');
			$(".unselected").prepend(li);
			$('.unselected li').find('span').removeClass('choice');
		});
		/**
		 * 移除所有
		 */
		$('body').delegate('.remove-all','click',function() {
        	var lis = $('.selected').children('li').remove();
        	obj.selectAllKpi();
		});
		/**
		 * 添加
		 */
		$('body').delegate('.add-choice','click',function() {
        	var li = $('.unselected li').find('.choice').parent();
			$(".selected").prepend(li);
			$('.selected li').find('span').removeClass('choice');
		});
		/**
		 * 添加所有
		 */
		$('body').delegate('.add-choice-all','click',function() {
        	var li = $('.unselected').find('li');
			$(".selected").prepend(li);
			$('.selected li').find('span').removeClass('choice');
		});
		/**
		 * 添加方案
		 */
		$('body').delegate('#configure_setMeal_add','click',function() {
        	obj.addSetMeal();
		});
		
	}
	/**
	 * 未选KPI
	 */
	obj.unSelectedKpi = function(){
		$(".unselected").html("");
		var taskId = $("#configure_taskId_2").val();
		var param = {
			"taskId": taskId
		}
		ajaxUtil.callrest(compWsg.auto_baseLine_kpi_unSelectedKpiLibrary, function(data) {
			var str = "";
			if(data.retCode == 0){
				var kpi = data.data.entity;
				kpi.forEach(function(val,i,attr){
					str += '<li><span value='+val.id+'>'+val.name+'</span></li>';
				});
			}
			$(".unselected").append(str);
		},param,true);
	}
	/**
	 * 已选KPI
	 */
	obj.selectedKpi = function(){
		var taskId = $("#configure_taskId_2").val();
		var param = {
			"taskId": taskId
		}
		ajaxUtil.callrest(compWsg.auto_baseLine_kpi_selectedKpiLibrary, function(data) {
			var str = "";
			if(data.retCode == 0){
				var kpi = data.data.entity;
				if(kpi != null){
					kpi.forEach(function(val,i,attr){
						str += '<li><span value='+val.id+'>'+val.name+'</span></li>';
					});
				}
			}
			$(".selected").append(str);
		},param,true);
	}
	/**
	 * 查询全部Kpi
	 */
	obj.selectAllKpi = function(){
		$(".unselected").html("");
		var taskId = $("#configure_taskId_2").val();
		var param = {
			"taskId": taskId
		}
		ajaxUtil.callrest(compWsg.auto_baseLine_kpi_selectAllKpiLibrary, function(data) {
			var str = "";
			if(data.retCode == 0){
				var kpi = data.data.entity;
				kpi.forEach(function(val,i,attr){
					str += '<li><span value='+val.id+'>'+val.name+'</span></li>';
				});
			}
			$(".unselected").append(str);
		},param,true);
	};
	/**
	 *	查询方案
	 */
	obj.searchSetMeal = function(){
		ajaxUtil.callrest(compWsg.auto_baseLine_kpi_searchKpiSetMeal, function(data) {
			var str = "";
			if(data.retCode == 0){
				var kpi = data.data.entity;
				if(kpi != null){
					kpi.forEach(function(val,i,attr){
						str += '<li><span value='+val.id+'>'+val.name+'</span></li>';
					});
				}
			}
			$(".select-set-meal").append(str);
		},"",true);
	}
	
	obj.addSetMeal = function(){
		var mealId = $('.select-set-meal li').find('.choice').attr("value");
		if(mealId == null || mealId == ''){
			pluspop.alert("请选择方案");
		}
		var param = {
			"mealId":mealId
		}
		ajaxUtil.callrest(compWsg.auto_baseLine_kpi_searchKpiSetMealDetail, function(data) {
			var str = "";
			if(data.retCode == 0){
				var kpi = data.data.entity;
				if(kpi != null){
					kpi.forEach(function(val,i,attr){
						str += '<li><span value='+val.id+'>'+val.name+'</span></li>';
					});
				}
			}
			$(".selected").prepend(str);
		},param,true);
	}
	
	/**
	 * 初始化页面，清除数据缓存
	 */
	obj.clearSelected = function(){
		$(".selected").html("");
		$(".unselected").html("");
		$(".select-set-meal").html("");
	}
	

	init();
	return obj;
});