define(['commonutil','ompage','pluspop','/apps/comp/model/tip/index.js'],function(ajaxUtil,page,pluspop,tip){
	//执行任务js调用刷新页面
	var obj = {};
	obj.pageLimit = 10 ;
	
	obj.init = function(){
		obj.searchTask();
		$("#btn-search").click(obj.searchTask);
		//增加任务弹窗
		$("#btn-insert").click(obj.addDialog);
		//查询脚本
//		$("#btn-script-search").click(obj.searchScript);
		//选择脚本弹窗
		$("#select_script_list").click(obj.showScriptDialog);
		//选择主机
		$("#select_host_list").click(obj.selectHost);
		//删除任务
		$("#btn-del").click(obj.deleteTask);
		//修改
		$("#btn-edit").click(obj.editDialog);
		//执行弹窗
		$("#btn-excute").click(obj.executeDialog);
		//查看日志
		$("#btn-look").click(obj.lookDialog);
		//查看日志
		$("#btn-close").click(obj.closeDialog);
		//手动执行
		$("#btn-excute-hand").click(obj.handExec);
		//设置权限
		$('body').delegate('.log_set_authority','click', function() {
			obj.showAuthorityDialog($(this).attr("value"));
		});	
		
		$("body").delegate("a[name='rm-select-host']","click",function(){
			$("#select-" + $(this).attr("data-id")).empty();
			$("#select-" + $(this).attr("data-id")).remove();
		});
		
	}
	obj.handExec = function(){
		var tasks = $('input[name="id"]:checked');
		if(tasks.length == 0){
			pluspop.warn("请选择执行任务");
		}else if(tasks.length > 1){
			pluspop.warn("只能请选择一条执行任务");
		}else{
			tip.loading("任务执行中....");
			ajaxUtil.callrest(compWsg.task_manager_hand_exec,function(data){
				tip.close();
				if(data.retCode == "0"){
					pluspop.alert("执行成功!");
				}else{
					pluspop.alert(data.retMsg);
				}
			},{id:tasks.val()},true);
		}
	}
	
	 obj.searchTask = function(){
		obj.searchTaskForPage(1,true);
		obj.initTemplateDateFormat();
	}
	/**
	 * 分页查询 -- 任务展示
	 * @param {Object} currentPage
	 * @param {Object} first
	 */
	 obj.searchTaskForPage = function(currentPage,first){
		var name = $("#searchTaskName").val();
		var param = {"name":name,
				 	 "currentPage": currentPage,
					 "pageLimit" : obj.pageLimit
					}
		tip.loading("任务加载中....");
		ajaxUtil.callrest(compWsg.task_manager_searchWithPage, function(data) {
			tip.close();
			require(['./tpl/list.tpl'], function(fun) {
				$("#mainbody").html(fun(data.data));
				initTable();
				if (first) {					
					page.init('mainPage',data.page,obj.searchTaskForPage);		
				}
			});
		},param,true);	
		
	}
	
	obj.addDialog = function(){
		obj.clearSelect();
		obj.clearAddHtml();
		obj.initSelect();
		selfDialog = dialog({
			id: 'appDialog_',
			title: '新增任务',
			content: $('#task_add')[0],
			width: 900,
			height: 370,
			okValue: '保存',
			ok: obj.save,
			cancelValue: '关闭',
			cancel: function() {}
    	}).showModal();
	}
	//初始化新增页面
	 obj.clearAddHtml = function(){
		$("#add_input_task_id").val("");
		$("#add-input-task_name").val("");
		$("#add-input-corn").val("");
		$("#add-input-corn_result").val("");
		$("#add-input-sprict_id").val("");
		$("#add-input-sprict_name").val("");
		$("#task_host_list").html("");
	}
	
	//选择脚本弹窗
	 obj.showScriptDialog = function(){
		require(["/apps/comp/model/script/radio/main.js"],function(script){
			script.open(function(data){
				$("#add-input-sprict_id").val(data.id);
				$("#add-input-sprict_name").val(data.name);
				if(data.type.indexOf('CMD') == 0){//指令
					$("#script-type").val("SHELL");
				}else if(data.type.indexOf('SQL') == 0){//sql
					$("#script-type").val("SQL");
				}
				$("#selectHostBody").empty();
			});
		});
	}
	
	obj.selectHost = function(){
		
		if($("#add-input-sprict_id").val() == ''){
			tip.fail("请先选择执行脚本");
			return false;
		}
		
		if( $("#script-type").val() == 'SHELL' ){
			require(["/apps/comp/model/passwd/host/check/main.js","./tpl/selectHost.tpl"],function(host,mode){
				host.open(function(data){
					$("#selectHostBody").append(mode(data));
				});
			});
		}else if( $("#script-type").val() == 'SQL' ){
			require(["/apps/comp/model/passwd/db/check/main.js"
				,"./tpl/selectHost.tpl"],function(db,mode){
				db.open(function(data){
					console.log(data);
					$("#selectHostBody").append(mode(data));
				});
			});
		}
	}

	//删除已选主机
	 obj.deleteHtml = function(event){
		var div = event.currentTarget.parentElement.parentElement;
		div.remove();
	}
	
	obj.save = function(){
		
		if($("#add-input-task_name").val() == ''){
			pluspop.alert("请输入任务名称");
			return false ;
		}
		if($("#add-input-sprict_id").val() == ''){
			pluspop.alert("请选择脚本");
			return false ;
		}
		if($("input[name='pwdId'").size() <= 0){
			pluspop.alert("请选择主机");
			return false ;
		}
		
		var value = false ;
		//验证corn表达式是否正确
		obj.createCorn();
	}
	
	obj.deleteTask = function(){
		var result = true ;
		$('input[name="id"]:checked').each(function(index ,val){
			var status = $(this).attr("status");
			if("YES" === status){
				pluspop.alert("已生效任务不能删除");
				result = false;
			}
		});
		if(!result){
			return false ;
		}
		if($('input[name="id"]:checked').size() <= 0){
			pluspop.alert("请选择任务");
			return false;
		}
		//验证权限
		var authority = obj.checkAuthority();
		if(!authority){
			pluspop.alert("包含权限不足的任务，删除失败");
			return false ;
		}
		var ids = new Array();
		$('input[name="id"]:checked').each(function(index ,val){
			ids[ids.length] = $(val).val();
		});
		var param = {
			"ids":ids.toString()
		}
		pluspop.confirm(pluspop.msg.confirm_delete,function(){
			ajaxUtil.postrest(compWsg.task_manager_delete, function(data) {
				if(data.retCode == "0") {
					tip.success("删除成功","",function(){
						obj.searchTask();
					});
				}else{
					tip.fail("删除失败");
				}
			},param,true);
		});
	}
	/**
	 * 验证权限
	 */
	obj.checkAuthority = function(){
		var authority = false ;
		$('input[name="id"]:checked').each(function(index ,val){ 
			var createUser = $(this).attr("createUser");
			var param = {
				"createUser":createUser
			}
			ajaxUtil.callrest(compWsg.task_manager_checkAuthority, function(data) {
				if(data.retCode == "0") {
					authority = data.data.entity;
				}else{
					tip.close();
					pluspop.alert("权限查询失败");
				}
			},param,false);
			if(!authority){
				return false;
			}
		})
		return authority;
	}
	
	 obj.editDialog = function(){
	 	tip.loading("加载要修改的任务信息,请稍候",450);
		var temp = obj.checkAuth();
		if(temp.flag){
			//验证权限
			var authority = obj.checkAuthority();
			if(!authority){
				tip.close();
				tip.fail("权限不足，无法修改");
				return false ;
			}
			if("YES" === $('input[name="id"]:checked').attr("status")){
				tip.close();
				tip.fail("任务正在执行，无法修改");
				return false;
			}
			obj.searchOne();
		}else{
			tip.close();
		}
	}
	/**
	 * 根据主键单条查询
	 */
	obj.searchOne = function(){
		var id = $('input[name="id"]:checked').val();
		var param = {
			"id":id
		}
		ajaxUtil.callrest(compWsg.task_manager_searchOne, function(data) {
			tip.close();
			if(data.retCode == 0){
				obj.showEditHtml(data.data.entity);
				dialog({
		             id: 'editDialog_',
		             title: '修改任务',
		             content: $('#task_add')[0],
		             width: 900,
		             height: 550,
		             okValue: '保存',
		             ok: obj.save,
		             cancelValue: '关闭',
		             cancel: function() {}
		         }).showModal();
			}else{
				pluspop.alert(data.retMsg);
			}
		},param,true);	
		
	}
	/**
	 * 修改页面展示选定主机
	 * @param {Object} entity
	 */
	obj.showEditHtml = function(entity){
		obj.clearSelect();
		$("#add_input_task_id").val(entity.id);
		$("#add-input-task_name").val(entity.name);
		$("#add-input-sprict_id").val(entity.scriptId);
		$("#add-input-sprict_name").val(entity.scriptName);
		$("#script-type").val(entity.scriptType);
		var hosts = new Array();
		$.each(entity.hosts, function(index,val,arr) {
			hosts[hosts.length] = {
				id : val.pwdId,
				ip : val.ip,
				username : val.username
			}
		});
		require(["./tpl/selectHost.tpl"],function(mode){
			$("#selectHostBody").html(mode(hosts));
		});
		var corns = entity.crontab.split(" ");
		var second = corns[0];
		var minute = corns[1];
		var hours = corns[2];
		var day = corns[3];
		var month = corns[4];
		var year = corns[5];
		//回显执行策略 ，下拉框添加selected属性
		obj.initSelect(year,month,day,hours,minute,second);
	}
	
	
	//-------------------------------------------执行 -------------------------------------------
	obj.executeDialog = function(){
		var temp = obj.checkAuth();
		if(temp.flag){
			require(['/apps/comp/task/js/execute.js'], function(execute) {
				execute.executeDialog(temp.id);
			});
		}
	}
	obj.checkAuth = function(){
		var tasks = $('input[name="id"]:checked');
		if(tasks.length == 0 ){
			tip.fail("错误","请选择一个任务");
			return {flag:false};
		}else if(tasks.length > 1 ){
			tip.fail("出错","只能选择一个任务进行执行");
			return {flag:false};
		}else{
			return {flag:true,id:tasks.val()};
		}
	}
	//---------------------------------------- 关闭任务 ------------------------------------------
	obj.closeDialog = function(){
		var temp = obj.checkAuth();
		if(temp.flag){
			require(['/apps/comp/task/js/execute.js'], function(execute) {
				execute.closeTask(temp.id);
			});
		}
	}
	//-------------------------------------------- 设置权限 -------------------------------------
	obj.showAuthorityDialog = function(taskid){
		require(['/apps/comp/task/js/lookLog.js'], function(log) {
			log.showAuthorityDialog(taskid);
		});
	}
	//--------------------------------------- 查看日志 -----------------------------------------
	obj.lookDialog = function(){
		var temp = obj.checkAuth();
		if(temp.flag){
			require(['/apps/comp/task/js/lookLog.js'], function(log) {
				log.lookDialog(temp.id);
			});
		}
	}
	
	//拼接corn 并验证
	obj.createCorn = function(){
		var year = $("#select_year").val();
		var month = $("#select_month").val();
		var day = $("#select_day").val();
		var hours = $("#select_hours").val();
		var minute = $("#select_minute").val();
		var second = $("#select_second").val();
		var corn = second+" "+minute+" "+hours+" "+day+" "+month+" ? "+year
		//验证corn
		var param = {"corn":corn};
		tip.loading("验证corn表达式是否正确..");
		ajaxUtil.callrest(compWsg.task_manager_checkCorn, function(data) {
			tip.close();
			if(data.data.entity){
				$("#add-input-corn").val(corn);
				if(!data.data.entity){
					tip.fail("执行策略不正确");
					return false ;
				}
				var ids = new Array();
				$.each($("input[name='pwdId'"),function(index,val){
					ids[ids.length] = $(val).val();
				})
				var param = {
					"name" : $("#add-input-task_name").val(),
					"scriptId" : $("#add-input-sprict_id").val(),
					"corn" : $("#add-input-corn").val(),
					"pwdId" : ids.toString()
				}
				if($("#add_input_task_id").val() != ""){
					param.id = $("#add_input_task_id").val();
				}
				tip.loading("正在保存请稍候..");
				ajaxUtil.postrest(compWsg.task_manager_save, function(data) {
					tip.close();
					if(data.retCode == "0") {
						tip.success("操作成功");
						obj.searchTask();
					}else{
						tip.fail(data.retMsg);
					}
				},param,true);	
			}
		},param,true);	
	}
	/**
	 * 初始化下拉框
	 * @param {Object} year_
	 * @param {Object} month_
	 * @param {Object} day_
	 * @param {Object} hours_
	 * @param {Object} minute_
	 * @param {Object} second_
	 */
	obj.initSelect = function(year_,month_,day_,hours_,minute_,second_){
		//初始化年份
		for (var year = 2018 ; year <= 2029 ;year++) {
			if(year_ ==  year ){
				$("#select_year").append('<option selected value="'+year+'">'+year+'年</option>');
			}else{
				$("#select_year").append('<option value="'+year+'">'+year+'年</option>');
			}
		}
		//初始化月份
		for (var month = 1 ; month <= 12 ;month++) {
			var month_str ;
			if(month < 10){
				month_str = "0"+month;
			}else{
				month_str = month;
			}
			if(month_ == month_str){
				$("#select_month").append('<option selected value="'+month_str+'">'+month_str+'月</option>');
			}else{
				$("#select_month").append('<option value="'+month_str+'">'+month_str+'月</option>');
			}
		}
		//初始化天
		for (var day = 1 ; day <= 31 ;day++) {
			var day_str ;
			if(day < 10){
				day_str = "0"+day;
			}else{
				day_str = day;
			}
			if(day_ == day_str){
				$("#select_day").append('<option selected value="'+day_str+'">'+day_str+'日</option>');
			}else{
				$("#select_day").append('<option value="'+day_str+'">'+day_str+'日</option>');
			}
		}
		//初始化时
		for (var hours = 0 ; hours <= 23 ;hours++) {
			var hours_str ;
			if(hours < 10){
				hours_str = "0"+hours;
			}else{
				hours_str = hours;
			}
			if(hours_ == hours_str){
				$("#select_hours").append('<option selected value="'+hours_str+'">'+hours_str+'时</option>');
			}else{
				$("#select_hours").append('<option value="'+hours_str+'">'+hours_str+'时</option>');
			}
		}
		//初始化分
		for (var minute = 0 ; minute <= 59 ;minute++) {
			var minute_str ;
			if(minute < 10){
				minute_str = "0"+minute;
			}else{
				minute_str = minute;
			}
			if(minute_ == minute_str){
				$("#select_minute").append('<option selected value="'+minute_str+'">'+minute_str+'分</option>');
			}else{
				//默认选择00分，如果默认为* ，在解析corn时会报错
				if(minute_str == "00"){
					$("#select_minute").append('<option selected value="'+minute_str+'">'+minute_str+'分</option>');
				}else{
					$("#select_minute").append('<option value="'+minute_str+'">'+minute_str+'分</option>');
				}
			}
		}
		//初始化秒
		for (var second = 0 ; second <= 59 ;second++) {
			var second_str ;
			if(second < 10){
				second_str = "0"+second;
			}else{
				second_str = second;
			}
			if(second_ == second_str){
				$("#select_second").append('<option selected value="'+second_str+'">'+second_str+'秒</option>');
			}else{
				if(second_str == "00"){
					$("#select_second").append('<option selected value="'+second_str+'">'+second_str+'秒</option>');
				}else{
					$("#select_second").append('<option value="'+second_str+'">'+second_str+'秒</option>');
				}
			}
		}
	}
	
	obj.clearSelect = function(){
		$("#select_year").html('<option value="*">任意年</option>');
		$("#select_month").html('<option value="*">任意月</option>');
		$("#select_day").html('<option value="*">任意日</option>');
		$("#select_hours").html('<option value="*">任意时</option>');
		$("#select_minute").html('<option value="*">任意分</option>');
		$("#select_second").html('<option value="*">任意秒</option>');
	}
	
	/*
	 * 修改时间戳为普通时间格式
	 */
	obj.initTemplateDateFormat = function() {
		require(['template'], function(template) {
			//artTemplate 时间格式化
			template.helper('dateFormat', function(date, format) {
				date = new Date(date);
				var map = {
					"M": date.getMonth() + 1, //月份
					"d": date.getDate(), //日
					"h": date.getHours(), //小时
					"m": date.getMinutes(), //分
					"s": date.getSeconds(), //秒
					"q": Math.floor((date.getMonth() + 3) / 3), //季度
					"S": date.getMilliseconds() //毫秒
				};

				format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
					var v = map[t];
					if (v !== undefined) {
						if (all.length > 1) {
							v = '0' + v;
							v = v.substr(v.length - 2);
						}
						return v;
					} else if (t === 'y') {
						return (date.getFullYear() + '').substr(4 - all.length);
					}
					return all;
				});
				return format;
			});
		});
	}
	
	
	obj.refreshTask = function (){
		obj.searchTask();
	}
	return obj;	
})