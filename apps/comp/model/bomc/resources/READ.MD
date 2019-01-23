<!-- 选择bomc资源 -->
<div class="none" id="select_bomc_resource_check_model">
	<!--#include file="/apps/comp/model/bomc/resources/check/model.html" -->
</div>
调用代码:
function(data){}:为回调函数 data为选择需求确定后返回的对象{id:"资源unit_id",name:"资源名称"}
require(["/apps/comp/model/bomc/resources/check/main.js"],function(files){
	files.open(function(data){
		console.log("响应事件",data);
	});
});