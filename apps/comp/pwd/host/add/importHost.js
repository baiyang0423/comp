define(['pluspop', 'commonutil','../list/host.js'], function(pluspop, ajaxUtil,list) {

	var imports = new Object();

	imports.showImportDialogModel = function() {

		$("#importPwdModel").load("/apps/comp/pwd/host/add/imports.html ",function(){
			imports.initForm();
			imports.showModel();
		});
	}

	imports.showModel = function() {
		var param = {
			id: 'importPwdDialog',
			title: '',
			content: $("#importPwdModel")[0],
			width: '1000px'
		}
		dialog(param).showModal();
	}

	imports.initForm = function() {

		$("#importPwdCanalBtn").on("click", function() {
			var model = dialog({ id: 'importPwdDialog' });
			model.close();
		});

		$("#downTempleteBtn").on("click", function() {
			$("#downloadForm").attr("action", compWsg.password_templet_download);
			$("#templetType").val("host");
			$("#downloadForm").submit();
		});
		
		$("#importForm").ajaxForm({
			type: "post",
			url: compWsg.password_host_import,
			success: function(data) {
				if(data.retCode=='0'){
					
					pluspop.alert(data.retMsg);
					var obj = dialog({ id: 'importPwdDialog' });
					obj.close();
					list.search(1, true);
				}else{
					pluspop.alert(data.retMsg);
				}
			},
			error:function(){}
		});

		$("#importPwdSureBtn").on("click", function() {
			var locatlLogin = $.parseJSON(localStorage.getItem("login"));
			$("#uploadUserid").val(locatlLogin.account);
			$("#importForm").submit();
		});
	}

	return imports;
});