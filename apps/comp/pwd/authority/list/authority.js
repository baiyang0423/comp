define(['commonutil', 'ompage', 'pluspop'], function(ajaxUtil, page, pluspop) {
	var authority = {};
	var pageLimit = 10;
	var dialog ;
	
	/**
	 * 查询用户
	 */
	authority.search = function(currentPage,first){
		var param = {
					 "name":$("#userName").val(),
					 "account":$("#userAccount").val(),
				 	 "currentPage": currentPage
					}
		ajaxUtil.callrest(compWsg.password_authiorty_getuserlist, function(data) {
			require(['./list.tpl'], function(fun) {
				$("#tbody_index").html(fun(data.data));
				console.info(data.data);
				initTable();
				if (first) {					
					page.init('page_index',data.page,authority.search);		
				}
			});
		},param,true);	
	}
	
	/**
	 * 展示授权页
	 */
	authority.showAuthority = function(account){
		$("#span_userName").html("授权用户："+account);
		$("#account").val(account);
		authority.searchHost(1,true);
		authority.showDialog();
	}
	/**
	 * 查询已配权限主机
	 */
	authority.searchHost = function(currentPage,first){
		var param = {
					 "ip":$("#host_ip").val(),
					 "hostname":$("#host_user").val(),
					 "account":$("#account").val(),
				 	 "currentPage": currentPage,
				 	 "pageLimit" : pageLimit
					}
		ajaxUtil.callrest(compWsg.password_authiorty_getHostList, function(data) {
			console.info(data.data);
			require(['../add/add.tpl'], function(fun) {
				$("#tbody_add").html(fun(data.data));
				console.info(data);
				initTable();
				if (first) {					
					page.init('page_add',data.page,authority.searchHost);		
				}
			});
		},param,true);	
	}
	
	/**
	 * 展示弹窗
	 */
	authority.showDialog = function(){
		dialog = $("#showAuthority").ui_dialog({
			title: "已赋权主机列表",
			width: 1100,
			height: 550,
		}).showModal();
	}
	return authority;
});