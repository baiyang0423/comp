define(['commonutil','ompage','pluspop','/apps/comp/model/tip/index.js'],function(ajaxUtil,page,pluspop,tip){
	var obj = {};
	
	/**
	 * 初始化
	 */
	obj.init = function(){
		obj.initType();
		obj.search(1,true);
		//查询按钮
		$('body').delegate('#btn_search_script','click', function(event) {
			obj.search(1,true);
		});			
		//重置按钮
		$('body').delegate('#btn_reset_script','click', function() {
			$('#fm_script')[0].reset();
		});
		//新增脚本类型切换
		$('body').delegate('#script_type_add','change', function() {
			obj.addScriptTypeChange();
		});
		//修改脚本类型切换
		$('body').delegate('#script_type_edit','change', function() {
			obj.editScriptTypeChange();
		});
		//文件选择获得文件内容
		$('body').delegate('input[name=add_button]','change', function() {
			obj.selFile();
		});
		//修改脚本 文件选择获得文件内容
		$('body').delegate('input[name=edit_button]','change', function() {
			obj.selFileEdit();
		});
		//新增脚本 脚本关联
		$('body').delegate('#script_add_link','click', function() {
			obj.addScriptLink();
		});
		//新增脚本 脚本组
		$('body').delegate('#script_add_group_btn','click', function() {
			obj.addScriptGroup();
		});
		//修改脚本(脚本详情)
		$('body').delegate('.show-script','click', function(event) {
			obj.showScript(event);
		});
		//修改脚本 选择按钮
		$('body').delegate('#btn_script_sel_edit','click', function() {
			obj.btnScriptSelEdit();
		});
		//修改脚本 脚本关联
		$('body').delegate('#script_edit_link','click', function() {
			obj.editScriptLink();
		});
		//修改脚本 脚本组
		$('body').delegate('#script_edit_group_btn','click', function() {
			obj.editScriptGroup();
		});

		//增加按钮
		$('#btn_script_add').click(obj.btnScriptAdd);
		//选择上传文件按钮
		$('#btn_script_sel').click(obj.btnScriptSel);
		//修改按钮
		$('#btn_script_edit').click(obj.btnScriptEdit);
		//删除按钮
		$('#btn_script_del').click(obj.btnScriptDel);
	}
	
	/**
	 * 初始化脚本类型
	 */
	 obj.initType = function(){
		ajaxUtil.postrest(compWsg.script_type, function(data) {
			require(['./tpl/scriptType.tpl'], function(fun) {	
				$("#script_type").html(fun(data.data));
			});	
		});			
	}
	
	/**
	 * 查询脚本列表
	 */
	 obj.search = function(currentPage,first){				
		var para = page.getPara('fm_script',currentPage);
		tip.loading("正在加载脚本数据请稍候...",400);
		ajaxUtil.callrest(compWsg.script_mySearch, function(data) {
			tip.close();
			require(['./tpl/list.tpl'], function(fun) {
				$("#tbody_script").html(fun(data.data));
				initTable();
				if (first) {					
					page.init('page_script',data.page,obj.search);		
				}
			});
		}, para);			
	}
	
	/**
	 * 新增
	 */
	obj.btnScriptAdd = function(){
		$("#rm_script_add_form").initForm();
		$("#rm_script_add_form")[0].reset();
		ajaxUtil.postrest(compWsg.script_add_type, function(data) {
			require(['./tpl/scriptType.tpl'], function(fun) {
				if (data.retCode == RetCode.SUCCESS) {
					require(['./tpl/scriptType.tpl','./tpl/scriptType.tpl'], function(fun1,fun2) {
						$("#script_type_add").html(fun1(data.data));		
						$("#script_child_type_add").html(fun2(data));
						dialog({
							id: 'rm_script_add_dialog',
							title: '新增脚本信息',
							content: $('#rm_script_add')[0],
							width: 800,
							height:400,
							okValue: '确定',
							ok: obj.save,
							cancelValue: '关闭',
							cancel: function() {}
						}).showModal();
					});
				} else {
					pluspop.alert("类型显示失败");					
				}
			});
		});	
	}
	
	/**
	 * 新增类型切换事件(细分类型)
	 */
	obj.addScriptTypeChange = function(){
		var id = $("#script_type_add").val();	
		var para = {'id':id};
		ajaxUtil.postrest(compWsg.script_add_child_type, function(data) {	
			if (data.retCode == RetCode.SUCCESS) {
				require(['./tpl/scriptType.tpl'], function(fun) {
					$("#script_child_type_add").html(fun(data.data));			
				});
			} else {
				pluspop.alert("细分类型显示失败");					
			}
		},para);
	}
	
	/**
	 * 选择上传文件的按钮
	 */
	obj.btnScriptSel = function(){
		$("#file_select").click();
	}
	
	/**
	 * 选择上传文件后的操作
	 */
	obj.selFile = function(){
		var files = $("#file_select").prop('files');
	 	var selectedFile = files[0];
	 	var fileName = selectedFile.name;
		var type = selectedFile.type;
		var fileString = "";
		if(type == "text/xml"){
	    	var reader = new FileReader();//核心操作
		    reader.readAsText(selectedFile,"UTF-8");//读取文件的内容
		    reader.onload = function(evt){
		    fileString = evt.target.result;
		    $("#script_add_fileName").val(fileName);
		    $("#script_content_add").val(fileString);
		    }
	    }else{
	    	var reader = new FileReader();//核心操作
		    reader.readAsText(selectedFile,"GBK");//读取文件的内容
		    reader.onload = function(evt){
			    fileString = evt.target.result;
			    $("#script_add_fileName").val(fileName);
			    $("#script_content_add").val(fileString);
		    }
	    }
	}
	
	/**
	 * 脚本新增 脚本关联
	 */
	 obj.addScriptLink = function(){
		
		var selfDialog = dialog({
			id: 'script_add_link_dg_dialog',
			title: '',
			content: $('#script_add_link_dg')[0],
			width: 400,
			height:350,
			okValue: '确定',
			ok: obj.saveScriptLink,
			cancelValue: '关闭',
			cancel: function() {}
		}).showModal();
	
		var setting = {
                view: {
                    showLine: false,
                    /*showIcon: false,*/
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
            };
		
			ajaxUtil.postrest(compWsg.script_add_link, function(data) {
				var zNodes = data.data.entity;
				$.fn.zTree.init($("#script_link_ztree"), setting, zNodes);
			});
	}
	
	/**
	 * 脚本新增 脚本关联选择确定
	 */
	 obj.saveScriptLink = function(){
		var treeObj = $.fn.zTree.getZTreeObj("script_link_ztree");
		nodes=treeObj.getSelectedNodes();
		var name = "";
		var ids = "";
		for(var i=0;i<nodes.length;i++){
			if(i < nodes.length - 1){
			   if(nodes[i].id.indexOf("_")>0||nodes[i].level==0){
				  pluspop.alert("请正确选择关联脚本");
				  return false;
			   }
			   name += nodes[i].name + ",";
		       ids  += nodes[i].id + ",";
			}else{
				if(nodes[i].id.indexOf("_")>0||nodes[i].level==0){
				  pluspop.alert("请正确选择关联脚本");
				  return false;
			   }
			   name += nodes[i].name;
	           ids  += nodes[i].id;	
			}
        }
		
		$("#script_add_link").val(name);
		$("#script_add_link_ids").val(ids);
	}
	
	
	/**
	 * 脚本新增 关联组
	 */
	obj.addScriptGroup = function(){
		
		var selfDialog = dialog({
			id: 'script_add_group_dg_dialog',
			title: '',
			content: $('#script_add_group_dg')[0],
			width: 400,
			height:350,
			okValue: '确定',
			ok: obj.saveScriptGroup,
			cancelValue: '关闭',
			cancel: function() {}
		}).showModal();
	
		var setting = {
                view: {
                    showLine: false,
                    /*showIcon: false,*/
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
            };
		
			ajaxUtil.postrest(compWsg.script_add_group, function(data) {
				var zNodes = data.data.entity;
				$.fn.zTree.init($("#script_group_ztree"), setting, zNodes);
			});
	}
	
	/**
	 * 新增脚本 脚本组关联
	 */
	 obj.saveScriptGroup = function(){
		var treeObj = $.fn.zTree.getZTreeObj("script_group_ztree");		
		nodes=treeObj.getSelectedNodes();
		if(nodes.length != 1){
			pluspop.alert("请正确选择关联组");
			return false;
		}
		if(nodes[0].isParent){
			pluspop.alert("请正确选择关联组");
			return false;
		}
		var name = nodes[0].name;
		var id = nodes[0].id;
		$("#script_add_group").val(name);
		$("#script_add_group_id").val(id);
	}
	
	/**
	 * 新增保存
	 */
	 obj.save = function(){
		if ($("#rm_script_add_form").valid()) {
			var param = $("#rm_script_add_form").serializeObject();
			delete param.scriptGroupName;
			//如果是脚本文件需要上传到服务器
			if(param.typeId.indexOf("FILE") != -1){
				ajaxUtil.postrest(compWsg.script_add_file, function(data) {
					if (data.retCode == RetCode.SUCCESS) {
						tip.success("脚本新增成功","",function(){
							obj.search(1,true)
						});
					} else {
						tip.fail("脚本新增失败");					
					}
				},param);
			}else{
				ajaxUtil.postrest(compWsg.script_add, function(data) {
					if (data.retCode == RetCode.SUCCESS) {
						tip.success("脚本新增成功","",function(){
							obj.search(1,true)
						});
					} else {
						tip.fail("脚本新增失败");				
					}
				},param);
			}
		}else{
			return false;
		}
	}
	
	/**
	 * 修改
	 */
	 obj.btnScriptEdit = function(){
		if ($('input[name="cb_script"]:checked').size()==1) {
			var para ={'id':$('input[name="cb_script"]:checked').val()};
			ajaxUtil.postrest(compWsg.script_show, function(data) {
				if (data.retCode == RetCode.SUCCESS) {
					require(['./tpl/edit.tpl'], function(fun) {
						$("#rm_script_edit").html(fun(data.data));		
						dialog({
							id: 'rm_script_edit_dialog',
							title: '修改脚本信息',
							content: $('#rm_script_edit')[0],
							width: 900,
							height:400,
							okValue: '确定',
							ok: obj.update,
							cancelValue: '关闭',
							cancel: function() {}
						}).showModal();
					});
				} else {
					pluspop.alert("修改回显失败");					
				}
			},para);
		}else{
			pluspop.alert("请选择一个任务");
			return false;
		}
	}
	
	/**
	 * 修改类型切换事件(细分类型)
	 */
	 obj.editScriptTypeChange = function(){
		var id = $("#script_type_edit").val();	
		var para = {'id':id};
		ajaxUtil.postrest(compWsg.script_add_child_type, function(data) {	
			if (data.retCode == RetCode.SUCCESS) {
				require(['./tpl/scriptType.tpl'], function(fun) {
					$("#script_child_type_edit").html(fun(data.data));			
				});
			} else {
				pluspop.alert("细分类型显示失败");					
			}
		},para);
	}
	
	/**
	 * 选择上传文件的按钮
	 */
	 obj.btnScriptSelEdit = function(){
		$("#file_select_edit").click();
	}
	
	/**
	 * 选择上传文件后的操作
	 */
	 obj.selFileEdit = function(){
		var files = $("#file_select_edit").prop('files');
	 	var selectedFile = files[0];
	 	var fileName = selectedFile.name;
		var type = selectedFile.type;
		var fileString = "";
		if(type == "text/xml"){
	    	var reader = new FileReader();//核心操作
		    reader.readAsText(selectedFile,"UTF-8");//读取文件的内容
		    reader.onload = function(evt){
		    fileString = evt.target.result;
		    $("#script_edit_fileName").val(fileName);
		    $("#script_content_edit").val(fileString);
		    }
	    }else{
	    	var reader = new FileReader();//核心操作
		    reader.readAsText(selectedFile,"GBK");//读取文件的内容
		    reader.onload = function(evt){
		    fileString = evt.target.result;
		    $("#script_edit_fileName").val(fileName);
		    $("#script_content_edit").val(fileString);
		    }
	    }
	}
	
	/**
	 * 脚本修改 脚本关联
	 */
	  obj.editScriptLink = function(){
		
		var selfDialog = dialog({
			id: 'script_edit_link_dg_dialog',
			title: '',
			content: $('#script_edit_link_dg')[0],
			width: 400,
			height:350,
			okValue: '确定',
			ok: obj.editSaveScriptLink,
			cancelValue: '关闭',
			cancel: function() {}
		}).showModal();
	
		var setting = {
                view: {
                    showLine: false,
                    /*showIcon: false,*/
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
            };
		
			ajaxUtil.postrest(compWsg.script_add_link, function(data) {
				var zNodes = data.data.entity;
				$.fn.zTree.init($("#script_link_ztree_edit"), setting, zNodes);
			});
	}
	
	/**
	 * 脚本修改 脚本关联选择确定
	 */
	 obj.editSaveScriptLink = function(){
		var treeObj = $.fn.zTree.getZTreeObj("script_link_ztree_edit");		
		nodes=treeObj.getSelectedNodes();
		var name = "";
		var ids = "";
		for(var i=0;i<nodes.length;i++){
			if(i < nodes.length - 1){
				if(nodes[i].id.indexOf("_")>0||nodes[i].level==0){
					  pluspop.alert("请正确选择关联脚本");
					  return false;
				   }
			    name += nodes[i].name + ",";
		        ids  += nodes[i].id + ",";
			}else{
				if(nodes[i].id.indexOf("_")>0||nodes[i].level==0){
					  pluspop.alert("请正确选择关联脚本");
					  return false;
				   }
				name += nodes[i].name;
	            ids  += nodes[i].id;	
			}
        }
		$("#script_edit_link").val(name);
		$("#script_edit_link_ids").val(ids);
	}
	
	
	/**
	 * 脚本修改 关联组
	 */
	 obj.editScriptGroup = function(){
		ajaxUtil.postrest(compWsg.script_add_group, function(data) {
			var zNodes = data.data.entity;
			$.fn.zTree.init($("#script_group_ztree_edit"), {
                view: {
                    showLine: false,
                    /*showIcon: false,*/
                },
                data: {
                    simpleData: {
                        enable: true
                  	}
                },
			}, zNodes);
			var selfDialog = dialog({
				id: 'script_edit_group_dg_dialog',
				title: '',
				content: $('#script_edit_group_dg')[0],
				width: 400,
				height:350,
				okValue: '确定',
				ok: obj.editSaveScriptGroup,
				cancelValue: '关闭',
				cancel: function() {}
			}).showModal();
		});
	}
	
	/**
	 * 修改脚本 脚本组关联
	 */
	obj.editSaveScriptGroup = function(){
		var treeObj = $.fn.zTree.getZTreeObj("script_group_ztree_edit");		
		nodes=treeObj.getSelectedNodes();
		var name = nodes[0].name;
		var id = nodes[0].id;
		if(nodes.length != 1){
			pluspop.alert("请正确选择关联组");
			return false;
		}
		if(nodes[0].isParent){
			pluspop.alert("请正确选择关联组");
			return false;
		}
		$("#script_edit_group").val(name);
		$("#script_edit_group_id").val(id);
	}
	
	/**
	 * 修改确定
	 */
	 obj.update = function(){
		if ($("#rm_script_edit_form").valid()) {
			var para = $("#rm_script_edit_form").serializeObject();
			if(para.typeId.indexOf("FILE") != -1){
				ajaxUtil.postrest(compWsg.script_update_save_sh, function(data) {
					if (data.retCode == RetCode.SUCCESS) {
							tip.success("脚本修改成功","",function(){
							dialog.get("rm_script_edit_dialog").close();
							obj.search(1,true);
						});
					} else {
						tip.fail(data.retMsg);					
					}
				},para);
			}else{
				ajaxUtil.postrest(compWsg.script_update_save, function(data) {
					if (data.retCode == RetCode.SUCCESS) {
						tip.success("脚本修改成功","",function(){
							dialog.get("rm_script_edit_dialog").close();
							obj.search(1,true);
						});
					} else {
						tip.fail(data.retMsg);							
					}
				},para);   
			}
			return false;
		}else{
			return false;
		}
	}
	
	/**
	 * 脚本详情
	 */
	 obj.showScript = function(event){
		
		var selfDialog = dialog({
			id: 'rm_script_show_dialog',
			title: '',
			content: $('#rm_script_show')[0],
			width: 1000,
			height:450,
			/*okValue: '确定',
			ok: update,*/
			cancelValue: '关闭',
			cancel: function() {}
		}).showModal();
			
		var id = event.currentTarget.attributes.value.nodeValue;
		var para ={"id":id};
		ajaxUtil.postrest(compWsg.script_show, function(data) {
			if (data.retCode == RetCode.SUCCESS) {
				require(['./tpl/show.tpl'], function(fun) {
					$("#rm_script_show").html(fun(data.data));		
				});
			} else {
				pluspop.alert("脚本详情回显失败");					
			}
		},para);
		
	}
	
	/**
	 * 删除
	 */
	 obj.btnScriptDel = function(){
		if ($('input[name="cb_script"]:checked').size()==0) {
			pluspop.alert("请选择要删除的脚本");
			return false;			
		}
		pluspop.confirm(pluspop.msg.confirm_delete,function(){		
			$('input[name="cb_script"]:checked').each(function(i,ele){
				var para = {'id':$(ele).val()};
				ajaxUtil.postrest(compWsg.script_delete, function(data) {	
					if(data.retCode == RetCode.SUCCESS){
						obj.search(1,true);
					}else{
						pluspop.alert("脚本删除失败");				
					}
				}, para);
			});
		});
	}
	return obj;
});