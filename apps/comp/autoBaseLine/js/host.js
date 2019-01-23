define(['commonutil', 'ompage', 'pluspop'], function(ajaxUtil, page, pluspop) {
	var pageLimit = 10 ;
	var obj = {}
	var selfDialog_host ;
	//主调函数
	obj.hostHandler = function(){
		obj.hostDialog();
	}
	
	function init(){
		$("#btn_host_list_selected").click(obj.selectedHostList);
		$("#btn_host_list_cancel").click(obj.cancelHostLsit);
		$("#btn_host_list_search").click(obj.search);
		
	}
	obj.search = function(){
		obj.searchWithPage(1,true);
	}
	//弹窗
	obj.hostDialog = function(){
		obj.searchWithPage(1,true);
		selfDialog_host = $("#select_host_list_html").ui_dialog({
			title: '选择主机',
			width: 1100,
			height: 550,
		}).showModal();
		
	}
	//分页查询
	obj.searchWithPage = function(currentPage,first){
		var param = {"ip":$("#host_list_ip").val(),
//					 "osType":$("#host_list_osType").val(),
					 "osType":"",
				 	 "currentPage": currentPage,
					 "pageLimit" : pageLimit
					}
		console.info(param);
		ajaxUtil.callrest(compWsg.auto_baseLine_resource_searchWithPage, function(data) {
			require(['../tpl/host_list.tpl'], function(fun) {
				$("#tbody_select_host_list").html(fun(data.data));
				console.info(data.data);
				initTable();
				if (first) {					
					page.init('page_select_host_list',data.page,obj.searchWithPage);		
				}
			});
		},param,true);	
	}
	
	obj.saveHostList = function(){
		var taskId = $("#taskId").val();
		var ids = [];
		$('input[name="pwdId"]:checked').each(function(i, ele) {
			var hostId = $(ele).val();
			ids.push(hostId);
		});
		var param = {
			"ids": ids.toString(),
			"taskId": taskId
		};
		console.info(param)
		ajaxUtil.callrest(compWsg.auto_baseLine_resource_savePreviewResource, function(data) {
			obj.searchByTaskId();
		}, param ,false);
		selfDialog_host.remove();
	}
	/*
	 * 选中主机
	 */
	obj.selectedHostList = function(){
		var size = $('input[name="pwdId"]:checked').size();
		$('input[name="pwdId"]:checked').each(function(i, ele) {
			var tr = $(ele).closest("tr");
			var pwdId = $(ele).val();
			var ip = tr.children("td").eq(1).text();
			var userName = tr.children("td").eq(2).text();
			var isEff = tr.children("td").eq(4).html();
			var str = '<tr>		'+					 	
					'		<td class="none"> '+
					'			<label class="js-checkbox replace-checkbox">		'+
					'	            <input type="checkbox" name="configure_pwdId" value="'+pwdId+'">		'+
					'	            <span></span>		'+
					'	        </label>		'+
					'		</td>		'+
					'		<td>'+ip+'</td>		'+
					'		<td>'+userName+'</td>		'+
					'	    <td>'+isEff+'</td>		'+
					'	    <td><input type="text" class="bd-1 lh-30 tc" style="width: 50%;"></td>		'+
					'		<td><input type="text" class="bd-1 lh-30 tc" style="width: 50%;"></td>		'+
					'		<td>		'+
					'			<a href="#none" class="h-underline operate del host_delete" pwdId="'+pwdId+'">删除</a>		'+
					'			<input type="hidden" name="'+pwdId+'" />		'+
					'		</td>		'+
					'	</tr>';
			$("#tbody_base_confiure_1").append(str);
			obj.getHostCount();
			selfDialog_host.remove();
		});
	};
	
	obj.getHostCount = function(){
		var size = $("#base_houst_host_list_table>tbody").children("tr").length-1
		$("#host_count_show").html("当前配置主机数量："+size +"台");
	}
	
	
	obj.searchByTaskId = function(){
		var param = {
			"taskId":$("#taskId").val()
		}
		ajaxUtil.callrest(compWsg.auto_baseLine_resource_searchByTaskId, function(data) {
			console.info(data);
			require(['../tpl/configure_host.tpl'], function(fun) {
				$("#tbody_base_confiure_1").html(fun(data.data));
				obj.getHostCount();
			});
		},param,false);	
	}
	
	obj.cancelHostLsit =function(){
		selfDialog_host.remove();
	}
	
	obj.deleteAll = function(pwdId){
		var param ;
		if(pwdId == null || pwdId == ''){
			param = {
				"taskId": $("#taskId").val()
			};
		}else{
			param = {
				"taskId": $("#taskId").val(),
				"pwdId":pwdId
			};
		}
		console.info(param)
		ajaxUtil.postrest(compWsg.auto_baseLine_resource_deleteByTaskId, function(data) {
			obj.searchByTaskId();
		}, param ,false);
	};
	
	
	
	
	
	init();
	return obj;
});