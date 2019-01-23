define(['commonutil','ompage','pluspop','/apps/comp/model/tip/index.js'],function(ajaxUtil,page,pluspop,tip){
	var obj = {};
	
	obj.lookDialog = function(taskId){
		var param = {
			"taskId":taskId
		}
		tip.loading("正在加载执行日志请稍候...",400);
		ajaxUtil.callrest(compWsg.task_manager_searchLogByTaskId, function(data) {
			tip.close();
			if(data.retCode == 0){
				require(["../tpl/logLook.tpl"],function(log){
					selfDialog = dialog({
			             id: 'lookDialog_',
			             title: '查看执行日志',
			             content: log(data.data.entity),
			             width: 1000,
			             height: 400,
			             cancelValue: '关闭',
			             cancel: function() {}
			        }).showModal();
			        //下拉菜单类型
					$(".td-princ span").click(function(){
						if($(this).html() != "∨"){
							$(this).html("∨");
						}else{
							$(this).html(">");
						}
						$(this).parent("td").parent("tr").next(".princ-hide").stop().toggle(300);
					})
				});
				
			}else{
				tip.fail("出错",data.retMsg);
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
	
	obj.showAuthorityDialog = function(taskid){
		$("#authority_form")[0].reset();
		$("#set_log_authority_task_id").val(taskid);
		$("#btn-log-authority").click(function(){
			obj.searchUser(1,true);
		});
		obj.searchUser(1,true);
		selfDialog = dialog({
             id: 'showAuthorityDialog_',
             title: '设置查看权限',
             content: $('#log_authority')[0],
             width: 1100,
             height: 450,
             okValue: '确定',
             ok: obj.saveAuthority,
             cancelValue: '关闭',
             cancel: function() {}
         }).showModal();
	}
	
	obj.searchUser = function(currentPage,first){
		var param = {
			"taskId": $("#set_log_authority_task_id").val(),
			"name":$("#search_log_user_name").val(),
			"account":$("#search_log_user_account").val(),
		 	"currentPage": currentPage,
			"pageLimit" : 10
		}
		ajaxUtil.callrest(compWsg.task_manager_searchUser, function(data) {
			require(['../tpl/selectUser.tpl'], function(fun) {
				$("#log_authority_tbody").html(fun(data.data));
				initTable();
				if (first) {					
					page.init('log_authority_page',data.page,obj.searchUser);		
				}
				$(".removeAuth").on("click",function(){
					var account = $(this).attr("userId");
					ajaxUtil.postrest(compWsg.task_manager_removeAuthrity,function(data){
						if(data.retCode == '0'){
							tip.success("成功移除" + account + "授权");
							obj.searchUser(1,true);
						}else{
							tip.fail("移除权限失败");
						}
					},{
					"taskId":$("#set_log_authority_task_id").val(),
					"userId":account},true);
				});
			});
		},param,true);	
	}
	
	obj.saveAuthority = function(){
		if($('input[name="userId"]:checked').size() <= 0){
			tip.fail("请选择用户");
			return false;
		}
		var result = false;
		var taskId = $("#set_log_authority_task_id").val();
		var userIds = '';
		$('input[name="userId"]:checked').each(function(index,val){
			var isAuthority = $(this).attr("isAuthority");
			if(isAuthority === "1"){
				result = true ;
				return false ;
			}
			var userId = $(this).attr("userId");
			if(index == 0){
				userIds = userId ;
			}else{
				userIds = userIds +","+ userId;
			}
		});
		if(result){
			tip.fail("出错","已赋权用户无法再次赋权");
			return false ;
		}
		var param = {
			"taskId":taskId,
			"userIds":userIds
		}
		tip.loading("正在给用户赋权,请稍候...",400);
		ajaxUtil.postrest(compWsg.task_manager_saveAuthority, function(data) {
			tip.close();
			if(data.retCode == "0") {
				tip.success("权限设置成功");
			}else{
				tip.fail("权限设置失败","",function(){
					obj.showAuthorityDialog($("#set_log_authority_task_id").val())
				});
			}
		},param,true);	
	}
	return obj;
})