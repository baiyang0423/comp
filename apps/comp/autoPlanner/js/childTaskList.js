define(['commonutil', 'ompage', 'pluspop'], function(ajaxUtil, page, pluspop) {
	var childList = {};
	var pageLimit = 5;
	var base_dialog;
	var myStorage = sessionStorage;
	 //保存时传的后端的数据
	childList.childData = [];
	
	function init(){
		$('body').delegate('#btn_base_line_add', 'click', function() {
			childList.selectedBaseLine();
		});
		$('body').delegate('#btn_search_task', 'click', function() {
			childList.searchBaseLineWhitePage(1,true);
		});
		$('body').delegate('.host_delete', 'click', function() {
			$(this).parent("td").parent("tr").remove();
		});
		/**
		 * 保存选中的原子任务
		 */
		$('body').delegate('#base_line_save', 'click', function() {
			childList.saveAtomicTask();
		});
	}
	
	
	childList.showBaseLineList = function (){
		childList.showBaseLine();
	}
	/**
	 * 基线加固弹窗
	 */
	childList.showBaseLine =function (){
		$("#tbody_base_line_2").html("");
		childList.searchBaseLineWhitePage(1,true);
		childList.searchBaseLine();
		base_dialog = $("#showBaseList").ui_dialog({
			width: 1100,
			height: 550,
		}).showModal();
	}
	/**
	 * 极限加固分页查询
	 * @param {Object} currentPage
	 * @param {Object} first
	 */
	childList.searchBaseLineWhitePage = function(currentPage ,first){
		var param = {"remarks":$("#base_line_remarks").val(),
				 	 "currentPage": currentPage,
					 "pageLimit" : pageLimit
					}
		ajaxUtil.callrest(compWsg.auto_planner_step_searchBaseLineWithPage, function(data) {
			require(['../tpl/base_list.tpl'], function(fun) {
				$("#tbody_base_line").html(fun(data.data));
				initTable();
				if (first) {					
					page.init('page_base_line',data.page,childList.searchBaseLineWhitePage);		
				}
			});
		},param,true);	
	}
	/**
	 * 基线加固查询，不分页
	 */
	childList.searchBaseLine = function(){
		var stepId = $("#small_stepId").val();;
		var taskId = $("#planner_configure_id").val();
		var param = {
			"taskId":taskId,
			"stepId":stepId
		}
		var atomicTask = [];
		childList.childData.forEach(function(attr,index){
			if(attr.stepId == stepId ){
				atomicTask = attr.atomicTask;
			}
		});
		var data = {"entity":atomicTask};
		require(['../tpl/base_list_2.tpl'], function(fun) {
			$("#tbody_base_line_2").html(fun(data));
		});
	}
	/**
	 * 基线加固选定
	 */
	childList.selectedBaseLine = function(){
		$("input[name='baseId']:checked").each(function(index,ele){
			var tr = $(ele).closest("tr");
			var baseId= $(ele).val();
			var title =  tr.children("td").eq(1).text();
			var remarks =  tr.children("td").eq(2).text();
			var hostTotalCount =  tr.children("td").eq(3).text();
			var hostSuccessCount =  tr.children("td").eq(4).text();
			var hostFailCount =  tr.children("td").eq(5).text();
			var execStatus =  tr.children("td").eq(6).html();
			/*var auditUser =  tr.children("td").eq(7).text();
			var auditStatus =  tr.children("td").eq(8).text();*/
			var createUser =  tr.children("td").eq(7).text();
			var str = '<tr>		'+					 	
					'		<td class="none"> '+
					'			<label class="js-checkbox replace-checkbox">		'+
					'	            <input type="checkbox" name="atomicTask" value="'+baseId+'">		'+
					'	            <span></span>		'+
					'	        </label>		'+
					'		</td>		'+
					'		<td>'+title+'</td>		'+
					'		<td>'+remarks+'</td>		'+
					'	    <td>'+hostTotalCount+'</td>		'+
					'	    <td>'+hostSuccessCount+'</td>		'+
					'	    <td>'+hostFailCount+'</td>		'+
					'	    <td>'+execStatus+'</td>		'+
					/*'	    <td>'+auditUser+'</td>		'+
					'	    <td>'+auditStatus+'</td>		'+*/
					'	    <td>'+createUser+'</td>		'+
					'		<td><a href="#none" class="h-underline operate del host_delete">删除</a></td>		'+
					'	</tr>';
			$("#tbody_base_line_2").prepend(str);
			
		});
	}
	
	
	/**
	 * 保存选中的原子任务
	 */
	childList.saveAtomicTask = function(){
		var stepId = $("#small_stepId").val();
		var taskId = $("#planner_configure_id").val();
		var atomicTask = [];
		$("input[name='atomicTask']").each(function(index ,ele){
			var data = {
				"id":$(ele).val(),
				"title":$(ele).closest("tr").children("td").eq(1).text(),
				"remarks":$(ele).closest("tr").children("td").eq(2).text(),
				"hostTotalCount":$(ele).closest("tr").children("td").eq(3).text(),
				"hostSuccessCount":$(ele).closest("tr").children("td").eq(4).text(),
				"hostFailCount":$(ele).closest("tr").children("td").eq(5).text(),
				"execStatus":$(ele).closest("tr").children("td").eq(6).text(),
				"createUser":$(ele).closest("tr").children("td").eq(7).text(),
			}
			atomicTask.push(data);
		});
		if(atomicTask.length <= 0){
			pluspop.alert("未选择原子任务")
			return false;
		}
		//如果步骤配置过原子任务，则重新配置
		if(childList.childData.length > 0){
			childList.childData.forEach(function(attr ,index){
				if(attr.stepId == stepId){
					childList.childData.splice(index,1);
				}
			});
		}
		var param = {
			"taskId":taskId,
			"stepId":stepId,
			"atomicTask":atomicTask
		}
		childList.childData.push(param);
		console.info(childList.childData);
		base_dialog.close();
	}
	
	init();
	return  childList ;

});