define(function(){
	var innerHTML = {};
	
	innerHTML.data = [];
	/**
	 * 统一模板
	 */
	innerHTML.setTemplet = function(){
		var selected = $("#install_select_templet option:selected").val();
		var tr = $("#tbody_install_confiure_2 tr");
		for (var i = 0; i < tr.length; i++) {
			var tds = $(tr[i]).find("td");
			if (tds.length > 2) {
				$(tds[2]).find("option[value="+selected+"]").prop("selected",true);
				$(tds[2]).find("option[value="+selected+"]").siblings().prop("selected",false);
			}
		}
	}
	
	/**
	 * 统一配置
	 */
	innerHTML.setConfigure = function(){
		var selected = $("#install_select_os option:selected").val();
		var tr = $("#tbody_install_confiure_2 tr");
		for (var i = 0; i < tr.length; i++) {
			var tds = $(tr[i]).find("td");
			if (tds.length > 3) {
				$(tds[3]).find("option[value="+selected+"]").prop("selected",true);
				$(tds[3]).find("option[value="+selected+"]").siblings().prop("selected",false);
			}
		}
	}
	
	/**
	 * 获取页面内容
	 */
	innerHTML.getConfigure1Table = function(){
		var tr = $("#tbody_install_confiure_1 tr");
		var result = [];
		for (var i = 0; i < tr.length; i++) {
			var tds = $(tr[i]).find("td");
			if (tds.length > 0) {
				result.push({
					id : tds[0].textContent,
					ip : tds[1].textContent
				});
			}
		}
		return result;
	}
	
	innerHTML.getConfigure2Data = function(){
		innerHTML.data.length = 0 ;
		var list = [];
		var trs = $("#tbody_install_confiure_2").children("tr");
		trs.each(function(i,ele){
			var obj = {};
			obj.resource_id = $(ele).children("td").eq(0).text();
			obj.ip = $(ele).children("td").eq(1).text();
			obj.templet_id =  $(ele).children("td").eq(2).children("select").val();
			obj.os_version =  $(ele).children("td").eq(3).children("select").val();
			list.push(obj);
			innerHTML.data.push(obj);
		})
		return list;
	}
	
	/**
	 * 添加时，选择模板和系统化，返回配置页1修改后，在回到配置页2时，回显选中的状态
	 */
	innerHTML.getSelectedData = function(sData){
		var trs = $("#tbody_install_confiure_2").children("tr");
		trs.each(function(i,ele){
			sData.forEach(function(d2 ,b){
				var tds = $(ele).find("td");
				var ip = tds.eq(1).text();
				if(ip == d2.ip){
					$(tds.eq(2)).find("option[value="+d2.templet_id+"]").prop("selected",true);
					$(tds.eq(3)).find("option[value="+d2.os_version+"]").prop("selected",true);
				}
			});
		});
	}
	
	
	
	
	return innerHTML;
})