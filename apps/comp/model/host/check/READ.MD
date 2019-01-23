<!-- 选择主机-->
<div class="hide" id="select_host_check_model">
	<!--#include file="/apps/comp/model/host/check/model.html" -->
</div>
调用代码:
function(data){}:为回调函数 data为选择需求确定后返回的对象{id:"主机ID",name:"主机IP"}
require(["/apps/comp/model/host/check/main.js"],function(host){
	host.open(function(data){
		console.log("响应事件",data);
	});
});