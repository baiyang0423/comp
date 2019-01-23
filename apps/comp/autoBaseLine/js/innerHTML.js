define(function(){
	var html = {};
	
	html.baseLineHostTotalCount = function(count){
		var str = '<p class="mgb-10 color-3">本报告是思特奇公司针对安徽移动相关RHEL服务器基线加固。本次共加固'+count+'台RHEL服务器</p> '+
                  '<p class="mgb-10 color-6">本次系统加固主要指标：</p>';
        $("#base_line_hostTotalCount").append(str);
	}
	
	
	
	/**
	 * 描述
	 * @param {Object} entity
	 */
	html.baseLineSummary = function(entity){
		entity.forEach(function(val,i){
		var str = '<div class="guo-box"> '+
                  '    <div class="guo-bxm"> '+
                  '        <img src="../../../../nresource/comp/pub-ui/images/guo-img.png" class="guo-img" alt=""> '+
                  '        <span class="mgl-10">'+val+'</span> '+
                  '    </div> '+
                  ' </div>';
			$("#base_line_summary").append(str);
		});
	}
	/**
	 * 详情
	 * @param {Object} detail
	 */
	html.baseLineDetail = function(detail){
		var personLiable = detail.personLiable;
		var useTime = detail.useTime
		var exectueTime = detail.exectueTime
		var status = detail.status
		var str = ' <p class="mgb-20">负责人：'+personLiable+'</p> '+
                  ' <p class="mgb-20">执行时间：'+exectueTime+'</p> '+
                  ' <p class="mgb-20">本次加固耗时：'+useTime+'</p> '+
                  ' <p>结果：成功</p>'
		$("#base_line_detail").append(str);
	};
	
	html.baseLineOS = function(os){
		var totalCount = 0 ;
		os.forEach(function(val ,i){
			var str1 = '<div class="ui-row clear color-6 bdb-das pdt-10 pdb-10"> '+
	                   '   <div class="col-4">'+val.hostOS+'</div> '+
	                   '   <div class="col-4">'+val.hostCount+'</div> '+
	                   '   <div class="col-4">'+val.percent+'</div> '+
	                   '</div>';
			$("#base_line_os").append(str1);
			totalCount += val.hostCount;
		})
        var str2 = '<div class="ui-row clear color-0 bdb-das pdt-10 pdb-10"> '+
                   '   <div class="col-4">合计</div> '+
                   '   <div class="col-4">'+totalCount+'</div> '+
                   '   <div class="col-4">100%</div> '+
                   '</div>';
                   
        $("#base_line_os").append(str2);
	};
	/**
	 * 指标
	 * @param {Object} reinforce
	 */
	html.baseLineReinforce = function(reinforce){
		
	};
	/**
	 * 漏洞明细
	 * @param {Object} detection
	 */
	html.baseLineDetection = function(detection){
		detection.forEach(function(val,index){
			var ip = val.ip;
			var items = val.item;
		    var str2 = "";
			items.forEach(function(v,i){
				var status = '';
				if('0' == v.status){
					status = '<font color="green">成功</font>'
				}else{
					status= '<font color="red">失败</font>'
				}
				str2 += '<tr> '+
                        '    <td>'+v.chaneseName+'</td> '+
                        '    <td>'+v.name+'</td> '+
                        '    <td>'+v.kpiValue+'</td> '+
                        '    <td>'+status+'</td> '+
                        '    <td>'+v.msg+'</td> '+
                        '</tr>';
				
			});
			var str1 = '<div class="pdl-10 clear"> '+
		               '    <div class="ip-tit pdl-30 pdt-20 pdb-20 color-6 fs-16 ">'+ip+'</div> '+
			           ' </div> '+
		               ' <div class="approval-table fs-14"> '+
		               '     <table> '+
		               '         <tr> '+
		               '             <th>项目</th> '+
		               '             <th>检查内容</th> '+
		               '             <th>检查结果</th> '+
		               '             <th>加固结果</th> '+
		               '             <th class="bdr-0 w-260">备注</th> '+
		               '         </tr> '+ str2+ ' </table>  '+  
		               ' </div>';
		    $("#base_line_detection").append(str1);
		});
	};
	
	html.clearHTML = function(){
		$("#base_line_hostTotalCount").html("");
		$("#base_line_summary").html("");
		$("#base_line_detail").html("");
		$("#base_line_os").html("");
		$("#base_line_detection").html("");
		$("#day-data-yw").html("");
		$("#mouth-data-yw").html("");
		
	};
	
	return html;
})