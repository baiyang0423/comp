define(['commonutil', 'ompage', 'pluspop','./authority',
		'/apps/comp/pwd/authority/add/add_host.js'], function(ajaxUtil, page, pluspop,list,add) {
	
	var main = {};
	
	main.init = function(){
		//初始化加载
		list.search(1,true);
		//查询
		$("#btn_search_user").click(function(){
			list.search(1,true);
		});
		//为用户配置主机权限
		$("#btn_add").click(add.showHost);
		//删除用户主机权限
		$("#btn_del").click(add.deleteHost);
		//权限页面主机查询
		$("#btn_add_search").click(function(){
			list.searchHost(1,true)
		});
		//打开设置权限
		$('body').delegate('.set_authority', 'click', function() {
			var account = $(this).attr("value");
			list.showAuthority(account);
		});
		//全选后单选失效
		$("body").delegate(".js-checkbox input","click",function(event){
			$(this).parent(".js-checkbox").toggleClass("checked");
		});
	}
	
	return main;
});