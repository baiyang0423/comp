define(['commonutil', 'ompage', 'pluspop','./dialog.js'], function(ajaxUtil, page, pluspop,dialog) {
	var list = {};
	var pageLimit = 10 ;
	
	list.search = function(){
		list.searchWithPage(1,true);
	}
	/**
	 * 分页查询
	 */
	list.searchWithPage = function(currentPage,first){
		var param = {"name":$("#configure_name_input").val(),
				 	 "currentPage": currentPage,
					 "pageLimit" : pageLimit
					}
		ajaxUtil.callrest(compWsg.auto_baseLine_kpi_searchWithPage, function(data) {
			require(['../tpl/list.tpl'], function(fun) {
				console.info(data.data);
				$("#tbody_index").html(fun(data.data));
				initTable();
				if (first) {					
					page.init('page_index',data.page,list.searchWithPage);		
				}
			});
		},param,true);	
	}
	/**
	 * 增加弹窗
	 */
	list.showAddDialog = function(){
		dialog.showDialog("add");
		$("#configure_add_form")[0].reset();
		$("#configure_id").val("");
		$("#configure_remarks").text("");
		$("#validateCode").remove();
		list.searchClassification();
	}
	/**
	 * 保存
	 */
	list.save = function(){
		if($("#configure_name").val() == "" || $("#configure_name").val() == null){
			pluspop.alert("指标名称不能为空");
			return false;
		}
		if($("#configure_code").val() == "" || $("#configure_code").val() == null){
			pluspop.alert("指标代码不能为空");
			return false;
		}
		if($("#configure_name").val() == "" || $("#configure_defaultValues").val() == null){
			pluspop.alert("指标默认值不能为空");
			return false;
		}
		if($("#configure_shell").val() == "" || $("#configure_shell").val() == null){
			pluspop.alert("shell不能为空");
			return false;
		}
		if($("#validateCode").length > 0){
			pluspop.alert("请检查代码");
			return false;
		}
		var param = {
			"id":$("#configure_id").val(),
			"name": $("#configure_name").val(),
			"code":$("#configure_code").val(),
			"shell":$("#configure_shell").val(),
			"defaultValues":$("#configure_defaultValues").val(),
			"classificationId":$("#select_configure_classificationId option:selected").val(),
			"types":$("#select_configure_types option:selected").val(),
			"hasSudo":$('.allr-type.on').attr("value"),
			"remarks":$("#configure_remarks").val()
		}
		ajaxUtil.postrest(compWsg.auto_baseLine_kpi_save, function(data) {
			if(data.retCode == 0){
				pluspop.alert("操作成功");
				list.search();
				dialog.closeDialog();
			}else{
				pluspop.alert("操作失败");
			}
		},param,true);	
	}
	/**
	 * 查询指标分类
	 */
	list.searchClassification = function(classificationId){
		$("#select_configure_classificationId").html("");
		ajaxUtil.callrest(compWsg.auto_baseLine_kpi_searchClassification, function(data) {
			console.info(data.data);
			data.data.entity.forEach(function(attr,index){
				var str = "";
				if(classificationId == attr.id){
					str = '<option value="'+attr.id+'" selected="selected">'+attr.name+'</option>';
				}else{
					str = '<option value="'+attr.id+'" >'+attr.name+'</option>';
				}
				$("#select_configure_classificationId").append(str);
			})
		},"",true);	
	}
	/**
	 * 修改弹窗
	 */
	list.showEditDialog = function(){
		$("#validateCode").remove();
		if($("input[name='configureId']:checked").size() != 1){
			pluspop.alert("请选择一条数据");
			return false;
		}
		var param = {id:$("input[name='configureId']:checked").val()};
		ajaxUtil.callrest(compWsg.auto_baseLine_kpi_searchOne, function(data) {
			console.info(data.data);
			if(data.retCode == 0){
				list.searchClassification(data.data.entity.classificationId);
				$("#configure_id").val(data.data.entity.id);
				$("#configure_name").val(data.data.entity.name);
				$("#configure_code").val(data.data.entity.code);
				$("#configure_shell").val(data.data.entity.shell);
				$("#configure_defaultValues").val(data.data.entity.defaultValues);
				if(data.data.entity.remarks != null){
					$("#configure_remarks").text(data.data.entity.remarks);
				}
				list.selected(data.data.entity.types);
				list.radio(data.data.entity.hasSudo);
				dialog.showDialog("add");
			}else{
				pluspop.alert("查询数据失败");
			}
		},param,true);
	}
	
	/**
	 * 修改选择下拉框
	 */
	list.selected = function(types){
		($("#select_configure_types").children("option")).each(function(i,ele){
			if($(ele).val() == types){
				$(ele).prop("selected","selected");
			}
		})
	};
	
	/**
	 * 修改选择单选框
	 */
	list.radio = function(hasSudo){
		$("#radio_hasSudo").find("span").each(function(i,ele){
			if($(ele).attr("value") == hasSudo){
				if($(ele).hasClass("on")){
					$(ele).siblings('span').removeClass('on');
				}else{
					$(ele).addClass('on');
					$(ele).siblings('span').removeClass('on');
				}
			}
		})	
	}
	
	/**
	 * 删除
	 */
	list.delete = function(){
		if($("input[name='configureId']:checked").size() <= 0){
			pluspop.alert("请选择任务");
			return false;
		}
		pluspop.confirm(pluspop.msg.confirm_delete,function(){
			var param = [];
			$("input[name='configureId']:checked").each(function(i,ele){
				param.push($(ele).val());
			});
			ajaxUtil.postrest(compWsg.auto_baseLine_kpi_delete, function(data) {
				if(data.retCode == 0){
					pluspop.alert("操作成功");
					list.search();
				}else{
					pluspop.alert("操作成功");
				}
			},param,true);	
		});
	}

	/**
	 * 验证code唯一
	 */
	list.validateCode = function(){
		var param = {code:$("#configure_code").val()};
		ajaxUtil.callrest(compWsg.auto_baseLine_kpi_validateCode, function(data) {
			if(data.data.entity){
				$("#validateCode").remove();
				var div = $("#configure_code").parent("div").after('<span class="pdl-100" id="validateCode" style="color:red;width:10px;">代码已存在，请更换</span>')
			}else{
				$("#validateCode").remove();
			}
		},param,true);	
	}
	/**
	 * 同步文件到ansible
	 */
	list.synchronous = function(){
		ajaxUtil.callrest(compWsg.auto_baseLine_kpi_synchronous, function(data) {
			if(data.retCode == 0){
				pluspop.alert("同步文件成功");
			}else{
				pluspop.alert(data.retMsg);
			}
		},"",true);	
	}

	list.closeDialog = function(){
		dialog.closeDialog();
	}
	return list;
})
	