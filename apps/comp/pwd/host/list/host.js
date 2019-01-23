define(['pluspop', 'ompage', "commonutil"], function(pluspop, ompage, ajaxUtil) {
	var addPwd = {};
	addPwd.search = function(currentPage, first) {
		var param = {
			"currentPage": currentPage,
			"username": $("#searchUserName").val(),
			"ip": $("#searchIp").val(),
			"status": $("#searchStatus").val()
		}
		
		require(["./hostList.tpl"], function(mainbody) {
			ajaxUtil.callrest(compWsg.password_host, function(data) {

				$("#mainbody").html(mainbody(data.data));
				initTable();
				if(first) {
					ompage.init("mainPage", data.page, addPwd.search);
				}
				
				$('#allChecked').on('click', function(event) {
					var flag = $('#allChecked').is(".checked");
					
					$('.js-checkbox input').prop("checked", function(i, val) {
						return !flag;
					});
					$('.js-checkbox').toggleClass('checked',!flag);
				});
			}, param, true);
		});
	};

	addPwd.bindButton = function() {
		$("body").delegate(".js-checkbox input","click",function(event){
			$(this).parent(".js-checkbox").toggleClass("checked");
		});

		$('#insert').on('click', function() {
			require(["/apps/comp/pwd/host/add/addHost.js"], function(goPwd) {
				goPwd.showAddPwdDialogHandler('add');
			});
		});

		$(".search", $("#search_list")).on("click", function() {
			addPwd.search(1, true);
		});

		$(".reset", $("#search_list")).on("click", function() {
			$("#searchUserName").val("");
			$("#searchIp").val("");
			$("#searchStatus>option:gt(0)").prop("selected", false);
		});

		$("#edit").on('click', function() {

			var objs = $("input[name='items']:checked");
			if(objs.length == 0) {
				pluspop.alert("请选择要修改的密码!");
				return;
			} else if(objs.length > 1) {
				pluspop.alert("仅能选择一条要修改的密码!");
				return;
			}
			require(["/apps/comp/pwd/host/add/addHost.js"], function(goPwd) {
				goPwd.showAddPwdDialogHandler('update', objs[0].value);
			});

		});

		$("#del").on("click", function() {
			var objs = $("input[name='items']:checked");
			var locatlLogin = $.parseJSON(localStorage.getItem("login"));
			if(objs.length < 1) {
				pluspop.alert("请选择要删除的密码!");
			}

			var ids = new Array();

			$.each(objs, function(i, val) {
				ids[ids.length] = val.value
			});

			var param = {
				"pwdId": ids.toString(),
				"userId": locatlLogin.account
			}

			pluspop.confirm("确定删除密码吗!", function() {
				ajaxUtil.callrest(compWsg.password_host_delete, function(data) {
					if(data.retCode == "0") {
						pluspop.alert(data.retMsg);
						addPwd.search(1, true);
					} else {
						pluspop.alert(data.retMsg);
					}
				}, $.param(param), true);
			});
		});

		$("#ref").on("click", function() {//更新密码

			var objs = $("input[name='items']:checked");

			if(objs.length == 0) {
				pluspop.alert("请选择要更新的密码!");
				return;
			} else if(objs.length > 1) {
				pluspop.alert("仅能选择一条要更新的密码!");
				return;
			}
			
			var locatlLogin = $.parseJSON(localStorage.getItem("login"));
			var param = {
				"pwdId": objs[0].value,
				"userId": locatlLogin.account
			}
			pluspop.confirm("确定要更新密码吗?", function() {
				ajaxUtil.callrest(compWsg.password_host_refresh, function(data) {
					if(data.retCode == "0") {
						pluspop.alert(data.retMsg);
						addPwd.search(1, true);
					} else {
						pluspop.alert(data.retMsg);
					}
				}, $.param(param), true);
			});
		});
		
		$("#export").on("click", function() {
			var locatlLogin = $.parseJSON(localStorage.getItem("login"));
			$("#exportUserId").val(locatlLogin.account);
			$("#exportIp").val($("#searchIp").val());
			$("#exportUsername").val($("#searchUserName").val());
			$("#exportStatus").val($("#searchStatus").val());
			$("#exportForm").attr("action",compWsg.password_host_export);
			$("#exportForm").submit();
			
		});

		$("#imports").on("click",function(){
			var locatlLogin = $.parseJSON(localStorage.getItem("login"));
			require(["/apps/comp/pwd/host/add/importHost.js"], function(imports) {
				imports.showImportDialogModel();
			});
		});
		
		$("#verifyBtn").on("click",function(){
			
			var objs = $("input[name='items']:checked");
			
			if(objs.length == 0) {
				pluspop.alert("请选择要验证的密码!");
				return;
			} else if(objs.length > 1) {
				pluspop.alert("仅能选择一条要验证的密码!");
				return;
			}
			var locatlLogin = $.parseJSON(localStorage.getItem("login"));
			var param = {
				"pwdId": objs[0].value,
				"userId": locatlLogin.account
			}
			
			pluspop.confirm("确定要验证密码吗?", function() {
				ajaxUtil.callrest(compWsg.password_host_verify, function(data) {
					console.log(data);
					if(data.retCode == "0") {
						pluspop.alert(data.retMsg);
						addPwd.search(1, true);
					} else {
						pluspop.alert(data.retMsg);
					}
				}, $.param(param), true);
			});
		});
	};
	return addPwd;
});