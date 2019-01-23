define(['commonutil', 'ompage', 'pluspop',
		'/apps/comp/pwd/authority/list/authority.js'], function(ajaxUtil, page, pluspop,list) {
	var add = {};
	
	/**
	 * 添加主机
	 */
	add.showHost = function(){
		require(["/apps/comp/model/passwd/host/check/main.js"],function(host){
			host.open(function(data){
				console.log("响应事件",data);
				//保存
				var param = {
					account : $("#account").val(),
					data :data
				}
				ajaxUtil.postrest(compWsg.password_authiorty_saveAuthority, function(data) {
					list.searchHost(1,true);
				},param,true);
			});
		});
	}
	/**
	 * 删除主机
	 */
	add.deleteHost = function(){
		var ids = [];
		$("input[name='authorityId']:checked").each(function(i,ele){
			ids.push($(ele).val());
		})
		var param = {
			ids : ids
		}
		pluspop.confirm(pluspop.msg.confirm_delete,function(){
			ajaxUtil.postrest(compWsg.password_authiorty_deleteHost, function(data) {
				if(data.retCode == 0){
					pluspop.alert("操作成功");
					list.searchHost(1,true);
				}else{
					pluspop.alert(data.retMsg);
				}
			},param,true);
		})
	}
	return add;
});