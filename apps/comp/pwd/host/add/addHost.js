define(['pluspop', 'commonutil', '../list/host.js'],function(pluspop, ajaxUtil, list) {

		var obj = {};
		var dialog ;
		obj.showAddPwdDialogHandler = function(flag, id) {

			$("#addPasswordModel").load("/apps/comp/pwd/host/add/addHost.html", function() {
				if(flag == 'add') {
					$(".tit").text("新增主机密码");
					obj.setPwdType();
				} else {
					$(".tit").text("修改主机密码");
					obj.setPwdType();
					obj.setProperty(id);
				}
				obj.initForm(flag);
				obj.showModel();
			});
		}

		obj.setPwdType = function(){
			
			var param = {
				"parentId": "HOST"
			}
			ajaxUtil.callrest(compWsg.password_pwd_type,function(data){
				var t = data.data.entity;
				var options = '<option value="">请选择</option>';
				$.each(t,function(){
					options += '<option value="' + this.id + '">' + this.name + '</option>';
				});
				$("#pwdtypeSetting").html(options);
			},$.param(param), true);
			
		}

		obj.showModel = function() {
			dia = $("#addPasswordModel").ui_dialog({
				width: 1100,
				height: 550,
			}).showModal();
		}
		/**
		 * 修改赋值
		 */
		obj.setProperty = function(id) {
			
			
			var param = {
				"pwdId": id
			}
			$("#username").attr("readonly",true);
			$("#pwdtypeSetting").attr("disabled",true);
			ajaxUtil.callrest(compWsg.password_host_go_edit, function(data) {
				var t = data.data.entity;
				if(data.retCode == "0") {
					$("#resourceId").val(t.resourceId);
					$("#host").val(t.ip);
					$("#username").val(t.username);
					$("#lable").val(t.lable);
					$("#remark").val(t.remark);
					$("#pwdId").val(t.pwdId);
					$("#password").val(t.password);
					$("#repassword").val(t.password);
					$("#pwdtypeSetting option[value='"+t.typeId+"']").attr("selected",true);
				} else {
					pluspop.alert(data.retMsg);
//					var obj = dialog({ id: 'addPwdDialog' });
//					obj.close();
					dia.close();
				}
				
			}, $.param(param), true);
		}

		obj.initForm = function(flag) {
			var locatlLogin = $.parseJSON(localStorage.getItem("login"));
			$("#account").val(locatlLogin.account);
			$("#addForm").initForm({
				messages: {
					"username": {
						required: "用户名不能为空..",
						minlength: "最小2"
					},
					"repassword": {
						equalTo: "两次输入的密码不一致"
					}
				}
			});

			$("#addPwdButton").on('click', function() {
				var pwdId = $("#pwdId").val();
				var lable = '';
				if(pwdId == '') {
					lable = '确定添加密码吗?';
				} else {
					lable = '确定修改密码信息吗?';
				}
				pluspop.confirm(lable, function() {
					if($("#addForm").valid()) { //验证成功
						ajaxUtil.callrest(compWsg.password_host_add, function(data) {
							if(data.retCode == "0") {
								pluspop.alert(data.retMsg);
//								var obj = dialog({ id: 'addPwdDialog' });
//								obj.close();
								list.search(1, true);
								dia.close();
							} else {
								pluspop.alert(data.retMsg);
							}
						}, $("#addForm").serialize(), true);

					}
				});

			});

			if(flag == 'add'){
				$("#host").on("click", function() {
					obj.showSelectHost();
				});
			}

			$("#addPwdButtonCanal").on("click", function() {
				dia.close();
			});
			$("#opt1").hide();
			$("#opt2").hide();
			$("#settingBtn").on("click", function() {
				if($(this).hasClass("on")) {
					$("#opt1").hide();
					$("#opt2").hide();
					//				$(this).removeClass("on");
					$(this).text("显示高级设置...");
				} else {
					$("#opt1").show();
					$("#opt2").show();
					//				$(this).addClass("on");
					$(this).text("隐藏高级设置");
				}
				$(this).toggleClass("on");
			});
		}

		obj.showSelectHost = function() {
//			var dialog = host.pwdChangeHost("900px", "", function() {
//				var checked = $("input[type='checkbox']:checked", $("#dg_resource_host"));
//				if(checked.length > 1) {
//					pluspop.alert("只能绑定一台主机!");
//					return false;
//				} else if(checked.length == 1) {
//					$.each(checked, function(index) {
//						console.log($(this).attr("hostId"));
//						$("#host").val($(this).attr("hostIp"));
//						$("#resourceId").val($(this).attr("hostId"));
//					});
//					return true;
//				} else {
//					pluspop.alert("请选择主机!");
//					return false;
//				}
//			});
			require(["/apps/comp/model/passwd/host/radio/main.js"],function(host){
				host.open(function(data){
					$("#host").val(data.ip);
					$("#resourceId").val(data.hostId);
					console.log("响应事件",data);
				});
				
			});
		}
		return obj;
	});