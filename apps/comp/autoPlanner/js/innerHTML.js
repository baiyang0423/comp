define(function(){
	var html = {};
	
	html.addLine= function(){
//		$("#planner_configure_line").html("");
		var divs = $("#planner_configure_step_div").children("div").size();
		console.info(divs);
		if(divs == 1){
			$("#planner_configure_line").append('<div style="padding-top: 50px;height: 60px;"><p class="pei-line1 on clear"></p></div>')
		}
		if(divs == 2){
			$("#planner_configure_line").append('<div style="padding-top: 60px;height: 30px;"><p class="pei-line3"></p></div>')
		}
	}
	
	html.deleteLine = function(){
		var divs = $("#planner_configure_step_div").children("div").size();
		console.info(divs);
		if(divs == 0){
			$("#planner_configure_line").children("div").eq(0).remove();
		}
		if(divs == 1){
			$("#planner_configure_line").children("div").eq(1).remove();
		}
	}
	
	html.deleteStepDiv = function(obj){
		var stepId = obj.id;
		//删除所选元素后边的同级元素
		$("#"+stepId).parent("div").nextAll().remove();
		//判断是否是第一个div
		var size = $("#"+stepId).parent("div").siblings("div").size();
		if(size == 0){
			$("#"+stepId).parent("div").parent("div").parent("div").remove();
		}
		//删除本身元素
		$("#"+stepId).parent("div").remove();
	}
	
	html.addStepHTML = function(stepId){
		var div = $("#dialog_small2").children("div").children("div").find(".on");
		var str = ' <div style="height: 110px" class="pdt-30"> '+
                  '     <div class="sat-one clear"> '+
                  '         <div class="fl tc pei-box on dialog-small" style="width:84px;height:80px"> '+
                  '         <input type="hidden" name="parentId" class="step_parentId" id="'+stepId+'" value="'+stepId+'" />'+
                  '     	<div> '+
                  			    div.html()+
                  '         </div> '+
                  '     </div>'+
                  ' </div>';
		$("#planner_configure_step_div").append(str);
	}
	
	html.addChildTask = function(stepId,parentId){
		var div = $("#dialog_small2").children("div").children("div").find(".on");
		var str = ' <div class="fl tc pei-box on dialog-small"> '+
                  '     <div class="pei-line1 clear fl mgt-20 mgl-10 mgr-10"></div> '+
                  '     <input type="hidden" name="parentId" class="step_parentId" id="'+stepId+'" value="'+stepId+'" />'+
                  '     <div class="fl" style="width:84px;height:80px"> '+
                  			div.html()+ 
                  '     </div> '+
                  ' </div>';
                  
        $("#"+parentId).parent("div").after(str);
	}
	
	html.getTypeAndName = function(){
		var div = $("#dialog_small2").children("div").children("div").find(".on");
		var type = div.children("p").eq(1).attr("value");
		var name = div.children("p").eq(1).html();
		return type +','+name;
	}
	
	
	html.showPerview = function(step,formId){
		var str0 = '<div class="fl" style="padding-top: 30px;padding-left: 100px;padding-right: 20px;"> '+
	               '     <span class="start-icon"></span> '+
	               '     <p class="tc mgt-10">开始</p> '+
	               ' </div>';
		step.forEach(function(attr,index){
			var str2 = "";
			$(attr).each(function(i,val){
				var p = html.imgIone(val.stepType);
				str2 += '<div class="fl tc pei-box on"> '+
	                       '   <div class="pei-line1 clear fl mgt-20 mgl-30"></div> '+
	                       '       <div class="fl" style="width:84px;height:80px"> '+p+'<p class="mgt-10">'+val.stepName+'</p> '+
	                       '   </div> '+
	                       '</div>';
			});
			var str1 = ' <div class="fl col-9"> '+
	                   '     <div style="height: 110px;" class="pdt-30"> '+
	                   '         <div class="sat-one clear"> '+ str2 +'</div> '+
	                   '      </div> '+
	                   '  </div>';
	        $("#"+formId).append(str0+str1);
		});
	}
	
	html.editShowStep = function(step){
		var stepData = [];
		$("#planner_configure_step_div").html("");
		$("#planner_configure_line").html("");
		step.forEach(function(attr,index){
			var str2 = "";
			$(attr).each(function(i,val){
				var type = (val.stepType).toLowerCase();
				var p = html.imgIone(val.stepType);
				if(i == 0){
					str2 +=  ' <div class="fl tc pei-box on dialog-small"> '+
		                    '     <input type="hidden" name="parentId" class="step_parentId" id="'+val.id+'" value="'+val.id+'" />'+
		                    '     <div class="fl" style="width:84px;height:80px">'+ p +'<p class="mgt-10" value="'+type+'">'+val.stepName+'</p></div> '+
		                    ' </div>';
				}else{
					str2 += ' <div class="fl tc pei-box on dialog-small"> '+
							'     <div class="pei-line1 clear fl mgt-20 mgl-10 mgr-10"></div> '+
		                    '     <input type="hidden" name="parentId" class="step_parentId" id="'+val.id+'" value="'+val.id+'" />'+
		                    '     <div class="fl" style="width:84px;height:80px">'+ p +'<p class="mgt-10" value="'+type+'">'+val.stepName+'</p></div> '+
		                    ' </div>';
				}
				stepData.push(val);
			});
			var str1 = '     <div style="height: 110px;" class="pdt-30"> '+
	                   '         <div class="sat-one clear"> '+ str2 +'</div> '+
	                   '      </div> ' ;
	        $("#planner_configure_step_div").append(str1);
	        html.addLine();
		});
		return stepData;
	}
	
	
	html.imgIone = function(stepType){
		var p = "";
		if("OS_INSTALL" == stepType){
			p = '<p class="pei-icon pei-icon1"></p>';
		}
		if("BASE_LINE" == stepType){
			p = '<p class="pei-icon pei-icon2"></p>';
		}
		if("INSPECTION" == stepType){
			p = '<p class="pei-icon pei-icon3"></p>';
		}
		if("SCRIPT" == stepType){
			p = '<p class="pei-icon pei-icon4"></p>';
		}
		if("EXTEND" == stepType){
			p = '<p class="pei-icon pei-icon5"></p>';
		}
		if("PROCESS" == stepType){
			p = '<p class="pei-icon pei-icon6"></p>';
		}
		return p;
	}
	/**
	 * 主机分布
	 * @param {Object} os
	 */
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
		$("#base_line_os").html("");
		$("#base_line_detection").html("");
	};
	return html;
})