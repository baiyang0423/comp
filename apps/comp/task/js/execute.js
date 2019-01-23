define(['commonutil','ompage','pluspop','/apps/comp/model/tip/index.js'],function(ajaxUtil,page,pluspop,tip){
	var obj = {}
	
	obj.closeTask = function(taskId){
		if($('input[name="id"]:checked').size() != 1){
			pluspop.alert("请选择一个任务");
			return false;
		}
		//验证权限
		var authority = obj.checkAuthority();
		if(!authority){
			pluspop.alert("权限不足，无法关闭");
			return false ;
		}
		
		if("CLOSE" === $('input[name="id"]:checked').attr("status")){
			tip.fail("出错","任务已经关闭，无法再次关闭");
			return false ;
		}
		var param = {
			"taskId":taskId
		}
		pluspop.confirm("确认关闭任务吗？",function(){
			tip.loading("关闭中请稍候...");
			ajaxUtil.postrest(compWsg.task_manager_close, function(data) {
				tip.close();
				if(data.retCode == 0){
					tip.success("操作成功");
					obj.refreshTask();
				}else{
					tip.fail("出错",data.retMsg);
				}
			},param,true);	
		})
	}
	
	
	 obj.executeDialog = function(id){
	 	
		$('#execute_input_task_id').val(id);
		//验证权限
		var authority =  obj.checkAuthority();
		if(!authority){
			pluspop.alert("权限不足，无法执行");
			return false ;
		}
		if("YES" === $('input[name="id"]:checked').attr("status")){
			pluspop.alert("任务已经开始，无法再次执行");
			return false ;
		}
		var param = {
			"id":id
		}
		var title = "";
		require(["../tpl/executeTask.tpl"],function(exec){
			tip.loading("执行前预览数据加载中...",400);
			ajaxUtil.callrest(compWsg.task_manager_searchOne, function(data) {
				tip.close();
				if(data.retCode == 0){
					title = '确定要执行'+data.data.entity.name+'任务吗?';
					var corn = data.data.entity.crontab.replace("*","每");
					var corns = corn.replace("*","每").split(" ");
					var result = corns[4]+"月"+corns[3]+"日"+corns[2]+"时"+corns[1]+"分"+corns[0]+"秒执行";
					result = result.replace("*","每");
					data.data.entity.crontab = result;
					$("#execute_tatsk").html(exec(data.data.entity));
					selfDialog = dialog({
			             id: 'execDialog_',
			             title: title,
			             content: $('#execute_tatsk')[0],
			             width: 1100,
			             height: 400,
			             okValue: '确定',
			             ok: obj.excute,
			             cancelValue: '关闭',
			             cancel: function() {}
			        }).showModal();
				}else{
					pluspop.alert(data.retMsg);
				}
			},param,true);	
		});
	}
	
	obj.excute = function(){
		var id = $('#execute_input_task_id').val();
		var param = {
			"id":id
		}
		tip.loading("启动中请稍候...",320);
		ajaxUtil.postrest(compWsg.task_manager_excute, function(data) {
			tip.close();
			if(data.retCode == 0){
				tip.success("启动成功");
				obj.refreshTask();
			}else{
				pluspop.alert(data.retMsg);
			}
		},param,true);	
	}
	
	
	
	
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
					pluspop.alert("权限查询失败");
				}
			},param,false);
			if(!authority){
				return false;
			}
		})
		return authority;
	}
	
	 obj.refreshTask = function(){
		require(['/apps/comp/task/index.js'], function(task) {
			task.refreshTask();
		});
	}
	
	
	
	
	
	return obj;
	
	
})